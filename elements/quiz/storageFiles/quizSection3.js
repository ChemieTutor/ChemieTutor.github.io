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
var chosenButton = 0;
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
    chosenButton = 1;
  });
  $('#answer2').click(function () {
    console.log($(this).val());
    chosenAnswer = $(this).val();
    processAnswer($(this).val());
    chosenButton = 2;
  });
  $('#answer3').click(function () {
    console.log($(this).val());
    chosenAnswer = $(this).val();
    processAnswer($(this).val());
    chosenButton = 3;
  });
  $('#answer4').click(function () {
    console.log($(this).val());
    chosenAnswer = $(this).val();
    processAnswer($(this).val());
    chosenButton = 4;
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
  animateBtn1();
  animateBtn2();
  animateBtn3();
  animateBtn4();
  startProgressBar();
};

// CHECK ANSWERS
function processAnswer(intAnswerIndex) {
  endProgressBar();
  endTimer();
  if (intAnswerIndex == objCurrentQuestion.CorrectAnswer) {
    numCorrect++;
    //displayCorrectMeme();
  } else {
    checkAnswer();
  }
};



function checkAnswer(correctAnswer) {
  var correctAnswer = objCurrentQuestion.CorrectAnswer;
  var answerChosen = chosenAnswer;
  if (answerChosen == null) {
    answerChosen = "nothing";
  }

  //alert("Oops, you got the answer wrong. The correct answer is " + correctAnswer + ", you selected " + answerChosen + ".");
  //displayIncorrectMeme();
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
var secondsRemaining = 25; //20 seconds and time interval of 0300, 25 seconds and interval of 0370
var timeVariable;
var timeRemaining;

function startProgressBar() {
  $('#progressBarer').css('width', "100%");
  timeInterval = setInterval(timer, 0370);
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

var rightMemes = ["http://s2.quickmeme.com/img/e9/e90b70a02ee271a0122dceae9526b09bf4c38a28ace7d91e83b1a485eac7a6e2.jpg",
"",
"",
"",
"",];

var wrongMemes = ["https://cdn.meme.am/cache/instances/folder512/60782512.jpg",
"http://blog.commlabindia.com/wp-content/uploads/2015/11/10.jpg",
"http://weknowmemes.com/generator/uploads/generated/g1361460521612628813.jpg",
"https://cdn.meme.am/instances/58306577.jpg",
"http://s2.quickmeme.com/img/42/428ee82a8beffbafa26f8c5ce97bde1650cfa819774c2241f64789e9e27520ee.jpg",
"http://ct.fra.bz/ol/fz/sw/i49/5/7/29/frabz-WHEN-I-GAVE-THE-WRONG-ANSWER-i-SUDDENLY-FELT-SO-DEFLATED-7979bc.jpg",
"https://www.mememaker.net/static/images/memes/4374652.jpg",
"https://cdn.meme.am/instances/53997367.jpg",
"https://cdn.meme.am/cache/instances/folder247/51901247.jpg",
"https://cdn.meme.am/instances/60782291.jpg"
];

var memeNumberRight = 0;
var memeNumberWrong = 0;

/*function displayCorrectMeme() {
memeNumberRight = Math.floor(Math.random()*wrongMemes.length);
console.log("Correct meme: " + rightMemes[memeNumberRight] + ", meme Number is: " + memeNumberRight);
$('#imageLink').css('display','block');
$('#imageLink').attr('href', rightMemes[0]); //replace 0 with memeNumberRight when more right memes are added
$('#imageLink').trigger('click');
}

function displayIncorrectMeme() {
$('#imageLink').css('display','block');
memeNumberWrong = Math.floor(Math.random()*rightMemes.length);
console.log("Wrong memes: " + wrongMemes[memeNumberWrong] + ", meme Number is: " + memeNumberWrong);
$('#imageLink').attr('href', wrongMemes[memeNumberWrong]);
$('#imageLink').trigger('click');
}*/

/*function animateBtn1() {
  $('#answer1').animate({'left': '400'}, {
    duration: 3000,
    complete: function() {
      $('#answer1').animate({left: -400}, {
        duration: 3000,
        complete: animateBtn1
      });
    }
  });
}*/


function animateBtn1() {
  console.log($('#answer1').css('left'));
  $('#answer1').animate({'left': '400'},3000, function() {
    $('#answer1').animate({left: -400},3000,animateBtn1);
  });
}

function animateBtn2() {
  console.log($('#answer2').css('left'));
  $('#answer2').animate({'left': '-400'}, 6000, function(){
    $('#answer2').animate({'left': '400'}, 6000, animateBtn2);
  });
}

function animateBtn3() {
  console.log($('#answer3').css('left'));
  $('#answer3').animate({'left': '400'}, 7000, function(){
    $('#answer3').animate({'left': '-400'}, 7000, animateBtn3);
  });
}

function animateBtn4() {
  console.log($('#answer4').css('left'));
  $('#answer4').animate({'left': '-400'}, 9000, function(){
    $('#answer4').animate({'left': '400'}, 9000, animateBtn4);
  });
}
