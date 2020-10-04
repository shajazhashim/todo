var questions = [{
    question: "Which nation will host Asian Boxing Championships 2020?",
    choices: ["India", "China", "Malaysia", "Japan"],
    correctAnswer: 0 
}, {
    question: "Who has been honoured with the FIH Player of the Year (Male) award, 2019?",
    choices: ["Dilpreet Singh", "Ajit Pal Singh", "Manpreet Singh", "Mandeep Singh"],
    correctAnswer: 2  
}, {
    question: "Who among the following sports persons won the first gold medal for India at Asian Games?",
    choices: ["Mihir Sen", "Sachin Nag", "Dhyan Chand", "K D Jadhav"],
    correctAnswer: 1  
}, {
    question: "Which India Cricketer got Laureus Sporting Moment honour?",
    choices: ["M. S. Dhoni", "Virat Kohli", "Virender Segwag", "Sachin Tendulkar"],
    correctAnswer: 3   
}, {
    question: "Koneru Humpy, D. Harika, D. Gukesh are noted Indians associated with the game of -",
    choices: ["Chess", "Baseball", "Badminton", "Cricket"],
    correctAnswer: 0   
} ];

var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;

$(document).ready(function() {
    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();
    $(this).find(".nextButton").on("click", function() {
        if (!quizOver) {
            value = $("input[type='radio']:checked").val();
            if (value == undefined) {
                $(document).find(".quizMessage").text("Please select an answer");
                $(document).find(".quizMessage").show();
            } else {
                $(document).find(".quizMessage").hide();
                if (value == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                }
                currentQuestion++;
                if (currentQuestion < questions.length) {
                    displayCurrentQuestion();
                } else {
                    displayScore();
                    $(document).find(".nextButton").text("Play Again?");
                    quizOver = true;
                }
            }
        } else {
            quizOver = false;
            $(document).find(".nextButton").text("Next Question");
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }
    });
    
});

function displayCurrentQuestion() {
    
    console.log("In display current Question");

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");

    $(questionClass).text(question);

    $(choiceList).find("li").remove();

    var choice;
    var numChoices=4;
    for(i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
    }
    
    
}


function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore() {
    $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
    $(document).find(".quizContainer > .result").show();
}

function hideScore() {
    $(document).find(".result").hide();
}
