import { player } from "./settings.js";
import Player from "./Player.js";
import Ball from "./Ball.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const info = document.querySelector(".info");

canvas.height = window.innerHeight * 2;
canvas.width = window.innerWidth * 2;
canvas.style.height = `${canvas.height / 2 - 5}px`;
canvas.style.width = `${canvas.width / 2}px`;
const middleX = canvas.width / 2;
const middleY = canvas.height / 2;
const keymap = { 38: false, 40: false, 83: false, 87: false };

const ball = new Ball(middleX, middleY, "yellow");

const playerOne = new Player(0, middleY, "salmon");
const playerTwo = new Player(canvas.width - player.width, middleY, "skyblue");

playerOne.keys = { up: 87, down: 83 };
playerTwo.keys = { up: 38, down: 40 };

function game(frame) {
  ball.updatePosition();
  playerOne.updatePosition();
  playerTwo.updatePosition();

  // Determine if ball is outside of playing field
  const outLeft = ball.right <= 0;
  const outRight = ball.left >= canvas.width;
  // Determine if ball should bounce against walls or player
  const bounceLeft =
    ball.y >= playerOne.top &&
    ball.y <= playerOne.bottom &&
    ball.left === playerOne.right;
  const bounceRight =
    ball.y >= playerTwo.top &&
    ball.y <= playerTwo.bottom &&
    ball.right === playerTwo.left;
  const bounceY = ball.top <= 0 || ball.bottom >= canvas.height;

  if (bounceLeft || bounceRight) {
    ball.velocity.x = -ball.velocity.x;
  }

  if (bounceY) {
    ball.velocity.y = -ball.velocity.y;
  }

  ball.x = ball.x + ball.velocity.x;
  ball.y = ball.y + ball.velocity.y;

  if (outLeft) {
    playerTwo.score++;
    window.cancelAnimationFrame(frame);
    init();
  }
  if (outRight) {
    playerOne.score++;
    window.cancelAnimationFrame(frame);
    init();
  }
}

function animationLoop(interval) {
  const frame = window.requestAnimationFrame(animationLoop);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  game(frame);

  if (keymap[`${playerOne.keys.up}`]) {
    playerOne.move("up");
  } else if (keymap[`${playerOne.keys.down}`]) {
    playerOne.move("down");
  }

  if (keymap[`${playerTwo.keys.up}`]) {
    playerTwo.move("up");
  } else if (keymap[`${playerTwo.keys.down}`]) {
    playerTwo.move("down");
  }

  ball.draw();
  playerOne.draw();
  playerTwo.draw();

  window.addEventListener("keydown", e => {
    // Pressing esc pauses the game
    if (e.keyCode === 27) {
      window.cancelAnimationFrame(frame);
      clearInterval(interval);
      info.classList.remove("hide");
    }
  });
}

function init() {
  // Update score board
  const playerOneScore = document.querySelector(".playerOne");
  const playerTwoScore = document.querySelector(".playerTwo");
  playerOneScore.textContent = playerOne.score;
  playerTwoScore.textContent = playerTwo.score;

  let count = 3;
  ctx.font = "50px Roboto Mono, sans-serif";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  window.addEventListener("keydown", e => {
    if (e.keyCode === 27) {
      clearInterval(interval);
      ctx.clearRect(
        ball.x - ball.radius,
        ball.y - ball.radius,
        ball.radius * 2,
        ball.radius * 2
      );
      info.classList.remove("hide");
    }
  });

  const interval = setInterval(() => {
    // Countdown and initialize new game
    ctx.fillStyle = "white";
    ctx.clearRect(middleX - 50, middleY - 50, 100, 100);
    if (count === 0) {
      ball.reset(middleX, middleY);
      animationLoop(interval);
      clearInterval(interval);
    }
    ctx.fillText(count, middleX, middleY);
    count--;
  }, 1000);
}

window.addEventListener("keydown", e => {
  const key = e.keyCode.toString();
  if (Object.keys(keymap).includes(key)) {
    keymap[`${key}`] = true;
  }
});

window.addEventListener("keyup", e => {
  const key = e.keyCode.toString();
  if (Object.keys(keymap).includes(key)) {
    keymap[`${key}`] = false;
  }
});

const start = document.querySelector(".start");

start.addEventListener("click", () => {
  info.classList.add("hide");
  playerOne.draw();
  playerTwo.draw();
  init();
});
