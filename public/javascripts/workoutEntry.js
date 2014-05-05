/**
 * Created by Ryan on 5/5/14.
 */

$(function() {
   $('#workoutDisplay').append(htmlForWorkout());
})

function htmlForWorkout(workout) {
   var seq = workout.sequence;
   var ret = $('<div id="test"></div>');
   ret.append('lalala');
   return ret;
}