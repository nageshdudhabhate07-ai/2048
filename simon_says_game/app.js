let red = document.querySelector(".red");
let yellow = document.querySelector(".yellow");
let green = document.querySelector(".green");
let blue = document.querySelector(".blue");
let btn = document.querySelector(".btn");
let body = document.querySelector("body");
let scoreDisplay = document.querySelector(".Score");

function sound(ele, color) {
    let audio = new Audio("sound.wav");
    audio.play();

    ele.style.backgroundColor = "white";
    setTimeout(() => {
        ele.style.backgroundColor = color;
    }, 100);
}

function resetBackground() {
    setTimeout(() => {
        body.style.backgroundColor = "white";
    }, 100);
}

// Color button clicks
red.addEventListener("click", () => handleUser("red"));
green.addEventListener("click", () => handleUser("green"));
blue.addEventListener("click", () => handleUser("blue"));
yellow.addEventListener("click", () => handleUser("yellow"));

let gameseq = [];
let userseq = [];
let level = 0;
let gamestarted = false;

let colors = ["red", "yellow", "green", "blue"];

// Start/End game button logic
btn.addEventListener("click", () => {
    let audio;

    if (!gamestarted) {
        gamestarted = true;
        level = 0;
        gameseq = [];
        userseq = [];
        btn.textContent = "End Game";
        body.style.backgroundColor = "green";
        scoreDisplay.textContent = "0";
        nextStep();
        audio = new Audio("game-start.wav");
    } else {
        endGame();
        audio = new Audio("game-over.wav");
    }

    resetBackground();
    audio.play();
});

// Generate next color in sequence
function nextStep() {
    userseq = [];
    level++;
    scoreDisplay.textContent = level;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = colors[randIdx];
    gameseq.push(randColor);

    // Flash only the new color
    setTimeout(() => {
        sound(document.querySelector("." + randColor), randColor);
    }, 500);
}

// Handle user clicks
function handleUser(color) {
    if (!gamestarted) return;

    sound(document.querySelector("." + color), color);
    userseq.push(color);

    let currentIndex = userseq.length - 1;
    if (userseq[currentIndex] !== gameseq[currentIndex]) {
        endGame();
        return;
    }

    if (userseq.length === gameseq.length) {
        setTimeout(nextStep, 1000);
    }
}

// End game logic (no alert)
function endGame() {
    let audio = new Audio("game-over.wav");
    audio.play();
    gamestarted = false;
    gameseq = [];
    userseq = [];
    body.style.backgroundColor = "red";
    btn.textContent = "Start Game";
    scoreDisplay.textContent = "Game Over! Score: " + level;
    level = 0;
    resetBackground();
}
