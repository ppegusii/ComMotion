exports.validate = validate;

function validate(video,cb){
  video.id = parseInt(video.id,10);
  if(video.id<=0){
    cb('invalid video id',undefined);
    return;
  }
  cb(undefined,video);
}
