var startBtnEl = document.getElementById("start-quiz");
var mainContainer = document.querySelector(".container");
var introContainer = document.querySelector(".intro-container");
var viewScoreBtn = document.getElementById("view-score");
var qCounter = 0;
var score = 0;

var generateQuestion = function() {
    var questionContainer = document.createElement("div");
    questionContainer.id = "question";
    qCounter++;

    var pEl = document.createElement("p");
    pEl.className = "question";
    pEl.textContent = "Question description " + qCounter;
    
    var answerBtn1El = document.createElement("button");
    answerBtn1El.className = "btn question-btn";
    answerBtn1El.textContent = "answer 1 for question " + qCounter;
    var answerBtn2El = document.createElement("button");
    answerBtn2El.className = "btn question-btn";
    answerBtn2El.textContent = "answer 2 for question " + qCounter;
    var answerBtn3El = document.createElement("button");
    answerBtn3El.className = "btn question-btn";
    answerBtn3El.textContent = "answer 3 for question " + qCounter;
    var answerBtn4El = document.createElement("button");
    answerBtn4El.className = "btn question-btn";
    answerBtn4El.textContent = "answer 4 for question " + qCounter;

    questionContainer.append(pEl, answerBtn1El, answerBtn2El, answerBtn3El, answerBtn4El);
    
    mainContainer.appendChild(questionContainer);

}

var startQuiz = function () {
    // clear the introContainer
    //console.log("start quiz btn was pressed");
    
    introContainer.remove();
    generateQuestion();  
}

var removeQuestion = function () {
    var questionContainer = document.querySelector("#question");
    //alert("question is being removed");
    questionContainer.remove();
}

var mainContainerHandler = function (event) {
    //console.dir(event.target);

    if (event.target.id === "start-quiz") {
        startQuiz();
    } else { // already taking the quiz
        // call user answer validation logic

        // remove current question
        removeQuestion();
        // prompt for a new question if there's time
        generateQuestion();

    }
    
}

var displayHighScore = function() {
    console.log("this will display the high scores");
}

mainContainer.addEventListener("click", mainContainerHandler);
viewScoreBtn.addEventListener("click", displayHighScore);