window.addEventListener('DOMContentLoaded', (event) => startup());

let startup = function() {
    let audioOnlyMediaStream = AudioOnlyMediaStream();
    let localMediaStream = audioOnlyMediaStream.getLocalMediaStream();
}

// An example of a media stream with an audio track only.
// Without Constraints Example. This is done using the module pattern.
let AudioOnlyMediaStream = function() {
    // Get the local media stream from getUserMedia.
    this.localMediaStream = null;
    this.video = document.querySelector("video"); // Get the video element to use
    this.streaming = false; // Are we streaming the user's video or not
    this.audioStartbutton = document.getElementById("audioRecordButton");

    let getLocalMediaStream = function() {
        // First check if navigator has mediaDevices
        if(navigator.mediaDevices) {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true }) // audio is set to true so we need a microphone track.
                .then(function(stream) {
                    this.localMediaStream = stream; // Cache it
                    // Get the audio track from the local media stream we filled in
                    let audioTrack = this.localMediaStream.getAudioTracks();
                    if (audioTrack.length > 0) {
                        this.video.srcObject = stream;
                        this.video.play();            
                        // Setup listeners for the streaming to true when the video can play
                        this.video.addEventListener('canplay', function(ev){
                            if (!this.streaming) {        
                                this.streaming = true;
                            }
                        }, false);        

                        // Record on click
                        audioStartbutton.addEventListener('click', function(ev){
                            // record
                        ev.preventDefault();
                        }, false);
                    }
                })
                .catch(function(err) {
                    console.log("An error occurred: " + err);
                }
            );
        }
    }

    return {
        // The stream's kind: it's a property for the kind of media. The resulting stream is required to have its the corresponding kind of track if set to true, otherwise -> error.
        getLocalMediaStream: getLocalMediaStream
    }
}