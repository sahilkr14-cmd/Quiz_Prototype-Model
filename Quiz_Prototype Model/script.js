const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')

const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonElement = document.getElementById('answer-button')

let shuffledQuestions, currentQuestionIndex;
let quizScore = 0;

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - 0.5)
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
    quizScore = 0
    document.getElementById('right-answers').innerText = quizScore
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach((answer) => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonElement.firstChild) {
        answerButtonElement.removeChild(answerButtonElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";

    setStatusClass(document.body, correct);
    Array.from(answerButtonElement.children).forEach((button) => {
        setStatusClass(button, button.dataset.correct === "true");
    });

    if (correct) {
        quizScore++;
    }

    document.getElementById('right-answers').innerText = quizScore;

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = 'Submit';
        startButton.classList.remove('hide');
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    }
    else {
        element.classList.add('wrong')
    }
}


function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

let questions = [
    {
        question: 'What does JVM stand for in Java?',
        answers: [
            { text: 'Java Variable Machine', correct: false },
            { text: 'Java Virtual Machine', correct: true },
            { text: 'Java Verified Module', correct: false },
            { text: 'Java Visual Method', correct: false }
        ]
    },
    {
        question: 'Which data structure uses LIFO order?',
        answers: [
            { text: 'Queue', correct: false },
            { text: 'Stack', correct: true },
            { text: 'Array', correct: false },
            { text: 'Linked List', correct: false }
        ]
    },
    {
        question: 'Which keyword is used to create a subclass in Java?',
        answers: [
            { text: 'extends', correct: true },
            { text: 'implements', correct: false },
            { text: 'inherits', correct: false },
            { text: 'this', correct: false }
        ]
    },
    {
        question: 'What is the default value of a boolean variable in Java?',
        answers: [
            { text: 'false', correct: true },
            { text: 'true', correct: false },
            { text: '0', correct: false },
            { text: 'null', correct: false }
        ]
    },
    {
        question: 'Which of the following is not a feature of OOP?',
        answers: [
            { text: 'Compilation', correct: true },
            { text: 'Encapsulation', correct: false },
            { text: 'Inheritance', correct: false },
            { text: 'Polymorphism', correct: false }
        ]
    },

]
