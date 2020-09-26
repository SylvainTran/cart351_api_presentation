# Demo Design Document

    The demo API presentation focuses on showing well-documented, small examples
    for the Media Streams API. Examples should be ideally modular and easily integrable into a flexible variety of projects.

    The first version shows Media Streams + Canvas API interactions.

## Presentation Slides
    
    In development.

## Build Status

    CORE:

    Get Tutorials:

    Basic Get Audio - Done - Passing
    Basic Get Audio Capture - Passing
    Basic Get Video - Done - Passing
    Basic Get Picture - Done - Passing
    Basic Get Video Capture - Done - Passing
    Basic Get Canvas Video Capture - Not started

    Set Tutorials:
    Basic Use Get Video Capture to Change Canvas Elements - Not Started
    Basic Use Get Audio Capture to create Patterns in Color or Animation Manipulation in Canvas (Filtering) - Not Started

    Constraints Configuration Tutorial:
    Basic Constraints - Not Started

    Helper Methods:

    STRETCH GOALS:

    Interactive Canvas Example Tutorial:
    Basic Game - Not Started
    Basic Experience - Not Started

## Change Log History

v0.1 - Demo tutorial media capture picture\
v0.2 - Current version. Design and Structuring, v1 scope (Media Streams + Canvas API)\
v0.3 - Added MediaStreams for audio, structured base demo page html\
v0.3b - Added audio record playback
v0.4 - Added Get Video and record

## Stretch

Game/Main Interactive Application Example

Scenes:
    Start Game
    End

Logic:
    User interaction: MediaStream capture\n
    User data:

## Versions

    V1: Working set of modular examples to go with canvas element. Basic
    pixel manipulation.

    V2: Show main digital art usages of MediaStreams: More in-depth canvas manipulation or WebRTC connectivity. WebGL? Motion Capture?

    V3: Stretch game/main interactive application.

## Objects & Methods of Interest (Not all from same API)

    MediaStreams API:

    Navigator.MediaDevices.getUserMedia();
    MediaStream.getVideoTrack/getAudioTrack

    Canvas Streams API:

    stream.requestFrame();
    HtmlCanvasElement
    WebRTC
    MediaSource.addSourceBuffer()

    Canvas Manipulation Related: 
    drawImage() : https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
    getImageData() : https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData
    putImageData() : https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/putImageData
    ImageData : https://developer.mozilla.org/en-US/docs/Web/API/ImageData
    ImageData.data: https://developer.mozilla.org/en-US/docs/Web/API/ImageData/data

## References

    Media Streams API:
        https://developer.mozilla.org/en-US/docs/Web/API/Media_Streams_API\
    Media Streams Recording API:
        https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API
    Canvas API:
        https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API\
    WebRTC:
        https://webrtc.github.io/samples/
    Canvas Manipulation:
        http://html5doctor.com/video-canvas-magic/
        https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode

## Timeline

    Week 1: Everything

## UML

Upcoming.