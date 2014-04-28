/**
<<<<<<< HEAD
* Created by Ryan on 4/16/14.
*/

var uiIdNameCount = 0;
var uiIdPhotoCount = 0;
var uiIdVideoCount = 0;

var exerciseObj = {
   id: null,
   description: null,
   difficulty: null,
   musclegroup: null,
   created: null,
   names: new Array(),
   photos: new Array(),
   videos: new Array()
};

$(function () {
   initAddNameButton();
   initAddMediaButton();
   initSaveButton();
   initExerciseObj();
});

function initExerciseObj() {
   var jsonString = $('#exerciseObj').html();
   if(jsonString !== '') {
      var temp = JSON.parse(jsonString);
      exerciseObj.id = temp.id;
      exerciseObj.description = temp.description;
      exerciseObj.difficulty = temp.difficulty;
      exerciseObj.musclegroup = temp.musclegroup;
      for(var i=0; i < temp.names.length; i++)
         addName(temp.names[i].name, temp.names[i].id);
      exerciseObj.photos = temp.photos;
      exerciseObj.videos = temp.videos;
   }
   console.log('Exercise obj is:');
   console.log(exerciseObj);
}

function initAddNameButton() {
   var addNameButton = $('#addNameButton');
   addNameButton.click(function(event) {
      var name = prompt('New name:').trim();
      console.log(name);
      addName(name);
   });
}

function addName(name, id) {
   if(name !== '' && name !== null) {
      console.log('Entered name "' + name + '"');
      console.log('Entered with id: ' + id);
      // add name to exerciseObj
      exerciseObj.names.push({
         id: (id === undefined ? null : id),
         name: name,
         uiId: uiIdNameCount
      });
      // add name to view
      var htmlId = 'name' + uiIdNameCount;
      var html = '<a class="btn btn-sm btn-primary" id="' + htmlId + '">' + name + '</a>';
      $('#enteredNames').append(html);
      $('#'+htmlId).click(removeNameFn('#'+htmlId, uiIdNameCount));
      uiIdNameCount++;
   }
   else
      console.log('Improper name format!');
}

function removeNameFn(selector, uiId) {
   return function(event) {
      // Remove from UI
      $(selector).remove();
      // Remove from exerciseObj
      console.log('Checking for uiId = ' + uiId);
      for(var i = 0; i < exerciseObj.names.length; i++) {
         console.log(exerciseObj.names[i].uiId);
         if(exerciseObj.names[i].uiId === uiId) {
            exerciseObj.names.splice(i,1);
            return;
         }
      }
   };
}

function initAddMediaButton() {
   var addMediaButton = $('#addMediaButton');
   addMediaButton.click(function(event) {
      var url = prompt('URL of media:').trim();
      if(isPhotoURL(url) || isVideoURL(url)) {
         console.log('Entered url ' + url);
         // add url to exerciseObj
         if(isPhotoURL(url)) {
            exerciseObj.photos.push({
               id: null,
               url: url
            });
         }
         else {
            exerciseObj.videos.push({
               id: null,
               url: url
            });
         }
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

      exerciseObj.difficulty = toDifficulty($('#difficulty').val());
      exerciseObj.description = $('#description').val();
      exerciseObj.musclegroup = toMusclegroup($('#musclegroup').val());
      //alert(JSON.stringify(exerciseObj));

      $.ajax({
         type: "POST",
         url: '/create/exercise/save',
         contentType: 'application/json',
         data: JSON.stringify(exerciseObj)
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

function toDifficulty(difficulty) {
   var did = -1;
   if(difficulty === 'Beginner')
      did = 1;
   if(difficulty === 'Intermediate')
      did = 2;
   if(difficulty === 'Advanced')
      did = 3;
   return {id: did, name: difficulty};
}

function toMusclegroup(musclegroup) {
   var mid = -1;
   if(musclegroup === 'Whole body')
      mid = 1;
   if(musclegroup === 'Upper body')
      mid = 2;
   if(musclegroup === 'Lower body')
      mid = 3;
   if(musclegroup === 'Core')
      mid = 4;
   return {id: mid, name: musclegroup};
}