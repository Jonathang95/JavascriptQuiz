// Quiz questions and answers
const quizData = [
    {
        question: "What is JavaScript?",
        options: ["A coffee brand", "A programming language", "A type of tree", "A movie genre"],
        correctAnswer: "A programming language"
    },
    {
        question: "What is the purpose of JavaScript in web development?",
        options: ["Stlying web pages", "Enhancing user interfaces", "managing databases", "Structuring a web page"],
        correctAnswer: "Hypertext Markup Language"
    },
    {
        question: "Which symbol is used for comments in JavaScript?",
        options: ["//", "/* */", "#", "--"],
        correctAnswer: "//"
    },
   
];

// DOM elements
const startButton = document.getElementById('start-btn');
const questionContainer = document.getElementById('question-container');
const optionsContainer = document.getElementById('options-container');
const timerElement = document.getElementById('timer');
const initialsForm = document.getElementById('initials-form');
const initialsInput = document.getElementById('initials-input');

// Quiz state variables
var currentQuestion = 0;
var time = 60;
var timerInterval;
var score = 0;

// Event listener for start button
startButton.addEventListener('click', startQuiz);

// Start quiz function
function startQuiz() {
    // Start timer
    startTimer();

    // Hide start button
    startButton.style.display = 'none';

    // Display questions and options
    showQuestion();
}

// Function to display questions and options
function showQuestion() {
    const currentQuizData = quizData[currentQuestion];

    // Display question
    questionContainer.innerText = currentQuizData.question;

    // Display options
    optionsContainer.innerHTML = "";
    currentQuizData.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.addEventListener('click', () => checkAnswer(option));
        optionsContainer.appendChild(button);
    });
}

// Function to check user's answer
function checkAnswer(answer) {
    const currentQuizData = quizData[currentQuestion];

    // Check if the answer is correct
    if (answer === currentQuizData.correctAnswer) {
        // Increment score for correct answer
        score += 1;
    } else {
        // Subtract time for incorrect answer
        time -= 10;
    }

    // Move to the next question
    nextQuestion();
}

// Function to move to the next question
function nextQuestion() {
    currentQuestion++;

    // Check if all questions are answered
    if (currentQuestion < quizData.length) {
        showQuestion();
    } else {
        // End the quiz if all questions are answered
        stopQuiz();
    }
}

// Function to start the timer
function startTimer() {
    timerInterval = setInterval(() => {
        // Update timer display
        timerElement.innerText = `Timer: ${time} seconds`;

        // Check if time is up
        if (time <= 0) {
            clearInterval(timerInterval);
            stopQuiz();
        }

        // Decrement time
        time--;
    }, 1000);
}

// Function to end the quiz
function stopQuiz() {
    // Stop the timer
    clearInterval(timerInterval);

    // Display final score
    alert(`Quiz completed!\nYour score: ${score}`);

    // Display initials form
    initialsForm.style.display = 'block';
}

// Event listener for initials form submission
initialsForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Get user initials
    const userInitials = initialsInput.value;

    // Save initials and score (you can implement high score storage here)
    console.log(`Initials: ${userInitials}, Score: ${score}`);

    // Reset the quiz state for a potential restart
    resetQuiz();
});

// Function to reset quiz state
function resetQuiz() {
    currentQuestion = 0;
    time = 60;
    score = 0;

    // Hide initials form
    initialsForm.style.display = 'none';

    // Show start button for potential restart
    startButton.style.display = 'block';
}