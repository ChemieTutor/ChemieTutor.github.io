// Variables
//var firebaseRef = firebase.database();
// USER INTERFACE
$("#showLogIn").click(function() {
  $("#logInForm").css("display", "block");
  $("#hide").css("display", "none");
    $("#hide1").css("display", "none");
  $("#buttons").css("display", "none");
});

$("#backBtn").click(function() {
  $("#logInForm").css("display", "none");
  $("#hide").css("display", "block");
    $("#hide1").css("display", "block");
  $("#buttons").css("display", "block");
});

$("#showSignUp").click(function() {
  $("#signUpForm").css("display", "block");
  $("#hide").css("display", "none");
    $("#hide1").css("display", "none");
  $("#buttons").css("display", "none");
});

$("#backBtn1").click(function() {
  $("#signUpForm").css("display", "none");
  $("#hide").css("display", "block");
    $("#hide1").css("display", "block");
  $("#buttons").css("display", "block");
});
// CREATE ACCOUNT
/*$("#createAcc").click(function() {
  var email = $("#emailAcc").val();
  var remail = $("#remailAcc").val();
  var password = $("#passwordAcc").val();
  var repassword = $("#repasswordAcc").val();
  var username = $("#displayNameAcc").val();
  var birthdate = $("#birthdateAcc").val();
  var gender = $("select[name=gender] option:selected").text();

  if (remail != email){
    alert("Emails do not match!");
    $("#signUpErrorDisplay").html("Error: Emails do not match!");
    $("#signUpErrorDisplay").css({'background-color':'#fff9c4'})
    $("#signUpErrorDisplay").css("display", "block");
  }

  if (repassword != password){
    alert("Password do not match!")
    $("#signUpErrorDisplay").html("Error: Passwords do not match!");
    $("#signUpErrorDisplay").css({'background-color':'#fff9c4'})
    $("#signUpErrorDisplay").css("display", "block");
  }


});*/
// LOG IN ACCOUNT
$('#logInAccBtn').on("click", function() {
  window.location = "homePage.html";
});
