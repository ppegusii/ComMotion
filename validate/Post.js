exports.validate = validate;

function validate(post,cb){
  post.id = parseInt(post.id,10);
  if(isNaN(post.id)){
    post.id = undefined;
  }else if(post.id<=0){
    cb(Error.create('post.id invalid'),undefined);
    return;
  }
  post.userId = parseInt(post.userId,10);
  if(isNaN(post.userId) || post.userId<=0){
    return cb(Error.create('post.userId invalid'),undefined);
  }
  if(!post.text || post.text===''){
    cb(Error.create('post.text undefined or empty string'),undefined);
    return;
  }
  cb(undefined,post);
}
