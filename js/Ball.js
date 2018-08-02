import { ball } from "./settings.js";

class Ball {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.radius = ball.radius;
    this.color = color;
    this.velocity = {
      x: Math.random() < 0.5 ? ball.speed : -ball.speed,
      y: Math.random() < 0.5 ? ball.speed : -ball.speed
    };
  }

  draw() {
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }

  updatePosition() {
    const { x, y, radius } = this;
    this.left = x - radius;
    this.right = x + radius;
    this.top = y - radius;
    this.bottom = y + radius;
  }
}

export default Ball;
