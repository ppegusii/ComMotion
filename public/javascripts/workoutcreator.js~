 <link rel="stylesheet" href="//code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css">
<script src="//code.jquery.com/jquery-1.9.1.js"></script>
<script src="//code.jquery.com/ui/1.10.4/jquery-ui.js"></script>

<script>
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
</script>
