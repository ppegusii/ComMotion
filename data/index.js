
var exercise = require(process.env.DATA_EXERCISE);
var difficulty = require(process.env.DATA_DIFFICULTY);
var musclegroup = require(process.env.DATA_MUSCLEGROUP);
var name = require(process.env.DATA_NAME);
var video = require(process.env.DATA_VIDEO);
var photo = require(process.env.DATA_PHOTO);
var user = require(process.env.DATA_USER);
var activity = require(process.env.DATA_ACTIVITY);

//Comment format
//expected object

//{n: number}
exports.exercisesGetLimitN = exercise.getLimitN;
//{exercise: Exercise}
exports.exerciseInit = exercise.init;
//{userId: number}
exports.exercisesGetByUserFav = exercise.getByUserFav;
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
//{n: number}
exports.usersGetLimitN = user.getLimitN;
//{userId: number}
exports.followedUserIdsGetByFollowingUserId;
//{userId: number}
exports.followingUserIdsGetByFollowedUserId;
//undefined
exports.activitiesGetAll = activity.getAll;
//{userId: number}
exports.activitiesGetByUserId = activity.getByUserId;
