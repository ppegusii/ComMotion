exports.validate = validate;

function validate(activity,cb){
  activity.id = parseInt(activity.id,10);
  if(!activity.id>0){
    cb(Error.create('activity.id invalid'),undefined);
    return;
  }
  cb(undefined,activity);
}
