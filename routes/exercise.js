var models = require('../models/index.js');
var data = require(process.env.DATA);

exports.createExercise = function(req, res) {
   console.log('Executing createExercise');
   var flash = req.flash('editExercise');
   //console.log(flash);
   if(flash.length !== 0) {
      var exercise = JSON.parse(flash);
      console.log(exercise);
      console.log(exercise.names);
      res.render('create/exercise', {
         title: 'Edit exercise',
         exercise: exercise
      });
   }
   else {
      res.render('create/exercise', {
         title: 'Create exercise',
         exercise: undefined
      });
   }
}

exports.editExercise = function(req, res) {
   console.log('Executing editExercise');
   var eid = req.query.eid;
   console.log('Found eid ' + eid);
   data.exerciseGetById({id: eid}, function(err, exercise) {
      if(err) {
         console.log(err.message);
         res.send(500, err.message);
      }
      else {
         console.log('Sending exercise ' + JSON.stringify(exercise[0]));
         req.flash('editExercise', JSON.stringify(exercise[0]));
         res.redirect('/create/exercise');
      }
   });
}

exports.saveexercise = function(req, res) {

   var queExercise = {
      names: toNames(req.body.names),
      difficulty: toDifficulty(req.body.difficulty),
      description: req.body.description,
      musclegroup: toMusclegroup(req.body.musclegroup),
      photos: toPhotos(req.body.photos),
      videos: []
   };
   console.log(queExercise);
   data.exerciseInit({exercise: queExercise}, function(err, resExercise) {
      if(err)
         res.send(500, err.message);
      else {
         var goTo = '/encyclopedia/exercise_entry?eid=' + resExercise.id;
         res.send(200, goTo);
      }
   })
};

exports.cancelexercise = function(req, res) {
   var eid = req.query.eid;
   if(eid)
      res.redirect('/encyclopedia/exercise_entry?eid=' + eid);
   else
      res.redirect('/create');
}

exports.encyclopedia_exercise_entry = function(req, res) {
   var eid = req.query.eid;
   console.log('eid = ' + eid);
   data.exerciseGetById({id: eid}, function(err, exercise) {
      if(err) {
         console.log(err.message);
         res.send(500, err.message);
      }
      else {
         res.render('encyclopedia/exerciseentry', exercise[0]);
      }
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
   return new models.Difficulty(did, difficulty);
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
   return new models.Difficulty(mid, musclegroup);
}

// Convert string array to names array
function toNames(namesArray) {
   var ret = Array();
   for(var i = 0; i < namesArray.length; i++) {
      var nameObj = new models.Name(undefined, namesArray[i], undefined, undefined, undefined);
      ret.push(nameObj);
   }
   return ret;
}

function toPhotos(photosArray) {
   var ret = Array();
   for(var i = 0; i < photosArray.length; i++) {
      var photoObj = new models.Photo(undefined, photosArray[i], undefined, undefined);
      ret.push(photoObj);
   }
   return ret;
}

function toVideos(videosArray) {
   var ret = Array();
   for(var i = 0; i < videosArray.length; i++) {
      var videoObj = new models.Video(undefined, videosArray[i], undefined, undefined);
      ret.push(videoObj);
   }
   return ret;
}