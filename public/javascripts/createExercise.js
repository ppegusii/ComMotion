/**
* Created by Ryan on 4/16/14.
*/


var numNames = 0;

$(function () {
   var addNameButton = $('#addNameButton');
   addNameButton.click(function(event) {
     var name = prompt('New name:');
     if(name !== '') {
         console.log('Entered name ' + name);
         // add name to list of names
         numNames++;
         // add name to UI
         //var html = '<a class="btn btn-sm btn-primary" id=name' + numNames + '>' + name + '</a>';
        var html = '<a class="btn btn-sm btn-primary">' + name + '</a>';
         $('#enteredNames').append(html);
     }
     else
         console.log('Entered empty name!');
   });

   var formSubmitButton = $('#saveExerciseButton');
   formSubmitButton.click(function(event) {
      // get all the things!
   });
});
