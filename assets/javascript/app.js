//Game starts after user clicks start button from start-page.
//Game starts and timer countsdown from 45.
//User selects answers and page is complete after timers off or done is clicked
//End page to reveal score

//Create starter page w/ start button.
$(document).ready(function() {
  $("#startButton").on("click", gameState.startTimer);
});

var gameState = {
  timeRemaining: 35,

  // start the timer, set interval countdown, hide the start page, show the questions
  startTimer: function() {
    $("#timer").text("Time remaining: " + gameState.timeRemaining);
    setInterval(gameState.countdown, 1000);
    $("#start-page").hide();
    trivia.displayQuestions();
  },

  // Countdown to Zero
  countdown: function() {
    gameState.timeRemaining--;
    $("#timer").text("Time remaining: " + gameState.timeRemaining);
    if (gameState.timeRemaining === 0) {
      gameState.stopTimer();
      $("#timer").empty();
    }
  },

  // Stop Timer - Check Answers
  stopTimer: function() {
    clearInterval();
    trivia.checkAnswers();
  },

  // Endpage Results - Hiding Questions and Timer, Display Answers
  showEndPage: function(numCorrect, numIncorrect, numUnanswered) {
    $("#end-page").show();
    $("#questions-box").empty();
    $("#timer").empty();
    $("#timer").hide();
    $("#correct-answers").text("Correct Answers: " + numCorrect);
    $("#incorrect-answers").text("Incorrect Answer: " + numIncorrect);
    $("#unanswered").text("Questions Skipped: " + numUnanswered);
  }
};

// Building Questions and Scoring
var trivia = {
  // Pull Question from Arrays, Loop to Append
  displayQuestions: function() {
    var divContainer = $("#questions-box");
    var answerGroup = $(".form-check");
    divContainer.append("<h2>Answer the following questions:</h2>");

    for (var i = 0; i < questionBank.length; i++) {
      divContainer.append(
        '<div id="question">' + questionBank[i].question + "</div>"
      );

      var answer1 = questionBank[i].answers[0];
      var answer2 = questionBank[i].answers[1];
      var answer3 = questionBank[i].answers[2];

      divContainer.append(
        '<div class="form-check"><input class="form-check-input" type="radio" name="radio-group' +
          i +
          '" id="radio' +
          i +
          '"><label class="form-check-label" id="radio' +
          i +
          'label" for="radio' +
          i +
          '">' +
          answer1 +
          "</label></div>"
      );
      divContainer.append(
        '<div class="form-check"><input class="form-check-input" type="radio" name="radio-group' +
          i +
          '" id="radio' +
          i +
          '"><label class="form-check-label" id="radio' +
          i +
          'label" for="radio' +
          i +
          '">' +
          answer2 +
          "</label></div>"
      );
      divContainer.append(
        '<div class="form-check"><input class="form-check-input" type="radio" name="radio-group' +
          i +
          '" id="radio' +
          i +
          '"><label class="form-check-label" id="radio' +
          i +
          'label" for="radio' +
          i +
          '">' +
          answer3 +
          "</label></div>"
      );
    }

    // Add Done button, Click to Stop.
    var doneButton =
      '<button class="btn btn-primary" id="done-button" type="submit">Done</button>';
    divContainer.append(doneButton);
    $("#done-button").on("click", gameState.stopTimer);
  },

  // Check answers
  checkAnswers: function() {
    var correctAnswer;
    var userAnswer;
    var numCorrect = 0;
    var numIncorrect = 0;
    var numUnanswered = 0;

    // For Loop to compare answers to increment the score count
    for (var i = 0; i < questionBank.length; i++) {
      correctAnswer = questionBank[i].correct;
      userAnswer = $("input[id=radio" + i + "]:checked + label").text();

      if (userAnswer === correctAnswer) {
        numCorrect++;
      } else if (userAnswer === "") {
        numUnanswered++;
      } else if (userAnswer !== correctAnswer) {
        {
          numIncorrect++;
        }
      }
    }

    // Show endpage with Results
    gameState.showEndPage(numCorrect, numIncorrect, numUnanswered);
  }
};

// Array of Questions, Answers and Correct Answers
var questionBank = [
  {
    question: "Who played the character Ron Burgundy in Anchorman?",
    answers: ["Steve Carrell", "Paul Rudd", "Will Ferrell"],
    correct: "Will Ferrell"
  },

  {
    question: "What is highest grossing movie of 2018?",
    answers: [
      "Black Panther",
      "Jurrasic World: Fallen Kingdom",
      "Avengers: Infinity War"
    ],
    correct: "Avengers: Infinity War"
  },
  {
    question: "Who played Freddy Mercury in 'Bohemian Rhapsody'?",
    answers: ["Ben Affleck", "Rami Malek", "Matt Damon"],
    correct: "Rami Malek"
  },
  {
    question: "Who played the female lead in 'A Star is Born'?",
    answers: ["Kelli Clarkson", "Lady Gaga", "Amy Shumer"],
    correct: "Lady Gaga"
  },
  {
    question: "What was the name of Harry Potters's best friend?",
    answers: ["Draco Malfoy", "Ron Weasley", "Cedric Diggory"],
    correct: "Ron Weasley"
  },
  {
    question: "Which actor starred as Black Panther?",
    answers: ["Michael B. Tyson", "Michael B. Jackson", "Michael B. Jordan"],
    correct: "Michael B. Jordan"
  },
  {
    question: "Cady Heron's character in Mean Girls is originally from?",
    answers: ["England", "Australia", "Africa"],
    correct: "Africa"
  },
  {
    question: "What is highest grossing movie of 2009",
    answers: [
      "Harry Potter & The Half Blood Prince",
      "Tranformers: Revenge of the Fallen",
      "Avatar"
    ],
    correct: "Avatar"
  }
];
