var startBtnEl = document.getElementById("start-quiz");
var mainContainer = document.querySelector(".container");
var introContainer = document.querySelector(".intro-container");
var viewScoreBtn = document.getElementById("view-score");
var qCounter = 0;
var score = 0;
var timerEl = document.getElementById("timer");
var timeLeft = 75;
var feedbackEl = document.createElement("section");
feedbackEl.classList = "feedback";
feedbackEl.id = "feedback-container";
feedbackEl.textContent = "";
var isGameOver = true;

var questionsObj = [{
    question: "What is JavaScript?",
    options: {
        option1: "JavaScript is a scripting language used to make the website interactive",
        option2: "JavaScript is an assembly language used to make the website interactive",
        option3: "JavaScript is a compiled language used to make the website interactive",
        option4: "None of the mentioned"
    },
    answer: "a",
}, {
    question: "Arrays in JavaScript are defined by which of the following statements?",
    options: {
        option1: "It is an ordered list of objects",
        option2: "It is an ordered list of values",
        option3: "It is an ordered list of string",
        option4: "It is an ordered list of functions"
    },
    answer: "b",
}, {
    question: "Which of the following is not javascript data types?",
    options: {
        option1: "Null type",
        option2: "Undefined type",
        option3: "Number type",
        option4: "All of the mentioned"
    },
    answer: "d",
}, {
    question: "Which of the following object is the main entry point to all client-side JavaScript features and APIs?",
    options: {
        option1: "Position",
        option2: "Window",
        option3: "Standard",
        option4: "Location"
    },
    answer: "b",
}, {
    question: "Why are event handlers needed in JS?",
    options: {
        option1: "Allows JavaScript code to alter the behaviour of windows",
        option2: "Adds innerHTML page to the code",
        option3: "Change the server location",
        option4: "Performs handling of exceptions and occurrences"
    },
    answer: "a",
}, {
    question: "What is HTML?",
    options: {
        option1: "HTML describes the structure of a webpage",
        option2: "HTML is the standard markup language mainly used to create web pages",
        option3: "HTML consists of a set of elements that helps the browser how to view the content",
        option4: "All of the mentioned"
    },
    answer: "d",
}, {
    question: "HTML stands for __________",
    options: {
        option1: "HyperText Markup Language",
        option2: "HyperText Machine Language",
        option3: "HyperText Marking Language",
        option4: "HighText Marking Language"
    },
    answer: "a",
}, {
    question: "Which of the following tag is used for inserting the largest heading in HTML?",
    options: {
        option1: "head",
        option2: "<h1>",
        option3: "<h6>",
        option4: "heading"
    },
    answer: "b",
}, {
    question: "In which part of the HTML metadata is contained?",
    options: {
        option1: "head tag",
        option2: "title tag",
        option3: "html tag",
        option4: "body tag"
    },
    answer: "a",
}, {
    question: "Which element is used for styling HTML5 layout?",
    options: {
        option1: "CSS",
        option2: "jQuery",
        option3: "JavaScript",
        option4: "PHP"
    },
    answer: "a",
}, {
    question: "Which character is used to represent when a tag is closed in HTML?",
    options: {
        option1: "#",
        option2: "!",
        option3: "/",
        option4: '|'
    },
    answer: "c",
}, {
    question: "Which tag is used to create a dropdown in HTML Form?",
    options: {
        option1: "<input>",
        option2: "<select>",
        option3: "<text>",
        option4: "<textarea>"
    },
    answer: "b",
}, {
    question: "What is CSS?",
    options: {
        option1: "CSS is a style sheet language",
        option2: "CSS is designed to separate the presentation and content, including layout, colors, and fonts",
        option3: "CSS is the language used to style the HTML documents",
        option4: "All of the mentioned"
    },
    answer: "a",
}, {
    question: "Which of the following CSS selectors are used to specify a group of elements?",
    options: {
        option1: "tag",
        option2: "id",
        option3: "class",
        option4: "both class and tag"
    },
    answer: "c",
}, {
    question: "Which of the following type of HTML tag is used to define an internal style sheet?",
    options: {
        option1: "<script>",
        option2: "<link>",
        option3: "<class>",
        option4: "<style>"
    },
    answer: "d",
}, {
    question: "Which of the following CSS property is used to make the text bold?",
    options: {
        option1: "text-decoration: bold",
        option2: "font-weight: bold",
        option3: "font-style: bold",
        option4: "text-align: bold"
    },
    answer: "b",
}, {
    question: "Which of the following is the correct syntax to link an external style sheet in the HTML file?",
    options: {
        option1: "<link rel=”stylesheet” href=”style.css” />",
        option2: "<link rel=”stylesheet” src=”style.css” />",
        option3: "<style rel=”stylesheet” src=”style.css” />",
        option4: "<style rel=”stylesheet” link=”style.css” />"
    },
    answer: "a",
}, {
    question: "Which of the following is the correct way to apply CSS Styles?",
    options: {
        option1: "in an external CSS file",
        option2: "inside an HTML element",
        option3: "inside the <head> section of an HTML page",
        option4: "all of the mentioned"
    },
    answer: "d",
}, {
    question: "Which of the following CSS property is used to set the color of the text?",
    options: {
        option1: "text-decoration",
        option2: "pallet",
        option3: "colour",
        option4: "color"
    },
    answer: "d",
}, {
    question: "Which of the following CSS Property sets the stacking order of positioned elements?",
    options: {
        option1: "y-index",
        option2: "z-index",
        option3: "x-index",
        option4: "all of the mentioned"
    },
    answer: "b",
},
]


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

    answerBtn1El.className = "btn question-btn";
    answerBtn2El.className = "btn question-btn";
    answerBtn3El.className = "btn question-btn";
    answerBtn4El.className = "btn question-btn";
    
    answerBtn1El.textContent = questionsObj[qCounter].options.option1;
    answerBtn2El.textContent = questionsObj[qCounter].options.option2;
    answerBtn3El.textContent = questionsObj[qCounter].options.option3;
    answerBtn4El.textContent = questionsObj[qCounter].options.option4;
    
    answerBtn1El.setAttribute("data-option", "a");
    answerBtn2El.setAttribute("data-option", "b");
    answerBtn3El.setAttribute("data-option", "c");
    answerBtn4El.setAttribute("data-option", "d");
    
    answerBtn1El.setAttribute("data-correct-answer",questionsObj[qCounter].answer);
    answerBtn2El.setAttribute("data-correct-answer",questionsObj[qCounter].answer);
    answerBtn3El.setAttribute("data-correct-answer",questionsObj[qCounter].answer);
    answerBtn4El.setAttribute("data-correct-answer",questionsObj[qCounter].answer);


    questionContainer.append(pEl, answerBtn1El, answerBtn2El, answerBtn3El, answerBtn4El);
    
    mainContainer.appendChild(questionContainer);
    //appends the footer with the correct/wrong alert
    mainContainer.appendChild(feedbackEl);
    qCounter++;

}

var stopGame = function() {

    removeQuestion();
    //feedbackEl.remove();
    timeLeft = 0;

    //console.log("game over! you score is " + score);
    isGameOver = true;

    var doneHeaderEl = document.createElement("h2");
    doneHeaderEl.className = "main-title";
    doneHeaderEl.textContent = "All done!";
    var scorePEl = document.createElement("p");
    scorePEl.className = "form-text";
    scorePEl = `Your final score is ${score}.`;
    var formEl = document.createElement("form");
    formEl.style.display = "flex";
    formEl.style.flexWrap = "wrap";
    formEl.style.alignContent = "space-evenly";
    formEl.style.width = "50%";
    var formTextEl = document.createElement("p");
    formTextEl.className = "form-text";
    formTextEl.textContent = "Enter initials: ";
    var textboxEl = document.createElement("input");
    textboxEl.type = "text";
    textboxEl.className = "form-text";
    textboxEl.name = "player-initials";
    var submitBtnEl = document.createElement("button");
    submitBtnEl.textContent = "Submit";
    submitBtnEl.className = "btn submit-btn";
    submitBtnEl.id = "submit-btn";

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
    isGameOver = false;
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
    //var feedbackEl = document.createElement("section");
    feedbackEl.style.borderTop = "2px solid var(--shadow)";
    feedbackEl.style.marginTop = "15px";
    feedbackEl.textContent = displayText;
    //mainContainer.appendChild(feedbackEl);

}

var scoreSubmit = function(event) {
    var playerInitials = document.querySelector("input[name='player-initials']").value;
    alert(`Submitting the follow score: ${score} points for player ${playerInitials}.`);

    if (playerInitials === "") {
        alert("Player initials cannot be blank, please enter your initials.");
        return false;
    }

    var currentHighScore = localStorage.getItem("highScore");

    if (currentHighScore === null) {
        currentHighScore = 0;
    }

    localStorage.setItem("playerInitials", playerInitials);
    localStorage.setItem("playerScore", score);

    if (score > currentHighScore) {
        localStorage.setItem("highScorePlayer", playerInitials);
        localStorage.setItem("highScore", score);
    }
    score = 0;
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

var mainContainerHandler = function (event) {
    //console.dir(event.target);

    //console.log("still here");
    event.preventDefault();

    if (qCounter === 20 && !isGameOver) {
        //validateAnswer(event.target.getAttribute("data-option"));
        validateAnswer(event.target);
        // stop the game
        stopGame();
        //prompt to ask user name and generate score

        //reset screen and game

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
        // submit score to localStorage
        scoreSubmit();
        // reset page to start fresh
        reloadPage();
    }
    
}

var displayHighScore = function() {
    //console.log("this will display the high scores");
    var currentHighScore = localStorage.getItem("highScore");
    var playerInitials = localStorage.getItem("highScorePlayer");

    if (currentHighScore === null && playerInitials === null) {
        alert("No high score available yet! Play the game then try again!");
    } else {
        alert(`Current high score ${currentHighScore} by player ${playerInitials}.`)
    }
}

mainContainer.addEventListener("click", mainContainerHandler);
viewScoreBtn.addEventListener("click", displayHighScore);