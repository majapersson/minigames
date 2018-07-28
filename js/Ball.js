import { ball } from "./settings.js";

class Ball {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.radius = ball.radius;
    this.color = color;
    this.velocity = {
      x: ball.speed,
      y: ball.speed
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

  move() {
    if (
      this.x + this.radius <= 0 ||
      this.x - this.radius >= window.innerWidth
    ) {
      this.velocity.x = !this.velocity.x;
    }

    if (
      this.y - this.radius <= 0 ||
      this.y + this.radius >= window.innerHeight
    ) {
      this.velocity.y = !this.velocity.y;
    }

    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}

export default Ball;
