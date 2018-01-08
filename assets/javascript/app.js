$(document).ready(function() {

var currentQuestion; // # of question in the array
var questionNumber; // current question number from 1-8 (currentQuestion plus 1)

var correctGuesses; // count number of correct guesses
var incorrectGuesses; // count number of incorrect guesses

var breakSeconds;


// question & answer arrays

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
  question: "This game show on Nickelodeon had two teams compete to win prizes by answering trivia questions that could lead to them getting 'Gak' spilled on them.",
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
      "Green Sweater Vest, White T-Shirt, Black Shorts, Red and White Shoes"
    ],
  correctAnswer: 0
},
{
  question: "Which artist did NOT perform in an episode of 'All That'?",
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



// hide buttons when game starts
$('#start-button').on('click', function(){
	$(this).hide();
	startGame();
});

$('#playagain-button').on('click', function(){
	$(this).hide();
	startGame();
});


function startGame() {
  $("#time-left").empty();
  currentQuestion = 0;
  correctGuesses = 0;
  incorrectGuesses = 0;
  questionNumber = 1;
  nextQuestion();
}

function nextQuestion() {
  $("#instructions").empty();
  $("#question-number").empty();
  $(".current-question").empty();
  $(".current-question").removeClass("grayed-out");
  $("#message").empty();
  $("#correct-answer").empty();
  $("#nextq-button").hide();
  $("#time-left").show();

  $(".question-number").html("Question #" + questionNumber + " of " + triviaQuestions.length);
  $(".current-question").html(triviaQuestions[currentQuestion].question);

  console.log(triviaQuestions[currentQuestion].question);

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
    $("#time-left").show();
    $("#time-left").html("Time left: " + seconds);
    timeLeft = setInterval(decrement, 1000);
  }

  function decrement() {
    seconds--;
    $("#time-left").show();
    $("#time-left").html("Time left: " + seconds);
    if (seconds === 0) {
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
        $("#message").text(text.correctGuesses);
        $("#correct-answer").text(triviaQuestions[currentQuestion].answerChoices[correctAnswer]);
        $("#nextq-button").show();
      }
      else if (userAnswer != correctAnswer) {
        incorrectGuesses++;
        console.log("incorrect:" + incorrectGuesses)
        $("#message").text(text.incorrectGuesses);
        $("#correct-answer").text(triviaQuestions[currentQuestion].answerChoices[correctAnswer]);
        $("#nextq-button").show();
      }
      else {
        incorrectGuesses++;
        $("#message").text(text.timeUp);
        $("#correct-answer").text(triviaQuestions[currentQuestion].answerChoices[correctAnswer]);
        $("#nextq-button").show();
      }

console.log("just finished question in array position:" + currentQuestion);
console.log("just finished question number:" + questionNumber);

    if (currentQuestion <= triviaQuestions.length) {
      breakTime();
        }
        else {
          gameResult();
        }
      }

  $("#nextq-button").on("click", function() {
    breakOver();


});

function breakTime() {
  breakSeconds = 5;
  $("#time-left").html("Next question in... " + breakSeconds);
  breakLeft = setInterval(breakDecrement, 1000);
  // if (breakLeft === 0) {
  //   clearInterval(breakLeft);
  //   // currentQuestion++;
  //   breakOver()
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
    nextQuestion();
};

function gameResult(){
  console.log("END OF GAME");
}

    })





// * You'll create a trivia game that shows only one question until the player answers it or their time runs out.
//
// * If the player selects the correct answer, show a screen congratulating them for choosing the right option. After a few seconds, display the next question -- do this without user input.
//
// * The scenario is similar for wrong answers and time-outs.
//
//   * If the player runs out of time, tell the player that time's up and display the correct answer. Wait a few seconds, then show the next question.
//   * If the player chooses the wrong answer, tell the player they selected the wrong option and then display the correct answer. Wait a few seconds, then show the next question.
//
// * On the final screen, show the number of correct answers, incorrect answers, and an option to restart the game (without reloading the page).
