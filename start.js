function start() {
    attemptStart();
}

function attemptStart() {
    if (chrome && chrome.cast && chrome.cast.isAvailable) {
	console.log('chromecast available. starting');
	init();
    } else {
	console.log('chromecast not available, waiting.');
	setTimeout(attemptStart, 0);
    }
}

function init() {
    var sessionRequest = new chrome.cast.SessionRequest(
        chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID);

    var apiConfig = new chrome.cast.ApiConfig(sessionRequest,
					      sessionListener,
					      receiverListener);
    chrome.cast.initialize(apiConfig, onInitSuccess, onInitError);
}

function sessionListener(session) {
    console.log('session request');
    var mediaInfo = new chrome.cast.media.MediaInfo('http://current.stream.publicradio.org/kcmp.mp3', 'audio/mpeg');
    var request = new chrome.cast.media.LoadRequest(mediaInfo);
    session.loadMedia(request,
		      onMediaDiscovered.bind(this, 'loadMedia'),
		      onMediaError);
}

function onMediaDiscovered(){
    console.log('onMediaDiscovered');
}

function onMediaError() {
    console.log('onMediaError');
}

function receiverListener(e) {
    console.log('receiverListener');

}

function onInitSuccess(e) {

}

function onInitError(e) {
    console.error('init error', e);
}



function onMediaDiscovered() {
    console.log('media discovered');
}

function onMediaError(e) {
    //

}