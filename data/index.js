
var exercise = require(process.env.DATA_EXERCISE);
var difficulty = require(process.env.DATA_DIFFICULTY);
var musclegroup = require(process.env.DATA_MUSCLEGROUP);
var name = require(process.env.DATA_NAME);
var video = require(process.env.DATA_VIDEO);
var photo = require(process.env.DATA_PHOTO);
var user = require(process.env.DATA_USER);
var activity = require(process.env.DATA_ACTIVITY);
var post = require(process.env.DATA_POST);
var measurement = require(process.env.DATA_MEASUREMENT);
var timer = require(process.env.DATA_TIMER);
var exerciseInstance = require(process.env.DATA_EXERCISEINSTANCE);
var workout = require(process.env.DATA_WORKOUT);

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
//{search: string, difficultyId: number}
exports.exerciseWorkoutsSearchByNameDescriptionFilterByDifficultyId = workout.searchForExercisesAndWorkoutsByNameDescriptionFilterByDifficultyId;
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
//{user: User}
exports.userUpdateProfile = user.updateProfile;
//{userId: number, exerciseId: number}
exports.userCreateFavExercise = user.createFavExercise;
//{userId: number}
exports.followedUserIdsGetByFollowingUserId = user.getFollowedUserIdsByFollowingUserId;
//{userId: number}
exports.followingUserIdsGetByFollowedUserId = user.getFollowingUserIdsByFollowedUserId;
//{userId: number, followerId: number}
exports.followCreateByUserIdFollowerId = user.createFollowByUserIdFollowerId;
//{userId: number, followerId: number}
exports.followDeleteByUserIdFollowerId = user.deleteFollowByUserIdFollowerId;
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
//undefined
exports.measurementsGetAll = measurement.getAll;
//{id: number}
exports.measurementGetById = measurement.getById;
//{id: number}
exports.timerGetById = timer.getById;
//{workoutId: number}
exports.timersGetByWorkoutId = timer.getByWorkoutId;
//{id: number}
exports.exerciseInstanceGetById = exerciseInstance.getById;
//{workoutId: number}
exports.exerciseInstancesGetByWorkoutId = exerciseInstance.getByWorkoutId;
//{id: number}
exports.workoutGetById = workout.getById;
