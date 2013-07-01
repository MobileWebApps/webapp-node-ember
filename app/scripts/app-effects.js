/**
 * JQuery to make the App "appear" on the screen
 * as configured by fadeIn()
 */
$(document).ready(function() {
	$("body").css("display", "none");
	$("body").fadeIn(300);
});
