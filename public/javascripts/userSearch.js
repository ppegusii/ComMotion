$(function(){
    initUserSearchButton();
});
function initUserSearchButton() {
    var searchButton = $('#userSearchButton');
    searchButton.click(function(event) {
        event.preventDefault();
        var query = $('#usersearch').val();
        if(query === '')
            alert('Please enter a query into the textbox');
        else
            document.location='/findusers/results?query='+$('#usersearch').val();

    });
}