import { useState, useRef } from "react";

export default function VoicePracticeContent() {
  const [isRecording, setIsRecording] = useState(false);
  const [status, setStatus] = useState("Ready to record");
  const [timer, setTimer] = useState("00:00");
  const [audioUrl, setAudioUrl] = useState(null);

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
        setStatus("Recording saved");
        stream.getTracks().forEach((t) => t.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setStatus("Recording...");
      secondsRef.current = 0;

      timerIntervalRef.current = setInterval(() => {
        secondsRef.current++;
        const m = Math.floor(secondsRef.current / 60).toString().padStart(2, "0");
        const s = (secondsRef.current % 60).toString().padStart(2, "0");
        setTimer(`${m}:${s}`);
      }, 1000);
    } catch {
      setStatus("Error accessing microphone.");
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
    clearInterval(timerIntervalRef.current);
  };

  const handleRecord = () => (isRecording ? stopRecording() : startRecording());

  const handleDelete = () => {
    setAudioUrl(null);
    setStatus("Ready to record");
    setTimer("00:00");
    clearInterval(timerIntervalRef.current);
  };

  return (
    <div className="row align-items-center">
      <div className="col-md-6 text-center d-none d-lg-block">
        <img
          src="images/voice recorder.gif"
          className="img-fluid voice-img-custom"
          alt="Voice Practice"
        />
      </div>

      <div className="col-lg-6 col-12 mb-4">
        <div className="text-start">
          
          <div className="d-flex align-items-center mb-4">
            <div className="d-flex align-items-center justify-content-center rounded-circle me-3 feature-icon-wrapper">
              <i className="fa-solid fa-microphone-lines feature-icon" />
            </div>
            <h3 className="mb-0 fw-bold feature-subtitle">Record & Improve</h3>
          </div>

          <ul className="list-unstyled d-flex flex-column gap-3 mb-4">
            <li className="d-flex align-items-start">
              <i className="fa-solid fa-circle-check mt-1 me-3 list-check-icon"></i>
              <span className="text-secondary">Pronunciation tips</span>
            </li>
            <li className="d-flex align-items-start">
              <i className="fa-solid fa-circle-check mt-1 me-3 list-check-icon"></i>
              <span className="text-secondary">Speaking pace analysis</span>
            </li>
            <li className="d-flex align-items-start">
              <i className="fa-solid fa-circle-check mt-1 me-3 list-check-icon"></i>
              <span className="text-secondary">Confidence boosting exercises</span>
            </li>
          </ul>

          <div className="p-3 bg-light rounded-3 border border-light">
            <div className="d-flex align-items-center justify-content-between mb-2 flex-wrap gap-2">
              <button 
                className={`btn rounded-pill d-inline-flex align-items-center gap-2 fw-semibold shadow-sm ${isRecording ? 'btn-danger' : 'btn-feature-ai'}`} 
                onClick={handleRecord}
              >
                <i className={`fa-solid ${isRecording ? 'fa-stop' : 'fa-microphone'}`}></i>
                {isRecording ? "Stop Recording" : "Start Recording"}
              </button>
              
              <div className="text-end">
                <div className={`fw-bold fs-5 ${isRecording ? 'text-danger' : 'text-dark'}`}>{timer}</div>
                <small className="text-muted">{status}</small>
              </div>
            </div>

            {audioUrl && (
              <div className="mt-3 pt-3 border-top">
                <audio ref={audioRef} src={audioUrl} controls className="w-100 mb-3" />
                <div className="d-flex flex-column flex-sm-row gap-2">
                  <button
                    className="btn btn-outline-feature rounded-pill w-100 d-inline-flex align-items-center justify-content-center gap-2 fw-semibold"
                    disabled={!audioUrl}
                    onClick={() => audioRef.current?.play()}
                  >
                    <i className="fa-solid fa-play"></i>
                    Play
                  </button>
                  <button
                    className="btn btn-outline-danger rounded-pill w-100 d-inline-flex align-items-center justify-content-center gap-2 fw-semibold"
                    disabled={!audioUrl}
                    onClick={handleDelete}
                  >
                    <i className="fa-solid fa-trash"></i>
                    Delete
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