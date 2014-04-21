/**
<<<<<<< HEAD
* Created by Ryan on 4/16/14.
*/

var names = new Array();
var photoURLs = new Array();
var videoURLs = new Array();

$(function () {
   initAddNameButton();
   initAddMediaButton();
   initSaveButton();
});

function initAddNameButton() {
   var addNameButton = $('#addNameButton');
   addNameButton.click(function(event) {
      var name = prompt('New name:').trim();
      console.log(name);
      if(name !== '' && name !== null) {
         console.log('Entered name "' + name + '"');
         // add name to model
         names.push(name);
         // add name to view
         var html = '<a class="btn btn-sm btn-primary">' + name + '</a>';
         $('#enteredNames').append(html);
      }
      else
         console.log('Improper name format!');
   });
}

function initAddMediaButton() {
   var addMediaButton = $('#addMediaButton');
   addMediaButton.click(function(event) {
      var url = prompt('URL of media:').trim();
      if(isPhotoURL(url) || isVideoURL(url)) {
         console.log('Entered url ' + url);
         // add url to model
         if(isPhotoURL(url))
            photoURLs.push(url);
         else
            videoURLs.push(url);
         // add url to view
         var html = '<a class="btn btn-sm btn-primary">' + url + '</a>';
         $('#enteredMedia').append(html);
      }
      else
         console.log('Not photo or video!');
   });
}

function isPhotoURL(url) {
   // check spaces
   if(url === null || url.indexOf(' ') >= 0)
      return false;
   // check ending in .jpg, .jpeg, or .png
   var fourCharEnd = url.substring(url.length-4);
   var fiveCharEnd = url.substring(url.length-5);
   if(fourCharEnd !== '.jpg' && fourCharEnd !== '.png' && fiveCharEnd !== '.jpeg')
      return false;
   return true;
}

// hash part has 11 chars
function isVideoURL(url) {
   if(url === null || url.indexOf(' ') >= 0)
      return false;
   if(url.indexOf('www.youtube.com') >= 0) {
      // check embed format
      var embedPart = 'www.youtube.com/embed/';
      if(url.indexOf(embedPart) >= 0) {
         console.log('Video embed format');
         console.log(url.substring(url.indexOf(embedPart)+embedPart.length));
         return (url.substring(url.indexOf(embedPart)+embedPart.length).length === 11);
      }
      else {
         return url.indexOf('www.youtube.com/watch?v=') >= 0;
      }
   }
   return false;
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