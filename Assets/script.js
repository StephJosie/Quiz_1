

const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("#choice-text"));
const quizHeader = document.querySelector("quizHeader")
const choice = document.querySelectorAll("btn")
const questionCont = document.querySelector('#question')

leaderBox.style.display = "none"

var currentQuestion = 0;
var correctQ = true;
var score = 0;
var questionCounter = 0;
var availableQuestions = [];

var questions = [
    {
        question: 'What does HTML stand for?',
        choice0: 'Hypertext Markup Language',
        choice1: 'Hyper Makeup Language',
        choice2: 'How To Make Language',
        choice3: 'Hypertext Make Language',
        answer: 0,
    },
    {
        question: 'Cascading Style Sheets (CSS) does what to the page?',
        choice0: 'Allows you to make the page interactive',
        choice1: 'Conducts data analysis',
        choice2: 'Adds style to a webpage',
        choice3: 'Where the initial code goes to create website',
        answer: 2,
    },
    {
        question: 'Where do you place the external CSS link in HTML?',
        choice0: 'The very end of the body',
        choice1: 'In the <h1>',
        choice2: 'In the <footer>',
        choice3: 'In the <head>',
        answer: 3,
    },
];


var startQuiz = function (event) {
    event.preventDefault()
    setTime()
    questionCounter = 0;
    score = 0;
    questionCont.style.display = "block"
    getNewQuestion();
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
            questionCont.style.display = "none"
            end.style.display = "block"

            // showScores();
        } else {
            quizTime--;
            let sec = Math.floor(quizTime % 60);
            let min = Math.floor(quizTime / 60) % 60;
            counting.innerHTML = `TIME: ${min} : ${sec}`;
        }
    }, 1000);

    var select = function (event) {
        var btn = event.target.textContent
        if (btn === questions[currentQuestion].answer) {
            alert("correct")
            score++

        } else {
            alert("Wrong")
            secondsLeft -= 30
        }
        currentQuestion++
        if (currentQuestion === questions.length) {
            clearInterval(quizTimer)
            questionCont.style.display = "none"
            end.style.display = "none"
            leaderBox.style.display = "none"
        } else {
            getNewQuestion()
        }
    };

    var getNewQuestion = function () {
        question.textContent = questions[currentQuestion].question
        choice[0].textContent = questions[currentQuestion].choice0
        choice[1].textContent = questions[currentQuestion].choice1
        choice[2].textContent = questions[currentQuestion].choice2
        choice[3].textContent = questions[currentQuestion].choice3
    }

    var scoreBoard = function (event) {
        event.preventDefault()
        var name = document.querySelector('.form-control').ariaValueMax.trim()

        var playerData = {
            playerName: name,
            score: score,
        }
        localStorage.setItem("playerData", JSON.stringify(playerData))
        var fetch = JSON.parse(localStorage.getItem("playerData"))
        fetch.playerName

        end.style.display = "none"
        leaderBox.style.display = "block"

        document.querySelectorAll(".playerBoard").innerHTML = "User: " + fetch.playerName + "" + "Points: " + fetch.score


    }

    // var getNewQuestion = function () {
    //     if (availableQuestions.length === 0 || questionCounter >= Max_Questions) {
    //         return window.location.assign();

    //     };

    //     questionCounter++;
    //     var questionIndex = Math.floor(Math.random() * availableQuestions.length);
    //     currentQuestion = availableQuestions[questionIndex];
    //     question.innerText = currentQuestion.question;

    //     choices.forEach(choices, function (choices) {
    //         var number = choices.dataset['number'];
    //         choices.innerText = currentQuestion['choice' + number];
    //     });


    //     availableQuestions.splice(questionIndex, 1);
    //     acceptingAnswers = true;
    // };

    // choices.forEach(choices, function () {
    //     choices.addEventListener('click', function (event) {
    //         if (!acceptingAnswers) return;

    //         acceptingAnswers = false;
    //         var selectedChoice = event.target;
    //         selectedAnswer = selectedChoice.dataset['number'];
    //         getNewQuestion();
    //     });


    // });

    // let time = 10;
    // let quizTimeInMinutes = time * 60 * 60;
    // let quizTime = quizTimeInMinutes / 60;
    // let counting = document.getElementById("timer");

    // function startCountdown() {
    //     let quizTimer = setInterval(function () {
    //         if (quizTime <= 0) {
    //             clearInterval(quizTimer);
    //             showScores();
    //         } else {
    //             quizTime--;
    //             let sec = Math.floor(quizTime % 60);
    //             let min = Math.floor(quizTime / 60) % 60;
    //             counting.innerHTML = `time: ${min} : ${sec}`;
    //         }
    //     }, 1000);
}
setTime();
startQuiz();
select();
