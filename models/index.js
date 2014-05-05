
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
  //string; username != falsey, username !== ''
  this.username = username;
  //string; if id == falsey, password != falsey, password !== ''
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
exports.Post = function(id,userId,text,created){
  //number; parseInt(id,10) > 0
  this.id = id;
  //number; parseInt(userId,10) > 0
  this.userId = userId;
  //string; text != falsey, text !== ''
  this.text = text;
  //Date;
  this.created = created;
}
exports.Activity = function(id,name){
  //number; parseInt(id,10) > 0
  this.id = id;
  //string; name != falsey, name !== ''
  this.name = name;
}
exports.Workout = function(id, name, difficulty, creatorId, description, photos, videos, sequence){
  //number;
  this.id = id;
  //string;
  this.name = name;
  //Difficulty object;
  this.difficulty = difficulty;
  //number; maybe null
  this.creatorId = creatorId;
  //string;
  this.description = description;
  //Array of Photo objects;
  this.photos = photos;
  //Array of Video objects;
  this.videos = videos;
  //ordered Array of WorkoutComponent objects;
  this.sequence = sequence;
}
exports.WorkoutComponent = function(id, workoutId, order) {
  //number;
  this.id = id;
  //number;
  this.workoutId = workoutId;
  //number;
  this.order = order;
}
exports.ExerciseInstance = function(id, workoutId, order, exercise, measurement, measurementValue, weight) {
  WorkoutComponent.call(this, id, workoutId, order);
  //Exercise object;
  this.exercise = exercise;
  // Measurement object;
  this.measurement = measurement;
  //string;
  this.measurementValue = measurementValue;
  //number; maybe undefined
  this.weight = weight;
}
exports.Timer = function(id, workoutId, order, seconds){
  WorkoutComponent.call(this, id, workoutId, order);
  //number;
  this.seconds = seconds;
}
exports.Measurement = function(id, name){
  //number;
  this.id = id;
  //string;
  this.name = name;
}
