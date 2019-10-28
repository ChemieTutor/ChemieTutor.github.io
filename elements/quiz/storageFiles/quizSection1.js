var gftURL = "https://www.googleapis.com/fusiontables/v2/query";
var tableID = "1KEWYKyW_P_eyuxEEt77OeFQadI1RFFEcaQqOWz2e";
var quizSQL = "SELECT * FROM " + tableID;
var apiKey = "AIzaSyD5xUISJpz-iXsZ2l6bmv_xdD60qNU2js4";
var dlevel = "difficultyLevel="
var genre = "";
var arrayColumnNames, arrayQuestions;
var objCurrentQuestion, currentQuestionIndex = 0;
var quizSubject = "",
quizNumQuestions = 0;
var numCorrect = 0;
var secondsRemaining = 30;
var doNothingTimer = 2;


var myVar;
var myVar4;


function gameOver() {
  $("#textInHere").html("Time is Over!");
  clearInterval(myVar);
};

function doNothing() {
  doNothingTimer = doNothingTimer - 1;

  if (doNothingTimer == 0) {
    console.log("doNothingTimer is Done!")
    processAnswer($("#answer option:selected").index(0));
    clearInterval(myVar4);
    checkAnswer();
    processAnswer();
  }
}


//Calls the data information from the Google Fusion Tables.
function getData() {
  $.getJSON(gftURL, {
    sql: quizSQL,
    key: apiKey
  })
  .done(function(jsonData) {
    console.log(jsonData);
    arrayColumnNames = jsonData.columns;
    arrayQuestions = jsonData.rows;
    quizNumQuestions = arrayQuestions.length;
    loadQuestionsPage();


  })
  .fail(function(jqxhr, textStatus, error) {
    var err = textStatus + ", " + error;
    console.log("Request Failed: " + err);
  });
};
//
function validateUserInput() {
  var errorMessage = "";
  quizSubject = $("#difficulty").val();
  genre = $("#genre").val();
  if (quizSubject == "Select") {
    console.log("You Must Select a Difficulty");
    errorMessage = "You Must Select a Difficulty";
  } else {
    if (quizSubject == "Easy") {
      console.log("You selected Easy");
      quizNumQuestions = 10;
      quizSQL = "SELECT * FROM " + tableID + " WHERE " + dlevel + "'Easy'" + " AND genre= '" + genre + "'";
      console.log(quizSQL);
      console.log("Selected Genre: " + genre);
      console.log("Selected Number of Questions " + quizNumQuestions);
    }
    if (quizSubject == "Hard") {
      console.log("You selected Hard");
      quizNumQuestions = 10;
      quizSQL = "SELECT * FROM " + tableID + " WHERE " + dlevel + "'Hard'" + " AND genre= '" + genre + "'";
      console.log("Selected Genre: " + genre);
      console.log("Selected Number of Questions " + quizNumQuestions);
    }
    if (quizSubject == "Extreme") {
      console.log("You selected Extreme");
      quizNumQuestions = 4;
      quizSQL = "SELECT * FROM " + tableID + " WHERE " + dlevel + "'Extreme'" + " AND genre= '" + genre + "'";
      console.log("Selected Genre: " + genre);
      console.log("Selected Number of Questions " + quizNumQuestions);
    }
  }
  return errorMessage;
};

$(document).ready(function() {
  $("#start").on("click", function() {
    $('select#difficulty option ').removeAttr('selected ');
    $("#difficulty").selectmenu('refresh');
    $('#selection1 ').html("Select");
    $('select#genre option ').removeAttr('selected ');
    $("#genre").selectmenu('refresh');
    $('#selection1 ').html("Select");
    $("#myPopupDialog ").popup("open", {});
    console.log($("#difficulty").val())
  });
});

/*$("#username").val('
');
$("#password").val('
');*/
$("#continue").on("click", function() {
  var errorMessage = validateUserInput();
  if (errorMessage == "You Must Select a Difficulty") {
    alert("Error: " + errorMessage + " !");
  } else {
    getData();
    startTimer();
  };
  $("#nextQuestion").on("click", function() {
    clearInterval(myVar);
    processAnswer($("#answer option:selected").index());
    console.log($("#answer option:selected").index());

  });
});

function loadQuestionsPage() {
  currentQuestionIndex = 0;
  displayQuestion(currentQuestionIndex);
  $(":mobile-pagecontainer").pagecontainer("change", "#pagetwo", {});
};

function displayQuestion(intQuestionIndex) {
  console.log("displayQuestion()");
  objCurrentQuestion = getQuestionObject(intQuestionIndex);
  loadQuestion(objCurrentQuestion);
};

function getQuestionObject(intQuestionIndex) {
  console.log(intQuestionIndex);
  var arrCurrentQuestion = arrayQuestions[intQuestionIndex];
  var objQuestion = {};

  for (var i = 0; i < arrayColumnNames.length; i++)
  objQuestion[arrayColumnNames[i]] = arrCurrentQuestion[i];

  return objQuestion;
};

function loadQuestion(objQuestion) {
  console.log(objQuestion);
  $("#information2").html("Question: " + (currentQuestionIndex + 1) + " | " + quizNumQuestions);
  $("#information").html("Correct: " + numCorrect + " | " + quizNumQuestions);
  $("#question").html(objQuestion.questionText);
  $("#original").html("Select");
  $("#answer1").html("1. " + objQuestion.answer1Text);
  $("#answer2").html("2. " + objQuestion.answer2Text);
  $("#answer3").html("3. " + objQuestion.answer3Text);
  $("#answer4").html("4. " + objQuestion.answer4Text);

  if (currentQuestionIndex > 0) $("#answer").selectmenu('refresh');

};

function numQuestionsToBeShown() {
  if (quizSubject == "Easy") {
    quizNumQuestions = 5;
  }
  if (quizSubject == "Hard") {
    quizNumQuestions = 10;
  }
  if (quizSubject == "Extreme") {
    quizNumQuestions = 15;
  }
}

function processAnswer(intAnswerIndex) {
  if (intAnswerIndex == objCurrentQuestion.correctAnswerNumber) numCorrect++;
  else checkAnswer();
  currentQuestionIndex++;
  $('select#answer option ').removeAttr('selected ');
  $("#answer").selectmenu('refresh');
  startTimer();

  if (currentQuestionIndex < quizNumQuestions) displayQuestion(currentQuestionIndex);
  else loadSummaryPage();
};

function checkAnswer(correctAnswer) {
  clearInterval(myVar);
  var correctAnswer = objCurrentQuestion.correctAnswerNumber;
  var answerChosen = $("#answer option:selected").index();
  if (answerChosen == 0) {
    answerChosen = "nothing";
  }
  $("#textInHere").html("Oops, you got the answer wrong. The correct answer is " + correctAnswer + ", you selected " + answerChosen + " .");
  $("#myPopupDialog3 ").popup("open", {});
};


function loadSummaryPage() {
  $(":mobile-pagecontainer").pagecontainer("change", "#summaryPage", {
    transition: ' flip '
  });
  $("#mode").html("You played in: " + quizSubject + " mode.");
  $("#results").html("Total Questions Correct: " + numCorrect + " out of " + quizNumQuestions + ".");
  if (numCorrect < quizNumQuestions / 2) {
    $("#regards").html("You failed! Good luck next time! Click the home button to return to the starting page!");
    $("#regards").css("color", "#FB232E");
  } else {
    $("#regards").html("You passed! Congratulations! Click the home button to return to the starting page!");
    $("#regards").css("color", "#01FD01");
  }
  currentQuestionIndex = 0;
  numCorrect = 0;
  $('select#difficulty option ').removeAttr('selected ');
  $("#difficulty").selectmenu('refresh');

};

$("#homebuttonclicked").on("click", function() {
  $(":mobile-pagecontainer").pagecontainer("change", "#pageone", {});
  window.location.href = window.location.href
  $("#answer").selectmenu('refresh');
  $('select#answer option ').removeAttr('selected');
  currentQuestionIndex = 0;
  numCorrect = 0;
  $('select#difficulty option ').removeAttr('selected');
  $("#difficulty").selectmenu('refresh');
  $("#information").html("0 | 0");
});

$("#homebutton2").on("click", function() {
  $(":mobile-pagecontainer").pagecontainer("change", "#pageone", {});
  window.location.href = window.location.href
  $("#answer").selectmenu('refresh');
  $('select#answer option ').removeAttr('selected');
  currentQuestionIndex = 0;
  numCorrect = 0;
  $('select#difficulty option ').removeAttr('selected');
  $("#difficulty").selectmenu('refresh');
  $("#information").html("0 | 0");
});



/*$("#start1").on("click", function () {
$("#logInDialog ").popup("open", {});
});

$("#page1button").on("click", function () {
$(":mobile-pagecontainer").pagecontainer("change", "#pageone", {});
});*/
