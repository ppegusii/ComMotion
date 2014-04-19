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
