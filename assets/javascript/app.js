$(document).ready(function() {

// global variables
var currentQuestion; // # of question in the array (0-7)
var questionNumber; // current question number from 1-8

var correctGuesses; // count number of correct guesses
var incorrectGuesses; // count number of incorrect guesses

var seconds;
var breakSeconds;
var timeLeft;
var breakLeft;

// questions & answers
var triviaQuestions = [{
  question: "In which show was the main character (played by Melissa Joan Hart) a teenager who spoke to the audience about her everyday life?",
  answerChoices: [
      "The Secret World of Alex Mack",
      "Clarissa Explains It All!",
      "All That",
      "The Amanda Show"
    ],
  correctAnswer: 1
},
{
  question: "This game show on Nickelodeon had two teams compete to win prizes by answering trivia questions that could lead to getting 'Gak' spilled on them.",
  answerChoices: [
      "Guts",
      "Legends of the Hidden Temple",
      "Wild & Crazy Kids",
      "Double Dare"
    ],
  correctAnswer: 3
},
{
  question: "Finish the Lyric: 'Camp Anawanna, we hold you in our hearts... and when we think about you...",
  answerChoices: [
      "Our fun is off the charts",
      "It makes me wanna fart",
      "We never wanna part",
      "Your breath is really tart"
    ],
  correctAnswer: 1
},
{
  question: "Spunky was the main character's dog in which show?",
  answerChoices: [
      "Aaahh!!! Real Monsters",
      "Doug",
      "Hey Arnold!",
      "Rocko's Modern Life"
    ],
  correctAnswer: 3
},
{
  question: "Which was NOT a team in the show 'Legends of the Hidden Temple'?",
  answerChoices: [
      "Green Gorillas",
      "Red Jaguars",
      "Purple Parrots",
      "Blue Barracudas"
    ],
  correctAnswer: 0
},
{
  question: "Doug, from the show 'Doug', wore this outfit everyday.",
  answerChoices: [
      "Green Sweater Vest, White T-Shirt, Brown Shorts, Red and White Shoes",
      "Green Button Up Vest, White T-Shirt, Brown Shorts, Red and White Shoes",
      "Green Button Up Vest, White Long Sleeve Shirt, Brown Shorts, Red Shoes",
      "Brown Sweater Vest, White T-Shirt, Green Shorts, Red and White Shoes"
    ],
  correctAnswer: 0
},
{
  question: "Which musical artist did NOT perform in an episode of 'All That'?",
  answerChoices: [
      "Aaliyah",
      "Usher",
      "Snoop Dogg",
      "Soul For Real"
    ],
  correctAnswer: 2
},
{
  question: "Angelica, a character in 'Rugrats,' wore a dress and matching hair ties in this color:",
  answerChoices: [
      "Orange",
      "Pink",
      "Purple",
      "Blue"
    ],
  correctAnswer: 2
},
];

var text = {
  correctGuesses: "Correct! You chose the correct answer:",
  incorrectGuesses: "Sorry, wrong answer! The correct answer was:",
  timeUp: "You ran out of time! No point for you. The correct answer was:"
}

// buttons

$('#start-button').on('click', function(){
	$(this).hide();
	startGame();
});

$('#playagain-button').on('click', function(){
	$(this).hide();
	startGame();
});

$("#nextq-button").on("click", function() {
    breakOver();
});

$("#results-button").on("click", function() {
    gameResult();
});

$("#playagain-button").on("click", function() {
    startGame();
    clearInterval(breakLeft);
});

// functions

function startGame() {
  currentQuestion = 0;
  correctGuesses = 0;
  incorrectGuesses = 0;
  questionNumber = 1;
  seconds = 0;
  breakSeconds = 0;
	clearInterval(timeLeft);
  clearInterval(breakLeft);
  nextQuestion();
}

function nextQuestion() {
  $("#instructions").empty();
  $(".question-number").empty();
  $(".current-question").empty();
  $(".current-question").removeClass("grayed-out");
  $("#current-answerchoices").empty();
  $("#message").empty();
  $("#correct-answer").empty();
  $("#nextq-button").hide();
  $("#time-left").empty();
  $("#time-left").show();
  $("#end-message").empty();

  $(".question-number").html("Question #" + questionNumber + " of " + triviaQuestions.length);
  $(".current-question").html(triviaQuestions[currentQuestion].question);

  console.log("Question " + questionNumber + ": " + triviaQuestions[currentQuestion].question);

  for (i = 0; i < triviaQuestions[currentQuestion].answerChoices.length; i++) {
      var answers = $("<div>");
      answers.attr({"data-index": i});
      answers.text(triviaQuestions[currentQuestion].answerChoices[i]);
      answers.addClass("answer-choice");
      $("#current-answerchoices").append(answers);
    }

  startTimer();

  $(".answer-choice").on("click", function() {
    userAnswer = $(this).data('index');
		clearInterval(timeLeft);
		questionResult();
  });
}

function startTimer() {
  seconds = 20;
  $("#time-left").empty();
  $("#time-left").show();
  $("#time-left").html("Time left: " + seconds);
  timeLeft = setInterval(decrement, 1000);
}

function decrement() {
  seconds--;
  $("#time-left").show();
  $("#time-left").html("Time left: " + seconds);
  if (seconds === 0) {
    userAnswer = null;
    clearInterval(timeLeft);
    questionResult();
  }
}

function questionResult() {
    var correctAnswer = triviaQuestions[currentQuestion].correctAnswer;

    $("#time-left").hide();
    $(".current-question").addClass("grayed-out");
    $("#current-answerchoices").empty();


    if (userAnswer === correctAnswer) {
      correctGuesses++;
      console.log("correct:" + correctGuesses);
      console.log("incorrect:" + incorrectGuesses);
      $("#message").text(text.correctGuesses);
      $("#correct-answer").text(triviaQuestions[currentQuestion].answerChoices[correctAnswer]);
          if ((correctGuesses + incorrectGuesses) < triviaQuestions.length) {
          $("#nextq-button").show();
        }
          else {
          $("#results-button").show();
          }
    }
    else if (userAnswer === null) {
      incorrectGuesses++;
      console.log("correct:" + correctGuesses);
      console.log("incorrect:" + incorrectGuesses)
      $("#message").text(text.timeUp);
      $("#correct-answer").text(triviaQuestions[currentQuestion].answerChoices[correctAnswer]);
          if ((correctGuesses + incorrectGuesses) < triviaQuestions.length) {
          $("#nextq-button").show();
        }
        else {
        $("#results-button").show();
        }
    }
    else  {
      incorrectGuesses++;
      console.log("correct:" + correctGuesses);
      console.log("incorrect:" + incorrectGuesses)
      $("#message").text(text.incorrectGuesses);
      $("#correct-answer").text(triviaQuestions[currentQuestion].answerChoices[correctAnswer]);
          if ((correctGuesses + incorrectGuesses) < triviaQuestions.length) {
          $("#nextq-button").show();
        }
        else {
        $("#results-button").show();
        }

    }
    breakTime();
}

function breakTime() {
  if ((correctGuesses + incorrectGuesses) < triviaQuestions.length) {
    $("#time-left").empty();
    breakSeconds = 10;
    $("#time-left").html("Next question in... " + breakSeconds);
    breakLeft = setInterval(breakDecrement, 1000);
  }
  else if ((correctGuesses + incorrectGuesses) === triviaQuestions.length) {
    $("#time-left").hide();
    breakOver();
  }
}

function breakDecrement() {
    breakSeconds--;
    $("#time-left").show();
    $("#time-left").html("Next question in..." + breakSeconds);
    if (breakSeconds === 0) {
      clearInterval(breakLeft);
      breakOver();
    }
}

function breakOver() {
    currentQuestion++;
    questionNumber++;
    clearInterval(breakLeft);
    if (currentQuestion < triviaQuestions.length) {
      nextQuestion();
    }
}

function gameResult(){
  console.log("END OF GAME");
  $(".question-number").empty();
  $(".current-question").empty();
  $("#message").empty();
  $("#correct-answer").empty();
  $("#results-button").hide();

  var endMessage = $("<div>");
  endMessage.html("You got" + "<span id='correct-answer'> " + correctGuesses + "</span>" + " correct out of 8!");
  $("#end-message").append(endMessage);
  $("#playagain-button").show();

  }
})
