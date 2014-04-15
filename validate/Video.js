exports.validate = validate;

function validate(video,cb){
  video.id = parseInt(video.id,10);
  if(video.id<=0){
    cb('video.id invalid\n'+__stack,undefined);
    return;
  }
  cb(undefined,video);
}
