const featureKey = localStorage.getItem('currentFeature');

const featureTitle = document.getElementById('feature-title');
const featureDescription = document.getElementById('feature-description');
const featureContent = document.getElementById('feature-content');

const featuresData = {
  aiInterview: {
    title: "AI Interview Prep",
    description: "Practice interviews with real-time AI feedback. Get your answers analyzed instantly.",
    content: `
      <div class="row align-items-center">
        <div class="col-md-6 text-center">
          <img src="images/chat bot.gif" alt="AI Interview"
            style="height:300px; width:380px;">
        </div>
        <div class="col-md-6 d-flex flex-column justify-content-center">
          <div class="d-flex align-items-center mb-2">
            <i class="fa-solid fa-circle-exclamation me-2"
               style="font-size:20px; color:#2E8B73; cursor:pointer;"
               data-bs-toggle="modal"
               data-bs-target="#tipsModal"></i>
            <h3 class="mb-0">Features</h3>
          </div>
          <ul>
            <li>Behavioral & technical question practice</li>
            <li>Real-time scoring and feedback</li>
            <li>Step-by-step improvement suggestions</li>
            <li>Record answers and compare over time</li>
            <li>Instant AI tips for improving answers</li>
          </ul>
          <div class="mt-4 text-end me-5">
            <a href="landingscape.html" class="btn px-4">Start Interview</a>
          </div>
        </div>
      </div>
      <!-- Tips Modal -->
      <div class="modal fade" id="tipsModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Interview Tips</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <ul>
                <li>Practice common behavioral questions first.</li>
                <li>Keep answers clear and concise.</li>
                <li>Show confidence with your tone and body language.</li>
                <li>Use examples from your past experience.</li>
                <li>Listen carefully and pause before answering.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `,
    bgClass: 'bg-ai'
  },

  cvAnalysis: {
    title: "Smart CV Analysis",
    description: "Upload your CV and get instant AI insights to make it perfect.",
    content: `
      <div class="row align-items-center">
        <div class="col-md-6 text-center">
          <img src="images/cv analysis.gif" alt="CV Analysis" style="height:300px; width:350px;">
        </div>
        <div class="col-md-6 d-flex flex-column justify-content-center">
          <h3>Upload & Analyze</h3>
          <ul class="mt-3">
            <li>Keyword matching for target jobs</li>
            <li>Formatting suggestions for ATS systems</li>
            <li>Highlight strengths and weak points</li>
            <li>Tips for a more professional layout</li>
            <li>Suggestions for improving readability</li>
          </ul>
          <div class="d-flex gap-5  mt-3">
            <button class="btn" id="updateCvBtn">Update CV</button>
            <button class="btn" id="analyzeCvBtn" onclick="window.location.href='analysis.html'">Analyze CV</button>
          </div>
        </div>
      </div>
      <!-- Upload CV Modal -->
      <div class="modal fade" id="updateCvModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Upload New CV</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body text-center">
              <input type="file" id="cvInput" class="form-control" accept=".pdf,.doc,.docx">
              <small class="text-muted d-block mt-2">Accepted formats: PDF, DOC, DOCX</small>
            </div>
            <div class="modal-footer">
              <button class="btn" id="saveCvBtn">Save CV</button>
            </div>
          </div>
        </div>
      </div>
    `,
    bgClass: 'bg-cv'
  },

  skillMatching: {
    title: "Skill Matching",
    description: "Get AI insights on how well your skills match the job requirements.",
    content: `
      <div class="row align-items-center">
        <div class="col-md-6 text-center">
          <img src="images/skill matching.png" alt="Skill Matching"
               class="animate__animated animate__fadeInLeft"
               style="height:300px; width:450px;">
        </div>
        <div class="col-md-6 d-flex flex-column justify-content-center">
          <h3 class="animate__animated animate__fadeInUp">Match & Improve</h3>
          <ul class="mt-3 animate__animated animate__fadeInUp animate__delay-1s">
            <li class="animate__animated animate__fadeInUp animate__delay-1.5s">AI analysis of your skills vs job requirements</li>
            <li class="animate__animated animate__fadeInUp animate__delay-2s">Identify skill gaps and strengths</li>
            <li class="animate__animated animate__fadeInUp animate__delay-2.5s">Personalized learning resources to fill gaps</li>
            <li class="animate__animated animate__fadeInUp animate__delay-3s">Tips for highlighting relevant skills in your CV</li>
          </ul>
          <div class="text-end me-4 mt-5 animate__animated animate__fadeInUp animate__delay-6s">
            <a href="analysis.html" class="btn">CV Analysis</a>
          </div>
        </div>
      </div>
    `
  },

  progressTracking: {
    title: "Progress Tracking",
    description: "Track your interview preparation progress over time. Every time you take a mock interview or study, see your progress improve with smooth animation.",
    content: `
      <div class="row align-items-center">
        <div class="col-md-6 text-center">
          <img src="images/progress track.png" class="img-fluid rounded animate__animated animate__fadeInLeft" 
               alt="Progress Tracking" style="height:300px; width:350px;">
        </div>
        <div class="col-md-6 d-flex flex-column justify-content-center">
          <h3 class="animate__animated animate__fadeInUp">Track & Improve</h3>
          <div class="progress mb-3 animate__animated animate__fadeInUp animate__delay-1s" style="height:25px;">
            <div id="progressBar" class="progress-bar" role="progressbar" style="width: 0%; background-color:var(--primary);">0%</div>
          </div>
          <ul class="animate__animated animate__fadeInUp animate__delay-1s">
            <li class="animate__animated animate__fadeInUp animate__delay-1.5s">Track score trends</li>
            <li class="animate__animated animate__fadeInUp animate__delay-2s">Identify weak areas</li>
            <li class="animate__animated animate__fadeInUp animate__delay-2.5s">Set personal goals</li>
            <li class="animate__animated animate__fadeInUp animate__delay-3s">Update progress every time you study or take a mock interview</li>
          </ul>
        </div>
      </div>
    `
  },

  voicePractice: {
    title: "Voice Practice",
    description: "Practice speaking and get AI feedback on your tone and pronunciation.",
    content: `
      <div class="row align-items-center">
        <div class="col-md-6 text-center">
          <img src="images/voice recorder.gif" style="height:340px; width:340px;" alt="Voice Practice">
        </div>
        <div class="col-md-6 d-flex flex-column justify-content-center">
          <h3>Record & Improve</h3>
          <ul>
            <li>Pronunciation tips</li>
            <li>Speaking pace analysis</li>
            <li>Confidence boosting exercises</li>
          </ul>
          <div id="voice-recorder" class="mt-2">
            <button id="record-btn" class="btn mb-2">Start Recording</button>
            <span id="recording-status" class="mb-3 ms-2">Ready to record</span>
            <span id="recording-timer" class="ml-2 mb-2">00:00</span>
            <div class="d-flex align-items-center gap-3 mt-3">
              <audio id="audio-playback" controls class="hidden"></audio>
              <button id="play-btn" class="btn btn-success">Play</button>
              <button id="delete-btn" class="btn btn-danger">Delete</button>
            </div>
          </div>
        </div>
      </div>
    `,
    bgClass: 'bg-voice'
  },

  personalityInsights: {
    title: "Personality Insights",
    description: "AI evaluates your tone, presence, and personality for interview improvement. Get real-time feedback to refine your communication style and confidence.",
    content: `
      <div class="row align-items-center">
        <div class="col-md-6 text-center">
          <img src="images/insights-eight-types-graphic-1.webp" class="animate__animated animate__fadeInLeft" 
               alt="Personality Insights" style="height:300px; width:350px;">
        </div>
        <div class="col-md-6 d-flex flex-column justify-content-center">
          <h3 class="animate__animated animate__fadeInUp">Understand Yourself</h3>
          <ul class="animate__animated animate__fadeInUp animate__delay-1s">
            <li class="animate__animated animate__fadeInUp animate__delay-1.5s">Body language analysis</li>
            <li class="animate__animated animate__fadeInUp animate__delay-2s">Confidence scoring</li>
            <li class="animate__animated animate__fadeInUp animate__delay-2.5s">Presence & communication feedback</li>
          </ul>
          <p class="mt-3 animate__animated animate__fadeInUp animate__delay-3s">
            Each session gives personalized tips so you can improve gradually and track your progress over time.
          </p>
        </div>
      </div>
    `
  },

  learningResources: {
    title: "Learning Resources",
    description: "Access guides and tips tailored to your job field.",
    content: `
      <div class="row align-items-center">
        <div class="col-md-6 text-center">
          <img src="images/learning resource.gif" class=" animate__animated animate__fadeInLeft" alt="Learning Resources" style="height:300px; width:350px;">
        </div>
        <div class="col-md-6 d-flex flex-column justify-content-center">
          <h3 class="animate__animated animate__fadeInUp">Grow Your Skills</h3>
          <ul class="animate__animated animate__fadeInUp animate__delay-1s">
            <li class="animate__animated animate__fadeInUp animate__delay-1.5s">CV Writing Tips</li>
            <li class="animate__animated animate__fadeInUp animate__delay-2s">Common Interview Questions</li>
            <li class="animate__animated animate__fadeInUp animate__delay-2.5s">Job Field Guides</li>
            <li class="animate__animated animate__fadeInUp animate__delay-3s">AI Improvement Suggestions</li>
            <li class="animate__animated animate__fadeInUp animate__delay-3.5s">Recommended courses and books</li>
          </ul>
        </div>
      </div>
    `
  },

  quickRecommendations: {
    title: "Quick Recommendations",
    description: "Instant tips to help you improve before interviews.",
    content: `
      <div class="row align-items-center">
        <div class="col-md-6 text-center">
          <img src="images/giphy.gif" class=" animate__animated animate__fadeInLeft" alt="Quick Recommendations" style="height:300px; width:350px;">
        </div>
        <div class="col-md-6 d-flex flex-column justify-content-center">
          <h3 class="animate__animated animate__fadeInUp">Act Fast</h3>
          <ul class="animate__animated animate__fadeInUp animate__delay-1s">
            <li class="animate__animated animate__fadeInUp animate__delay-1.5s">Quick scoring insights</li>
            <li class="animate__animated animate__fadeInUp animate__delay-2s">Personalized tips</li>
            <li class="animate__animated animate__fadeInUp animate__delay-2.5s">Easy-to-apply improvements</li>
            <li class="animate__animated animate__fadeInUp animate__delay-3s">Boost confidence before interviews</li>
            <li class="animate__animated animate__fadeInUp animate__delay-3.5s">Last-minute preparation tips</li>
          </ul>
        </div>
      </div>
    `
  }

};
  if (!localStorage.getItem("currentUser")) {
    window.location = "login.html";
}
// Function to initialize CV modal after injection
function initCvModal() {
  const updateCvBtn = document.getElementById('updateCvBtn');
  const updateModalEl = document.getElementById('updateCvModal');
  if (!updateCvBtn || !updateModalEl) return;

  const updateModal = new bootstrap.Modal(updateModalEl);
  const saveCvBtn = document.getElementById('saveCvBtn');
  const cvInput = document.getElementById('cvInput');
  const cvEmbed = document.getElementById('cvEmbed');
  const cvFileName = document.getElementById('cvFileName');

  updateCvBtn.addEventListener('click', () => updateModal.show());

  saveCvBtn.addEventListener('click', () => {
    if (!cvInput.files.length) return alert("Please select a CV first");
    const file = cvInput.files[0];
    if (cvFileName) cvFileName.textContent = file.name;
    if (cvEmbed) cvEmbed.src = URL.createObjectURL(file);
    updateModal.hide();
  });
}

// Apply feature content dynamically
if (featuresData[featureKey]) {
  const feature = featuresData[featureKey];
  featureTitle.textContent = feature.title;
  featureDescription.textContent = feature.description;
  featureContent.innerHTML = feature.content;
  document.body.classList.add(feature.bgClass);

  // Delay initialization to ensure elements exist
  if (featureKey === 'cvAnalysis') {
    setTimeout(initCvModal, 50);
  }
  // Progress Tracking animation
  function animateProgress(targetPercent) {
  const progressBar = document.getElementById('progressBar');
  let width = 0;
  const interval = setInterval(() => {
    if(width >= targetPercent){
      clearInterval(interval);
    } else {
      width++;
      progressBar.style.width = width + '%';
      progressBar.innerText = width + '%';
    }
  }, 20); 
}
animateProgress(90); 

  // Voice Practice setup
  if (featureKey === 'voicePractice') {
    setTimeout(() => {
      const recordBtn = document.getElementById('record-btn');
      const playBtn = document.getElementById('play-btn');
      const deleteBtn = document.getElementById('delete-btn');
      const audioPlayback = document.getElementById('audio-playback');
      const recordingStatus = document.getElementById('recording-status');
      const recordingTimer = document.getElementById('recording-timer');

      let mediaRecorder, audioChunks = [], audioBlob = null, recordingInterval, recordingSeconds = 0;

      recordBtn.addEventListener('click', async () => {
        if (!mediaRecorder || mediaRecorder.state === 'inactive') {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder = new MediaRecorder(stream);
            audioChunks = [];
            mediaRecorder.ondataavailable = e => audioChunks.push(e.data);
            mediaRecorder.onstop = () => {
              audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
              audioPlayback.src = URL.createObjectURL(audioBlob);
              audioPlayback.classList.remove('hidden');
              playBtn.disabled = false;
              deleteBtn.disabled = false;
              recordingStatus.textContent = "Recording saved";
              stream.getTracks().forEach(track => track.stop());
            };
            mediaRecorder.start();
            recordBtn.textContent = "Stop Recording";
            recordingSeconds = 0;
            recordingInterval = setInterval(() => {
              recordingSeconds++;
              const m = Math.floor(recordingSeconds / 60).toString().padStart(2, '0');
              const s = (recordingSeconds % 60).toString().padStart(2, '0');
              recordingTimer.textContent = `${m}:${s}`;
            }, 1000);
          } catch (err) {
            recordingStatus.textContent = "Error accessing microphone.";
            console.error(err);
          }
        } else {
          mediaRecorder.stop();
          recordBtn.textContent = "Start Recording";
          clearInterval(recordingInterval);
        }
      });

      playBtn.addEventListener('click', () => { if (audioBlob) audioPlayback.play(); });
      deleteBtn.addEventListener('click', () => {
        audioBlob = null;
        audioPlayback.src = '';
        audioPlayback.classList.add('hidden');
        playBtn.disabled = true;
        deleteBtn.disabled = true;
        recordingStatus.textContent = "Ready to record";
        recordingTimer.textContent = "00:00";
        clearInterval(recordingInterval);
      });
    }, 50);
  }

} else {
  featureTitle.textContent = "Feature Not Found";
  featureDescription.textContent = "Please go back and select a valid feature.";
}
