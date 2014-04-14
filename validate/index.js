var exercise = require(process.env.VALIDATE_EXERCISE);
var difficulty = require(process.env.VALIDATE_DIFFICULTY);
var musclegroup = require(process.env.VALIDATE_MUSCLEGROUP);
var name = require(process.env.VALIDATE_NAME);
var video = require(process.env.VALIDATE_VIDEO);
var photo = require(process.env.VALIDATE_PHOTO);

exports.exercise = exercise.validate;
