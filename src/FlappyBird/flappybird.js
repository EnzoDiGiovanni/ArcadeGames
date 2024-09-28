// @ts-nocheck

// Board
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

//sound Effet
let jumpSound = new Audio("assets/flappyBirdJump.mp3");
let passedSound = new Audio("assets/flappyBirdPassed.mp3");
let punchSound = new Audio("assets/flappyBirdPunch.mp3");

jumpSound.volume = 0.1;
passedSound.volume = 0.1;
punchSound.volume = 0.1;

//Bird
let birdWidth = 34;
let birdHeight = 24;
let birdX = boardWidth / 8;
let birdY = boardHeight / 2;
let birdImg;

let bird = {
  x: birdX,
  y: birdY,
  width: birdWidth,
  height: birdHeight,
};

//Pipes
let pipeArray = [];
let pipeWidth = 64;
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;

let topPipesImg;
let bottomPipesImg;

//physics
let velocityX = -2; //Pipes moving left speed
let velocityY = 0; //bird jump speeds
let gravity = 0.4;

let gameOver = false;
let score = 0;

window.onload = function () {
  board = document.getElementById("board");
  board.height = boardHeight;
  board.width = boardWidth;
  context = board.getContext("2d");

  //draw flappy bird
  // context.fillStyle = "green";
  // context.fillRect(bird.x, bird.y, bird.width, bird.height);

  //load img
  birdImg = new Image();
  birdImg.src = "assets/flappybird.png";
  birdImg.onload = function () {
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
  };

  topPipesImg = new Image();
  topPipesImg.src = "assets/toppipe.png";

  bottomPipesImg = new Image();
  bottomPipesImg.src = "assets/bottompipe.png";

  requestAnimationFrame(update);
  setInterval(placePipes, 1500);
  document.addEventListener("keydown", moveBird);
};

function update() {
  requestAnimationFrame(update);

  if (gameOver) {
    return;
  }
  context.clearRect(0, 0, boardWidth, boardHeight);

  //bird
  velocityY += gravity;
  // bird.y += velocityY;
  bird.y = Math.max(bird.y + velocityY, 0); //apply gravity to current bird.y, limit the birdy to top of the canvas
  context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

  if (bird.y > boardHeight) {
    gameOver = true;
  }
  //Pipes

  for (let i = 0; i < pipeArray.length; i++) {
    let pipe = pipeArray[i];
    pipe.x += velocityX;
    context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

    if (!pipe.passed && bird.x > pipe.x + pipe.width) {
      score += 0.5;
      pipe.passed = true;
      passedSound.play();
    }

    if (detectCollision(bird, pipe)) {
      gameOver = true;
      punchSound.play();
    }
  }

  //clear Pipes
  while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) {
    pipeArray.shift();
  }

  //score
  context.fillStyle = "white";
  context.font = "45px sans-serif";
  context.fillText(score, 5, 45);

  if (gameOver) {
    context.fillText("GAME OVER", 40, boardHeight / 2);

    context.font = "20px sans-serif";
    context.fillText(
      "press 'SPACE' to restart the game",
      30,
      boardHeight / 1.75
    );

    context.font = "20px sans-serif";
    context.fillText(
      `your score is ${score}`,
      boardWidth / 3.2,
      boardHeight / 1.5
    );
  }
}

function placePipes() {
  if (gameOver) {
    return;
  }
  let randomPipeY = pipeY - pipeHeight / 4 - Math.random() * (pipeHeight / 2);
  let openingSpace = board.height / 4;

  let topPipe = {
    img: topPipesImg,
    x: pipeX,
    y: randomPipeY,
    width: pipeWidth,
    height: pipeHeight,
    passed: false,
  };

  pipeArray.push(topPipe);

  let bottomPipe = {
    img: bottomPipesImg,
    x: pipeX,
    y: randomPipeY + pipeHeight + openingSpace,
    width: pipeWidth,
    height: pipeHeight,
    passed: false,
  };

  pipeArray.push(bottomPipe);
}

function moveBird(e) {
  if (e.code == "Space" || e.code == "ArrowUp") {
    //jump
    velocityY = -6;
    jumpSound.play();
  } else {
    return;
  }

  //reset the game

  if (gameOver) {
    bird.y = birdY;
    pipeArray = [];
    score = 0;
    gameOver = false;
  }
}
function detectCollision(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}
