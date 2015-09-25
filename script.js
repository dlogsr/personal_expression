var windowHeight;
var rightFrames = $('.frame-right').length;
var leftFrames = $('.frame-left').length;
var scrollOffset;
var frameMarker = 0;

function scrollAndStop(marker,offset,dir){
	if(scrollOffset === undefined){
		scrollOffset = $(marker).offset().top - offset;
		frameMarker++;
	}
	else if(dir == 'down'){
		var $currMarker = $(marker);
		for(x = 0; x < frameMarker; x++){
			$currMarker = $currMarker.next();
		}
		scrollOffset = $currMarker.offset().top - offset;
		frameMarker++;
	}
	else if (dir == 'up'){
		if(!frameMarker == 0)frameMarker--;	
		var $currMarker = $(marker);
		for(x = 0; x < frameMarker; x++){
			$currMarker = $currMarker.next();
		}
		scrollOffset = $currMarker.offset().top - offset;
	}
	console.log(scrollOffset);
	// if(frameMarker == 0){
	// 	scrollOffset = $(marker).top - offset;
	// 	frameMarker++;
	// }
	// else{
	// 	for(var x = 0; x < frameMarker; x++){
	// 		scrollOffset = $(marker).next().offset().top - offset;
	// 		frameMarker++;
	// 	}
	// }
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
		scrollAndStop('.frame-right',windowHeight/3,'down');
	});
	$('.right-up').on('touchstart mousedown',function(e){
		scrollAndStop('.frame-right',windowHeight/3,'up');
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