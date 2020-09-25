window.addEventListener('DOMContentLoaded', (event) => startup());

let startup = function() {
    let audioOnlyMediaStream = AudioOnlyMediaStream();
    audioOnlyMediaStream.getLocalMediaStream(); // This is the stream source data, which we use subsequently
    let videoOnlyMediaStream = VideoOnlyMediaStream();
    videoOnlyMediaStream.getLocalMediaStream(); // This is the stream source data, which we use subsequently
}