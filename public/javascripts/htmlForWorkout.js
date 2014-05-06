/**
 * Created by Ryan on 5/5/14.
 */

function htmlForWorkout(workout) {
   var ret = $('<table id="test"></table>');
   ret.append($('<tr><th>#</th><th>Exercise/Rest</th><th>Amount</th></tr>'));
   for(var i = 0; i < workout.sequence.length; i++) {
      var comp = workout.sequence[i];
      var item = item = $('<tr></tr>');
      item.append($('<td>'+comp.order+'</td>'));
      if(comp.seconds === undefined) {
         var temp = $('<a></a>');
         temp.attr('href', '/encyclopedia/exercise_entry?eid='+comp.exercise.id);
         temp.html(comp.exercise.names[0].name);
         var temp2 = $('<td></td>');
         temp2.append(temp);
         item.append(temp2);
         item.append($('<td>'+comp.measurementValue+' '+comp.measurement.name+'</td>'));
      }
      else {
         item.append($('<td>Rest</td>'));
         item.append($('<td>'+comp.seconds+' seconds</td>'));
      }
      ret.append(item);
   }
   ret.attr('class', 'table table-bordered table-striped table-hover');
   return ret;
}