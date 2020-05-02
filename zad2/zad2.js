var canvas;
var ctx;
var playerName;


function displayGameInfo() {
    alert("Celem gry jest wcielić się w postać Tom'a i jak największą ilość razy złapać Jerry'ego w zadanym czasie. Przed rozpoczęciem gry należy wpisać imię gracza i wybrać przycisk START");
}


window.addEventListener('load', () => {
    //playGame();
    canvas = document.querySelector("#canvas");
    ctx = canvas.getContext("2d");

    // Ustawienie wymiarów okna gry
    canvas.width = 1000;
    canvas.height = 600;
    document.body.appendChild(canvas);
});

// Wczytanie wyników najlepszych 3 graczy
function loadUserRecords() {

}

// Wczytanie danych gracza i start gry
function startGame() {
    playerName = document.getElementById("playerName").value;
    if(playerName) {
        playGame();
    } else {
        alert("Proszę podać nazwę gracza");
    }
}

// Rozpoczęcie rozgrywki
function playGame() {
    canvas = document.querySelector("#canvas");
    ctx = canvas.getContext("2d");

    // Ustawienie wymiarów okna gry
    canvas.width = 1000;
    canvas.height = 600;
    document.body.appendChild(canvas);

    // Wczytanie tła
    var backgroundReady = false;
    var backgroundImage = new Image();
    backgroundImage.onload = function () {
    // Ustawienie flagi
    backgroundReady = true;
    };
    backgroundImage.src = "Images/background.jpg";


    // Wczytanie Tom'a
    var tomReady = false;
    var tomImage = new Image();
    tomImage.onload = function () {
    // Ustawienie flagi
    tomReady = true;
    };
    tomImage.src = "Images/tom.png";


    // Wczytanie Jerry'ego
    var jerryReady = false;
    var jerryImage = new Image();
    jerryImage.onload = function () {
    // Ustawienie flagi
    jerryReady = true;
    };
    jerryImage.src = "Images/jerry.png";

    var keysDown = {};
    var tom = {speed: 300};
    var jerry = {};
    var jerrysCaught = 0;

    // Wczytanie wciśniętego klawisza klawiatury
    addEventListener("keydown", function (key) {
    keysDown[key.keyCode] = true;
    }, false);

    // Wczytanie puszczonego klawisza
    addEventListener("keyup", function (key) {
    delete keysDown[key.keyCode];
    }, false);

    // Wylosowanie nowej pozycji
    var reset = function () {

        // Ustawienie pozycji Tom'a
        tom.x = canvas.width / 2;
        tom.y = canvas.height / 2;

        // Wylosowanie pozycji Jerry'ego
        jerry.x = 32 + (Math.random() * (canvas.width - 64));
        jerry.y = 32 + (Math.random() * (canvas.height - 64));
    };

    // Poruszanie Tom'em
    var update = function (modifier) {
            if (38 in keysDown) { // Góra
                tom.y -= tom.speed * modifier;
            }
            if (40 in keysDown) { // Dół
                tom.y += tom.speed * modifier;
            }
            if (37 in keysDown) { // Lewo
                tom.x -= tom.speed * modifier;
            }
            if (39 in keysDown) { // Prawo
                tom.x += tom.speed * modifier;
            }

            // Sprawdzenie czy złapano Jerry'ego
            if (
                tom.x <= (jerry.x + 50) && jerry.x <= (tom.x + 50) && tom.y <= (jerry.y + 50) && jerry.y <= (tom.y + 50)
            ) {
                ++jerrysCaught;
                reset();
            }
    };

    // WYświetlenie tła
    var render = function () {
            if (backgroundReady) {
                ctx.drawImage(backgroundImage, 0, 0);
            }

            // Wyświetlenie Tom'a
            if (tomReady) {
                ctx.drawImage(tomImage, tom.x, tom.y);
            }

            // Wyświetlenie Jerry'ego
            if (jerryReady) {
                ctx.drawImage(jerryImage, jerry.x, jerry.y);
            }

            // Wyświetlenie punktów i czasu
            ctx.fillStyle = "rgb(250, 250, 250)";
            ctx.font = "20px Arial";
            ctx.textAlign = "left";
            ctx.textBaseline = "top";
            ctx.fillText("Złapano Jerry'ego: " + jerrysCaught + " razy", 20, 20);
            ctx.fillText("Pozostały czas: " + count, 20, 50);

            // Jeśli skończył się czas
            if(finished==true){
                ctx.fillText("Koniec gry!", 200, 220);
            }
    };

    var count = 30;
    var finished = false;
    var counter = function(){
    count=count-1;
    console.log(tom.speed);

        if (count <= 0)
        {
        clearInterval(counter);
        finished = true;
        count=0;
        jerryReady=false;
        tomReady=false;

        // Zapisanie uzyskanego wyniku

        }
    }

    setInterval(counter, 1000);
    

    var main = function () {
    update(0.02);
    render();
    requestAnimationFrame(main);
    };

    var myWindow = window;
    // Włączenie animacji
    requestAnimationFrame = myWindow.requestAnimationFrame || myWindow.webkitRequestAnimationFrame || myWindow.msRequestAnimationFrame || myWindow.mozRequestAnimationFrame;
    reset();
    main();

}

