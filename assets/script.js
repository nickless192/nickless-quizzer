var startBtnEl = document.getElementById("start-quiz");
var mainContainer = document.querySelector(".container");
var introContainer = document.querySelector(".intro-container");
var viewScoreBtn = document.getElementById("view-score");
var headerEl = document.querySelector("header");
var qCounter = 0;
var score = 0;
var timerEl = document.getElementById("timer");
var timeLeft = 75;
var feedbackEl = document.createElement("section");
feedbackEl.classList = "feedback";
feedbackEl.id = "feedback-container";
feedbackEl.textContent = "";
var isGameOver = true;
var canShowScore = true;

var questionsObj = [{
    question: "What is JavaScript?",
    options: {
        option1: "JavaScript is a scripting language used to make the website interactive",
        option2: "JavaScript is an assembly language used to make the website interactive",
        option3: "JavaScript is a compiled language used to make the website interactive",
        option4: "None of the mentioned"
    },
    answer: "1",
}, {
    question: "Arrays in JavaScript are defined by which of the following statements?",
    options: {
        option1: "It is an ordered list of objects",
        option2: "It is an ordered list of values",
        option3: "It is an ordered list of string",
        option4: "It is an ordered list of functions"
    },
    answer: "2",
}, {
    question: "Which of the following is not javascript data types?",
    options: {
        option1: "Null type",
        option2: "Undefined type",
        option3: "Number type",
        option4: "All of the mentioned"
    },
    answer: "4",
}, {
    question: "Which of the following object is the main entry point to all client-side JavaScript features and APIs?",
    options: {
        option1: "Position",
        option2: "Window",
        option3: "Standard",
        option4: "Location"
    },
    answer: "2",
}, {
    question: "Why are event handlers needed in JS?",
    options: {
        option1: "Allows JavaScript code to alter the behaviour of windows",
        option2: "Adds innerHTML page to the code",
        option3: "Change the server location",
        option4: "Performs handling of exceptions and occurrences"
    },
    answer: "1",
}, {
    question: "What is HTML?",
    options: {
        option1: "HTML describes the structure of a webpage",
        option2: "HTML is the standard markup language mainly used to create web pages",
        option3: "HTML consists of a set of elements that helps the browser how to view the content",
        option4: "All of the mentioned"
    },
    answer: "4",
}, {
    question: "HTML stands for __________",
    options: {
        option1: "HyperText Markup Language",
        option2: "HyperText Machine Language",
        option3: "HyperText Marking Language",
        option4: "HighText Marking Language"
    },
    answer: "1",
}, {
    question: "Which of the following tag is used for inserting the largest heading in HTML?",
    options: {
        option1: "head",
        option2: "<h1>",
        option3: "<h6>",
        option4: "heading"
    },
    answer: "2",
}, {
    question: "In which part of the HTML metadata is contained?",
    options: {
        option1: "head tag",
        option2: "title tag",
        option3: "html tag",
        option4: "body tag"
    },
    answer: "1",
}, {
    question: "Which element is used for styling HTML5 layout?",
    options: {
        option1: "CSS",
        option2: "jQuery",
        option3: "JavaScript",
        option4: "PHP"
    },
    answer: "1",
}, {
    question: "Which character is used to represent when a tag is closed in HTML?",
    options: {
        option1: "#",
        option2: "!",
        option3: "/",
        option4: '|'
    },
    answer: "3",
}, {
    question: "Which tag is used to create a dropdown in HTML Form?",
    options: {
        option1: "<input>",
        option2: "<select>",
        option3: "<text>",
        option4: "<textarea>"
    },
    answer: "2",
}, {
    question: "What is CSS?",
    options: {
        option1: "CSS is a style sheet language",
        option2: "CSS is designed to separate the presentation and content, including layout, colors, and fonts",
        option3: "CSS is the language used to style the HTML documents",
        option4: "All of the mentioned"
    },
    answer: "1",
}, {
    question: "Which of the following CSS selectors are used to specify a group of elements?",
    options: {
        option1: "tag",
        option2: "id",
        option3: "class",
        option4: "both class and tag"
    },
    answer: "3",
}, {
    question: "Which of the following type of HTML tag is used to define an internal style sheet?",
    options: {
        option1: "<script>",
        option2: "<link>",
        option3: "<class>",
        option4: "<style>"
    },
    answer: "4",
}, {
    question: "Which of the following CSS property is used to make the text bold?",
    options: {
        option1: "text-decoration: bold",
        option2: "font-weight: bold",
        option3: "font-style: bold",
        option4: "text-align: bold"
    },
    answer: "2",
}, {
    question: "Which of the following is the correct syntax to link an external style sheet in the HTML file?",
    options: {
        option1: "<link rel=”stylesheet” href=”style.css” />",
        option2: "<link rel=”stylesheet” src=”style.css” />",
        option3: "<style rel=”stylesheet” src=”style.css” />",
        option4: "<style rel=”stylesheet” link=”style.css” />"
    },
    answer: "1",
}, {
    question: "Which of the following is the correct way to apply CSS Styles?",
    options: {
        option1: "in an external CSS file",
        option2: "inside an HTML element",
        option3: "inside the <head> section of an HTML page",
        option4: "all of the mentioned"
    },
    answer: "4",
}, {
    question: "Which of the following CSS property is used to set the color of the text?",
    options: {
        option1: "text-decoration",
        option2: "pallet",
        option3: "colour",
        option4: "color"
    },
    answer: "4",
}, {
    question: "Which of the following CSS Property sets the stacking order of positioned elements?",
    options: {
        option1: "y-index",
        option2: "z-index",
        option3: "x-index",
        option4: "all of the mentioned"
    },
    answer: "2",
},
]

var setupAnswerBtn = function(answerBtnEl, answerText, optionNumber, correctOption) {
    answerBtnEl.className = "btn question-btn";
    answerBtnEl.textContent = `${optionNumber}. ${answerText}`;
    answerBtnEl.setAttribute("data-option", optionNumber);
    answerBtnEl.setAttribute("data-correct-answer",correctOption);
    return answerBtnEl;
}

var generateQuestion = function() {
    var questionContainer = document.createElement("div");
    questionContainer.id = "question";
    
    var pEl = document.createElement("p");
    pEl.className = "question";
    pEl.textContent = questionsObj[qCounter].question;
    
    var answerBtn1El = document.createElement("button");
    var answerBtn2El = document.createElement("button");
    var answerBtn3El = document.createElement("button");
    var answerBtn4El = document.createElement("button");

    // this is where you'd call the setupAnswerBtn function
    answerBtn1El = setupAnswerBtn(answerBtn1El, questionsObj[qCounter].options.option1,"1", questionsObj[qCounter].answer);
    answerBtn2El = setupAnswerBtn(answerBtn2El, questionsObj[qCounter].options.option2,"2", questionsObj[qCounter].answer);
    answerBtn3El = setupAnswerBtn(answerBtn3El, questionsObj[qCounter].options.option3,"3", questionsObj[qCounter].answer);
    answerBtn4El = setupAnswerBtn(answerBtn4El, questionsObj[qCounter].options.option4,"4", questionsObj[qCounter].answer);

    var answerContainer = document.createElement("div");
    answerContainer.className = "answer-container";

    answerContainer.append(answerBtn1El, answerBtn2El, answerBtn3El, answerBtn4El);

    questionContainer.append(pEl, answerContainer);
    
    mainContainer.appendChild(questionContainer);
    //appends the footer with the correct/wrong alert
    mainContainer.appendChild(feedbackEl);
    qCounter++;

}

var stopGame = function() {

    removeQuestion();
    timeLeft = 0;

    isGameOver = true;

    // setting up page to capture user initials and to show their final score
    var doneHeaderEl = document.createElement("h2");
    doneHeaderEl.className = "section-header";
    doneHeaderEl.textContent = "All done!";
    var scorePEl = document.createElement("p");
    scorePEl.className = "form-text";
    scorePEl.textContent = `Your final score is ${score}.`;
    var formEl = document.createElement("form");
    formEl.style.display = "flex";
    formEl.style.flexWrap = "wrap";
    formEl.style.alignContent = "space-evenly";
    var formTextEl = document.createElement("p");
    formTextEl.className = "form-text";
    formTextEl.textContent = "Enter initials: ";
    var textboxEl = document.createElement("input");
    textboxEl.type = "text";
    textboxEl.className = "text-box";
    textboxEl.name = "player-initials";
    var submitBtnEl = document.createElement("button");
    submitBtnEl.textContent = "Submit";
    submitBtnEl.className = "btn submit-btn";
    submitBtnEl.id = "submit-btn";

    // setting up containers and appending elements to them

    formEl.append(formTextEl, textboxEl, submitBtnEl);
    scoreContainer = document.createElement("div");
    scoreContainer.id = "score-container";

    scoreContainer.append(doneHeaderEl, scorePEl, formEl);
    mainContainer.prepend(scoreContainer);
    //mainContainer.prepend(doneHeaderEl, scorePEl, formEl);

}

var startTimer = function() {

    timerEl.textContent = timeLeft;
    timeLeft--;

    var timeInterval = setInterval(function() {
        if (timeLeft !== 0) {
            timerEl.textContent = timeLeft;
            timeLeft--;
        }
        else {
            timerEl.textContent = timeLeft;
            clearInterval(timeInterval);
            // trigger stopGame here only if time ran out; if timeLeft is set to 0 after game is complete, this will prevent it from executing twice
            if (qCounter < 20) {
                // trigger quiz stop
                stopGame();
            }

        }
    }, 1000);

}

var startQuiz = function () {
    // indicates quiz is in progress
    isGameOver = false;
    // while quiz in progress, scores wont be shown
    canShowScore = false;

    // remove intro container and generate the first question
    introContainer.remove();
    generateQuestion();  
    
    // start timer counter
    timeLeft = 75;
    startTimer(timeLeft);
}

var removeQuestion = function () {
    var questionContainer = document.querySelector("#question");
    //alert("question is being removed");
    questionContainer.remove();
}

var validateAnswer = function (answerEl) {
    // retrieving the correct answer and the chosen answer from the data attributes
    var correctAnswer = answerEl.getAttribute("data-correct-answer");
    var selectedAnswer = answerEl.getAttribute("data-option");
    var displayText = "";

    if (selectedAnswer === correctAnswer) {
        displayText = "Correct!";
        //reward with a score increase
        score++;
    } else {
        displayText = "Wrong!";
        // penalize with a timer reduction of 5 sec
        if (timeLeft > 5) {
            timeLeft = timeLeft - 5;
        } else {
            // if less than 5 sec remain, set timer to 0
            timeLeft = 0;
        }
    }
    
    feedbackEl.style.borderTop = "2px solid var(--shadow)";
    feedbackEl.textContent = displayText;
    //mainContainer.appendChild(feedbackEl);

}

var scoreSubmit = function(event) {
    
    var playerInitials = document.querySelector("input[name='player-initials']").value;
    var scoresArr = [];
    var scoreObj = {};

    // making sure the player initials werent left blank
    if (playerInitials === "") {
        // if blank, alert user and return false which will prevent the page from executing the reload function
        alert("Player initials cannot be blank, please enter your initials.");
        return false;
    }
    scoresArr = localStorage.getItem("scores");
    scoresArr = JSON.parse(scoresArr);
    
    // if localStorage is null (empty), initialize scoresArr
    if (!scoresArr) {
        scoresArr = [];
    }
    
    alert(`Submitting the follow score: ${score} points for player ${playerInitials}.`);
    
    var currentHighScore = localStorage.getItem("highScore");
    
    if (currentHighScore === null) {
        currentHighScore = 0;
    }
    // setting score and initials into the score Obj then pushing this object into the score array
    scoreObj.playerInitials = playerInitials;
    scoreObj.score = score;
    scoresArr.push(scoreObj);
    
    localStorage.setItem("scores", JSON.stringify(scoresArr));
    
    
    if (score > currentHighScore) {
        localStorage.setItem("highScorePlayer", playerInitials);
        localStorage.setItem("highScore", score);
    }
    score = 0;
    canShowScore = true;
    return true;
}

var reloadPage = function() {
    //console.log("refreshing the page");
    scoreContainerEl = document.getElementById("score-container");
    feedbackContainer = document.getElementById("feedback-container");
    scoreContainerEl.remove();
    if (feedbackContainer !== null) {
        feedbackContainer.remove();
    }
    mainContainer.appendChild(introContainer);
    // resetting to start on question 1
    qCounter = 0;
    feedbackEl.textContent = "";

}

var clearScores = function () {

    var scoresArr = [];
    // retrieve the scores (if any) from localStorage
    scoresArr = localStorage.getItem("scores");
    scoresArr = JSON.parse(scoresArr);

    // if the data retrieved from localStorage is null, then nothing happens
    // also, scores, highScore and highScorePlayer in localStorage are all created at the same time, so if one is missing, all are missing
    if (!scoresArr) {
        alert("nothing to clear");
        
    } else {
        // else, the array is removed
        localStorage.removeItem("scores");
        localStorage.removeItem("highScore");
        localStorage.removeItem("highScorePlayer");
        document.getElementById("score-list-container").remove();
    }



}

var goBack = function () {
    // remove the View High Score data containers
    document.getElementById("high-score-container").remove();
    document.getElementById("score-button-container").remove();

    // reload the introductory container
    mainContainer.appendChild(introContainer);
    // reload the header into the body, by prepending it to body
    document.querySelector("body").prepend(headerEl);

}

var mainContainerHandler = function (event) {
    // prevent page reload after clicking on submit buttons
    event.preventDefault();

    if (qCounter === 20 && !isGameOver) {
        // validate answer
        validateAnswer(event.target);
        // stop the game
        stopGame();

    } else if (event.target.id === "start-quiz") {
        startQuiz();
    } else if (event.target.hasAttribute("data-option")) { // already taking the quiz
        // call answer validation logic
        validateAnswer(event.target);
        // remove current question
        removeQuestion();
        // prompt for a new question if there's time
        generateQuestion();

    } else if (timeLeft === 0 && !isGameOver) {
        // remove current question
        stopGame();
    } else if (event.target.id === "submit-btn") {
        // submit score to localStorage in scoreSubmit. if scoreSubmit() returns false it means
        // the user didn't input their initials and we prevent reloading the page
        if (scoreSubmit()) {
            reloadPage();
        }
    } else if (event.target.id === "go-back") {
        // in view high score page, this function takes you back to the main page
        goBack();
    } else if (event.target.id === "clear-score") {
        // in view high score page, this clears scores from localStorage
        clearScores();
    }
    
}

var displayHighScore = function() {

    if (canShowScore === false) {
        alert("Quiz in progress! Complete the assessment then try again");
        return false;
    }
    //console.log("this will display the high scores");
    // var currentHighScore = localStorage.getItem("highScore");
    // var playerInitials = localStorage.getItem("highScorePlayer");
    var scoresArr = [];

    scoresArr = localStorage.getItem("scores");
    scoresArr = JSON.parse(scoresArr);

    if (!scoresArr) {
        scoresArr = [];
    }

    // if (currentHighScore === null && playerInitials === null) {
    //     alert("No high score available yet! Play the game then try again!");
    // } else {
    //     alert(`Current high score ${currentHighScore} by player ${playerInitials}.`)
    // }

    var highScoreContainerEl = document.createElement("div");
    highScoreContainerEl.id = "high-score-container"
    var highScoreHeaderEl = document.createElement("h2");
    highScoreHeaderEl.textContent = "High Scores";

    var highScoreListEl = document.createElement("ol");
    highScoreListEl.className = "high-score-list";
    var scoreListContainer = document.createElement("div");
    scoreListContainer.id = "score-list-container";

    
    for (var i = 0; i < scoresArr.length; i++) {
        var highScoreListItem = document.createElement("li");
        highScoreListItem.className = "high-score-item";
        highScoreListItem.textContent = `${scoresArr[i].playerInitials} - ${scoresArr[i].score}`;
        highScoreListEl.appendChild(highScoreListItem);
    }

    scoreListContainer.appendChild(highScoreListEl);

    highScoreContainerEl.append(highScoreHeaderEl, scoreListContainer);
    //console.log(highScoreContainerEl);

    var scoreBtnsContainer = document.createElement("div");
    scoreBtnsContainer.style.display = "inline-block";
    scoreBtnsContainer.id = "score-button-container";
    // scoreBtnsContainer.style.alignContent = "start";

    var gobackBtnEl = document.createElement("button");
    var clearScoresBtnEl = document.createElement("button");
    gobackBtnEl.className = "btn submit-btn";
    gobackBtnEl.id = "go-back";
    gobackBtnEl.textContent = "Go Back";
    gobackBtnEl.style.marginRight = "10px";
    clearScoresBtnEl.className = "btn submit-btn";
    clearScoresBtnEl.id = "clear-score";
    clearScoresBtnEl.textContent = "Clear High Scores";

    scoreBtnsContainer.append(gobackBtnEl, clearScoresBtnEl);

    introContainer.remove();
    // removing header
    headerEl.remove();

    mainContainer.append(highScoreContainerEl,scoreBtnsContainer);


}

mainContainer.addEventListener("click", mainContainerHandler);
viewScoreBtn.addEventListener("click", displayHighScore);