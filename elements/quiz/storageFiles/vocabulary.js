// Variables
var firebaseRef = firebase.database();

// VOCABULARY
$("#write_Word").on("click", function() {
  // Local Variables
  var word = $('#add_Word').val();
  var speech = $('#add_Speech').val();
  var section = $('#add_Section option:selected').text();
  var definition = $('#add_Definition').val();
  // This function creates the key and stores it in the Firebase database
  firebaseRef.ref('/Vocabulary').child(word).set({
    word: word,
    section: section,
    speech: speech,
    definition: definition
  });
  // Console logs
  console.log("CREATES WORD: Word: " + word + ', Speech is ' + speech + ', Definition is ' + definition + ', Section Selected is ' + section);
  $('#add_Word').val('');
  $('#add_Speech').val('');
  $('#add_Definition').val('');
  Materialize.toast('Vocabulary List Updated!&nbsp<b><u><a href="">Reload</a></u></b>', 5000);
});
// Loops through the Firebase data on Vocabulary and then outputs each value
firebaseRef.ref('/Vocabulary').on("child_added", snap => {
  var word = snap.child("word").val();
  var definition = snap.child("definition").val();
  var speech = snap.child("speech").val();
  var section = snap.child("section").val();
  //var sectionColor;
  // Console logs
  console.log("CHECKS WORD: Word is: " + word + ', Definition is ' + definition + ', Speech is ' + speech + ', Section is ' + section);
  // Creates a clone of the vocab card to edit
  var newCard = $('#card').clone();
  newCard.removeAttr('id');
  newCard.find('.card-title').text(word);
  newCard.find('#speech').html(speech);
  newCard.find('#definition').html(definition);
  //newCard.css('border-color', sectionColor)
  newCard.removeAttr('style');
  // Verifies the section of the cards and then changes the border colors based on so
  if (section == "General"){
    newCard.css('border-color', '#2196f3');
  } else if (section == "Unit 1") {
    newCard.css('border-color', '#4caf50');
  } else if (section == "Unit 2") {
    newCard.css('border-color', '#ee6e73');
  }
  // Appends the vocab card to the "card_holder" div
  $('#card_holder').append(newCard);
  $('#loader_section').css('display', 'none');
  $('#card_holder').css('display', 'block');
  // Edit button
  newCard.find('#edit_button').on("click", function() {
    console.log("The edit button works!");
    // replaces current elements with input fields
    newCard.find('.card-title').replaceWith("<div class='input-field inline'><input disabled id='update_Worde' type='text'></input><label for='update_Worde' class='active'>Vocabulary Word</label></div>");
    newCard.find('#update_Worde').val(word);
    newCard.find('#speech').replaceWith("<div class='input-field inline'><input id='update_Speeche' type='text'></input><label for='update_Speeche' class='active'>Word Speech</label></div>");
    newCard.find('#update_Speeche').val(speech);
    newCard.find('#section').replaceWith("<div class='input-field inline'><input id='update_Sectione' type='text'></input><label for='update_Sectione' class='active'>Section</label></div>");
    newCard.find('#update_Sectione').val(section);
    newCard.find('#definition').replaceWith("<div class='input-field'><textarea id='update_Definitione' class='materialize-textarea'></textarea><label for='update_Definitione' class='active'>Definition</label></div>");
    newCard.find('#update_Definitione').val(definition);
    newCard.find('.card-action').css("display", "block");
    // Does indeed update
    newCard.find('#update_button').on("click", function() {
      var newWord = $('#update_Worde').val();
      var newSection = $('#update_Sectione').val();
      var newSpeech = $('#update_Speeche').val();
      var newDef = $('#update_Definitione').val();
      // This function updates the key and stores it in the Firebase database
      firebaseRef.ref('/Vocabulary/' + word).set({
        word: word,
        section: newSection,
        speech: newSpeech,
        definition: newDef
      });
      // Console logs
      console.log('1: ' + newWord + ' 2: ' + newSection + ' 3: ' + newSpeech + ' 4: ' + newDef);
      // Returns the card back to normal with updated stuff
      var newCardInside = $('#card_Inside').clone();
      console.log("The Upgrade button works!")
      newCardInside.find('.card-title').text(newWord);
      newCardInside.find('#speech').html(newSpeech);
      newCardInside.find('#definition').html(newDef);
      // Checks to see what section the word is in and then changes the border color
      if (newSection == "General"){
        newCard.css('border-color', '#2196f3');
      } else if (newSection == "Unit 1") {
        newCard.css('border-color', '#4caf50');
      } else if (newSection == "Unit 2") {
        newCard.css('border-color', '#ee6e73');
      }
      // Hides the "Card-Action" and removes the "editable" view of the cards
      newCard.find('.card-action').css("display", "none");
      newCard.find('#card_Inside').remove();
      // Appends the new, updated "normal" view of the vocab cards
      newCard.append(newCardInside);
      Materialize.toast('Vocabulary Word Updated!&nbsp<b><u><a href="">Reload</a></u></b>', 5000);
    });
    // Disregards update
    newCard.find('#disregard_button').on("click", function() {
      var newCardInside = $('#card_Inside').clone();
      console.log("The Disregard Upgrade button works!")
      newCardInside.find('.card-title').text(word);
      newCardInside.find('#speech').html(speech);
      newCardInside.find('#definition').html(definition);
      newCard.find('.card-action').css("display", "none");
      newCard.find('#card_Inside').remove();
      newCard.append(newCardInside);
    });
    newCard.find('#delete_button').on("click", function() {
      firebaseRef.ref('/Vocabulary/' + word).remove();
      newCard.remove();
      console.log("REMOVE: Successfully removed card and vocabulary word from Firebase!");
      Materialize.toast('Vocabulary Word Removed!', 4000);
    });
  });
});
