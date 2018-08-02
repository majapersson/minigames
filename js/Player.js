import { player } from "./settings.js";

class Player {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.width = player.width;
    this.height = player.height;
    this.color = color;
    this.speed = player.speed;
  }

  draw() {
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.rect(this.x, this.y - this.height / 2, this.width, this.height);
    ctx.fill();
  }

  move(direction) {
    const hitsTop = this.y - this.height / 2 < 0;
    const hitsBottom = this.y + this.height / 2 > window.innerHeight;

    if (hitsTop) {
      this.y = 0 + this.height / 2;
      return;
    }
    if (hitsBottom) {
      this.y = window.innerHeight - this.height / 2;
      return;
    }

    if (direction === "up") this.y -= this.speed;
    else this.y += this.speed;

    this.draw();
  }
}
export default Player;
