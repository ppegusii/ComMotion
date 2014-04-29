
var exercise = require(process.env.DATA_EXERCISE);
var difficulty = require(process.env.DATA_DIFFICULTY);
var musclegroup = require(process.env.DATA_MUSCLEGROUP);
var name = require(process.env.DATA_NAME);
var video = require(process.env.DATA_VIDEO);
var photo = require(process.env.DATA_PHOTO);
var user = require(process.env.DATA_USER);
var activity = require(process.env.DATA_ACTIVITY);
var post = require(process.env.DATA_POST);

//Comment format
//expected object

//{n: number}
exports.exercisesGetLimitN = exercise.getLimitN;
//{id: number}
exports.exerciseGetById = exercise.getById;
//{exercise: Exercise}
exports.exerciseInit = exercise.init;
//{userId: number}
exports.exercisesGetByUserFav = exercise.getByUserFav;
//{search: string}
exports.exercisesSearchByNameDescriptionMusclegroup = exercise.searchByNameDescriptionMusclegroup;
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
//{id: number}
exports.userGetById = user.getById;
//{search: string}
exports.usersSearchByUsername = user.searchByUsername;
//{username: string, password: string}
exports.userGetByUsernamePassword = user.getByUsernamePassword;
//{username: string}
exports.userIdGetByUsername = user.getIdByUsername;
//{user: User}
exports.userCreate = user.create;
//{userId: number, exerciseId: number}
exports.userCreateFavExercise = user.createFavExercise;
//{userId: number}
exports.followedUserIdsGetByFollowingUserId;
//{userId: number}
exports.followingUserIdsGetByFollowedUserId;
//{userId: number, exerciseId: number}
exports.favExerciseDeleteByUserIdExerciseId = user.favExerciseDeleteByUserIdExerciseId;
//undefined
exports.activitiesGetAll = activity.getAll;
//{userId: number}
exports.activitiesGetByUserId = activity.getByUserId;
//{userId: number}
exports.usergetFollowersUsernameAndAvatars = user.getFollowersUsernameAndAvatars;
//{userId: number}
exports.usergetFollowingUsernameAndAvatars = user.getFollowingUsernameAndAvatars;
//{userId: number}
exports.postsGetByUserId = post.getByUserId;
//{userId: number}
exports.postsOfFollowedUsersGetByFollowingUserId = post.getPostsOfFollowedUsersByFollowingUserId;
//{post: Post}
exports.postInit = post.init;
//{userId: number}
exports.userGetUsernameAndAvatarsOfPosts = user.getUsernameAndAvatarsOfPosts;
