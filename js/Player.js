import { player } from "./settings.js";

class Player {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.width = player.width;
    this.height = player.height;
    this.color = color;
  }

  draw() {
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.rect(this.x, this.y - this.height / 2, this.width, this.height);
    ctx.fill();
  }

  moveUp() {
    this.y = this.y + 1;
    this.draw();
  }
}
export default Player;
