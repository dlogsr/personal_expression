$frameRight = $('.frame-right');
$frameLeft = $('.frame-left');
$midStreamLine = $('.mid-stream-line');
$headshotMid = $('.headshot-mid');
$borderLeftBrain = $('.border-left-brain');
$borderRightBrain = $('.border-right-brain');
$panelRight = $('.panel-right');
$panelLeft = $('.panel-left');
$lineRight = $('.line-right');
$lineLeft = $('.line-left');
$leftButton = $('.left-button');
$rightButton = $('.right-button');
$rightDown = $('.right-down');
$rightUp = $('.right-up');
$leftDown = $('.left-down');
$leftUp = $('.left-up');
$coverStreamLine = $('.cover-stream-line');
$headDiv = $('.head-div');
$brainButtons = $('.brain-buttons');
$contentOverlay = $('.content-overlay');
$contentOverlayPanel = $('.content-overlay-panel');
$content = $('.content');
$streamLine = $('.stream-line');
$streamPhoto =$('.stream-photo');
$snowVid = $('#snow-vid');

var windowHeight;
var rightFrames = $frameRight.length;
var leftFrames = $('.frame-left').length;
var scrollOffset;
var frameMarkerLeft = 0;
var frameMarkerRight = 0;

function scrollToTop(time){
	$('html,body').animate({scrollTop : 0},time);
}

function hideTopNav(){
	$midStreamLine.addClass('hide');
	$panelLeft.removeClass('on');
	$panelRight.removeClass('on');
	$('.right-arrows .scroll-button').add($('.curve-left')).add($('.curve-right')).add($('.left-arrows .scroll-button')).add($('.right-brain-arrow')).add($('.left-brain-arrow')).addClass('hide');
}

function scrollAndStop(marker,offset,dir){
	var frameMarker;
	var $currMarker = $(marker);
	(marker == '.frame-right') ? frameMarker = frameMarkerRight : frameMarker = frameMarkerLeft;

	if(scrollOffset === undefined){
		scrollOffset = $(marker).offset().top - offset;
		frameMarker++;
	}
	else if(dir == 'down'){
		for(x = 0; x < frameMarker; x++){
			$currMarker = $currMarker.next();
		}
		scrollOffset = $currMarker.offset().top - offset;
		frameMarker++;
	}
	else if (dir == 'up'){
		if(frameMarker <= 1){
			scrollOffset = 0;
			frameMarkerRight = 0;
			frameMarkerLeft = 0;
			hideTopNav();
		}
		else{
			if(frameMarker >= 0) frameMarker -=1;
			if(frameMarker < 0) frameMarker = 0;	
			var $currMarker = $(marker);
			for(x = 0; x < frameMarker-1; x++){
				$currMarker = $currMarker.next();
			}
			scrollOffset = $currMarker.offset().top - offset;
		}
	}
	console.log(marker + ' ' + frameMarker + ' to ' + scrollOffset);
	(marker == '.frame-right') ? frameMarkerRight = frameMarker : frameMarkerLeft = frameMarker;
	$('html,body').animate({scrollTop : scrollOffset},500);
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
	$headDiv.add($headshotMid).add($midStreamLine).css({'height':windowHeight/3});
	$brainButtons.css({'height':windowHeight/3-8});
	$coverStreamLine.add($streamLine).add($content).css({'height':pageHeight});
	$contentOverlayPanel.css({'height':pageHeight});
	$streamPhoto.css({'max-height':windowHeight/3.2, 'max-width':'100%'});
	$snowVid.width('75%');
	$snowVid.height(windowHeight/3.2);
}

function adjustContentOffset(currSection,num) {
	windowHeight = getWindowHeight();
	currSection.css({'top':windowHeight+num});
}

$(document).ready(function(){
	scrollToTop(0);
	adjustContentSpacing('.headshot');
	$headshotMid.css({'background-size': windowHeight});
	$rightDown.on('touchstart mousedown',function(e){
		scrollAndStop('.frame-right',windowHeight/3,'down');
	});
	$rightUp .on('touchstart mousedown',function(e){
		scrollAndStop('.frame-right',windowHeight/3,'up');
	});
	$leftDown.on('touchstart mousedown',function(e){
		scrollAndStop('.frame-left',windowHeight/3,'down');
	});
	$leftUp.on('touchstart mousedown',function(e){
		scrollAndStop('.frame-left',windowHeight/3,'up');
	});

	$rightButton.on('touchstart mousedown',function(e){
		frameMarkerRight = 0;
		scrollAndStop('.frame-right',windowHeight/3,'down');
		setTimeout(function(){
			$('.right-arrows .scroll-button').add($('.curve-right')).add($('.right-brain-arrow')).removeClass('hide');
			$('.left-arrows .scroll-button').add($('.curve-left')).add($('.left-brain-arrow')).addClass('hide');
			$midStreamLine.removeClass('hide');
			$panelLeft.addClass('on');
			$('.frame-left .stream-photo-frame-inner').removeClass('border-left-brain');
			$('.frame-right .stream-photo-frame-inner').addClass('border-right-brain');
			$panelRight.removeClass('on');
			$coverStreamLine.addClass('line-right').removeClass('line-left');
			$headshotMid.removeClass('border-left-brain').addClass('border-right-brain');
		},500);
	});

	$leftButton.on('touchstart mousedown',function(e){
		frameMarkerLeft = 0;
		scrollAndStop('.frame-left',windowHeight/3,'down');
		setTimeout(function(){
			$('.left-arrows .scroll-button').add($('.curve-left')).add($('.left-brain-arrow')).removeClass('hide');
			$('.right-arrows .scroll-button').add($('.curve-right')).add($('.right-brain-arrow')).addClass('hide');
			$midStreamLine.removeClass('hide');
			$panelLeft.removeClass('on');
			$panelRight.addClass('on');
			$('.frame-left .stream-photo-frame-inner').addClass('border-left-brain');
			$('.frame-right .stream-photo-frame-inner').removeClass('border-right-brain');
			$coverStreamLine.addClass('line-left').removeClass('line-right');
			$headshotMid.removeClass('border-right-brain').addClass('border-left-brain');
		},500);
	});

});

$('.head-mid').waypoint(function(direction){
	$coverStreamLine.removeClass('hide');
	$('.headshot-main').toggleClass('headshot-fixed');
	$headshotMid.toggleClass('show');
	if(direction=='down'){
		$('.headshot-fixed').css({top:-(windowHeight/3)});
		$content.css({top:(windowHeight)});
	}
	else{
		$content.css({top:0});	
	}
});

$content.waypoint(function(direction){
	if(direction == 'down'){
		$headshotMid.addClass('bottom-border');
	}
	else{
		$headshotMid.removeClass('bottom-border');
		// $panelLeft.removeClass('on');
		// $panelRight.removeClass('on');
	}
},{offset:'34%'});

$('body').waypoint(function(direction){
	$('.headshot').addClass('hide');
})