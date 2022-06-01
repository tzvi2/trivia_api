let topic = "biology"
let questions = []
let currentQuestionNumber = 0
let currentQuestion = document.getElementById("question")
let totalQuestions = 1
let totalCorrect = 0
let answersLocked = false
let startScreen = document.getElementById("startScreen")
let questionScreen = document.getElementById("questionScreen")
let homeButton = document.getElementById("homeButton")
let questionNumber = document.getElementById("questionNumber")
let scoreBoard = document.getElementById("scoreBoard")
let answerList = document.getElementById("answers")

let numberSelector = document.getElementById("numberOfQuestions")
let topicSelector = document.getElementById("categoriesDropdown")

function updateTopic() {
    const selection = document.getElementById("categoriesDropdown").value
    topic = selection
}

function updateNumber() {
    const num = Number(document.getElementById("numberOfQuestions").value)
    totalQuestions = num
}

function fetchQuestions() {
    let urlParmams = `/questions/${topic}/${totalQuestions}`
    fetch(urlParmams)
        .then(res => res.json())
        .then(data => questions = data)
        .then(() => startGame())
}

function home() {
    startScreen.className = ""
    homeButton.className = "hidden"
    questionScreen.className = "hidden"
    scoreBoard.innerHTML = ""
    totalCorrect = 0
    removePreviousQuestion()
}

function startGame() {
    startScreen.className = "hidden"
    homeButton.className = ""
    questionScreen.className = ""
    //questionNumber.innerHTML = `Question ${currentQuestionNumber + 1}/${totalQuestions}`
    //scoreBoard.innerHTML = `Score ${totalCorrect}/${currentQuestionNumber}`
    //currentQuestion.innerHTML = questions[currentQuestionNumber].question
    loadNextQuestion()
}


function chooseAnswer(listElem, correct) {
    currentQuestionNumber++
    answersLocked = true
    if (answersLocked) return
    if (correct) {
        listElem.className = "correct selected"
        totalCorrect++
    } else {
        listElem.className = "incorrect selected"
    }
    answersLocked = true
    scoreBoard.innerHTML = `Score ${totalCorrect}/${currentQuestionNumber}`
    setTimeout(() => {
        if (currentQuestionNumber === totalQuestions) {
            finishGame()
            return
        } else {
            removePreviousQuestion()
            loadNextQuestion()
        }
    }, 1500)
}

function loadNextQuestion() {
    answersLocked = false
    questionNumber.innerHTML = `Question ${currentQuestionNumber + 1}/${totalQuestions}`
    currentQuestion.innerHTML = questions[currentQuestionNumber].question
    for (let answer of questions[currentQuestionNumber].answers) {
        ans = document.createElement("li")
        text = document.createTextNode(answer.text)
        ans.appendChild(text)
        answerList.appendChild(ans)
        ans.addEventListener('click', (e) => chooseAnswer(e.target, answer.correct))
    }
}

function removePreviousQuestion() {
    while (answerList.firstChild) {
        answerList.removeChild(answerList.firstChild)
    }
}

function finishGame() {
    currentQuestionNumber = 0
    removePreviousQuestion()
    currentQuestion.innerHTML = `Game over. Your score is ${totalCorrect}/${totalQuestions}`
}