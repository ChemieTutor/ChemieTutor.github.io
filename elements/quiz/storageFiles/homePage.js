// Variables
var firebaseRef = firebase.database();
$('#showMore').on("click", function() {
  $('#older_announcements').css('display', 'block');
  $('#showMore').css('display', 'none');
  $('#showLess').css('display', 'block');
});
$('#showLess').on("click", function() {
  $('#older_announcements').css('display', 'none');
  $('#showMore').css('display', 'block');
  $('#showLess').css('display', 'none');

});
// Write Announcement
$('#write_Announcement').on("click", function() {
  //Local Variables
  var username = $('#announcement_user').val();
  var subject = $('#announcement_subject').val();
  var text = $('#announcement_message').val();
  var pinned;
  var checked = $('#filled-in-box').is(':checked');

  if (checked) {
    pinned = "True";
  } else {
    pinned = "False";
  }
  console.log(pinned);
  // This function creates the key and stores it in the Firebase database
  firebaseRef.ref('/Announcements').child(username).set({
    username: username,
    title: subject,
    message: text,
    pin: pinned,
    display_name: username
    // pic: user picture here
    // display_name: displayName
  });
  // Console logs
  console.log("CREATES Announcement: Announcer: " + username + ', Subject is ' + subject + ', Text is ' + text + ', Pinned?: is ' + pinned);
  $('#announcement_user').val('');
  // Remove once user is authenticated! ^
  $('#announcement_subject').val('');
  $('#announcement_message').val('');
  $(checked).removeAttr('selected ');
});
// Loops through the Firebase data on Announcements and then outputs each value
firebaseRef.ref('/Announcements').on("child_added", snap => {
  var subject = snap.child("title").val();
  var message = snap.child("message").val();
  var displayName = snap.child("display_name").val();
  var pinStatus = snap.child("pin").val();
  // Console log this to make sure
  console.log("1. " + subject + " 2. " + message + " 3. " + displayName);

  var newCard = $('#announcement_card').clone();
  newCard.removeAttr('id');
  newCard.find('.title').text(displayName);
  newCard.find('#subject').html(subject);
  newCard.find('#message').html(message);
  newCard.removeAttr('style');
  // Verifies if the card is pinned or not and displays it as so
  if (pinStatus == "True") {
    newCard.find('#logo').html('new_releases');
    newCard.find('#logo').addClass('red-text');
    $('#pinned_announcements').append(newCard);

  } else {
    newCard.find('#logo').html('message');
    $('#most_recent_announcements').append(newCard);
  };
  var cardNumber = $('div #most_recent_announcements .collection').length;
  console.log("Number of cards: " + cardNumber);
  $('#loader_section').css('display', 'none');
  $('#1').css('display', 'block');
  $('#2').css('display', 'block');
  if (cardNumber > 3) {
    $('#older_announcements').append(newCard);
  }
  var pinNumber = $('div #pinned_announcements .collection').length;
  var newpinNumber = pinNumber - 1;
  $('#p_announce').text('Pinned Announcements (' + newpinNumber + '):');
  var oldNumber = $('div #older_announcements .collection').length;
  $('#old_announce').text('Older Announcements (' + oldNumber + '):');
  var newcardNumber = cardNumber - 1;
  $('#announce').text('Announcements (' + newcardNumber + '):');
  console.log('# of cards in Pinned Announcements: ' + newpinNumber + ', # of old cards ' + oldNumber + ', # of recent cards ' + newcardNumber);
});
