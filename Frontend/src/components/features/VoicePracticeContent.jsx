import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import VoiceGif from "../../assets/images/voiceRecorder.gif";

export default function VoicePracticeContent() {
  const [isRecording, setIsRecording] = useState(false);
  const [status, setStatus] = useState("");
  const [timer, setTimer] = useState("00:00");
  const [audioUrl, setAudioUrl] = useState(null);
  const { t } = useTranslation();

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerIntervalRef = useRef(null);
  const secondsRef = useRef(0);
  const audioRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) =>
        audioChunksRef.current.push(e.data);

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        setAudioUrl(URL.createObjectURL(blob));
        setStatus(t('voice_recorder.status_saved'));
        stream.getTracks().forEach((t) => t.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setStatus(t('voice_recorder.status_recording'));
      secondsRef.current = 0;

      timerIntervalRef.current = setInterval(() => {
        secondsRef.current++;
        const m = Math.floor(secondsRef.current / 60).toString().padStart(2, "0");
        const s = (secondsRef.current % 60).toString().padStart(2, "0");
        setTimer(`${m}:${s}`);
      }, 1000);

    } catch {
      setStatus(t('voice_recorder.status_denied'));
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
    clearInterval(timerIntervalRef.current);
  };

  const handleDelete = () => {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(null);
    setTimer("00:00");
    setStatus(t('voice_recorder.status_ready'));
  };

  return (
    <div className="row align-items-center">
      <div className="col-md-6 text-center d-none d-lg-block">
        <img
          src={VoiceGif}
          className="img-fluid rounded animate__animated animate__fadeInLeft voice-img-custom"
          alt="Voice Practice"
        />
      </div>

      <div className="col-lg-6 col-12 mb-4">
        <div className="text-start">
          
          <div className="d-flex align-items-center mb-4 animate__animated animate__fadeInUp">
            <div className="d-flex align-items-center justify-content-center rounded-circle me-3 feature-icon-wrapper">
              <i className="fa-solid fa-microphone feature-icon" />
            </div>
            <h3 className="mb-0 fw-bold feature-subtitle">{t('features_data.voicePractice.title')}</h3>
          </div>

          <p className="text-secondary lh-base mb-4 animate__animated animate__fadeInUp animate__delay-1s">
            {t('features_data.voicePractice.description')}
          </p>

          <div className="voice-container-custom p-4 bg-white rounded-3 shadow-sm border border-light animate__animated animate__fadeInUp animate__delay-2s">
            <div className="d-flex align-items-center justify-content-between">
              <button
                className={`btn rounded-pill px-4 py-2 fw-semibold shadow-sm d-inline-flex align-items-center gap-2 text-white ${isRecording ? 'btn-danger animate__animated animate__pulse animate__infinite' : 'btn-feature-ai'}`}
                onClick={isRecording ? stopRecording : startRecording}
              >
                <i className={`fa-solid ${isRecording ? 'fa-stop' : 'fa-microphone'}`}></i>
                {isRecording ? t('voice_recorder.status_recording') : t('voice_recorder.status_ready')}
              </button>
              
              <div className="text-end">
                <div className={`fw-bold fs-5 ${isRecording ? 'text-danger' : ''}`}>{timer}</div>
                <small className="">{status || t('voice_recorder.status_ready')}</small>
              </div>
            </div>

            {audioUrl && (
              <div className="mt-3 pt-3 border-top">
                <audio ref={audioRef} src={audioUrl} controls className="w-100 mb-3" />
                <div className="d-flex flex-column flex-sm-row gap-2">
                  <button
                    className="btn btn-outline-feature rounded-pill w-100 d-inline-flex align-items-center justify-content-center gap-2 fw-semibold"
                    onClick={() => audioRef.current?.play()}
                  >
                    <i className="fa-solid fa-play"></i>
                    {t('interview_quiz.tts_listen')}
                  </button>
                  <button
                    className="btn btn-outline-danger rounded-pill w-100 d-inline-flex align-items-center justify-content-center gap-2 fw-semibold"
                    onClick={handleDelete}
                  >
                    <i className="fa-solid fa-trash"></i>
                    {t('voice_recorder.btn_delete')}
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}