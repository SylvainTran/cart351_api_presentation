let VideoToCanvas = function () {

    return {
        // init
        //
        // Initiates the video + canvas drawing process
        init: function(drawType, videoElement, canvasElement, constraints) {
            this.drawType = drawType;
            this.videoElement = videoElement;
            this.canvasElement = canvasElement;
            this.constraints = constraints;
            this.linkToVideo();
        },

        // linkToVideo
        // arg: drawType : the draw effect we want to call for each frame
        // Continous link between the video element and the canvas
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
            // Multiply the width and height by 4 because there are four values per pixels, so the full frame is 4*300 and 4*300 for width and height respectively
            // Note that we could allow a custom region to be extracted using mouse events instead, or allow to draw a shape
            let frame = ctx.getImageData(0, 0, 4*width, 4*height); // We are extracting the full width and height of the context in this case

            // The frame contains ImageData, which has properties we can manipulate
            // frame.data is ImageData.data: a Uint8ClampedArray one dimensional array containing
            // data in the RGBA order, with integer values between [0, 255].
            // So if we have a 300 x 300 frame, and if we have 4 values per pixel (for each rgba channel)
            // we have 4 x 300 x 300 pixels in total (frame.data.length) = 360 000 values stored
            // Dividing by 4 means taking just the pixels' worth
            const rgbaChannels = 4;
            const framePixelsLength = frame.data.length / rgbaChannels; // 300 x 300
            for (let i = 0; i < framePixelsLength; i += rgbaChannels) { // To jump to the next pixel, we need to jump over four values (rgbaChannels.length)
                // An alternative to i+=rgbaChannels is to multiply i * 4 for each array rgbaChannel access
                let r = frame.data[i + 0]; // Red is at the first position of each group of four values for each new pixel
                let g = frame.data[i + 1]; // green
                let b = frame.data[i + 2]; // blue
                let a = frame.data[i + 3]; // alpha

                // Do whatever you want with the rgba values here
                // Change pixels with frame.data[i + x] = changedValue;
            }
            // Apply
            // ctx.putImageData(frame, 0, 0);
        },

        // drawGrayscale()
        //
        // Make black and white
        drawGrayscale: function () {
          // First get the drawing context from canvas (See CanvasRenderingContext2D)
          const ctx = this.canvasElement.getContext('2d');
          const images = this.videoElement;
          const width = this.constraints.width;
          const height = this.constraints.height;
          // Draw an image using the context and the video element as source
          ctx.drawImage(images, 0, 0, width, height);
          // Multiply the width and height by 4 because there are four values per pixels, so the full frame is 4*300 and 4*300 for width and height respectively
          let frame = ctx.getImageData(0, 0, 4*width, 4*height);
          const rgbaChannels = 4;
          const framePixelsLength = frame.data.length / rgbaChannels; // 300 x 300
          for (let i = 0; i < framePixelsLength; i += rgbaChannels) { // To jump to the next pixel, we need to jump over three values (rgbChannels.length)
              let r = frame.data[i + 0]; // Red is at the first position of each group of four values for each new pixel
              let g = frame.data[i + 1]; // green
              let b = frame.data[i + 2]; // blue
              let a = frame.data[i + 3]; // alpha

              // Luminance formula to calculate grayscale (red x 0.3 + green x 0.59 + blue x 0.11)
              let grayscale = r * 0.3 + g * 0.59 + b * 0.11;

              // Change pixels
              // The alpha channel does not need to be changed;
              frame.data[i + 0] = grayscale; // r
              frame.data[i + 1] = grayscale; // g
              frame.data[i + 2] = grayscale; // b
              frame.data[i + 3] = a; // a
          }
          // Apply
          ctx.putImageData(frame, 0, 0);
        },

        // drawInverted()
        //
        // Invert color values
        drawInverted: function () {
          // First get the drawing context from canvas (See CanvasRenderingContext2D)
          const ctx = this.canvasElement.getContext('2d');
          const images = this.videoElement;
          const width = this.constraints.width;
          const height = this.constraints.height;
          // Draw an image using the context and the video element as source
          ctx.drawImage(images, 0, 0, width, height);
          // Flip canvas upside down

          // Multiply the width and height by 4 because there are four values per pixels, so the full frame is 4*300 and 4*300 for width and height respectively
          let frame = ctx.getImageData(0, 0, 4*width, 4*height);
          const rgbaChannels = 4;
          const framePixelsLength = frame.data.length / rgbaChannels; // 300 x 300
          for (let i = 0; i < framePixelsLength; i += rgbaChannels) { // To jump to the next pixel, we need to jump over three values (rgbChannels.length)
              let r = frame.data[i + 0]; // Red is at the first position of each group of four values for each new pixel
              let g = frame.data[i + 1]; // green
              let b = frame.data[i + 2]; // blue
              let a = frame.data[i + 3]; // alpha

              // Invert values
              r = 255 - r;
              g = 255 - g;
              b = 255 - b;

              // Change pixels
              frame.data[i + 0] = r;
              frame.data[i + 1] = g;
              frame.data[i + 2] = b;
              frame.data[i + 3] = a;
          }
          // Apply
          ctx.putImageData(frame, 0, 0);
        },

        // drawPatternedColors()
        //
        // Make patterned colors using modulo (%)
        drawPatternedColors: function () {
          // First get the drawing context from canvas (See CanvasRenderingContext2D)
          const ctx = this.canvasElement.getContext('2d');
          const images = this.videoElement;
          const width = this.constraints.width;
          const height = this.constraints.height;
          // Draw an image using the context and the video element as source
          ctx.drawImage(images, 0, 0, width, height);
          // Multiply the width and height by 4 because there are four values per pixels, so the full frame is 4*300 and 4*300 for width and height respectively
          let frame = ctx.getImageData(0, 0, 4*width, 4*height);
          ctx.clearRect(0, 0, width, height);
          ctx.rect(0, 0, width, height);
          const rgbaChannels = 4;
          const framePixelsLength = frame.data.length / rgbaChannels; // 300 x 300
          for (let i = 0; i < framePixelsLength; i += rgbaChannels) { // To jump to the next pixel, we need to jump over three values (rgbChannels.length)
              let r = frame.data[i + 0]; // Red is at the first position of each group of four values for each new pixel
              let g = frame.data[i + 1]; // green
              let b = frame.data[i + 2]; // blue
              let a = frame.data[i + 3]; // alpha

              /*
              Pixel manipulation here
              */

              frame.data[i + 0] = r;
              frame.data[i + 1] = g;
              frame.data[i + 2] = b;
              frame.data[i + 3] = a;
          }
          // Apply
          ctx.putImageData(frame, 0, 0);
        },

        // Make a green screen effect
        drawGreenScreenEffect: function () {
          // First get the drawing context from canvas (See CanvasRenderingContext2D)
          const ctx = this.canvasElement.getContext('2d');
          const images = this.videoElement;
          const width = this.constraints.width;
          const height = this.constraints.height;
          // Draw an image using the context and the video element as source
          ctx.drawImage(images, 0, 0, width, height);
          // Multiply the width and height by 4 because there are four values per pixels, so the full frame is 4*300 and 4*300 for width and height respectively
          let frame = ctx.getImageData(0, 0, 4*width, 4*height);
          const rgbaChannels = 4;
          const framePixelsLength = frame.data.length / rgbaChannels; // 300 x 300

          // Target colour for chromakey
          // Default is Chroma Key Green
          // For more functionality, write code to dynamically set the target with colour picker/mouse event on the canvas
          // Tutorial that could help with this: https://ourcodeworld.com/articles/read/185/how-to-get-the-pixel-color-from-a-canvas-on-click-or-mouse-event-with-javascript
          let target = {
            r: 0,
            g: 177,
            b: 64
          };

          // How sensitive is the chroma key effect (acceptable overall difference between current and target rgb values)
          let tolerance = 150;

          for (let i = 0; i < framePixelsLength; i += rgbaChannels) { // To jump to the next pixel, we need to jump over three values (rgbChannels.length)
            let r = frame.data[i + 0]; // Red is at the first position of each group of four values for each new pixel
            let g = frame.data[i + 1]; // green
            let b = frame.data[i + 2]; // blue
            let a = frame.data[i + 3]; // alpha

            // Calculate difference between current rgb values and target rgb values
            // If difference is within tolerance, make pixel transparent
            if (Math.abs(r - target.r) + Math.abs(g - target.g) + Math.abs(b - target.b) <= tolerance) {
              frame.data[i + 3] = 0;
            }
          }
          // Apply
          ctx.putImageData(frame, 0, 0);
        },

        // Noise over half canvas example
        drawNoise: function() {
            const ctx = this.canvasElement.getContext('2d');
            const images = this.videoElement;
            const width = this.constraints.width;
            const height = this.constraints.height;
            ctx.drawImage(images, 0, 0, width, height);
            // Multiply the width and height by 4 because there are four values per pixels, so the full frame is 4*300 and 4*300 for width and height respectively
            let frame = ctx.getImageData(0, 0, 4*width, 4*width); // We are extracting the full width and height of the context in this case
            const rgbaChannels = 4;
            const framePixelsLength = frame.data.length / rgbaChannels; // 300 x 300
            for (let i = 0; i < framePixelsLength; i += rgbaChannels) { // To jump to the next pixel, we need to jump over four values (rgbaChannels.length)
                let r = frame.data[i + 0]; // Red is at the first position of each group of four values for each new pixel
                let g = frame.data[i + 1]; // green
                let b = frame.data[i + 2]; // blue
                let a = frame.data[i + 3]; // alpha

                // Do whatever you want with the rgba values here
                // r = r+50;
                // g = g+50;
                // b = b+50;
                // a = 255;
                // Change pixels with frame.data[i + x] = changedValue;
                let x = Math.random() * 255;
                frame.data[i + 0] = r + x;
                frame.data[i + 1] = g + x;
                frame.data[i + 2] = b + x;
                frame.data[i + 3] = a + x;
            }
            // Apply
            ctx.putImageData(frame, 0, 0);
        }

        // // Example for reference
        // drawExample: function (v, c, bc, w, h) {
        //     if (v.paused || v.ended) return false;
        //     // First, draw it into the backing canvas
        //     bc.drawImage(v, 0, 0, w, h);
        //     // Grab the pixel data from the backing canvas
        //     let idata = bc.getImageData(0, 0, w, h);
        //     let data = idata.data;
        //     // Loop through the pixels, turning them grayscale
        //     for (let i = 0; i < data.length; i += 4) {
        //         let r = data[i];
        //         let g = data[i + 1];
        //         let b = data[i + 2];
        //         let brightness = (3 * r + 4 * g + b) >>> 3;
        //         data[i] = brightness;
        //         data[i + 1] = brightness;
        //         data[i + 2] = brightness;
        //     }
        //     idata.data = data;
        //     // Draw the pixels onto the visible canvas
        //     c.putImageData(idata, 0, 0);
        //     // Start over
        //     setTimeout(function () {
        //         draw(v, c, bc, w, h);
        //     }, 0);
        // }

    }
}
