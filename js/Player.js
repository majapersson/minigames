import { player } from "./settings.js";

class Player {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.width = player.width;
    this.height = player.height;
    this.color = color;
    this.speed = player.speed;
    this.score = 0;
    this.canvas = document.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.rect(this.x, this.y - this.height / 2, this.width, this.height);
    this.ctx.fill();
  }

  updatePosition() {
    const { x, y, width, height } = this;
    this.top = y - height / 2;
    this.bottom = y + height / 2;
    this.left = x;
    this.right = x + width;
  }

  move(direction) {
    this.updatePosition();
    const hitsTop = this.top < 0;
    const hitsBottom = this.bottom > this.canvas.height;

    if (hitsTop) {
      this.y = 0 + this.height / 2;
      return;
    }
    if (hitsBottom) {
      this.y = this.canvas.height - this.height / 2;
      return;
    }

    if (direction === "up") this.y -= this.speed;
    else this.y += this.speed;

    this.draw();
  }
}
export default Player;
