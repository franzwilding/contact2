$(document).ready(function($) {





/***********/
/* TOOLTIP */
/***********/
$("a.tooltip").each(function(){
	var text = $(this).next().html();
	console.log(text);
	
	$(this).tipTip({
		activation				: "hover", 
		keepAlive					: true,
		defaultPosition		: "top",
		content						: text, 
		maxWidth					: "auto"
	});

		
});


});