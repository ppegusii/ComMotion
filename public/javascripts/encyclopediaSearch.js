$(function(){
    initExerciseSearchButton();
});
function initExerciseSearchButton() {
    var searchButton = $('#encyclopediaSearchButton');
    searchButton.click(function(event) {
        event.preventDefault();
        document.location='/encyclopedia/results?query='+$('#itemsearch').val();

    });
}