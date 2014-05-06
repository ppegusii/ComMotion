module('exercises');
asyncTest('exercisesGetLimitN',function(){
  expect(1);
	$.ajax({
		type: 'POST',
		url: '/query',
		data: {query:'exercisesGetLimitN',n:10}
	}).done(function(exercises){
    //console.log('exercisesGetLimitN');
    //console.log(exercises);
    equal(exercises.length,10,'received array of length 10');
    start();
  });
});
asyncTest('exerciseGetById exercise exists',function(){
  expect(1);
	$.ajax({
		type: 'POST',
		url: '/query',
		data: {query:'exerciseGetById',id:1}
	}).done(function(exercises){
    //console.log('exerciseGetById');
    //console.log(exercises);
    equal(exercises[0].id,'1','received exercise with id 1');
    start();
  });
});
asyncTest('exerciseGetById exercise does not exist',function(){
  expect(1);
	$.ajax({
		type: 'POST',
		url: '/query',
		data: {query:'exerciseGetById',id:500000}
	}).done(function(exercises){
    //console.log('exerciseGetById');
    //console.log(exercises);
    equal(exercises.length,0,'received exercise with id 1');
    start();
  });
});
asyncTest('exerciseInit',function(){
  expect(1);
  var exercise = {
    description: 'new exercise!',
    difficulty: {id: 1},
    musclegroup: {id: 1},
    names: [{name: 'ex1',votes: 0},{name: 'ex2',votes: 0}],
    videos: [{url: 'http://vid.com/myvid.ogg'}],
    photos: [{url: 'http://photo.com/myphoto.png'}]
  }
	$.ajax({
		type: 'POST',
		url: '/query',
		data: {
      query:'exerciseInit',
      exercise: exercise
    }
	}).done(function(e){
    //console.log('exerciseInit');
    //console.log(e);
    exercise.id = e.id;
    exercise.created = e.created;
    exercise.names[0].id = e.names[0].id;
    exercise.names[0].exerciseId = e.id;
    exercise.names[1].id = e.names[1].id;
    exercise.names[1].exerciseId = e.id;
    exercise.photos[0].id = e.photos[0].id;
    exercise.photos[0].exerciseId = e.id;
    exercise.videos[0].id = e.videos[0].id;
    exercise.videos[0].exerciseId = e.id;
    deepEqual(e,exercise,'exercise inserted successfully');
    start();
  });
});
asyncTest('exercisesSearchByNameDescriptionMusclegroup',function(){
  expect(1);
	$.ajax({
		type: 'POST',
		url: '/query',
		data: {
      query:'exercisesSearchByNameDescriptionMusclegroup',
      search: 'crusher'
    }
	}).done(function(es){
    //console.log('exercisesSearchByNameDescriptionMusclegroup');
    //console.log(es);
    equal(es.length,1,'got 1');
    start();
  });
});

module('users');
asyncTest('usersGetLimitN',function(){
  expect(1);
	$.ajax({
		type: 'POST',
		url: '/query',
		data: {query:'usersGetLimitN',n:10}
	}).done(function(users){
    //console.log('usersGetLimitN');
    //console.log(users);
    equal(users.length,10,'received array of length 10');
    start();
  });
});
asyncTest('userGetById user exists',function(){
  expect(1);
	$.ajax({
		type: 'POST',
		url: '/query',
		data: {query:'userGetById',id:1}
	}).done(function(users){
    //console.log('userGetById');
    //console.log(users);
    equal(users[0].id,1,'recieved user with correct id');
    start();
  });
});
asyncTest('userGetById user does not exist',function(){
  expect(1);
	$.ajax({
		type: 'POST',
		url: '/query',
		data: {query:'userGetById',id:500000}
	}).done(function(users){
    //console.log('userGetById');
    //console.log(users);
    equal(users.length,0,'recieved user with correct id');
    start();
  });
});
asyncTest('userGetByUsernamePassword user exists',function(){
  expect(1);
	$.ajax({
		type: 'POST',
		url: '/query',
		data: {
      query: 'userGetByUsernamePassword',
      username: 'dorianYates',
      password: 'commotion'
    }
	}).done(function(users){
    //console.log('userGetByUsernamePassword');
    //console.log(users);
    equal(users[0].username,'dorianYates','recieved user with correct username');
    start();
  });
});
asyncTest('userGetByUsernamePassword user does not exist',function(){
  expect(1);
	$.ajax({
		type: 'POST',
		url: '/query',
		data: {
      query: 'userGetByUsernamePassword',
      username: 'bubble',
      password: 'licious'
    }
	}).done(function(users){
    //console.log('userGetByUsernamePassword');
    //console.log(users);
    equal(users.length,0,'recieved user no users');
    start();
  });
});
asyncTest('usersSearchByUsername user exists',function(){
  expect(1);
	$.ajax({
		type: 'POST',
		url: '/query',
		data: {
      query: 'usersSearchByUsername',
      search: 'dorian'
    }
	}).done(function(users){
    //console.log('usersSearchByUsername');
    //console.log(users);
    equal(users.length,2,'recieved two users');
    start();
  });
});
asyncTest('usersSearchByUsername user does not exist',function(){
  expect(1);
	$.ajax({
		type: 'POST',
		url: '/query',
		data: {
      query: 'usersSearchByUsername',
      search: 'iDoNotExist'
    }
	}).done(function(users){
    //console.log('usersSearchByUsername');
    //console.log(users);
    equal(users.length,0,'recieved user no users');
    start();
  });
});
asyncTest('userIdGetByUsername',function(){
  expect(1);
	$.ajax({
		type: 'POST',
		url: '/query',
		data: {
      query: 'userIdGetByUsername',
      username: 'dorianYates'
    }
	}).done(function(ids){
    //console.log('userIdGetByUsername');
    //console.log(ids);
    equal(ids[0],1,'recieved correct userId given username');
    start();
  });
});
asyncTest('userCreate user does not exist',function(){
  expect(1);
  g = guid();
	$.ajax({
		type: 'POST',
		url: '/query',
		data: {
      query: 'userCreate',
      user: {
        username: g,
        password: 'commotion'
      }
    }
	}).done(function(user){
    //console.log('userCreate');
    //console.log(user);
    equal(user.username,g,'recieved correct username');
    start();
  });
});
/*
asyncTest('userCreateFavExercise',function(){
  expect(1);
  g = guid();
	$.ajax({
		type: 'POST',
		url: '/query',
		data: {
      query: 'userCreate',
      user: {
        username: g,
        password: 'commotion'
      }
    }
	}).done(function(user){
    $.ajax({
      type: 'POST',
      url: '/query',
      data: {
        query: 'exerciseGetById',
        id: 1
      }
    }).done(function(exercises){
      $.ajax({
        type: 'POST',
        url: '/query',
        data: {
          query: 'userCreateFavExercise',
          userId: user.id,
          exerciseId: exercises[0].id
        }
      }).done(setTimeout(function(users){
  //console.log('users = '+JSON.stringify(users));
  //console.log('user.id = '+user.id);
        user.fav_exercises = exercises;
        $.ajax({
          type: 'POST',
          url: '/query',
          data: {
            query: 'userGetById',
            id: user.id
          }
        }).done(function(users){
          //console.log('userCreateFavExercise');
          //console.log(users);
          deepEqual(users[0],user,'userCreateFavExercise successful');
          start();
        });
      },1000));
    });
  });
});
*/
asyncTest('userCreate user already exists',function(){
  expect(1);
	$.ajax({
		type: 'POST',
		url: '/query',
		data: {
      query: 'userCreate',
      user: {
        username: 'dorianYates',
        password: 'commotion'
      }
    }
	}).done(function(error){
    //console.log('userCreate');
    //console.log(error);
    ok(error.inner,undefined,'username exists error');
    start();
  });
});
asyncTest('userUpdateProfile',function(){
  expect(1);
	$.ajax({
		type: 'POST',
		url: '/query',
		data: {
      query: 'userUpdateProfile',
      user: {
        id: 1,
        username: 'dorianYates',
        difficulty: {id: 2},
        activities: [{id:5},{id:7}],
        bio: 'I must have a board under my feet.',
        avatar_url: 'http://www.freelogovectors.net/wp-content/uploads/2013/02/man-avatar-1.png'
      }
    }
	}).done(function(user){
    //console.log('userUpdateProfile');
    //console.log(user);
    ok(user,'A really bad test');
    start();
  });
});
asyncTest('favExerciseDeleteByUserIdExerciseId',function(){
  expect(1);
	$.ajax({
		type: 'POST',
		url: '/query',
		data: {
      query: 'favExerciseDeleteByUserIdExerciseId',
      userId: 1,
      exerciseId: 1
    }
	}).done(function(result){
    console.log('favExerciseDeleteByUserIdExerciseId');
    console.log(result);
    equal(result.rowCount,1,'deleted fav if error run SQL script');
    start();
  });
});
asyncTest('followCreateByUserIdFollowerId',function(){
  expect(1);
	$.ajax({
		type: 'POST',
		url: '/query',
		data: {
      query: 'followCreateByUserIdFollowerId',
      userId: 1,
      followerId: 2
    }
	}).done(function(result){
    console.log('followCreateByUserIdFollowerId');
    console.log(result);
    equal(result.rowCount,1,'created follow if error run SQL script');
    start();
  });
});
asyncTest('followDeleteByUserIdFollowerId',function(){
  expect(1);
	$.ajax({
		type: 'POST',
		url: '/query',
		data: {
      query: 'followDeleteByUserIdFollowerId',
      userId: 2,
      followerId: 1
    }
	}).done(function(result){
    console.log('followDeleteByUserIdFollowerId');
    console.log(result);
    equal(result.rowCount,1,'deleted follow if error run SQL script');
    start();
  });
});

module('activities');
asyncTest('activitiesGetAll',function(){
  expect(1);
	$.ajax({
		type: 'POST',
		url: '/query',
		data: {query:'activitiesGetAll'}
	}).done(function(activities){
    //console.log('activitiesGetAll');
    //console.log(activities);
    equal(activities.length,16,'received array of length 0');
    start();
  });
});

module('posts');
asyncTest('postsGetByUserId',function(){
  expect(2);
	$.ajax({
		type: 'POST',
		url: '/query',
		data: {query: 'postsGetByUserId',userId: 17}
	}).done(function(posts){
    //console.log('postsGetByUserId');
    //console.log(posts);
    equal(posts.length,1,'received correct number of posts');
    equal(posts[0].text,'I love squats so much, I want to start a squat club.  And the first rule of squat club is, you don\'t talk about squat club.','received correct post');
    start();
  });
});
asyncTest('postsOfFollowedUsersGetByFollowingUserId',function(){
  expect(2);
	$.ajax({
		type: 'POST',
		url: '/query',
		data: {query: 'postsOfFollowedUsersGetByFollowingUserId',userId: 7}
	}).done(function(posts){
    //console.log('postsOfFollowedUsersGetByFollowingUserId');
    //console.log(posts);
    equal(posts.length,4,'received correct number of posts');
    equal(posts[0].text,'I love squats so much, I want to start a squat club.  And the first rule of squat club is, you don\'t talk about squat club.','received correct post');
    start();
  });
});
asyncTest('postInit',function(){
  expect(1);
	$.ajax({
		type: 'POST',
		url: '/query',
		data: {
      query: 'postInit',
      post: {
        userId: 9,
        text: 'I roid rage in my spare time.'
      }
    }
	}).done(function(post){
    console.log('postInit');
    console.log(post);
    equal(post.text,'I roid rage in my spare time.','created a new post');
    start();
  });
});
asyncTest('measurementsGetAll',function(){
  expect(1);
	$.ajax({
		type: 'POST',
		url: '/query',
		data: {
      query: 'measurementsGetAll',
    }
	}).done(function(measurements){
    console.log('measurementsGetAll');
    console.log(measurements);
    equal(measurements.length,7,'got correct number of measurements');
    start();
  });
});
asyncTest('measurementGetById',function(){
  expect(1);
	$.ajax({
		type: 'POST',
		url: '/query',
		data: {
      query: 'measurementGetById',
      id: 1
    }
	}).done(function(measurements){
    console.log('measurementGetById');
    console.log(measurements);
    equal(measurements[0].name,'reps','got correct measurement');
    start();
  });
});
asyncTest('timerGetById',function(){
  expect(1);
	$.ajax({
		type: 'POST',
		url: '/query',
		data: {
      query: 'timerGetById',
      id: 22
    }
	}).done(function(timers){
    console.log('timerGetById');
    console.log(timers);
    equal(timers[0].seconds,120,'got correct timer');
    start();
  });
});
asyncTest('timersGetByWorkoutId',function(){
  expect(1);
	$.ajax({
		type: 'POST',
		url: '/query',
		data: {
      query: 'timersGetByWorkoutId',
      workoutId: 1
    }
	}).done(function(timers){
    console.log('timersGetByWorkoutId');
    console.log(timers);
    equal(timers.length,5,'got correct number of timers');
    start();
  });
});
asyncTest('exerciseInstanceGetById',function(){
  expect(1);
	$.ajax({
		type: 'POST',
		url: '/query',
		data: {
      query: 'exerciseInstanceGetById',
      id: 2
    }
	}).done(function(exerciseInstances){
    console.log('exerciseInstanceGetById');
    console.log(exerciseInstances);
    equal(exerciseInstances[0].measurementValue,10,'got correct exerciseInstance');
    start();
  });
});
asyncTest('exerciseInstancesGetByWorkoutId',function(){
  expect(1);
	$.ajax({
		type: 'POST',
		url: '/query',
		data: {
      query: 'exerciseInstancesGetByWorkoutId',
      workoutId: 1
    }
	}).done(function(exerciseInstances){
    console.log('exerciseInstancesGetByWorkoutId');
    console.log(exerciseInstances);
    equal(exerciseInstances.length,5,'got correct number of exerciseInstances');
    start();
  });
});

module('workout');
asyncTest('workoutGetById',function(){
  expect(1);
	$.ajax({
		type: 'POST',
		url: '/query',
		data: {
      query: 'workoutGetById',
      id: 1
    }
	}).done(function(workouts){
    console.log('workoutGetById');
    console.log(workouts);
    equal(workouts[0].name,'Leg Blaster!','got correct workout');
    start();
  });
});
asyncTest('workoutsGetLimitN',function(){
  expect(1);
	$.ajax({
		type: 'POST',
		url: '/query',
		data: {
      query: 'workoutsGetLimitN',
      n: 5
    }
	}).done(function(workouts){
    console.log('workoutsGetLimitN');
    console.log(workouts);
    equal(workouts.length,3,'got correct number of workouts');
    start();
  });
});

module('search');
asyncTest('exerciseWorkoutsSearchByNameDescriptionFilterByDifficultyId',function(){
  expect(1);
	$.ajax({
		type: 'POST',
		url: '/query',
		data: {
      query:'exerciseWorkoutsSearchByNameDescriptionFilterByDifficultyId',
      search: 'press',
      difficultyId: 3
    }
	}).done(function(o){
    console.log('exerciseWorkoutsSearchByNameDescriptionFilterByDifficultyId');
    console.log(o);
    equal(o.workouts.length,1,'got 1');
    start();
  });
});
asyncTest('exerciseWorkoutsSearchByNameDescriptionFilterByDifficultyId no difficultyId',function(){
  expect(1);
	$.ajax({
		type: 'POST',
		url: '/query',
		data: {
      query:'exerciseWorkoutsSearchByNameDescriptionFilterByDifficultyId',
      search: 'press'
    }
	}).done(function(o){
    console.log('exerciseWorkoutsSearchByNameDescriptionFilterByDifficultyId');
    console.log(o);
    equal(o.workouts.length,1,'got 1');
    start();
  });
});

//copied from
//http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
function guid() {
  function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}
