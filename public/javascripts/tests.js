module("exercises");
asyncTest('exercisesGetLimitN',function(){
  expect(1);
	$.ajax({
		type: 'POST',
		url: '/query',
		data: {query:'exercisesGetLimitN',n:10}
	}).done(function(exercises){
    console.log('exercisesGetLimitN');
    console.log(exercises);
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
    console.log('exerciseGetById');
    console.log(exercises);
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
    console.log('exerciseGetById');
    console.log(exercises);
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
    names: [{name: 'ex1',votes: 0}],
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
    console.log('exerciseInit');
    console.log(e);
    exercise.id = e.id;
    exercise.created = e.created;
    exercise.names[0].id = e.names[0].id;
    exercise.names[0].exerciseId = e.id;
    exercise.photos[0].id = e.photos[0].id;
    exercise.photos[0].exerciseId = e.id;
    exercise.videos[0].id = e.videos[0].id;
    exercise.videos[0].exerciseId = e.id;
    deepEqual(e,exercise,'exercise inserted successfully');
    start();
  });
});

module("users");
asyncTest('usersGetLimitN',function(){
  expect(1);
	$.ajax({
		type: 'POST',
		url: '/query',
		data: {query:'usersGetLimitN',n:10}
	}).done(function(users){
    console.log('usersGetLimitN');
    console.log(users);
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
    console.log('userGetById');
    console.log(users);
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
    console.log('userGetById');
    console.log(users);
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
    console.log('userGetByUsernamePassword');
    console.log(users);
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
    console.log('userGetByUsernamePassword');
    console.log(users);
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
    console.log('userIdGetByUsername');
    console.log(ids);
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
    console.log('userCreate');
    console.log(user);
    equal(user.username,g,'recieved correct username');
    start();
  });
});
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
    console.log('userCreate');
    console.log(error);
    ok(error.inner,undefined,'username exists error');
    start();
  });
});
module("activities");
asyncTest('activitiesGetAll',function(){
  expect(1);
	$.ajax({
		type: 'POST',
		url: '/query',
		data: {query:'activitiesGetAll'}
	}).done(function(activities){
    console.log('activitiesGetAll');
    console.log(activities);
    equal(activities.length,0,'received array of length 0');
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
