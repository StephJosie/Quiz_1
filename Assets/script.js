

const question = document.getElementById("question");
// const choices = Array.from(document.getElementsByClassName("#choice-text"));
const quizHeader = document.querySelector("quizHeader")
const choice = document.querySelectorAll(".btn")
const questionCont = document.querySelector('#question')



var currentQuestion = 0;
var correctQ = true;
var score = 0;
var questionCounter = 0;
var availableQuestions = [];

var quizTimer;

var availableQuestions = [
    {
        question: 'What does HTML stand for?',
        choice0: 'Hypertext Markup Language',
        choice1: 'Hyper Makeup Language',
        choice2: 'How To Make Language',
        choice3: 'Hypertext Make Language',
        answer: 'Hypertext Markup Language',
    },
    {
        question: 'Cascading Style Sheets (CSS) does what to the page?',
        choice0: 'Allows you to make the page interactive',
        choice1: 'Conducts data analysis',
        choice2: 'Adds style to a webpage',
        choice3: 'Where the initial code goes to create website',
        answer: 'Adds style to a webpage',
    },
    {
        question: 'Where do you place the external CSS link in HTML?',
        choice0: 'The very end of the body',
        choice1: 'In the <h1>',
        choice2: 'In the <footer>',
        choice3: 'In the <head>',
        answer: 'In the <head>',
    },
];


var startQuiz = function (event) {
    event.preventDefault()
    setTime()
    questionCounter = 0;
    score = 0;

    getNewQuestion()
};

let time = 10;
let quizTimeInMinutes = time * 60 * 60;
let quizTime = quizTimeInMinutes / 60;
let counting = document.getElementById("timer");

function setTime() {
    var quizTimer = setInterval(function () {
        if (quizTime <= 0) {
            clearInterval(quizTimer);
            secondsLeft = 0



        } else {
            quizTime--;
            let sec = Math.floor(quizTime % 60);
            let min = Math.floor(quizTime / 60) % 60;
            counting.innerHTML = `TIME: ${min} : ${sec}`;
        }
    }, 1000);

};

var select = function (event) {
    var btn = event.target.textContent
    if (btn === availableQuestions[currentQuestion].answer) {
        alert("correct")
        score++

    } else {
        alert("Wrong")
        secondsLeft -= 30
    }
    currentQuestion++
    if (currentQuestion === availableQuestions.length) {
        clearInterval(quizTimer)

    } else {
        getNewQuestion()
    }
};

var getNewQuestion = function () {
    question.textContent = availableQuestions[currentQuestion].question
    choice[0].textContent = availableQuestions[currentQuestion].choice0
    choice[1].textContent = availableQuestions[currentQuestion].choice1
    choice[2].textContent = availableQuestions[currentQuestion].choice2
    choice[3].textContent = availableQuestions[currentQuestion].choice3
}

function Progress() {
    let currentQuestionNum = getNewQuestion + 1;
    let progressElement = document.getElementById("questionNum");
    progressElement.innerHTML =
        `Question ${currentQuestionNum} of ${availableQuestions.length}`

};

function showScores() {
    let endHTML =
        `<h1> Finished </h1>
    <h2 id="score"> Your Score: ${score} of ${availableQuestions.length}</h2>
    <div class= "repeat">
        <a href= "index.html"> Take Quiz Again</a>
    
        </div>`;
    let quizElement = document.getElementById("quiz");
    quizElement.innerHTML = endHTML;

}

var scoreBoard = function (event) {
    event.preventDefault()
    var name = document.querySelector(".form-control").vale.trim()

    var playerData = {
        playerName: name,
        score: score,
    }
    localStorage.setItem("playerData", JSON.stringify(playerData))
    var fetch = JSON.parse(localStorage.getItem("playerData"))
    fetch.playerName



    document.querySelectorAll(".scoreBoard").innerHTML = "User: " + fetch.playerName + "" + "Points: " + fetch.score


}

document.getElementById("startQuiz").addEventListener("click", startQuiz);
document.getElementById("buttons").addEventListener("click", select);
document.getElementById("btnEnd").addEventListener("click", scoreBoard);
// showScores();
// Progress();
document.getElementById("end").addEventListener("click", showScores);