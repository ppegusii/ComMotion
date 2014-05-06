$(function(){
    genResults();
});
function genResults() {
    var results= $('#resultsList');
    var exercises=JSON.parse($('#exercisesJSON').html());
   var workouts=JSON.parse($('#workoutsJSON').html());
    results.empty();

    var pageN = parseInt($('#currentPage').val());
   console.log(exercises.length+workouts.length);
    for (var i=pageN*5; i<Math.min(pageN*5+5,exercises.length+workouts.length);i++)
{
   if(i<exercises.length)
   {if (exercises[i].photos.length===0) {

        results.append('<li class="list-group-item" style="height:90px"><div class="col-md-2 col-sm-2 col-xs-2"><a href="/encyclopedia/exercise_entry?eid='+exercises[i].id+'"><media><img src= "/images/generic_exercise.jpeg" width="65" height="65"></media></a></div><div class="col-md-10 col-sm-10 col-xs-10"><h4>'+exercises[i].names[0].name+'-'+  exercises[i].description+'</h4></div></li>');

    } else {

        results.append('<li class="list-group-item" style="height:90px"><div class="col-md-2 col-sm-2 col-xs-2"><a href="/encyclopedia/exercise_entry?eid='+exercises[i].id+'"><media><img src="'+ exercises[i].photos[0].url +'"width="65" height="65"></media></a></div><div class="col-md-10 col-sm-10 col-xs-10"><h4>'+exercises[i].names[0].name+'-'+  exercises[i].description+'</h4></div></li>');

    }}
   else{
      if (workouts[i-exercises.length].photos.length===0) {

         results.append('<li class="list-group-item" style="height:90px"><div class="col-md-2 col-sm-2 col-xs-2"><a href="/encyclopedia/workout_entry?wid='+workouts[i-exercises.length].id+'"><media><img src= "/images/generic_exercise.jpeg" width="65" height="65"></media></a></div><div class="col-md-10 col-sm-10 col-xs-10"><h4>'+workouts[i-exercises.length].names[0].name+'-'+  workouts[i-exercises.length].description+'</h4></div></li>');

      } else {

         results.append('<li class="list-group-item" style="height:90px"><div class="col-md-2 col-sm-2 col-xs-2"><a href="/encyclopedia/workout_entry?wid='+workouts[i-exercises.length].id+'"><media><img src="'+ workouts[i-exercises.length].photos[0].url +'"width="65" height="65"></media></a></div><div class="col-md-10 col-sm-10 col-xs-10"><h4>'+workouts[i-exercises.length].name+'-'+  workouts[i-exercises.length].description+'</h4></div></li>');

      }
   }
}
if(exercises.length+workouts.length===0){
results.append('<h2>No Results Found</h2>');}
else{
results.append('<li class="list-group-item" style="height:60px"><center><div class="btn-group"><button id="PrevButton" class="btn btn-default" >Previous</button><button id="NextButton" class="btn btn-default" >Next</button></div></center></li>');
var prevButton = $('#PrevButton');
    prevButton.click(function(event) {
    var pageN = parseInt($('#currentPage').val());
        event.preventDefault();
        $('#currentPage').val(Math.max(pageN-1,0));
console.log($('#currentPage').val());
genResults();
    });
 var nextButton = $('#NextButton');
    nextButton.click(function(event) {
    var exercises=JSON.parse($('#exercisesJSON').html());
    var pageN = parseInt($('#currentPage').val());
        event.preventDefault();
        $('#currentPage').val(Math.min(pageN+1,Math.ceil((exercises.length+workouts.length)/5-1)));
	console.log($('#currentPage').val());
	genResults();
    });
}
}