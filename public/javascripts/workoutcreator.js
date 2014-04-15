
<link rel="stylesheet" href="//code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css">
<script src="//code.jquery.com/jquery-1.9.1.js"></script>
<script src="//code.jquery.com/ui/1.10.4/jquery-ui.js"></script>

	$(function() {

		$( "#accordion1" )
			.accordion({
			header: "> div > h3",
			collapsible: false,
			heightStyle: "content"
			})

		});

		$( "#accordion2" )
			.accordion({
			header: "> div > h3",
			collapsible: true,
			heightStyle: "content"
			})
	
			.sortable({
			axis: "y",
			handle: "h3",
			stop: function( event, ui ) {
			// IE doesn't register the blur when sorting
			// so trigger focusout handlers to remove .ui-state-focus
			ui.item.children( "h3" ).triggerHandler( "focusout" );
			}
		});

	});

$(function() {
$( "#sortable" ).sortable({
revert: true
});
$( ".draggable" ).draggable({
connectToSortable: "#accordion2",
helper: "clone",
revert: "invalid"
});

 $( "#accordion2" ).droppable({
//activeClass: "ui-state-default",
//hoverClass: "ui-state-hover",
//accept: ":not(.ui-sortable-helper)",
drop: function( event, ui ) {
//$(".draggable").addClass("group");
//$(this).append( "<li>" + ui.draggable.text() + "</li>");
//$(this).append( "<div class='group'> <ul> <li> a</li> <li> b</li> <li> c</li> </ul> </div>");
//ui.draggable.addClass("accordion2");
//$( "<li></li>" ).text( ui.draggable.text() ).appendTo( this );
ui.draggable.appendTo(this);
}
});

$( "ul, li" ).disableSelection();
});
