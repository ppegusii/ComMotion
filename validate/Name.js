exports.validate = validate;

function validate(name,cb){
  name.id = parseInt(name.id,10);
  if(isNaN(name.id)){
    name.id = undefined;
  }else if(name.id<=0){
    cb(Error.create('name.id invalid'),undefined);
    return;
  }
  if(!name.name || name.name===''){
    cb(Error.create('name.name undefined or empty string'),undefined);
    return;
  }
  name.votes = parseInt(name.votes,10);
  if(isNaN(name.votes)){
    /*
    cb(Error.create('name.votes NaN'),undefined);
    return;
    */
    name.votes = 0;
  }
  name.exerciseId = parseInt(name.exerciseId,10);
  if(isNaN(name.exerciseId)){
    name.exerciseId = undefined;
  }else if(name.exerciseId<=0){
    cb(Error.create('name.exerciseId invalid'),undefined);
    return;
  }
  name.workoutId = parseInt(name.workoutId,10);
  if(isNaN(name.workoutId)){
    name.workoutId = undefined;
  }else if(name.workoutId<=0){
    cb(Error.create('name.workoutId invalid'),undefined);
    return;
  }
  cb(undefined,name);
}
