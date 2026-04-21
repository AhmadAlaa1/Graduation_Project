import { useState, useRef, useEffect } from "react";

export default function VoiceRecorder({ onAnswer }) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [status, setStatus] = useState("Ready to record");
  const [timer, setTimer] = useState("00:00");

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  const secondsRef = useRef(0);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioBlob && audioRef.current) {
      audioRef.current.src = URL.createObjectURL(audioBlob);
    }
  }, [audioBlob]);

  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
      if (mediaRecorderRef.current?.state === "recording") {
        mediaRecorderRef.current.stop();
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
          setStatus("Recording saved — you can play or delete");
          stream.getTracks().forEach((t) => t.stop());
          clearInterval(timerRef.current);
          onAnswer({ type: "voice", data: audioFile });
        };

        recorder.start();
        setIsRecording(true);
        setStatus("Recording... Click to stop");

        secondsRef.current = 0;
        timerRef.current = setInterval(() => {
          secondsRef.current++;
          const m = Math.floor(secondsRef.current / 60).toString().padStart(2, "0");
          const s = (secondsRef.current % 60).toString().padStart(2, "0");
          setTimer(`${m}:${s}`);
        }, 1000);

      } catch {
        setStatus("Microphone access denied");
      }
    } else {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
    }
  };

  const deleteRecording = () => {
    setAudioBlob(null);
    setStatus("Ready to record");
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
            Delete
          </button>
        </div>
      )}
    </div>
  );
}