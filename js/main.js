window.addEventListener('DOMContentLoaded', (event) => startup());

let startup = function() {
    let audioOnlyMediaStream = AudioOnlyMediaStream();
    audioOnlyMediaStream.getLocalMediaStream(); // This is the stream source data, which we use subsequently
    let videoOnlyMediaStream = VideoOnlyMediaStream();
    videoOnlyMediaStream.getLocalMediaStream(); // This is the stream source data, which we use subsequently

    // Simple canvas-video pixel manipulation example
    // Get the video element, link it to the canvas and then alter the pixels in it
    let videoElement = document.getElementById("videoTutorial");
    let canvas = document.getElementById("canvas");
    let constraints = { width: 300, height: 300 };
    // Add an event listener on video play to establish a link between video element and canvas
    videoElement.addEventListener('play', function() {
        let videoToCanvas = new VideoToCanvas();
        // Change the pixels inside the canvas using imageData: change first arg. to desired effect method in the VideoToCanvas class
        videoToCanvas.init(videoToCanvas.drawHalfNoiseCanvas, videoElement, canvas, constraints);
        
        // TODO:
        // Simple user interactions over canvas -- making certain image regions react to mouse?            

        // TODO:
        // WebRTC connectivity?
    });
}