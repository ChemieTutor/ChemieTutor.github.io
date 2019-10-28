// VARIABLES
var baseURL = "https://script.google.com/macros/s/AKfycbw49D3_9O7I8yi48PKmewF-XmqbzXEpylu-YjMGZYmmiehBewcA/exec";
var parameters = {};
var objCurrentQuestion, currentQuestionIndex = 0;
var quizNumQuestions = 0;
var questionNumber;
var questionData;
var chosenAnswer;
var numCorrect = 0;
var qIdx;
//var array = ["Food", "John"]

// GET NUMBER OF QUESTIONS TO DISPLAY
$('#startQuiz').on("click", function() {
  var quizNumQuestions = $('#amount option:selected').text();
  console.log("Question Amount Selected: " + quizNumQuestions);
  //array.push(quizNumQuestions);
  window.location = "quizSection1.html";
});
// FUNCTION TO LOAD ON DOCUMENT READY
$(document).ready(function() {
  getData();
  $('#answer1').click(function () {
    console.log($(this).val());
    chosenAnswer = $(this).val();
    processAnswer($(this).val());
  });
  $('#answer2').click(function () {
    console.log($(this).val());
    chosenAnswer = $(this).val();
    processAnswer($(this).val());
  });
  $('#answer3').click(function () {
    console.log($(this).val());
    chosenAnswer = $(this).val();
    processAnswer($(this).val());
  });
  $('#answer4').click(function () {
    console.log($(this).val());
    chosenAnswer = $(this).val();
    processAnswer($(this).val());
  });


});
// GET DATA FUNCTIONS
// Calls the data from the Google Spreadsheet
function getData() {
  $.ajax({
    url: baseURL,
    dataType: 'jsonp',
    jsonpCallback: 'processResponse',
    data: parameters
  }).done(function(data) {
    console.log(data);
    questionData = data;
    quizNumQuestions = questionData.length;
    console.log(quizNumQuestions);
    loadQuestionsPage();
  }).fail(function(jqxhr, textStatus, error) {
    var err = textStatus + ", " + error;
    alert("Request Failed: " + err);
    console.log("Request Failed: " + err);
  });
};

/*function showQuestionNumber() {
alert(array[2]);
};*/
// Load Questions Page
$('#alert').on("click", function() {
  loadQuestionsPage();
});

function loadQuestionsPage() {
  var qIdx = Math.floor(Math.random()*quizNumQuestions)
  console.log(qIdx);
  //var q = quizNumQuestions.splice(qIdx,1)[0];
  currentQuestionIndex = qIdx;
  questionNumber = 0;
  displayQuestion(currentQuestionIndex);
  console.log("Random Current Question Index works just fine.");
};

function displayQuestion(intQuestionIndex) {
  objCurrentQuestion = questionData[intQuestionIndex];
  //alert(objCurrentQuestion);
  loadQuestion(objCurrentQuestion);
};
// A FUNCTION THAT READS THE IONS
function isNumberic(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
// A FUNCTION THAT READS THE IONS AND FORMATS IT PROPERLY
function getFormattedIon(strIon) {
  var formattedIon = "";

  for (var i=0; i< strIon.length - 2; i++) {
    var numeric = isNumberic(strIon[i]);
    if (numeric) {
      formattedIon += '<sub>' + strIon[i] + '</sub>';
    }
    else {
      formattedIon +=  strIon[i] ;
    }
  }
  console.log('<sup>' + strIon[i] + strIon[i+1] + '</sup>');
  formattedIon += '<sup>' + strIon[i] + strIon[i+1] + '</sup>';

  return formattedIon;
};


// DISPLAY DATA FUNCTION
function loadQuestion(objQuestion) {
  console.log(objQuestion);
  var questionNumberCounter = questionNumber + 1;
  $("#currentQuestion").html('Question: ' + questionNumberCounter + ' | ' + quizNumQuestions);
  $("#question").html(objQuestion.Question);
  if (objQuestion['Ion Type'] == "Monatomic") {
    $('#ion').html('' + objQuestion.Symbol + '<sup>' + objQuestion.Strength + objQuestion.Charge + '<sup>');
    /*var formatted = getFormattedIon(''+ objQuestion.Symbol + objQuestion.Strength + objQuestion.Charge);
    console.log("What is this?? " + formatted);
    $('#ion').html(formatted);*/
  }
  if (objQuestion['Ion Type'] == "Polyatomic") {
    var formatted = getFormattedIon(''+ objQuestion.Symbol + objQuestion.Strength + objQuestion.Charge);
    console.log("Formatted Ion: " + formatted);
    $('#ion').html(formatted);
  }
  $("#original").html("Select");
  $('#answer1').html("1. " + objQuestion.Answer1);
  $('#answer1').attr('value', objQuestion.Answer1);
  $('#answer2').html("2. " + objQuestion.Answer2);
  $('#answer2').attr('value', objQuestion.Answer2);
  $('#answer3').html("3. " + objQuestion.Answer3);
  $('#answer3').attr('value', objQuestion.Answer3)
  $('#answer4').html("4. " + objQuestion.Answer4);
  $('#answer4').attr('value', objQuestion.Answer4);
  $('#loader_section').css('display', 'none');
  $('#question_section').css('display', 'block');
  startProgressBar();
};

// CHECK ANSWERS
function processAnswer(intAnswerIndex) {
  endProgressBar();
  endTimer();
  if (intAnswerIndex == objCurrentQuestion.CorrectAnswer) numCorrect++;
  else checkAnswer();
  questionNumber++;
  if (questionNumber < quizNumQuestions) {
    displayQuestion(Math.floor(Math.random()*quizNumQuestions));
  }else {
    loadSummaryPage();
  };
};



function checkAnswer(correctAnswer) {
  var correctAnswer = objCurrentQuestion.CorrectAnswer;
  var answerChosen = chosenAnswer;
  if (answerChosen == null) {
    answerChosen = "nothing";
  }
  alert("Oops, you got the answer wrong. The correct answer is " + correctAnswer + ", you selected " + answerChosen + ".");
};


function loadSummaryPage() {
  window.location = "quizzes.html";
  console.log("TOTAL NUMBER OF QUESTIONS DISPLAYED: " + questionNumber);
  console.log("TOTAL NUMBER OF QUESTIONS CORRECT:" + numCorrect);
};

// TIMER TEST
var progress = 100;
var valueBar;
var finalValue;
var timeInterval;
var secondsRemaining = 20;
var timeVariable;
var timeRemaining;

function startProgressBar() {
  $('#progressBarer').css('width', "100%");
  timeInterval = setInterval(timer, 0300);
  startTimer();
  //updateProgressBar();
}

var timer = function() {
  valueBar = --progress;
  finalValue = 100 / valueBar;
  $('#percent_counter').html(valueBar + "%");
  $('#progressBarer').css('width', valueBar + "%");
  if (valueBar == 0) {
    endProgressBar();
  }
  //console.log("Progress = " + valueBar);
}

function endProgressBar() {
  progress = 100;
  clearInterval(timeInterval);
  //alert('Finished');
}

function startTimer() {
  //set timer
  $('#timer').html('0:' + secondsRemaining);
  timeVariable = setInterval(myTimer, 1000);
}

var myTimer = function() {
  timeRemaining = --secondsRemaining;
  $("#timer").html("0:" + timeRemaining);
  if (timeRemaining < 10) {
    $("#timer").html("0:0" + timeRemaining);
  }
  if (timeRemaining == 0) {
    //processAnswer();
    endTimer();
    processAnswer();
  }
}

function endTimer() {
  //processAnswer();
  secondsRemaining = 20;
  clearInterval(timeVariable);

}
