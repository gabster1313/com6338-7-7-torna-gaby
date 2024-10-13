var questionsArr = [
    {
        question: 'What vegetable is commonly carved into a jack-o-lantern for Halloween?',
        answer: 'Pumpkin',
        options: ['Pumpkin', 'Squash', 'Turnip', 'Zucchini']
    },
    {
        question: 'What was the original name of Halloween?',
        answer: 'Samhain',
        options: ['Samhain', 'All Hallows Day', 'Fright Night', 'Walpurgis']
    },
    {
        question: 'What classic horror movie features a serial killer named Michael Myers?',
        answer: 'Halloween',
        options: ['Halloween', 'Friday the 13th', 'Scream', 'The Exorcist']
    },
    {
        question: 'What is the most popular candy sold in the U.S. during Halloween?',
        answer: 'Reese’s Peanut Butter Cups',
        options: ['Skittles', 'Reese’s Peanut Butter Cups', 'Snickers', 'Candy Corn']
    },
    {
        question: 'What creature is said to be able to transform into a bat, wolf, or mist?',
        answer: 'Vampire',
        options: ['Witch', 'Zombie', 'Vampire', 'Goblin']
    }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeRemaining = 30;
const quizDiv = document.getElementById('quiz');

let previousScore = localStorage.getItem('previous-score');
displayStartScreen();

function displayStartScreen() {
    quizDiv.innerHTML = '';
    if (previousScore) {
        let scoreDisplay = document.createElement('p');
        scoreDisplay.innerText = `Previous Score: ${previousScore}%`;
        quizDiv.appendChild(scoreDisplay);
    }

    let startButton = document.createElement('button');
    startButton.id = 'start-quiz';
    startButton.innerText = 'Start Quiz!';
    startButton.onclick = startQuiz;
    quizDiv.appendChild(startButton);
}

function startQuiz() {
    currentQuestion = 0;
    score = 0;
    timeRemaining = 30;
    displayQuestion();
}

function displayQuestion() {
    quizDiv.innerHTML = '';

    if (currentQuestion >= questionsArr.length) {
        endQuiz();
        return;
    }

    const questionObj = questionsArr[currentQuestion];

    let questionText = document.createElement('p');
    questionText.innerText = questionObj.question;
    quizDiv.appendChild(questionText);

    let optionsDiv = document.createElement('div');
    questionObj.options.forEach(option => {
        let optionButton = document.createElement('button');
        optionButton.innerText = option;
        optionButton.onclick = () => checkAnswer(option);
        optionsDiv.appendChild(optionButton);
    });
    quizDiv.appendChild(optionsDiv);

    let timerDisplay = document.createElement('p');
    timerDisplay.innerText = timeRemaining;
    quizDiv.appendChild(timerDisplay);

    clearInterval(timer);
    timer = setInterval(() => {
        timeRemaining--;
        timerDisplay.innerText = timeRemaining;
        if (timeRemaining <= 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

function checkAnswer(selectedOption) {
    if (selectedOption === questionsArr[currentQuestion].answer) {
        score++;
    }
    nextQuestion();
}

function nextQuestion() {
    clearInterval(timer);
    timeRemaining = 30;
    currentQuestion++;
    displayQuestion();
}

function endQuiz() {
    clearInterval(timer);
    const finalScore = Math.round((score / questionsArr.length) * 100);
    localStorage.setItem('previous-score', finalScore);
    previousScore = finalScore;
    displayStartScreen();
}
