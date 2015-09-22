function scrollAndStop(marker,offset){
	var scrollOffset;
	scrollOffset = $(marker).offset().top - offset;
	$('html,body').stop().animate({scrollTop : scrollOffset},400);
}

function getWindowHeight(){
	return $(window).height();
}

function adjustContentSpacing(currSection) {
	var windowHeight = getWindowHeight();
	$(currSection).css({'min-height':windowHeight-70});
}

function adjustContentOffset(currSection,num) {
	var windowHeight = getWindowHeight();
	currSection.css({'top':windowHeight+num});
}

$(document).ready(function(){
	adjustContentSpacing('.headshot');
});