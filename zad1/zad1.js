var width = 0;
var height = 0;

var canvas;
var context;

window.addEventListener('load', () => {

    // Wczytanie szerokości
    while(true) {
        this.chooseCanvasWidth();
        if(width !== 0) {
            break;
        }
    }

    // Wczytanie wysokości
    while(true) {
        this.chooseCanvasHeight();
        if(height !== 0) {
            break;
        }
    }

    canvas = document.querySelector("#canvas");
    context = canvas.getContext("2d");

    // Ustawienie wielkości canvas
    canvas.height = height;
    canvas.width = width;

    let isDrawing = false;

    function startPosition(obj) {
        isDrawing = true;
        draw(obj);
    }

    function finishPosition() {
        isDrawing = false;
        context.beginPath();
    }

    function draw(obj) {
        if(!isDrawing) return;
        context.lineWidth = 5;
        context.lineCap = "round";

        context.lineTo(obj.clientX, obj.clientY);
        context.stroke();
        context.beginPath();
        context.moveTo(obj.clientX, obj.clientY);
    }


    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", finishPosition);
    canvas.addEventListener("mousemove", draw);



});


// Wczytanie wymiarów canvas - width
function chooseCanvasWidth() {
    let txt;
    let tmpWidth = prompt("Please enter canvas width in pixels:", "400");
    if (tmpWidth == null || tmpWidth == "") {
      txt = "User cancelled the prompt.";
    } else {

        try {
            txt = parseInt(tmpWidth);
            if(!Number.isNaN(txt))
            {
                width = tmpWidth;
            }
          }
          catch(error) {
          }

    }
  }

// Wczytanie wymiarów canvas - height
function chooseCanvasHeight() {
    let txt;
    let tmpHeight = prompt("Please enter canvas height in pixels:", "200");
    if (tmpHeight == null || tmpHeight == "") {
      txt = "User cancelled the prompt.";
    } else {

        try {
            txt = parseInt(tmpHeight);
            if(!Number.isNaN(txt))
            {
                height = tmpHeight;
            }
          }
          catch(error) {
          }
    }
  }

  
    // Wczytanie obrazu z komputera
    function applyImage(input) {
        var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById("imagePreview").setAttribute("src", e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }

    // Ustawienie parametrów grafik
    function addImageToCanvas() {
        var xPosition = document.getElementById("imageXPosition").value;
        var yPosition = document.getElementById("imageYPosition").value;
        var imageWidth = document.getElementById("imageWidth").value;
        var imageHeight = document.getElementById("imageHeight").value;

        var image = document.getElementById("imagePreview");
        context.drawImage(image, xPosition, yPosition, imageWidth, imageHeight);

    }