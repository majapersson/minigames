import { player } from "./settings.js";
import Player from "./Player.js";
import Ball from "./Ball.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
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

(function animationLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ball.move();
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

  window.requestAnimationFrame(animationLoop);
})();

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
