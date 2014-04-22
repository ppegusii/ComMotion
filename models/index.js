
//Comment format
//type; validation constraints

exports.Workout = function(id,name,exercises,description,difficulty,photo){
    this.id = id;
    this.name = name;
    this.exercises=exercises;//its a list of the exercises in order
    this.description=description;
    this.difficulty=difficulty;
    this.photo=photo;
};
exports.Exercise = function(id,description,difficulty,musclegroup,created,names,videos,photos){
  //number; parseInt(id,10) isNaN or > 0
  this.id = id;
  //string; description != falsey, description !== ''
  this.description = description;
  //Difficulty object; difficulty != falsey, difficulty must validate
  this.difficulty = difficulty;
  //Musclegroup object; musclegroup != falsey, musclegroup must validate
  this.musclegroup = musclegroup;
  //Date;
  this.created = created;
  //Array of Name; names != falsey, each Name must validate
  this.names = names;
  //Array of Video; videos != falsey, each Video must validate
  this.videos = videos;
  //Array of Photo; photos != falsey, each Photo must validate
  this.photos = photos;
};
exports.Name = function(id,name,votes,exerciseId,workoutId){
  //number; parseInt(id,10) isNaN or > 0
  this.id = id;
  //string; name != falsey, name !== ''
  this.name = name;
  //number;
  this.votes = votes;
  //number; parseInt(exerciseId,10) isNaN or > 0
  this.exerciseId = exerciseId;
  //number; parseInt(workoutId,10) isNaN or > 0
  this.workoutId = workoutId;
};
exports.Photo = function(id,url,exerciseId,workoutId){
  //number; parseInt(id,10) isNaN or > 0
  this.id = id;
  //string; url != falsey, url is valid URL
  this.url = url;
  //number; parseInt(exerciseId,10) isNaN or > 0
  this.exerciseId = exerciseId;
  //number; parseInt(workoutId,10) isNaN or > 0
  this.workoutId = workoutId;
};
exports.Video = function(id,url,exerciseId,workoutId){
  //number; parseInt(id,10) isNaN or > 0
  this.id = id;
  //string; url != falsey, url is valid URL
  this.url = url;
  //number; parseInt(exerciseId,10) isNaN or > 0
  this.exerciseId = exerciseId;
  //number; parseInt(workoutId,10) isNaN or > 0
  this.workoutId = workoutId;
};
exports.Difficulty = function(id,name){
  //number; parseInt(id,10) > 0
  this.id = id;
  //string;
  this.name = name;
};
exports.Musclegroup = function(id,name){
  //number; parseInt(id,10) > 0
  this.id = id;
  //string;
  this.name = name;
};
exports.User = function(id,username,password,difficulty,avatar_url,bio,activities,fav_exercises,fav_workouts,follows,followers){
  //number; parseInt(id,10) isNaN or > 0
  this.id = id;
  //string; name != falsey, name !== ''
  this.username = username;
  //string; name != falsey, name !== ''
  this.password = password;
  //Difficulty object; if difficulty defined it must validate
  this.difficulty = difficulty;
  //string; avatar_url = falsey or avatar_url is valid URL
  this.avatar_url = avatar_url;
  //string;
  this.bio = bio;
  //Array of Activty; activities = falsey or each Activity must validate
  this.activities = activities;
  //Array of Exercise; exercises = falsey or each Exercise.id must be valid
  this.fav_exercises = fav_exercises;
//****TODO will add after workouts created
  //Array of Workout; workouts = falsey or each Workout.id must be valid
  //this.fav_workouts = fav_workouts;
  //Array of number; follows = falsey or each number > 0
  this.follows = follows;
  //Array of number; follows = falsey or each number > 0
  this.followers = followers;
};
exports.Activity = function(id,name){
  //number; parseInt(id,10) > 0
  this.id = id;
  //string; name != falsey, name !== ''
  this.name = name;
}
