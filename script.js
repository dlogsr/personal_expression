var windowHeight;

function scrollAndStop(marker,offset){
	var scrollOffset;
	scrollOffset = $(marker).parent().next().offset().top - offset;
	$('html,body').animate({scrollTop : scrollOffset},400);
}

function getWindowHeight(){
	return $(window).height();
}

function adjustContentSpacing(currSection) {
	windowHeight = getWindowHeight();
	//$(currSection).css({'min-height':windowHeight-70});
	//Specific to Headshot div only; dirty code
	$('.head-div').css({'height':windowHeight/3});
	$('.headshot-mid').css({'height':windowHeight/3});
	$('.stream-line').css({'height':windowHeight});
}

function adjustContentOffset(currSection,num) {
	windowHeight = getWindowHeight();
	currSection.css({'top':windowHeight+num});
}

$(document).ready(function(){
	adjustContentSpacing('.headshot');
	$('.headshot-mid').css({'background-size': windowHeight});
	$('.right-down').on('touchstart mousedown',function(e){
		scrollAndStop('.stream-photo-frame',0);
	});
});

$('.head-mid').waypoint(function(direction){
	$('.headshot-main').toggleClass('headshot-fixed');
	$('.headshot-mid').toggleClass('show');
	if(direction=='down'){
		$('.headshot-fixed').css({top:-(windowHeight/3)});
		$('.content').css({top:(windowHeight)});
	}
	else{
		$('.content').css({top:0});	
	}
});