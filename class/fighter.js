class Fighter extends Sprite {
  constructor({
    position,
    direction,
    imageSrc,
    frames = 1,
    scale = 1,
    offset = { x: 0, y: 0 },
    sprites,
    attackBox = {
      width: undefined,
      height: undefined,
    },
    attackFrame,
    attackFramesHold = 5,
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
      width: attackBox.width,
      height: attackBox.height,
    };
    this.isAttacking1 = false;
    this.recovering = false;
    this.isStaggered = false;
    this.direction = direction;
    this.currentFrame = 0;
    this.framesHold = 5;
    this.sprites = sprites;
    this.attackFrame = attackFrame;
    this.attackFramesHold = attackFramesHold;
    this.death = false;

    for (const sprite in this.sprites) {
      sprites[sprite].image = new Image();
      sprites[sprite].image.src = sprites[sprite].src;
    }
  }

  animateFrame() {
    if (this.image === this.sprites.death.image) {
      if (this.currentFrame === this.sprites.death.frames - 1) {
        this.death = true;
        return;
      }
    }

    if (this.image === this.sprites.attack1.image) {
      this.framesHold = this.attackFramesHold;
    } else {
      this.framesHold = 5;
    }

    this.elapsedFrame++;

    if (this.elapsedFrame % this.framesHold === 0) {
      if (this.currentFrame < this.frames - 1) {
        this.currentFrame++;
      } else {
        this.currentFrame = 0;
      }
    }
  }

  update() {
    this.draw();
    this.animateFrame();

    const movement = this.velocity.x * this.speed;
    if (this.position.x + this.width + movement >= canvas.width) {
      this.velocity.x = 0;
    } else if (this.position.x + movement < 0) {
      this.velocity.x = 0;
    } else {
      this.position.x += movement;
    }

    if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
      this.velocity.y = 0;
      this.position.y = 330;
      this.touchGround = true;
      this.jumpcount = 0;
    } else {
      this.velocity.y += gravity;
      this.position.y += this.velocity.y;
      this.touchGround = false;
    }

    this.attackBox.position.y = this.position.y + 50;
    if (this.direction === direction.RIGHT) {
      this.attackBox.position.x = this.position.x + this.width;
    } else {
      this.attackBox.position.x = this.position.x - this.attackBox.width;
    }
  }

  switchSprite(sprite) {
    if (
      this.image === this.sprites.hit.image &&
      this.currentFrame < this.sprites.hit.frames - 1
    ) {
      return;
    }
    switch (sprite) {
      case "idle":
        if (this.image != this.sprites.idle.image) {
          this.image = this.sprites.idle.image;
          this.frames = this.sprites.idle.frames;
          this.currentFrame = 0;
        }
        break;
      case "run":
        if (this.image != this.sprites.run.image) {
          this.image = this.sprites.run.image;
          this.frames = this.sprites.run.frames;
          this.currentFrame = 0;
        }
        break;
      case "jump":
        if (this.image != this.sprites.jump.image) {
          this.image = this.sprites.jump.image;
          this.frames = this.sprites.jump.frames;
          this.currentFrame = 0;
        }
        break;
      case "fall":
        if (this.image != this.sprites.fall.image) {
          this.image = this.sprites.fall.image;
          this.frames = this.sprites.fall.frames;
          this.currentFrame = 0;
        }
        break;
      case "attack1":
        if (this.image != this.sprites.attack1.image) {
          this.image = this.sprites.attack1.image;
          this.frames = this.sprites.attack1.frames;
          this.currentFrame = 0;
        }
        break;
      case "hit":
        if (this.image != this.sprites.hit.image) {
          this.image = this.sprites.hit.image;
          this.frames = this.sprites.hit.frames;
          this.currentFrame = 0;
        }
        break;
      case "death":
        this.image = this.sprites.death.image;
        this.frames = this.sprites.death.frames;
        this.currentFrame = 0;
        break;
    }
  }

  attack1() {
    if (this.recovering) {
      return;
    }
    this.switchSprite("attack1");
    this.isAttacking1 = true;
    setTimeout(() => {
      this.isAttacking1 = false;
    }, 300);

    this.recovering = true;
    setTimeout(() => {
      this.recovering = false;
    }, 400);
  }

  staggered() {
    this.health -= 20;
    this.isStaggered = true;

    if (this.health <= 0) {
      this.switchSprite("death");
    } else {
      this.switchSprite("hit");
      setTimeout(() => {
        this.isStaggered = false;
      }, 200);
    }
  }
}
