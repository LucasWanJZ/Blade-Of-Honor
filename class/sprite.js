class Sprite {
  constructor({ position, velocity, color, direction }) {
    this.position = position;
    this.health = 100;
    this.velocity = velocity;
    this.height = 150;
    this.width = 50;
    this.speed = 10;
    this.jumpcount = 0;
    this.touchGround = false;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: 100,
      height: 50,
    };
    this.color = color;
    this.isAttacking = false;
    this.direction = direction;
  }

  draw() {
    c.fillStyle = this.color;
    c.fillRect(this.position.x, this.position.y, this.width, this.height);

    // attack box
    if (this.isAttacking) {
      c.fillStyle = "blue";
      c.fillRect(
        this.attackBox.position.x,
        this.attackBox.position.y,
        this.attackBox.width,
        this.attackBox.height
      );
    }
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

    if (this.direction === direction.RIGHT) {
      this.attackBox.position.x = this.position.x + this.width;
      this.attackBox.position.y = this.position.y;
    } else {
      this.attackBox.position.x = this.position.x - this.attackBox.width;
      this.attackBox.position.y = this.position.y;
    }
  }

  attack() {
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 150);
  }
}
