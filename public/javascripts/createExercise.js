/**
<<<<<<< HEAD
* Created by Ryan on 4/16/14.
*/

var names = new Array();
var photoURLs = new Array();

$(function () {
   initAddNameButton();
   initAddMediaButton();
   initSaveButton();
});

function initAddNameButton() {
   var addNameButton = $('#addNameButton');
   addNameButton.click(function(event) {
      var name = prompt('New name:');
      if(name !== '') {
         console.log('Entered name ' + name);
         // add name to model
         names.push(name);
         // add name to view
         var html = '<a class="btn btn-sm btn-primary">' + name + '</a>';
         $('#enteredNames').append(html);
      }
      else
         console.log('Entered empty name!');
   });
}

function initAddMediaButton() {
   var addMediaButton = $('#addMediaButton');
   addMediaButton.click(function(event) {
      var url = prompt('URL of media:');
      if(url !== '') {
         console.log('Entered url ' + url);
         // add url to model
         photoURLs.push(url);
         // add url to view
         var html = '<a class="btn btn-sm btn-primary">' + url + '</a>';
         $('#enteredMedia').append(html);
      }
      else
         console.log('Entered empty url!');
   });
}

function initSaveButton() {
   var saveButton = $('#saveExerciseButton');
   saveButton.click(function(event) {
      event.preventDefault();

      // data object to send with AJAX
      var data = {};
      data.names = names;
      data.difficulty = $('#difficulty').val();
      data.description = $('#description').val();
      data.musclegroup = $('#musclegroup').val();
      data.photos = photoURLs;

      //alert('Sending this information: ' + JSON.stringify(data));

      $.ajax({
         type: "POST",
         url: '/create/exercise/save',
         contentType: 'application/json',
         data: JSON.stringify(data)
      })
         .done(function(res) {
            var goTo = res;
            // go to goTo url
            console.log('Going to: ' + goTo);
            document.location = goTo;
         })
         .fail(function(res) {
            console.log('Error: ' + res.responseText);
            var html = '<div class="alert alert-danger" role="alert" style="margin-bottom: 15px">' +
               '<p class="error">' + res.responseText + '</p></div>';
            $('#errorSection').html(html);
         });
   });
}