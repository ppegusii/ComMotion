
//Comment format
//type; validation constraints

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
  //Array of Video; names != falsey, each Video must validate
  this.videos = videos;
  //Array of Photo; photos != falsey, each Photo must validate
  this.photos = photos;
};

exports.Name = function(id,name,votes,exerciseId,workoutId){
  //number; parseInt(id,10) isNaN or > 0
  this.id = id;
  //string; name != falsey, name !== ''
  this.name = name;
  //number; !isNaN(parseInt(votes,10))
  this.votes = votes;
  //number; parseInt(exerciseId,10) isNaN or > 0
  this.exerciseId = exerciseId;
  //number; parseInt(workoutId,10) isNaN or > 0
  this.workoutId = workoutId;
};

exports.Photo = function(id,url,exerciseId,workoutId){
  //number; parseInt(id,10) isNaN or > 0
  this.id = id;
  //string; url != falsey, url !== ''
  this.url = url;
  //number; parseInt(exerciseId,10) isNaN or > 0
  this.exerciseId = exerciseId;
  //number; parseInt(workoutId,10) isNaN or > 0
  this.workoutId = workoutId;
};

exports.Video = function(id,url,exerciseId,workoutId){
  //number; parseInt(id,10) isNaN or > 0
  this.id = id;
  //string; url != falsey, url !== ''
  this.url = url;
  //number; parseInt(exerciseId,10) isNaN or > 0
  this.exerciseId = exerciseId;
  //number; parseInt(workoutId,10) isNaN or > 0
  this.workoutId = workoutId;
};

exports.Difficulty = function(id,name){
  //number; parseInt(id,10) isNaN or > 0
  this.id = id;
  //string;
  this.name = name;
};

exports.Musclegroup = function(id,name){
  //number; parseInt(id,10) isNaN or > 0
  this.id = id;
  //string;
  this.name = name;
};
