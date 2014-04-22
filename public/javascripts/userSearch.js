$(function(){
    initUserSearchButton();
});
function initUserSearchButton() {
    var searchButton = $('#userSearchButton');
    searchButton.click(function(event) {
        event.preventDefault();
        document.location='/findusers/results?query='+$('#usersearch').val();

    });
}