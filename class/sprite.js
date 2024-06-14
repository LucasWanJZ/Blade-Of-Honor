class Sprite {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.height = 150;
    this.width = 50;
    this.speed = 5;
    this.jumpcount = 0;
    this.touchGround = false;
  }

  draw() {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    const movement = this.velocity.x * this.speed;
    this.draw();

    if (this.position.x + this.width + movement >= canvas.width) {
      this.velocity.x = 0;
    } else if (this.position.x + movement < 0) {
      this.velocity.x = 0;
    } else {
      this.position.x += movement;
    }

    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
      this.touchGround = true;
      this.jumpcount = 0;
    } else {
      this.velocity.y += gravity;
      this.position.y += this.velocity.y;
      this.touchGround = false;
    }
  }
}
