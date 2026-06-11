import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import AnswerInput from "./AnswerInput";

const BASE_URL = "http://localhost:6060";

export default function InterviewQuiz({ quizData, currentQuestion, onNext }) {
  const { t } = useTranslation();
  const [answer, setAnswer] = useState(null);
  const [ttsPlaying, setTtsPlaying] = useState(false);
  const [ttsLoaded, setTtsLoaded] = useState(false);
  const ttsAudioRef = useRef(null);

  const progress = ((currentQuestion + 1) / quizData.length) * 100;
  const isLast = currentQuestion === quizData.length - 1;
  const currentQ = quizData[currentQuestion];
  const questionText = currentQ?.questionText || currentQ?.question || "";
  const questionAudio = currentQ?.questionAudio || null;

  useEffect(() => {
    setAnswer(null);
  }, [currentQuestion]);

  useEffect(() => {
    if (!questionAudio) return;
    if (ttsAudioRef.current) {
      ttsAudioRef.current.pause();
      ttsAudioRef.current = null;
    }
    setTtsLoaded(false);
    setTtsPlaying(false);
    const audio = new Audio(`${BASE_URL}${questionAudio}`);
    ttsAudioRef.current = audio;
    audio.onloadstart = () => setTtsLoaded(true);
    audio.onplay = () => setTtsPlaying(true);
    audio.onpause = () => setTtsPlaying(false);
    audio.onended = () => setTtsPlaying(false);
    audio.onerror = () => { setTtsLoaded(false); setTtsPlaying(false); };
    audio.play().catch(() => setTtsLoaded(true));
    return () => { audio.pause(); ttsAudioRef.current = null; };
  }, [currentQuestion, questionAudio]);

  const toggleTts = () => {
    const audio = ttsAudioRef.current;
    if (!audio) return;
    if (ttsPlaying) { audio.pause(); }
    else { audio.currentTime = 0; audio.play().catch(() => {}); }
  };

  const handleNext = () => {
    if (ttsAudioRef.current) ttsAudioRef.current.pause();
    const payload = answer?.type === "voice"
      ? { type: "voice", data: answer.data, questionId: currentQ?.questionID }
      : { type: "essay", data: answer?.data || "", questionId: currentQ?.questionID };
    onNext(payload);
  };

  if (!currentQ) return null;

  return (
    <div className="quiz-int-wrapper">

      <div className="quiz-int-prog-bg">
        <div className="quiz-int-prog-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="quiz-int-header-row">
        <span className="quiz-int-tag">{t('interview_quiz.tag')}</span>
        <span className="quiz-int-counter">
          {t('interview_quiz.question_counter', { current: currentQuestion + 1, total: quizData.length })}
        </span>
      </div>

      <div className="quiz-int-question-block">
        <div className="quiz-int-question-text">{questionText}</div>
        {questionAudio && (
          <button
            className={`quiz-int-tts-btn ${ttsPlaying ? "quiz-int-tts-btn-playing" : ""}`}
            onClick={toggleTts}
            title={ttsPlaying ? t('interview_quiz.tts_pause_title') : t('interview_quiz.tts_listen_title')}
            disabled={!ttsLoaded}
          >
            {ttsPlaying ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
            <span className="quiz-int-tts-label">
              {!ttsLoaded ? t('interview_quiz.tts_loading') : ttsPlaying ? t('interview_quiz.tts_playing') : t('interview_quiz.tts_listen')}
            </span>
          </button>
        )}
      </div>

      <AnswerInput
        currentQuestion={currentQuestion}
        onAnswer={setAnswer}
      />

      <button
        className="quiz-int-next-btn"
        onClick={handleNext}
        disabled={!answer}
      >
        {isLast ? t('interview_quiz.btn_finish') : t('interview_quiz.btn_next')}
      </button>

    </div>
  );
}
