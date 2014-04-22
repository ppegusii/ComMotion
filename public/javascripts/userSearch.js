
function initUserSearchButton() {
    var searchButton = $('#userSearchButton');
    searchButton.click(function(event) {
        event.preventDefault();
        document.location='/findusers/results?query='+$('#query').val();

    });
}