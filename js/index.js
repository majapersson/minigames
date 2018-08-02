import { player } from "./settings.js";
import Player from "./Player.js";
import Ball from "./Ball.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight - 5;
canvas.width = window.innerWidth;
const middleX = window.innerWidth / 2;
const middleY = window.innerHeight / 2;
const keymap = { 38: false, 40: false, 83: false, 87: false };

const ball = new Ball(middleX, middleY, "yellow");

const playerOne = new Player(0, middleY, "salmon");
const playerTwo = new Player(
  window.innerWidth - player.width,
  middleY,
  "skyblue"
);

playerOne.keys = { up: 87, down: 83 };
playerTwo.keys = { up: 38, down: 40 };

function game(frame) {
  ball.updatePosition();
  playerOne.updatePosition();
  playerTwo.updatePosition();
  const bounceX = ball.left <= 0 || ball.right >= window.innerWidth;
  const outLeft = ball.right <= 0;
  const outRight = ball.left >= window.innerWidth;
  const bounceLeft =
    ball.y >= playerOne.top &&
    ball.y <= playerOne.bottom &&
    ball.left === playerOne.right;
  const bounceRight =
    ball.y >= playerTwo.top &&
    ball.y <= playerTwo.bottom &&
    ball.right === playerTwo.left;
  const bounceY = ball.top <= 0 || ball.bottom >= window.innerHeight;

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
    score();
  }
  if (outRight) {
    playerOne.score++;
    window.cancelAnimationFrame(frame);
    score();
  }
}

function animationLoop() {
  const frame = window.requestAnimationFrame(animationLoop);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  game(frame);
  ball.draw();

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

  playerOne.draw();
  playerTwo.draw();
}

function score() {
  const playerOneScore = document.querySelector(".playerOne");
  const playerTwoScore = document.querySelector(".playerTwo");
  playerOneScore.textContent = playerOne.score;
  playerTwoScore.textContent = playerTwo.score;
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

animationLoop();
