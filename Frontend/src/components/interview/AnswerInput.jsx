import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

const MAX_SECONDS = 180;

export default function AnswerInput({ onAnswer, currentQuestion }) {
  const { t } = useTranslation();
  const [text, setText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [timer, setTimer] = useState("0:00");
  const [waveHeights, setWaveHeights] = useState(Array(28).fill(4));

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  const secondsRef = useRef(0);
  const audioRef = useRef(null);
  const objectUrlRef = useRef(null);
  const analyserRef = useRef(null);
  const animFrameRef = useRef(null);
  const textareaRef = useRef(null);

  // Reset on question change
  useEffect(() => {
    setText("");
    setAudioBlob(null);
    setIsRecording(false);
    setTimer("0:00");
    setWaveHeights(Array(28).fill(4));
    clearInterval(timerRef.current);
    cancelAnimationFrame(animFrameRef.current);
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    objectUrlRef.current = null;
    onAnswer(null);
  }, [currentQuestion]);

  useEffect(() => {
    if (audioBlob && audioRef.current) {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
      const url = URL.createObjectURL(audioBlob);
      objectUrlRef.current = url;
      audioRef.current.src = url;
    }
  }, [audioBlob]);

  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
      cancelAnimationFrame(animFrameRef.current);
      if (mediaRecorderRef.current?.state === "recording") mediaRecorderRef.current.stop();
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    };
  }, []);

  const handleTextChange = (e) => {
    const val = e.target.value;
    setText(val);
    onAnswer(val.trim() ? { type: "essay", data: val } : null);
    // auto-grow
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 160) + "px";
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      // live waveform
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64;
      source.connect(analyser);
      analyserRef.current = analyser;

      const drawWave = () => {
        const data = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(data);
        const bars = Array(28).fill(0).map((_, i) => {
          const val = data[Math.floor(i * data.length / 28)] || 0;
          return Math.max(4, (val / 255) * 32);
        });
        setWaveHeights(bars);
        animFrameRef.current = requestAnimationFrame(drawWave);
      };
      drawWave();

      recorder.ondataavailable = (e) => audioChunksRef.current.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        const file = new File([blob], "answer.wav", { type: "audio/wav" });
        setAudioBlob(blob);
        stream.getTracks().forEach((t) => t.stop());
        clearInterval(timerRef.current);
        cancelAnimationFrame(animFrameRef.current);
        onAnswer({ type: "voice", data: file });
      };

      recorder.start();
      setIsRecording(true);
      secondsRef.current = 0;
      timerRef.current = setInterval(() => {
        secondsRef.current++;
        if (secondsRef.current >= MAX_SECONDS) {
          mediaRecorderRef.current?.stop();
          setIsRecording(false);
          return;
        }
        const m = Math.floor(secondsRef.current / 60);
        const s = (secondsRef.current % 60).toString().padStart(2, "0");
        setTimer(`${m}:${s}`);
      }, 1000);
    } catch {
      // mic denied
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const deleteVoice = () => {
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    objectUrlRef.current = null;
    setAudioBlob(null);
    setTimer("0:00");
    setWaveHeights(Array(28).fill(4));
    onAnswer(null);
  };

  const locked = !!audioBlob || isRecording; // textarea locked when voice is active

  return (
    <div className="ai-input-bar">

      {/* ── Voice preview (after recording) ── */}
      {audioBlob && (
        <div className="ai-voice-preview">
          <button className="ai-voice-delete" onClick={deleteVoice} title="Delete recording">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
            </svg>
          </button>
          <audio ref={audioRef} controls className="ai-audio-player" />
        </div>
      )}

      {/* ── Recording live bar ── */}
      {isRecording && (
        <div className="ai-recording-bar">
          <span className="ai-rec-dot" />
          <span className="ai-rec-timer">{timer}</span>
          <div className="ai-waveform">
            {waveHeights.map((h, i) => (
              <span key={i} className="ai-wave-bar" style={{ height: `${h}px` }} />
            ))}
          </div>
        </div>
      )}

      {/* ── Input row ── */}
      <div className="ai-input-row">
        <textarea
          ref={textareaRef}
          className={`ai-textarea ${locked ? "ai-textarea-locked" : ""}`}
          placeholder={locked ? t('essay_input.locked_placeholder', 'Voice recording active…') : t('essay_input.placeholder', 'Type your answer…')}
          value={text}
          onChange={handleTextChange}
          disabled={locked}
          rows={1}
        />

        {/* Mic / Stop toggle — only shown when textarea is empty */}
        {!locked ? (
          <button className="ai-action-btn ai-mic-btn" onClick={startRecording} disabled={text.trim().length > 0} title="Record voice answer"
            style={text.trim().length > 0 ? { opacity: 0.3, pointerEvents: "none" } : {}}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1a4 4 0 0 1 4 4v6a4 4 0 0 1-8 0V5a4 4 0 0 1 4-4z" />
              <path d="M19 10a7 7 0 0 1-14 0H3a9 9 0 0 0 8 8.94V21H9v2h6v-2h-2v-2.06A9 9 0 0 0 21 10h-2z" />
            </svg>
          </button>
        ) : isRecording ? (
          <button className="ai-action-btn ai-stop-btn" onClick={stopRecording} title="Stop recording">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <rect x="4" y="4" width="16" height="16" rx="3" />
            </svg>
          </button>
        ) : null}
      </div>
    </div>
  );
}