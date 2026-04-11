// Quiz data with different question types
const quizData = [
    {
        type: "multiple-choice",
        question: "What programming language is used for iOS development?",
        options: ["Java", "Swift", "Kotlin", "C#"],
        correctAnswer: 1
    },
    {
        type: "open-ended",
        question: "Explain what HTML stands for and its purpose."
    },
    {
        type: "open-ended",
        question: "Explain the concept of responsive web design in your own words."
    },
    {
        type: "multiple-choice",
        question: "What is the most popular version control system?",
        options: ["SVN", "Git", "Mercurial", "CVS"],
        correctAnswer: 1
    },
    {
        type: "open-ended",
        question: "Describe the main difference between front-end and back-end development."
    },
    {
        type: "open-ended",
        question: "Describe the difference between let, const, and var in JavaScript."
    }
];

// DOM elements
const homePage = document.getElementById('home-page');
const quizPage = document.getElementById('quiz-page');
const resultsPage = document.getElementById('results-page');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const homeBtn = document.getElementById('home-btn');
const questionCounter = document.getElementById('question-counter');
const questionElement = document.getElementById('question');
const questionTypeElement = document.getElementById('question-type');
const multipleChoiceOptions = document.getElementById('multiple-choice-options');
const openEndedContainer = document.getElementById('open-ended-container');
const voiceContainer = document.getElementById('voice-container');
const essayContainer = document.getElementById('essay-container');
const essayTextarea = document.getElementById('essay-textarea');
const progressBar = document.getElementById('progress');
const resultsList = document.getElementById('results-list');
const questionsCount = document.getElementById('questions-count');

// Answer type switcher elements
const voiceSwitch = document.getElementById('voice-switch');
const essaySwitch = document.getElementById('essay-switch');

// Voice recording elements
const recordBtn = document.getElementById('record-btn');
const playBtn = document.getElementById('play-btn');
const deleteBtn = document.getElementById('delete-btn');
const audioPlayback = document.getElementById('audio-playback');
const recordingStatus = document.getElementById('recording-status');
const recordingTimer = document.getElementById('recording-timer');

// Voice recording variables
let mediaRecorder;
let audioChunks = [];
let recordingInterval;
let recordingSeconds = 0;
let audioBlob = null;

// Initialize variables
let currentQuestion = 0;
let userAnswers = [];
let currentAnswerType = 'voice'; // Default to voice

// Display number of questions on home page
questionsCount.textContent = quizData.length;

// Start quiz
startBtn.addEventListener('click', startQuiz);

// Move to next question
nextBtn.addEventListener('click', nextQuestion);

// Return to home page
homeBtn.addEventListener('click', goHome);

// Answer type switcher event listeners
voiceSwitch.addEventListener('click', () => switchAnswerType('voice'));
essaySwitch.addEventListener('click', () => switchAnswerType('essay'));

// Voice recording event listeners
recordBtn.addEventListener('click', toggleRecording);
playBtn.addEventListener('click', playRecording);
deleteBtn.addEventListener('click', deleteRecording);

// Essay textarea event listener - FIXED: خارج ال functions
essayTextarea.addEventListener('input', handleEssayInput);

function handleEssayInput() {
    const text = essayTextarea.value.trim();
    userAnswers[currentQuestion] = {
        type: 'essay',
        data: essayTextarea.value
    };
    nextBtn.disabled = text === '';
}

function startQuiz() {
    homePage.classList.add('hidden');
    quizPage.classList.remove('hidden');
    currentQuestion = 0;
    userAnswers = [];
    currentAnswerType = 'voice';
    showQuestion();
}

function showQuestion() {
    const question = quizData[currentQuestion];
    questionCounter.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
    questionElement.textContent = question.question;

    // Update progress bar
    progressBar.style.width = `${((currentQuestion + 1) / quizData.length) * 100}%`;

    // Hide all question type containers first
    multipleChoiceOptions.classList.add('hidden');
    openEndedContainer.classList.add('hidden');

    // Reset next button
    nextBtn.disabled = true;
    nextBtn.textContent = currentQuestion === quizData.length - 1 ? 'Finish Quiz' : 'Next';

    // Show appropriate question type
    if (question.type === "multiple-choice") {
        questionTypeElement.textContent = "Multiple Choice";
        questionTypeElement.className = "question-type multiple-choice";
        showMultipleChoiceQuestion(question);
    } else if (question.type === "open-ended") {
        questionTypeElement.textContent = "Open Ended";
        questionTypeElement.className = "question-type open-ended";
        showOpenEndedQuestion(question);
    }
}

function showMultipleChoiceQuestion(question) {
    multipleChoiceOptions.classList.remove('hidden');

    // Clear previous options
    multipleChoiceOptions.innerHTML = '';

    // Add new options
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => selectMultipleChoiceOption(index));
        multipleChoiceOptions.appendChild(optionElement);
    });
}

function showOpenEndedQuestion(question) {
    openEndedContainer.classList.remove('hidden');

    // Reset answer type UI
    resetAnswerTypeUI();

    // Show appropriate answer type based on current selection
    if (currentAnswerType === 'voice') {
        showVoiceAnswerType();
    } else {
        showEssayAnswerType();
    }

    // Check if we already have an answer for this question
    if (userAnswers[currentQuestion]) {
        const answer = userAnswers[currentQuestion];
        if (answer.type === 'voice') {
            // Switch to voice and load the recording
            switchAnswerType('voice');
            audioBlob = answer.data;
            audioPlayback.src = URL.createObjectURL(audioBlob);
            audioPlayback.classList.remove('hidden');
            playBtn.disabled = false;
            deleteBtn.disabled = false;
            nextBtn.disabled = false;
            recordingStatus.textContent = "Recording saved - you can play, delete, or record again";
        } else if (answer.type === 'essay') {
            // Switch to essay and load the text
            switchAnswerType('essay');
            essayTextarea.value = answer.data;
            nextBtn.disabled = essayTextarea.value.trim() === '';
        }
    }
}

function switchAnswerType(type) {
    currentAnswerType = type;

    // Update switcher buttons
    voiceSwitch.classList.toggle('active', type === 'voice');
    essaySwitch.classList.toggle('active', type === 'essay');

    // Show/hide appropriate containers
    if (type === 'voice') {
        voiceContainer.classList.remove('hidden');
        essayContainer.classList.add('hidden');
        nextBtn.disabled = !audioBlob;
    } else {
        voiceContainer.classList.add('hidden');
        essayContainer.classList.remove('hidden');
        // Check if there's already text in the textarea
        nextBtn.disabled = essayTextarea.value.trim() === '';
    }
}

function showVoiceAnswerType() {
    resetVoiceRecording();
}

function showEssayAnswerType() {
    // لا حاجة لـ event listener هنا لأنه معمول من الأول
    // الـ event listener معمول خارج الـ functions ودايماً شغال
}

function resetAnswerTypeUI() {
    resetVoiceRecording();
    essayTextarea.value = '';
}

function selectMultipleChoiceOption(optionIndex) {
    // Remove selection from all options
    const options = document.querySelectorAll('.option');
    options.forEach(option => option.classList.remove('selected'));

    // Select the chosen option
    options[optionIndex].classList.add('selected');

    // Enable next button
    nextBtn.disabled = false;

    // Save user's answer
    userAnswers[currentQuestion] = optionIndex;
}

async function toggleRecording() {
    if (!mediaRecorder || mediaRecorder.state === 'inactive') {
        // Start recording
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder = new MediaRecorder(stream);
            audioChunks = [];

            mediaRecorder.ondataavailable = (event) => {
                audioChunks.push(event.data);
            };

            mediaRecorder.onstop = () => {
                audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                audioPlayback.src = URL.createObjectURL(audioBlob);
                audioPlayback.classList.remove('hidden');
                playBtn.disabled = false;
                deleteBtn.disabled = false;
                nextBtn.disabled = false;

                // Save the recording
                userAnswers[currentQuestion] = {
                    type: 'voice',
                    data: audioBlob
                };

                // Stop all tracks
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorder.start();
            recordBtn.classList.add('recording');
            recordingStatus.textContent = "Recording... Click again to stop";

            // Start timer
            recordingSeconds = 0;
            recordingInterval = setInterval(() => {
                recordingSeconds++;
                const minutes = Math.floor(recordingSeconds / 60);
                const seconds = recordingSeconds % 60;
                recordingTimer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }, 1000);

        } catch (error) {
            console.error('Error accessing microphone:', error);
            recordingStatus.textContent = "Error accessing microphone. Please check permissions.";
        }
    } else {
        // Stop recording
        mediaRecorder.stop();
        recordBtn.classList.remove('recording');
        recordingStatus.textContent = "Recording saved - you can play, delete, or record again";

        // Stop timer
        clearInterval(recordingInterval);
    }
}

function playRecording() {
    audioPlayback.play();
}

function deleteRecording() {
    // Reset voice recording UI
    resetVoiceRecording();

    // Remove saved recording
    userAnswers[currentQuestion] = null;
    nextBtn.disabled = true;
}

function resetVoiceRecording() {
    // Reset UI elements
    recordBtn.classList.remove('recording');
    recordingStatus.textContent = "Ready to record";
    recordingTimer.textContent = "00:00";
    audioPlayback.classList.add('hidden');
    playBtn.disabled = true;
    deleteBtn.disabled = true;

    // Clear recording variables
    audioBlob = null;
    recordingSeconds = 0;
    clearInterval(recordingInterval);

    // Stop any ongoing recording
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
    }
}

function nextQuestion() {
    // For open-ended questions, save the current answer if not already saved
    if (quizData[currentQuestion].type === "open-ended") {
        if (currentAnswerType === 'essay' && essayTextarea.value.trim() !== '' && !userAnswers[currentQuestion]) {
            userAnswers[currentQuestion] = {
                type: 'essay',
                data: essayTextarea.value
            };
        }
    }

    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    quizPage.classList.add('hidden');
    resultsPage.classList.remove('hidden');

    // Display results
    resultsList.innerHTML = '';
    quizData.forEach((question, index) => {
        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item');

        const userAnswer = userAnswers[index];

        // Add correct/incorrect class for graded questions
        if (question.type === "multiple-choice") {
            if (userAnswer === question.correctAnswer) {
                resultItem.classList.add('answered');
            } else {
                resultItem.classList.add('answered');
            }
        }

        let answerText = '';
        let answerType = '';
        if (question.type === "multiple-choice") {
            answerText = userAnswer !== undefined ?
                question.options[userAnswer] : 'Not answered';
            answerType = 'Multiple Choice';
        } else if (question.type === "open-ended") {
            if (userAnswer && userAnswer.type === 'voice') {
                answerText = 'Voice recording provided';
                answerType = 'Voice Answer';
                resultItem.classList.add('answered');
            } else if (userAnswer && userAnswer.type === 'essay') {
                answerText = userAnswer.data;
                answerType = 'Written Answer';
                resultItem.classList.add('answered');
            } else {
                answerText = 'Not answered';
                answerType = 'No Answer';
            }
        }

        let correctAnswerText = '';
        if (question.type === "multiple-choice") {
            correctAnswerText = question.options[question.correctAnswer];
        } else {
            correctAnswerText = 'No specific correct answer';
        }

        resultItem.innerHTML = `
                    <div><strong>Question ${index + 1} (${question.type}):</strong> ${question.question}</div>
                    <div><strong>Your answer:</strong> ${answerText}</div>
                    ${question.type === "multiple-choice" ? `<div><strong>Correct answer:</strong> ${correctAnswerText}</div>` : ''}
                    <div class="answer-type-badge">${answerType}</div>
                `;

        resultsList.appendChild(resultItem);
    });
}

function goHome() {
    resultsPage.classList.add('hidden');
    homePage.classList.remove('hidden');
}
