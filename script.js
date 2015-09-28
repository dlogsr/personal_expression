$frameRight = $('.frame-right');
$frameLeft = $('.frame-left');
$headshotMid =  $('.headshot-mid');

var windowHeight;
var rightFrames = $frameRight.length;
var leftFrames = $('.frame-left').length;
var scrollOffset;
var frameMarkerLeft = 0;
var frameMarkerRight = 0;

function scrollToTop(time){
	$('html,body').animate({scrollTop : 0},time);
}

function scrollAndStop(marker,offset,dir){
	var frameMarker;
	(marker == '.frame-right') ? frameMarker = frameMarkerRight : frameMarker = frameMarkerLeft;

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
		if(frameMarker == 0){
			scrollOffset = 0;
			frameMarkerRight = 0;
			frameMarkerLeft = 0;
			$('.panel-left').removeClass('on');
			$('.panel-right').removeClass('on');
			$('.right-arrows .scroll-button').add($('.left-arrows .scroll-button')).addClass('hide');
			// (marker == '.frame-right') ? $('.panel-left').addClass('on') : $('.panel-right').addClass('on');
			//frameMarker++;
		}
		else{
			if(frameMarker >= 0) frameMarker -=2;
			if(frameMarker < 0) frameMarker = 0;	
			var $currMarker = $(marker);
			for(x = 0; x < frameMarker; x++){
				$currMarker = $currMarker.next();
			}
			scrollOffset = $currMarker.offset().top - offset;
		}
	}
	console.log(marker + ' ' + frameMarker + ' to ' + scrollOffset);
	(marker == '.frame-right') ? frameMarkerRight = frameMarker : frameMarkerLeft = frameMarker;
	$('html,body').animate({scrollTop : scrollOffset},400);
}

function getWindowHeight(){
	return $(window).height();
}

function getPageHeight(){
	return $(document).height();
}

function adjustContentSpacing(currSection) {
	windowHeight = getWindowHeight();
	pageHeight = getPageHeight();
	//$(currSection).css({'min-height':windowHeight-70});
	//Specific to Headshot div only; dirty code
	$('.head-div').add($headshotMid).add($('.mid-stream-line')).css({'height':windowHeight/3});
	$('.cover-stream-line').add($('.stream-line')).add($('.content')).css({'height':pageHeight});
	$('.content-overlay').add($('.content-overlay-panel')).css({'height':pageHeight});
	// $('.stream-photo-frame').css({'max-height':windowHeight/3});
	$('.stream-photo').css({'max-height':windowHeight/3.2, 'max-width':'100%'});
}

function adjustContentOffset(currSection,num) {
	windowHeight = getWindowHeight();
	currSection.css({'top':windowHeight+num});
}

$(document).ready(function(){
	scrollToTop(0);
	adjustContentSpacing('.headshot');
	$headshotMid.css({'background-size': windowHeight});
	$('.right-down').on('touchstart mousedown',function(e){
		scrollAndStop('.frame-right',windowHeight/3,'down');
	});
	$('.right-up').on('touchstart mousedown',function(e){
		scrollAndStop('.frame-right',windowHeight/3,'up');
	});
	$('.left-down').on('touchstart mousedown',function(e){
		scrollAndStop('.frame-left',windowHeight/3,'down');
	});
	$('.left-up').on('touchstart mousedown',function(e){
		scrollAndStop('.frame-left',windowHeight/3,'up');
	});

	$('.right-button').on('touchstart mousedown',function(e){
		frameMarkerRight = 0;
		scrollAndStop('.frame-right',windowHeight/3,'down');
		setTimeout(function(){
			$('.right-arrows .scroll-button').removeClass('hide');
			$('.left-arrows .scroll-button').addClass('hide');
			$('.panel-left').addClass('on');
			$('.panel-right').removeClass('on');
		},400);
	});

	$('.left-button').on('touchstart mousedown',function(e){
		frameMarkerLeft = 0;
		scrollAndStop('.frame-left',windowHeight/3,'down');
		setTimeout(function(){
			$('.left-arrows .scroll-button').removeClass('hide');
			$('.right-arrows .scroll-button').addClass('hide');
			$('.panel-left').removeClass('on');
			$('.panel-right').addClass('on');
		},400);
	});

});

$('.head-mid').waypoint(function(direction){
	$('.cover-stream-line').removeClass('hide');
	$('.headshot-main').toggleClass('headshot-fixed');
	$headshotMid.toggleClass('show');
	if(direction=='down'){
		$('.headshot-fixed').css({top:-(windowHeight/3)});
		$('.content').css({top:(windowHeight)});
	}
	else{
		$('.content').css({top:0});	
	}
});

$('.content').waypoint(function(direction){
	if(direction == 'down'){
		$('.headshot-mid').addClass('bottom-border');
	}
	else{
		$('.headshot-mid').removeClass('bottom-border');
		// $('.panel-left').removeClass('on');
		// $('.panel-right').removeClass('on');
	}
},{offset:'34%'});

$(body).waypoint(function(direction){
	$('.headshot').addClass('hide');
})