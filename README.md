# AI Assistance – Voice-Based Interview Trainer (Graduation Project)

> **Graduation Project – Faculty of Computers & Artificial Intelligence, Helwan University (2025)**  
> An end-to-end **speech LLM** system that lets you **practice interviews by voice**: you ask and answer questions by speaking, and the AI replies back with natural speech in real time.

---

## 🚀 Overview

**AI Assistance** is a voice-first interview trainer that simulates a real interviewer using modern **speech + LLM** pipelines:

- 🎙️ **Input**: User speaks (question or answer) through the microphone  
- 🧠 **Processing**:
  - **ASR (Speech-to-Text)** transcribes audio (e.g. Whisper)
  - **LLM** generates the next interview question or feedback
- 🔊 **Output**: Text is converted back to **natural speech** via TTS

The goal is to help students and job seekers **practice interviews** in a realistic, continuous conversation without typing.

---

## ✨ Key Features

- 🗣️ **Full voice loop**: input voice → AI thinking → output voice  
- 🧠 **LLM-powered interviewer**:
  - Asks structured interview questions (HR, technical, behavioral…)
  - Can adapt difficulty to user level (Beginner / Intermediate / Advanced)
- ✅ **Evaluation mode**:
  - Listens to user answer
  - Gives **text + voice feedback** (strengths, weaknesses, hints)
- 🌐 **Multi-language ready** (e.g. English + Arabic support, depending on models)
- 🧩 **Modular pipeline**:
  - Plug-and-play ASR models (e.g. Whisper)
  - Different LLM backends (local / API / open-source)
  - Customizable TTS engine
- 📊 **Session summary**:
  - List of questions & your answers
  - Short feedback summary to track improvement

---

## 🧱 System Architecture

High-level pipeline:

1. **Audio Capture**
   - Record audio from the user’s microphone
   - Basic noise handling / normalization

2. **Speech-to-Text (ASR)**
   - Transcribe audio using a model like **Whisper**  
   - Output: clean text + timestamps (optional)

3. **LLM Engine**
   - Input: transcription + conversation history + role (“interviewer”)  
   - Output: next **interview question** or **feedback** only (no extra filler text)

4. **Text-to-Speech (TTS)**
   - Convert LLM text to natural speech  
   - Save or stream audio to the client

5. **Orchestration Layer**
   - Handles conversation state, turn-taking, and timing
   - Controls when to show **“Speak now”** vs **“AI is speaking…”**

> 📝 The system is designed as an **end-to-end voice loop**: you never have to touch the keyboard during a practice session.

---

## 🛠️ Tech Stack

> You can adjust this section to match your exact implementation.

- **Language**: Python 3.x
- **Core Models**:
  - ASR: Whisper / Whisper-based model
  - LLM: open-source LLM (e.g. LLaMA-based / DeepSeek-style / other)
  - TTS: any local or cloud TTS engine
- **Backend**:
  - FastAPI / Flask (HTTP APIs for ASR, LLM, TTS)
- **Frontend (optional)**:
  - React / Next.js or a simple HTML/JS client
  - Web audio recording + player
- **Environment**:
  - Local GPU machine / HPC / Kaggle for experimentation
  - Conda / venv for Python environments

---

## 📁 Project Structure

> Example structure – change to match your repo.

```text
ai-assistance/
├─ backend/
│  ├─ main.py              # API entry point
│  ├─ asr_service.py       # Speech-to-text logic
│  ├─ llm_service.py       # LLM prompts & conversation logic
│  ├─ tts_service.py       # Text-to-speech logic
│  ├─ pipeline.py          # Orchestration of the full voice loop
│  └─ config.py            # Model paths, keys, and settings
├─ frontend/
│  ├─ public/
│  └─ src/
│     ├─ components/
│     ├─ pages/
│     └─ services/api.ts   # Calls backend endpoints
├─ notebooks/
│  ├─ asr_experiments.ipynb
│  ├─ llm_prompting.ipynb
│  └─ tts_quality_tests.ipynb
├─ docs/
│  ├─ report.pdf           # Graduation project report
│  └─ diagrams/            # Architecture & sequence diagrams
├─ requirements.txt
├─ README.md
└─ LICENSE
