/**
 * Created by Ryan on 4/30/14.
 */

$(function() {
   initPostButton();
});

function initPostButton() {
   $('#postButton').click(function(event) {
      event.preventDefault();
      var text = $('#postText').val();
      console.log(text);
      var data = { text: text };
      $.ajax({
         type: "POST",
         url: '/home/post',
         contentType: 'application/json',
         data: JSON.stringify(data)
      })
         .done(function(res) {
            var html = '<div class="alert alert-success" role="alert" style="margin-bottom: 15px">' +
               '<p class="text-success">Created a post!</p></div>';
            $('#userMessageArea').html(html);
            // clear post textbox
            $('#postText').val('');
         })
         .fail(function(res) {
            var html = '<div class="alert alert-danger" role="alert" style="margin-bottom: 15px">' +
               '<p class="text-danger">' + res.responseText + '</p></div>';
            $('#userMessageArea').html(html);
         });
   });
}