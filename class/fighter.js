class Fighter {
  constructor({ position, direction, color }) {
    this.position = position;
    this.health = 100;
    this.velocity = { x: 0, y: 0 };
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
      height: 100,
    };
    this.color = color;
    this.isAttacking1 = false;
    this.recovering = false;
    this.isStaggered = false;
    this.direction = direction;
  }

  draw() {
    c.fillStyle = this.color;
    if (this.isStaggered) {
      c.fillStyle = "black";
    } else if (this.recovering) {
      c.fillStyle = "white";
    }
    c.fillRect(this.position.x, this.position.y, this.width, this.height);

    // attack box one
    if (this.isAttacking1) {
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

    if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
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

  attack1() {
    if (this.recovering) {
      return;
    }
    this.isAttacking1 = true;
    setTimeout(() => {
      this.isAttacking1 = false;
      this.isAttacking2 = false;
      this.isAttacking3 = false;
    }, 100);

    this.recovering = true;
    setTimeout(() => {
      this.recovering = false;
    }, 750);
  }

  staggered() {
    this.isStaggered = true;
    setTimeout(() => {
      this.isStaggered = false;
    }, 750);
  }
}
