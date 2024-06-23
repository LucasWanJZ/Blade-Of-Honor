class Fighter extends Sprite {
  constructor({
    position,
    direction,
    imageSrc,
    frames = 1,
    scale = 1,
    offset = { x: 0, y: 0 },
    sprites,
  }) {
    super({
      position,
      imageSrc,
      scale,
      frames,
      offset,
    });
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
    this.isAttacking1 = false;
    this.recovering = false;
    this.isStaggered = false;
    this.direction = direction;
    this.currentFrame = 0;
    this.elapsedFrame = 0;
    this.framesHold = 5;
    this.sprites = sprites;

    for (const sprite in this.sprites) {
      sprites[sprite].image = new Image();
      sprites[sprite].image.src = sprites[sprite].src;
    }
  }

  update() {
    const movement = this.velocity.x * this.speed;
    this.draw();
    this.animateFrame();

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
