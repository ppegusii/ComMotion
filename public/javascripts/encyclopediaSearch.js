$(function(){
    initExerciseSearchButton();
});
function initExerciseSearchButton() {
    var searchButton = $('#encyclopediaSearchButton');
    searchButton.click(function(event) {
        event.preventDefault();
        var query={};
       query.search = $('#itemsearch').val();
        query.difficultyId=$("input[type='radio']:checked").val();
        if(query.search === '')
            alert('Please enter a query into the textbox');
        else
            document.location='/encyclopedia/results?query='+query.search+'&'+'difficultyId='+query.difficultyId  ;

    });
}
