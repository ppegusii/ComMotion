
var uiIdNameCount = 0;
var uiIdPhotoCount = 0;
var uiIdVideoCount = 0;

var workoutObj = {
   id: null,
   name: null,
   difficulty: null,
   creatorId: null,
   description: null,
   photos: new Array(),
   videos: new Array(),
   sequence: null,
   created: null
};

$(function () {
   initWorkoutObj();
   populateUIFields();
   initAddMediaButton();
   initSaveButton();
});

function initWorkoutObj() {
   var jsonString = $('#workoutObj').html();
   if(jsonString !== '') {
      var temp = JSON.parse(jsonString);
      console.log(temp);
      workoutObj.id = temp.id;
      workoutObj.name = temp.name;
      workoutObj.description = temp.description;
      workoutObj.difficulty = temp.difficulty;
      workoutObj.creatorId = temp.creatorId;
      workoutObj.sequence = temp.sequence;
      for(var i=0; i < temp.photos.length; i++)
         addPhoto(temp.photos[i].url, temp.photos[i].id);
      for(var i=0; i < temp.videos.length; i++)
         addVideo(temp.videos[i].url, temp.videos[i].id);
   }
   console.log('Workout obj is:');
   console.log(workoutObj);
}

function populateUIFields() {
   $('#workout_name').val(workoutObj.name);
   if(workoutObj.difficulty !== null)
      $('#difficulty').val(workoutObj.difficulty.name);
   $('#description').html(workoutObj.description);
   if(workoutObj.sequence !== null)
      $('#workoutDisplay').append(htmlForWorkout(workoutObj));
}

function removePhotoFn(selector, uiId) {
   return function(event) {
      // Remove from UI
      $(selector).remove();
      // Remove from workoutObj
      console.log('Checking for uiId = ' + uiId);
      var i = 0;
      for(i = 0; i < workoutObj.photos.length; i++) {
         if(workoutObj.photos[i].uiId === uiId) {
            workoutObj.photos.splice(i,1);
            return;
         }
      }
   };
}

function removeVideoFn(selector, uiId) {
   return function(event) {
      // Remove from UI
      $(selector).remove();
      // Remove from workoutObj
      console.log('Checking for uiId = ' + uiId);
      var i = 0;
      for(i = 0; i < workoutObj.videos.length; i++) {
         if(workoutObj.videos[i].uiId === uiId) {
            workoutObj.videos.splice(i,1);
            return;
         }
      }
   };
}

function initAddMediaButton() {
   var addMediaButton = $('#addMediaButton');
   addMediaButton.click(function(event) {
      var url = prompt('URL of media:').trim();
      if(isPhotoURL(url)) {
         console.log('Adding photo');
         addPhoto(url);
      }
      else if(isVideoURL(url)) {
         console.log('Adding video');
         addVideo(url);
      }
      else {
         console.log('Not photo or video!');
      }
   });
}

function addPhoto(url, id) {
   // add photo to workoutObj
   workoutObj.photos.push({
      id: (id === undefined ? null : id),
      url: url,
      uiId: uiIdPhotoCount
   });
   // add photo to view
   var htmlId = 'photo' + uiIdPhotoCount;
   var html = '<a class="btn btn-sm btn-primary" id="' + htmlId + '">' + url + '</a>';
   $('#enteredMedia').append(html);
   $('#'+htmlId).click(removePhotoFn('#'+htmlId, uiIdPhotoCount));
   uiIdPhotoCount++;
}

function addVideo(url, id) {
   // add video to workoutObj
   workoutObj.videos.push({
      id: (id === undefined ? null : id),
      url: url,
      uiId: uiIdVideoCount
   });
   // add video to view
   var htmlId = 'video' + uiIdVideoCount;
   var html = '<a class="btn btn-sm btn-primary" id="' + htmlId + '">' + url + '</a>';
   $('#enteredMedia').append(html);
   $('#'+htmlId).click(removeVideoFn('#'+htmlId, uiIdVideoCount));
   uiIdVideoCount++;
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
   var saveButton = $('#saveWorkoutButton');
   saveButton.click(function(event) {
      event.preventDefault();

      workoutObj.name = $('#workout_name').val();
      workoutObj.difficulty = toDifficulty($('#difficulty').val());
      workoutObj.description = $('#description').val();
      workoutObj.sequence = null; // remove sequence info

      $.ajax({
         type: "POST",
         url: '/create/editWorkout/save',
         contentType: 'application/json',
         data: JSON.stringify(workoutObj)
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