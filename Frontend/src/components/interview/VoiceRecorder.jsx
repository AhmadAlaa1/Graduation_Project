import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

const MAX_SECONDS = 180; // 3 دقائق حد أقصى

export default function VoiceRecorder({ onAnswer }) {
  const { t } = useTranslation();
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [status, setStatus] = useState(t('voice_recorder.status_ready'));
  const [timer, setTimer] = useState("00:00");

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  const secondsRef = useRef(0);
  const audioRef = useRef(null);
  const objectUrlRef = useRef(null);

  // تحديث الحالة عند تغيير اللغة برمجياً
  useEffect(() => {
    if (!audioBlob && !isRecording) {
      setStatus(t('voice_recorder.status_ready'));
    } else if (isRecording) {
      setStatus(t('voice_recorder.status_recording'));
    } else {
      setStatus(t('voice_recorder.status_saved'));
    }
  }, [t, audioBlob, isRecording]);

  useEffect(() => {
    if (audioBlob && audioRef.current) {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
      const url = URL.createObjectURL(audioBlob);
      objectUrlRef.current = url;
      audioRef.current.src = url;
    }
  }, [audioBlob]);

  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
      if (mediaRecorderRef.current?.state === "recording") {
        mediaRecorderRef.current.stop();
      }
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

  const toggleRecording = async () => {
    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioChunksRef.current = [];
        const recorder = new MediaRecorder(stream);
        mediaRecorderRef.current = recorder;

        recorder.ondataavailable = (e) => audioChunksRef.current.push(e.data);

        recorder.onstop = () => {
          const blob = new Blob(audioChunksRef.current, { type: "audio/wav" });
          const audioFile = new File([blob], "answer.wav", { type: "audio/wav" });
          setAudioBlob(blob);
          setStatus(t('voice_recorder.status_saved'));
          stream.getTracks().forEach((t) => t.stop());
          clearInterval(timerRef.current);
          onAnswer({ type: "voice", data: audioFile });
        };

        recorder.start();
        setIsRecording(true);
        setStatus(t('voice_recorder.status_recording'));

        secondsRef.current = 0;
        timerRef.current = setInterval(() => {
          secondsRef.current++;

          if (secondsRef.current >= MAX_SECONDS) {
            mediaRecorderRef.current?.stop();
            setIsRecording(false);
            return;
          }

          const m = Math.floor(secondsRef.current / 60).toString().padStart(2, "0");
          const s = (secondsRef.current % 60).toString().padStart(2, "0");
          setTimer(`${m}:${s}`);
        }, 1000);

      } catch {
        setStatus(t('voice_recorder.status_denied'));
      }
    } else {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
    }
  };

  const deleteRecording = () => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    setAudioBlob(null);
    setStatus(t('voice_recorder.status_ready'));
    setTimer("00:00");
    clearInterval(timerRef.current);
    secondsRef.current = 0;
    onAnswer(null);
  };

  return (
    <div className="quiz-int-voice-box">
      <div className="quiz-int-voice-status">{status}</div>
      <div className="quiz-int-voice-timer">{timer}</div>

      {!audioBlob ? (
        <button
          className={`quiz-int-record-circle ${isRecording ? "quiz-int-record-circle-active" : ""}`}
          onClick={toggleRecording}
        />
      ) : (
        <div className="quiz-int-audio-row">
          <audio ref={audioRef} controls />
          <button className="quiz-int-delete-btn" onClick={deleteRecording}>
            {t('voice_recorder.btn_delete')}
          </button>
        </div>
      )}
    </div>
  );
}