let VideoToCanvas = function () {

    return {
        // linkToVideo
        // arg: drawType : the draw effect we want to call for each frame
        // Continous link between the video element and the canvas
        // Add an event listener for video play to callback a recursive draw frame
        init: function(drawType, videoElement, canvasElement, constraints) {
            this.drawType = drawType;
            this.videoElement = videoElement;
            this.canvasElement = canvasElement;
            this.constraints = constraints;
            this.linkToVideo();
        },

        linkToVideo: function () {
            if (this.videoElement.paused || this.videoElement.ended) {
                return; // Don't link if video is paused or ended
            }

            // Draw the requested image otherwise
            this.drawType();
            let self = this;
            // Redraw the next frame
            setTimeout(function () {
                self.linkToVideo();
            }, 0);
        },

        // drawRegularImage
        //
        // Shows how to draw image on canvas from video element source
        drawRegularImage: function () {
            // To draw an image from a video el source, we need the image source, the x-axis
            // coordinate at which to place the top-left corner of the source image in the destination canvas
            // idem for y-axis coordinate.

            // First get the drawing context from canvas (See CanvasRenderingContext2D)
            const ctx = this.canvasElement.getContext('2d');
            const images = this.videoElement;
            const width = this.constraints.width;
            const height = this.constraints.height;
            // Draw an image using the context and the video element as source
            ctx.drawImage(images, 0, 0, width, height);
            // Get a new frame using getImageData (see docs)
            // Note that we could allow a custom region to be extracted using mouse events instead, or allow to draw a shape
            let frame = ctx.getImageData(0, 0, width, height); // We are extracting the full width and height of the context in this case
            // The frame contains ImageData, which has properties we can manipulate
            // frame.data is ImageData.data: a Uint8ClampedArray one dimensional array containing
            // data in the RGBA order, with integer values between [0, 255].
            // So if we have a 300 x 300 frame, and if we have 4 values per pixel (for each rgba channel)
            // we have 4 x 300 x 300 pixels in total (frame.data.length) = 360 000 values stored
            // Dividing by 4 means taking just the pixels' worth
            const rgbaChannels = 4;
            let framePixelsLength = frame.data.length / rgbaChannels; // 300 x 300
            for (let i = 0; i < framePixelsLength; i += rgbaChannels) { // To jump to the next pixel, we need to jump over four values (rgbaChannels.length)
                // An alternative to i+=rgbaChannels is to multiply i * 4 for each array rgbaChannel access
                let r = frame.data[i + 0]; // Red is at the first position of each group of four values for each new pixel
                let g = frame.data[i + 1]; // green
                let b = frame.data[i + 2]; // blue
                let a = frame.data[i + 3]; // alpha

                // Do whatever you want with the rgba values here
                // Change pixels with frame.data[i + x] = changedValue;
            }
        },


        // Make black and white
        drawBlackAndWhite: function () {

        },

        // Make random colors
        drawRandomColors: function () {

        },

        // Make patterned colors using modulo (%)
        drawPatternedColors: function () {

        },

        // Make a green screen effect
        drawGreenScreenEffect: function () {

        },

        // Example for reference
        drawExample: function (v, c, bc, w, h) {
            if (v.paused || v.ended) return false;
            // First, draw it into the backing canvas
            bc.drawImage(v, 0, 0, w, h);
            // Grab the pixel data from the backing canvas
            let idata = bc.getImageData(0, 0, w, h);
            let data = idata.data;
            // Loop through the pixels, turning them grayscale
            for (let i = 0; i < data.length; i += 4) {
                let r = data[i];
                let g = data[i + 1];
                let b = data[i + 2];
                let brightness = (3 * r + 4 * g + b) >>> 3;
                data[i] = brightness;
                data[i + 1] = brightness;
                data[i + 2] = brightness;
            }
            idata.data = data;
            // Draw the pixels onto the visible canvas
            c.putImageData(idata, 0, 0);
            // Start over
            setTimeout(function () {
                draw(v, c, bc, w, h);
            }, 0);
        }

    }
}
