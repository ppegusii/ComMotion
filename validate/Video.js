exports.validate = validate;

function validate(video,cb){
  video.id = parseInt(video.id,10);
  if(video.id<=0){
    cb(Error.create('video.id invalid'),undefined);
    return;
  }
  cb(undefined,video);
}
