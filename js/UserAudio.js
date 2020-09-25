window.addEventListener('DOMContentLoaded', (event) => startup());

let startup = function() {
    let audioOnlyMediaStream = AudioOnlyMediaStream();
    audioOnlyMediaStream.getLocalMediaStream(); // This is the stream source data, which we use subsequently
}

// An example of a media stream with an audio track only.
// Without Constraints Example. This is done using the module pattern.
let AudioOnlyMediaStream = function() {
    // Get the local media stream from getUserMedia.
    this.localMediaStream = null;
    this.video = document.querySelector("video"); // Get the video element to use
    this.streaming = false; // Are we streaming the user's video or not
    var constraints = { audio: true }; // We need audio so it's a constraint
    var chunks = []; // Use to deposit our audio files in chunks

    let getLocalMediaStream = function() {
        // First check if navigator has mediaDevices
        if(navigator.mediaDevices) {
           // The stream's kind: it's a property for the kind of media. The resulting stream is required (through constraints) to have its the corresponding kind of track if set to true, otherwise -> error.            
           // Note that the recording object, Media Recorder is only created inside the promise. Everything is handled in there due to async nature of net.
            navigator.mediaDevices.getUserMedia(constraints) // audio is set to true so we need a microphone track.
                .then(function(stream) {
                    this.localMediaStream = stream; // Cache it
                    // Get the audio track from the local media stream we filled in. Note this is an array
                    let audioTrack = this.localMediaStream.getAudioTracks();
                    if (audioTrack.length > 0) {
                        // We could play the video if necessary but we just want the local stream data                       
                        // This below is used for the video tutorial, but you can hear yourself
                        this.video.srcObject = stream;
                        this.video.play();                                    
                        // Setup listeners for the streaming to true when the video can play
                        this.video.addEventListener('canplay', function(ev){
                            if (!this.streaming) {        
                                this.streaming = true;
                            }
                        }, false);        

                        // Record stuff
                        let mediaRecorder = new MediaRecorder(this.localMediaStream);                        
                        let audioStartbutton = document.getElementById("audioStartButton");
                        let audioStopButton = document.getElementById("audioStopButton");
                        // Record on click
                        audioStartbutton.addEventListener('click', function(ev){
                            // record - Using MediaStreams Recording API
                            mediaRecorder.start();
                            console.log(mediaRecorder.state);
                            // TODO fix this
                            audioStartButton.style.background = "red";
                            audioStartButton.style.color= "white";
                            // Later this record can be stored, sent into a JSON and manipulated in a game or used as a config for canvas elements' behaviours, or through other libraries
                            ev.preventDefault();
                        }, false);

                        audioStopButton.addEventListener('click', function(ev){
                            // Stop recording
                            mediaRecorder.stop();
                            audioStartButton.style.background = "";
                            audioStartButton.style.color = "";
                        });
                        
                        // When we stop recording, create a file and let the user play it through a html element
                        mediaRecorder.onstop = function(e) {                    
                            let clipName = prompt('Enter a name for your sound clip');
                            let soundClips = document.createElement("div");
                            let clipContainer = document.createElement('article');
                            let clipLabel = document.createElement('p');
                            let audio = document.createElement('audio');
                            let deleteButton = document.createElement('button');
                           
                            clipContainer.classList.add('clip');
                            audio.setAttribute('controls', '');
                            deleteButton.innerHTML = "Delete";
                            clipLabel.innerHTML = clipName;
                      
                            clipContainer.appendChild(audio);
                            clipContainer.appendChild(clipLabel);
                            clipContainer.appendChild(deleteButton);
                            soundClips.appendChild(clipContainer);
                            document.getElementById("microphone").appendChild(soundClips);

                            audio.controls = true;
                            // Create a raw audio file, in this case ogg
                            let blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
                            chunks = [];
                            let audioURL = URL.createObjectURL(blob);
                            audio.src = audioURL;
                            console.log("recorder stopped");
                      
                            deleteButton.onclick = function(e) {
                                let evtTgt = e.target;
                                evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
                            }

                            mediaRecorder.ondataavailable = function(e) {
                                chunks.push(e.data);
                                // Note we can use the blob as a link and save it in a JSON to be used later. Like in a canvas element.                                
                                // In this case it's just put into an audio element.
                            }
                        }                      

                        return this.localMediaStream;
                    }
                })
                .catch(function(err) {
                    console.log("An error occurred: " + err);
                }
            );
        }
    }

    return {
         getLocalMediaStream: getLocalMediaStream
    }
}