   // Global variable to hold the image and canvas context
let img;
let canvas;
let context;

// Event listener to load the image
document.getElementById('upload').addEventListener('change', loadImage);     

function loadImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            img = new Image();
            img.onload = function () {
                displayImage(img);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

function displayImage(image) {
    // Create canvas and draw the uploaded image
    canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    canvas.width = image.width;
    canvas.height = image.height;
    context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);
    
    document.getElementById('output-container').style.display = 'block'; // Show output area
}

// Function to enhance the image
function enhanceImage() {
    if (!img) return;

    // Apply sharpening
    sharpenImage();

    // Apply upscaling
    upscaleImage();
}

// Sharpening function using a convolution kernel
function sharpenImage() {
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    const kernel = [
        [0, -1, 0],
        [-1, 5, -1],
        [0, -1, 0]
    ];

    // Apply the convolution kernel to sharpen the image
    for (let y = 1; y < canvas.height - 1; y++) {
        for (let x = 1; x < canvas.width - 1; x++) {
            let r = 0, g = 0, b = 0;

            // Convolve over the image data with the kernel
            for (let ky = -1; ky <= 1; ky++) {
                for (let kx = -1; kx <= 1; kx++) {
                    const pixel = getPixel(x + kx, y + ky);
                    r += pixel.r * kernel[ky + 1][kx + 1];
                    g += pixel.g * kernel[ky + 1][kx + 1];
                    b += pixel.b * kernel[ky + 1][kx + 1];
                }
            }
            setPixel(x, y, Math.min(Math.max(r, 0), 255), Math.min(Math.max(g, 0), 255), Math.min(Math.max(b, 0), 255));
        }
    }

    // Update the canvas with the enhanced data
    context.putImageData(imageData, 0, 0);
}

// Function to get the pixel value (RGB) from canvas
function getPixel(x, y) {
    const pixel = context.getImageData(x, y, 1, 1).data;
    return {
        r: pixel[0],
        g: pixel[1],
        b: pixel[2]
    };
}

// Function to set the pixel value (RGB) to canvas
function setPixel(x, y, r, g, b) {
    const imageData = context.getImageData(x, y, 1, 1);
    const data = imageData.data;
    data[0] = r;
    data[1] = g;
    data[2] = b;
    data[3] = 255; // Alpha
    context.putImageData(imageData, x, y);
}

// Function to upscale the image using nearest neighbor scaling
function upscaleImage() {
    const scalingFactor = 2; // Increase the image size by 2x
    const width = canvas.width * scalingFactor;
    const height = canvas.height * scalingFactor;

    const scaledCanvas = document.createElement('canvas');
    const scaledContext = scaledCanvas.getContext('2d');
    scaledCanvas.width = width;
    scaledCanvas.height = height;

    scaledContext.drawImage(canvas, 0, 0, width, height);
    canvas.width = width;
    canvas.height = height;
    context.drawImage(scaledCanvas, 0, 0);
}

// Add event listeners to buttons (enhance and reset)
document.getElementById('enhance-btn').addEventListener('click', enhanceImage);
