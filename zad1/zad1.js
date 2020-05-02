var width = 0;
var height = 0;
var color = "green";
var currentMode = "line";
var startObj;
var finishObj;

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
        startObj = obj;
        draw(obj);
    }

    function finishPosition(obj) {
        isDrawing = false;
        finishObj = obj;
        context.strokeStyle = color;


        switch(currentMode) {
            case "rectangle":
                // Rysowanie prostokąta
                context.beginPath();
                context.rect(startObj.clientX, startObj.clientY, (finishObj.clientX - startObj.clientX), (finishObj.clientY - startObj.clientY));
                context.stroke();
              break;
            case "circle":
                var radiusX = (finishObj.clientX - startObj.clientX) * 0.5;
                radiusY = (finishObj.clientY - startObj.clientY) * 0.5;
                centerX = startObj.clientX + radiusX;
                centerY = startObj.clientY + radiusY;
                step = 0.001;
                a = step;
                pi2 = Math.PI * 2 - step;

                context.beginPath();
            
                context.moveTo(centerX + radiusX * Math.cos(0),
                        centerY + radiusY * Math.sin(0));
            
                for(; a < pi2; a += step) {
                    context.lineTo(centerX + radiusX * Math.cos(a),
                            centerY + radiusY * Math.sin(a));
                }

                context.closePath();
                context.stroke();
              break;
            case "rectangleFill":
                    // Rysowanie prostokąta z wypełnieniem
                    context.beginPath();
                    context.rect(startObj.clientX, startObj.clientY, (finishObj.clientX - startObj.clientX), (finishObj.clientY - startObj.clientY));
                    context.fillStyle = color;
                    context.fill();
                    context.stroke();
              break;
            case "circleFill":
                var radiusFillX = (finishObj.clientX - startObj.clientX) * 0.5;
                radiusFillY = (finishObj.clientY - startObj.clientY) * 0.5;
                centerFillX = startObj.clientX + radiusFillX;
                centerFillY = startObj.clientY + radiusFillY;
                stepFill = 0.0001;
                a = stepFill;
                pi2 = Math.PI * 2 - stepFill;

                context.beginPath();
            
                context.moveTo(centerFillX + radiusFillX * Math.cos(0),
                        centerFillY + radiusFillY * Math.sin(0));
            
                for(; a < pi2; a += stepFill) {
                    context.lineTo(centerFillX + radiusFillX * Math.cos(a),
                            centerFillY + radiusFillY * Math.sin(a));
                }

                context.fillStyle = color;
                context.fill();
            
                context.closePath();
                context.stroke();
            break;
        }

        context.beginPath();
    }

    function draw(obj) {
        if(!isDrawing) return;

        switch(currentMode) {
            case "line":
                context.lineWidth = 1;
                context.lineCap = "round";
                context.strokeStyle = color;

                context.lineTo(obj.clientX, obj.clientY);
                context.stroke();
                context.beginPath();
                context.moveTo(obj.clientX, obj.clientY);
              break;
          }
    }

    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", finishPosition);
    canvas.addEventListener("mousemove", draw);
});

    // Zmiana koloru
    function changeColor(chosenColor) {
        color = chosenColor;
        console.log('Wybrany kolor: ' + chosenColor);
    }

    function changeMode(chosenMode) {
        currentMode = chosenMode;
        console.log('Wybrany tryb: ' + chosenMode);
    }


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