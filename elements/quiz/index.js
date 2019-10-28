// Variables
var questionType;
var baseURL = "https://script.google.com/macros/s/AKfycbw49D3_9O7I8yi48PKmewF-XmqbzXEpylu-YjMGZYmmiehBewcA/exec";
var parameters = {};
var questionNumber;
var questionData;
var currentQuestionData;
var quizNumQuestions = 0;
var chosenAnswer;
var numCorrect = 0;
var numWrong = 0;
var objCurrentQuestion, currentQuestionIndex = 0;
var qIdx;
var points = 0;
var wrong = 0;
var uniqueRandoms = [];
var numRandoms = 10;
// Functions

$(document).ready(function(){
  getData();
  $('#answer1').click(function () {
    var button = "1";
    console.log($(this).val());
    chosenAnswer = $(this).val();
    processAnswer($(this).val(), button);
  });
  $('#answer2').click(function () {
    var button = "2";
    console.log($(this).val());
    chosenAnswer = $(this).val();
    processAnswer($(this).val(), button);
  });
  $('#answer3').click(function () {
    var button = "3";
    console.log($(this).val());
    chosenAnswer = $(this).val();
    processAnswer($(this).val(), button);
  });
  $('#answer4').click(function () {
    var button = "4";
    console.log($(this).val());
    chosenAnswer = $(this).val();
    processAnswer($(this).val(), button);
  });
});
// Buttons
$('#monatomicTopicBtn').click(function() {
  //alert('Works, great.');
  questionType = "Monatomic";
  $('#initialPage').css('display', 'none');
  $('#loadingPage').css('display', 'block');
  console.log('Monotomic Button: ' + questionType);
  getQuestionLength(questionType);
});
$('#polyatomicTopicBtn').click(function() {
  //alert('Works, great.');
  questionType = "Polyatomic";
  $('#initialPage').css('display', 'none');
  $('#loadingPage').css('display', 'block');
  console.log('Polyatomic Button: ' + questionType);
  getQuestionLength(questionType);
});
$('#versionTwoTopicBtn').click(function() {
  //alert('Works, great.');
  questionType = "Type III";
  $('#initialPage').css('display', 'none');
  $('#loadingPage').css('display', 'block');
  console.log('Type II Button: ' + questionType);
  getQuestionLength(questionType);
});
$('#backBtn').click(function(){
  window.location.reload();
});
$('#backBtn1').click(function() {
  window.location.reload();
});
$('#summaryPageLoader').click(function() {
  $('#initialPage').css('display', 'none');
  $('#loadingPage').css('display', 'none');
  $('#summaryPage').css('display', 'block');
});


function getData() {
  var db = new Dexie("questions_Database");
  db.version(1).stores({
    questions: 'id'
  });

  db.on('ready', function () {
    // on('ready') event will fire when database is open but
    // before any other queued operations start executing.
    // By returning a Promise from this event,
    // the framework will wait until promise completes before
    // resuming any queued database operations.
    // Let's start by using the count() method to detect if
    // database has already been populated.
    return db.questions.count(function (count) {
      if (count > 0) {
        console.log("Data already populated onto database.");
      } else {
        console.log("Database is empty. Populating from ajax call...");
        // We want framework to continue waiting, so we encapsulate
        // the ajax call in a Dexie.Promise that we return here.
        return new Dexie.Promise(function (resolve, reject) {
          $.ajax({
            url: baseURL,
            dataType: 'jsonp',
            jsonpCallback: 'processResponse',
            data: parameters,
            error: function (xhr, textStatus, error) {
              // Rejecting promise to make db.open() fail.
              var err = textStatus + ", " + error;
              alert("Request Failed: " + err);
              console.log("Request Failed: " + err);
              reject(textStatus);
            },
            success: function (data) {
              // Resolving Promise will launch then() below.
              resolve(data);
            }
          });
        }).then(function (data) {
          console.log("Got ajax response. We'll now add the objects.");
          // By returning the db.transaction() promise, framework will keep
          // waiting for this transaction to commit before resuming other
          // db-operations.
          return db.transaction('rw', db.questions, function () {
            db.questions.add({id: "Questions", value: data});
            console.log('Data at this point: ' + data);
            console.log('Alright, data has been updated');
          });
        }).then(function () {
          console.log ("Transaction committed");
        });
      }
    });
  });

  db.open(); // Will resolve when data is fully populated (or fail if error)

  // Following operation will be queued until we're finished populating data:
  db.questions.get('Questions').then(function (data) {
    questionData = data.value;
    $('#loader_Section_InitialPage').css('display', 'none');
    $('#btn_Section').css('display', 'block');
  });

}

function getQuestionLength(questionTypeIdx) {
  var type = questionTypeIdx;
  console.log('The type is: ' + type);
  currentQuestionData = questionData.filter(function(v){
    //console.log(v);
    return v["Ion Type"] == type;
  });
  console.log(currentQuestionData);
  console.log('New Filtered Data: ' + currentQuestionData.length);
  quizNumQuestions = currentQuestionData.length;
  loadQuestionsPage();
}

function loadQuestionsPage() {
  var qIdx = Math.floor(Math.random()*quizNumQuestions)
  console.log(qIdx);
  //var q = quizNumQuestions.splice(qIdx,1)[0];
  currentQuestionIndex = qIdx;
  questionNumber = 0;
  displayQuestion(currentQuestionIndex);
  console.log("Load Question Function seems fine");
};

function displayQuestion(intQuestionIndex) {
  objCurrentQuestion = currentQuestionData[intQuestionIndex];
  console.log(objCurrentQuestion);
  //alert(objCurrentQuestion);
  loadQuestion(objCurrentQuestion);
};

function loadQuestion(objQuestion) {
  endTimer();
  var answerNum1;
  var answerNum2;
  var answerNum3;
  var answerNum4;
  //console.log(objQuestion);
  var questionNumberCounter = questionNumber + 1;
  $("#currentQuestion").html('Question: ' + questionNumberCounter + ' | ' + quizNumQuestions);
  $("#question").html(objQuestion.Question);
  if (objQuestion['Ion Type'] == "Monatomic") {
    $('#ion').html('' + objQuestion.Symbol + '<sup>' + objQuestion.Strength + objQuestion.Charge + '<sup>');
    answerNum1 = objQuestion.Answer1;
    answerNum2 = objQuestion.Answer2;
    answerNum3 = objQuestion.Answer3;
    answerNum4 = objQuestion.Answer4;
  } else if (objQuestion['Ion Type'] == "Polyatomic") {
    var formatted = getFormattedIon(''+ objQuestion.Symbol + objQuestion.Strength + objQuestion.Charge);
    console.log("Formatted Ion: " + formatted);
    $('#ion').html(formatted);
    answerNum1 = objQuestion.Answer1;
    answerNum2 = objQuestion.Answer2;
    answerNum3 = objQuestion.Answer3;
    answerNum4 = objQuestion.Answer4;
  } else if (objQuestion['Ion Type'] == "Type III") {
    $('#ion').html(capitalizeFirstLetter(objQuestion.Ion));
    answerNum1 = getFormattedIon(objQuestion.Answer1);
    answerNum2 = getFormattedIon(objQuestion.Answer2);
    answerNum3 = getFormattedIon(objQuestion.Answer3);
    answerNum4 = getFormattedIon(objQuestion.Answer4);
    $('#answer1').addClass('no-transform');
    $('#answer2').addClass('no-transform');
    $('#answer3').addClass('no-transform');
    $('#answer4').addClass('no-transform');
    $('#answer1').addClass('answer');
    $('#answer2').addClass('answer');
    $('#answer3').addClass('answer');
    $('#answer4').addClass('answer');
  }
  console.log(answerNum1);
  console.log(answerNum2);
  console.log(answerNum3);
  console.log(answerNum4);
  $('#answer1').html("1. " + answerNum1);
  $('#answer1').attr('value', objQuestion.Answer1);
  $('#answer2').html("2. " + answerNum2);
  $('#answer2').attr('value', objQuestion.Answer2);
  $('#answer3').html("3. " + answerNum3);
  $('#answer3').attr('value', objQuestion.Answer3)
  $('#answer4').html("4. " + answerNum4);
  $('#answer4').attr('value', objQuestion.Answer4);
  $('#answer1').removeClass('disabled');
  $('#answer2').removeClass('disabled');
  $('#answer3').removeClass('disabled');
  $('#answer4').removeClass('disabled');
  $('#loader_section').css('display', 'none');
  $("#question_section").css('display', 'block');
  startTimer();
  startAnimations($('#answer1'));
  startAnimations($('#answer2'));
  startAnimations($('#answer3'));
  startAnimations($('#answer4'));
  wrong = 0;
};

// A FUNCTION THAT READS THE IONS
function isNumberic(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
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
}
// Capitalizes the first letter of a word
function capitalizeFirstLetter(wordIdx) {
  //Capitalizes the first letter of a word
  var word = wordIdx;
  var newWord;
  //newWord = word.substr(0, 1).toUpperCase() + word.substr(1).toLowerCase();
  newWord = word.substr(0, 1).toUpperCase() + word.substr(1);
  console.log(newWord);
  return newWord;
}


// Check Answers
// I am not sure if Ms. Trine still wants the memes to be displayed when the wrong answer choices are wrong.
function processAnswer(intAnswerIndex, buttonIndex) {
  //endProgressBar();
  //endTimer();
  if (intAnswerIndex == objCurrentQuestion.CorrectAnswer) {
    if (wrong > 1) {
      console.log('Do not award any points');
    } else {
      numCorrect++;
    }
    //displayCorrectMeme(buttonIndex);
    //endTimer();
    console.log('Questions correct' + numCorrect);
    displayRightMessage(numCorrect);
  } else {
    //numWrong++;
    checkAnswer(buttonIndex);
  }
}

function checkAnswer(btnIdx) {
  var buttonIndex = btnIdx;
  //var correctAnswer = objCurrentQuestion.CorrectAnswer;
  var chosenAnswer = chosenAnswer;
  var button;
  var questionsRight = 0;
  console.log('The button index is: ' + buttonIndex);
  if (buttonIndex == "1") {
    button = $('#answer1');
    wrong++;
    endAnimations(button);
    button.addClass('disabled');
    displayWrongMessage(questionsRight);
  } else if (buttonIndex == "2") {
    button = $('#answer2');
    wrong++;
    endAnimations(button);
    button.addClass('disabled');
    displayWrongMessage(questionsRight);
  } else if (buttonIndex == "3") {
    button = $('#answer3');
    wrong++;
    endAnimations(button);
    button.addClass('disabled');
    displayWrongMessage(questionsRight);
  } else if (buttonIndex == "4") {
    button = $('#answer4');
    wrong++;
    endAnimations(button);
    button.addClass('disabled');
    displayWrongMessage(questionsRight);
  }
  if (wrong == 3) {
    //alert('All wrong buttons have been clicked.');
  }
  //alert("Oops, you got the answer wrong. The correct answer is " + correctAnswer + ", you selected " + answerChosen + ".");
  //displayIncorrectMeme();
}

// TIMER TEST
var secondsRemaining = 25; //20 seconds and time interval of 0300, 25 seconds and interval of 0370
var progress = 100;
var valueBar;
var finalValue;
var timeVariable;
var timeRemaining;

function startTimer() {
  //set timer
  $('#timer').html('Time Left: 0:' + secondsRemaining);
  timeVariable = setInterval(myTimer, 1000);
}

var myTimer = function() {
  timeRemaining = --secondsRemaining;
  $("#timer").html("Time Left: 0:" + timeRemaining);
  if (timeRemaining < 10) {
    $("#timer").html("Time Left: 0:0" + timeRemaining);
  }
  if (timeRemaining == 0) {
    //processAnswer();
    displayTimeOver();
    endTimer();
  }
}

function endTimer() {
  //processAnswer();
  secondsRemaining = 25;
  clearInterval(timeVariable);
}


function displayRightMessage(correctIdx) {
  var correctAnswerDisplay;
  endTimer();
  var button1 = $('#answer1');
  var button2 = $('#answer2');
  var button3 = $('#answer3');
  var button4 = $('#answer4');
  endAnimations(button1);
  endAnimations(button2);
  endAnimations(button3);
  endAnimations(button4);
  $('#pointCounter').html('');
  $('#totalPoints').html('');
  $('#displayMessage_Message').html('');
  $('#displayMessage_User_Selected').html('');
  $('#displayMessage').removeClass('orange');
  $('#displayMessage').removeClass('red');
  $('#displayMessage').removeClass('green');
  var questionsCorrect = correctIdx;
  if ((questionType == "Monatomic") || (questionType == "Polyatomic")) {
    correctAnswerDisplay = objCurrentQuestion.CorrectAnswer;
  } else if (questionType == "Type III") {
    correctAnswerDisplay = getFormattedIon(objCurrentQuestion.CorrectAnswer);
  }
  points = correctIdx * 100;
  console.log('Total points: ' + points);
  if ((wrong <= 1) || (wrong == 0)) {
    $('#pointCounter').html('+100');
  } else if (wrong >= 2) {
    $('#pointCounter').html('+0');
  }
  $('#totalPoints').html('Current Points: ' + points);
  $('#displayMessage_Message').html('Correct!');
  $('#displayMessage_User_Selected').html('The correct answer is: <b>' + correctAnswerDisplay +  '</b>');
  console.log('Display message');
  $('#displayMessage').addClass('green');
  $('#displayMessage').fadeIn();
  setTimeout(function() {
    $('#displayMessage').fadeOut();
    questionNumber++;
    if (questionNumber < quizNumQuestions) {
      displayQuestion(Math.floor(Math.random()*quizNumQuestions));
    }else {
      console.log('All questions done.');
      loadSummaryPage();
    };
  }, 2000);
}

function displayWrongMessage(wrongIdx) {
  //endTimer();
  // Clean card
  $('#pointCounter').html('');
  $('#totalPoints').html('');
  $('#displayMessage_Message').html('');
  $('#displayMessage_User_Selected').html('');
  $('#displayMessage').removeClass('orange');
  $('#displayMessage').removeClass('red');
  $('#displayMessage').removeClass('green');
  var questionsWrong = wrongIdx;
  points = numCorrect * 100;
  console.log('Total points: ' + points);
  $('#pointCounter').html('+0');
  $('#totalPoints').html('Current Points: ' + points);
  console.log('Display incorrect message');
  $('#displayMessage_Message').html('Incorrect!');
  $('#displayMessage').addClass('red');
  $('#displayMessage').fadeIn();
  setTimeout(function() {
    $('#displayMessage').css('display', 'none');
  }, 3000);
}

function displayTimeOver() {
  // Clean card
  var button1 = $('#answer1');
  var button2 = $('#answer2');
  var button3 = $('#answer3');
  var button4 = $('#answer4');
  endAnimations(button1);
  endAnimations(button2);
  endAnimations(button3);
  endAnimations(button4);
  $('#pointCounter').html('');
  $('#totalPoints').html('');
  $('#displayMessage_Message').html('');
  $('#displayMessage_User_Selected').html('');
  $('#displayMessage').removeClass('orange');
  $('#displayMessage').removeClass('red');
  $('#displayMessage').removeClass('green');
  points = numCorrect * 100;
  console.log('Total points: ' + points);
  $('#pointCounter').html('+0');
  $('#totalPoints').html('Current Points: ' + points);
  console.log('Display incorrect message');
  $('#displayMessage_Message').html('Time is up!');
  $('#displayMessage').addClass('orange');
  $('#displayMessage').fadeIn();
  setTimeout(function() {
    $('#displayMessage').css('display', 'none');
    questionNumber++;
    if (questionNumber < quizNumQuestions) {
      displayQuestion(Math.floor(Math.random()*quizNumQuestions));
    }else {
      console.log('All questions done.');
      loadSummaryPage();
    };
  }, 3000);
}

function loadSummaryPage() {
  var questionsRight = numCorrect * 100;
  var percentage = (numCorrect / quizNumQuestions) * 100;
  var finalPercentage = percentage + '%';
  endTimer();
  $('#initialPage').css('display', 'none');
  $('#loadingPage').css('display', 'none');
  $('#test_Type').html('Test Type: ' + questionType);
  $('#questions_Right').html('Total Right: ' + questionsRight);
  $('#num_Questions').html('Total Questions:' + quizNumQuestions);
  $('#percentage_Questions').html('Percentage Right: ' + finalPercentage);
  $('#loader_section_summaryPage').css('display', 'none');
  $('#summaryPage').css('display', 'block');
}

function generateRandomNumber() {
  // refill the array if needed
  if (!uniqueRandoms.length) {
    for (var i = 0; i < numRandoms; i++) {
      uniqueRandoms.push(i);
    }
  }
  var index = Math.floor(Math.random() * uniqueRandoms.length);
  var val = uniqueRandoms[index];
  // now remove that value from the array
  uniqueRandoms.splice(index, 1);
  return val;
}

function startAnimations(buttonIndex) {
  var button = buttonIndex;
  var time = generateRandomNumber();
  var speed = time.toString() + 's';
  button.css('-webkit-animation-play-state', '');
  button.css('animation-play-state', '');
  console.log('Speed for this button is: ' + speed);
  button.css('-webkit-animation-delay', speed);
  button.css('animation-delay', speed);
  button.addClass('animation');
  console.log('Animations have started.');
}

function endAnimations(buttonIndex) {
  var button = buttonIndex;
  button.css('-webkit-animation-play-state', 'paused');
  button.css('animation-play-state', 'paused');
  console.log('Animation has ended.');
}
