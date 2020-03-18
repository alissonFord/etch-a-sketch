// Select the elements on the page - canvas, shake button
const canvas = document.querySelector('#etch-a-sketch');

// getContext() eturns an object that provides methods and properties for drawing on the canvas
const ctx = canvas.getContext('2d');
const shakeButton = document.querySelector('.shake');

// Setup our canvas for drawing
// make a variable called height and width from the same properties on our canvas
const { width, height } = canvas;
const MOVE_AMOUNT = 10;
// create random x and y starting points on the canvas
// cannot be const because they are reassigned later
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

let hue = 0;
// Sets or returns the type of corner created, when two lines meet
ctx.lineJoin = 'round';
// Sets or returns the style of the end caps for a line
ctx.lineCap = 'round';
ctx.lineWidth = 8;

ctx.beginPath();
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

// write a draw function
function draw({ key }) {
    ctx.beginPath();

    if(x > width) {
        x = 1;
    }
    else if (x < 0) {
        x = width;
    }
    else if (y < 0) {
        y = height;
    }
    else if (y > height) {
        y = 1;
    }

    ctx.moveTo(x, y);
    hue += 10;
    ctx.strokeStyle = `hsl(${ hue }, 20%, 50%)`;
    console.log(x,y);
    switch (key) {
        case 'ArrowDown':
            y += MOVE_AMOUNT;
            break;
        case 'ArrowUp':
            y -= MOVE_AMOUNT;
            break;
        case 'ArrowLeft':
            x -= MOVE_AMOUNT;
            break;
        case 'ArrowRight':
            x += MOVE_AMOUNT;
            break;
        default:
            break;
    }

    ctx.strokeStyle = hue;
    ctx.lineTo(x, y);
    ctx.stroke();
}

// write a handler for the keys
function handleKey(e) {
    if (e.key.includes('Arrow')) {
        e.preventDefault();
        draw({ key: e.key });
    }
}


// clear /shke function
function clearCanvas() {
    canvas.classList.add('shake');
    ctx.clearRect(0, 0, width, height);
    canvas.addEventListener(
        'animationed', 
        function() {
            canvas.classList.remove('shake');
        }, 
        { once: true } // removing eventListener
    );
}

// listen for arrow keys
window.addEventListener('keydown', handleKey);
shakeButton.addEventListener('click', clearCanvas);