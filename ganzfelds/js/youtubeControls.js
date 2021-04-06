
var ytPlayer;
var ytButtonDelay = true;


function onYouTubeIframeAPIReady() {
    ytPlayer = new YT.Player('video-placeholder', {
        width: 600,
        height: 400,
        videoId: 'adzkkza_nQE',
        playerVars: {
            color: 'white',
            loop: 1,
            // autoplay: 1,
            rel: 0,
        },
        events: {
            onReady: initialize
        }
    });
    ytPlayer2 = new YT.Player('video-placeholder2', {
        width: 600,
        height: 400,
        videoId: 'y9ieBJXUdZs',
        playerVars: {
            color: 'white',
            loop: 1,
            // autoplay: 1,
            rel: 0,
        },
        events: {
            onReady: initialize
        }
    });
}


function initialize(){

    // Update the controls on load
    updateTimerDisplay();
    updateProgressBar();

    time_update_interval = 0;  // Custom code
    // Clear any old interval.
    clearInterval(time_update_interval);

    // Start interval to update elapsed time display and
    // the elapsed part of the progress bar every second.
    time_update_interval = setInterval(function () {
        updateTimerDisplay();
        updateProgressBar();
    }, 1000)

}

// This function is called by initialize()
function updateTimerDisplay(){
    // Update current time text display.
    $('#current-time').text(formatTime( ytPlayer.getCurrentTime() ));
    $('#duration').text(formatTime( ytPlayer.getDuration() ));
}

function formatTime(time){
    time = Math.round(time);

    var minutes = Math.floor(time / 60),
    seconds = time - minutes * 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;

    return minutes + ":" + seconds;
}

$('#progress-bar').on('mouseup touchend', function (e) {

    // Calculate the new time for the video.
    // new time in seconds = total duration in seconds * ( value of range input / 100 )
    var newTime = ytPlayer.getDuration() * (e.target.value / 100);

    // Skip video to new time.
    ytPlayer.seekTo(newTime);

});

// This function is called by initialize()
function updateProgressBar(){
    // Update the value of our progress bar accordingly.
    $('#progress-bar').val((ytPlayer.getCurrentTime() / ytPlayer.getDuration()) * 100);
}

$('#play').on('click', function () {
    ytPlayer.playVideo();
});

$('#pause').on('click', function () {
    ytPlayer.pauseVideo();
});

$('#mute-toggle').on('click', function() {
    var mute_toggle = $(this);

    if(ytPlayer.isMuted()){
        ytPlayer.unMute();
        mute_toggle.text('volume_up');
    }
    else{
        ytPlayer.mute();
        mute_toggle.text('volume_off');
    }
});

$('#volume-input').on('change', function () {
    ytPlayer.setVolume($(this).val());
});

$('#speed').on('change', function () {
    ytPlayer.setPlaybackRate($(this).val());
});

$('#quality').on('change', function () {
    ytPlayer.setPlaybackQuality($(this).val());
});

$('#next').on('click', function () {
    ytPlayer.nextVideo()
});

$('#prev').on('click', function () {
    ytPlayer.previousVideo()
});