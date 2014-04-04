var exercise = require(process.env.DATA_EXERCISE);
var difficulty = require(process.env.DATA_DIFFICULTY);
var musclegroup = require(process.env.DATA_MUSCLEGROUP);
var name = require(process.env.DATA_NAME);
var video = require(process.env.DATA_VIDEO);
var photo = require(process.env.DATA_PHOTO);

exports.getExercisesLimitN = exercise.getLimitN;
exports.getDifficultyById = difficulty.getById;
exports.getMusclegroupById = musclegroup.getById;
exports.getNamesByEidWid = name.getByEidWid;
exports.getVideosByEidWid = video.getByEidWid;
exports.getPhotosByEidWid = exercise.getByEidWid;
