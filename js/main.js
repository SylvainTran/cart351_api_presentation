window.addEventListener('DOMContentLoaded', (event) => startup());

let startup = function() {
    let audioOnlyMediaStream = AudioOnlyMediaStream();
    audioOnlyMediaStream.getLocalMediaStream(); // This is the stream source data, which we use subsequently
    let videoOnlyMediaStream = VideoOnlyMediaStream();
    videoOnlyMediaStream.getLocalMediaStream(); // This is the stream source data, which we use subsequently

    // Simple canvas-video pixel manipulation example
    // Get the video element, capture it in the canvas
    let videoElement = document.getElementById("videoTutorial");
    let canvas = document.getElementById("canvas");
    let constraints = { width: 300, height: 300 };
    videoElement.addEventListener('play', function() {
        let videoToCanvas = new VideoToCanvas();
        // Change the pixels inside the canvas using imageData
        videoToCanvas.init(videoToCanvas.drawHalfNoiseCanvas, videoElement, canvas, constraints);
        // Simple user interactions over canvas -- making certain image regions react to mouse?            
    });
}