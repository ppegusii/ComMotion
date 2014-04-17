
var exercise = require(process.env.DATA_EXERCISE);
var difficulty = require(process.env.DATA_DIFFICULTY);
var musclegroup = require(process.env.DATA_MUSCLEGROUP);
var name = require(process.env.DATA_NAME);
var video = require(process.env.DATA_VIDEO);
var photo = require(process.env.DATA_PHOTO);

//Comment format
//expected object

//{n: number}
exports.exercisesGetLimitN = exercise.getLimitN;
//{exercise: Exercise}
exports.exerciseInit = exercise.init;
//{id: number}
exports.difficultyGetById = difficulty.getById;
//{id: number}
exports.musclegroupGetById = musclegroup.getById;
//{id: number}
exports.namesGetByEidWid = name.getByEidWid;
//{id: number}
exports.videosGetByEidWid = video.getByEidWid;
//{id: number}
exports.photosGetByEidWid = photo.getByEidWid;
