var exercise = require(process.env.DATA_EXERCISE);
var difficulty = require(process.env.DATA_DIFFICULTY);
var musclegroup = require(process.env.DATA_MUSCLEGROUP);
var name = require(process.env.DATA_NAME);
var video = require(process.env.DATA_VIDEO);
var photo = require(process.env.DATA_PHOTO);

exports.exercisesGetLimitN = exercise.getLimitN;
exports.exerciseInit = exercise.init;
exports.difficultyGetById = difficulty.getById;
exports.musclegroupGetById = musclegroup.getById;
exports.namesGetByEidWid = name.getByEidWid;
exports.videosGetByEidWid = video.getByEidWid;
exports.photosGetByEidWid = photo.getByEidWid;
