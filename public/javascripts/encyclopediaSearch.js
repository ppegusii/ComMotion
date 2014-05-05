$(function(){
    initExerciseSearchButton();
});
function initExerciseSearchButton() {
    var searchButton = $('#encyclopediaSearchButton');
    searchButton.click(function(event) {
        event.preventDefault();
        var query = $('#itemsearch').val();
        if(query === '')
            alert('Please enter a query into the textbox');
        else
            document.location='/encyclopedia/results?query='+query;

    });
}