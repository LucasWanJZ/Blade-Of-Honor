class Fighter extends Sprite {
  constructor({
    position,
    direction,
    imageSrc,
    scale = 1,
    offset = { x: 0, y: 0 },
    sprites,
    attackBox = {
      width: undefined,
      height: undefined,
    },
    attackFrame,
    framesHold = 5,
  }) {
    super({
      position,
      imageSrc,
      scale,
      frames,
      offset,
    });

    // fighter properties
    this.health = 100;
    this.velocity = { x: 0, y: 0 };
    this.height = 150;
    this.width = 60;
    this.speed = 8;
    this.direction = direction;
    this.jumpcount = 0;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: attackBox.width,
      height: attackBox.height,
    };

    // fighter states
    this.isAttacking1 = false;
    this.recovering = false;
    this.isStaggered = false;
    this.death = false;

    // fighter animations
    this.currentFrame = 0;
    this.framesHold = framesHold;
    this.sprites = sprites;
    this.attackFrame = attackFrame;

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

    // movemnt x axis
    const movement = this.velocity.x * this.speed;
    if (this.position.x + this.width + movement >= canvas.width) {
      this.velocity.x = 0;
    } else if (this.position.x + movement < 0) {
      this.velocity.x = 0;
    } else {
      this.position.x += movement;
    }

    // movement y axis
    if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
      this.velocity.y = 0;
      this.position.y = 330;
      this.jumpcount = 0;
    } else {
      this.velocity.y += gravity;
      this.position.y += this.velocity.y;
    }

    // attack box
    this.attackBox.position.y = this.position.y + 50;
    if (this.direction === direction.RIGHT) {
      this.attackBox.position.x = this.position.x + this.width;
    } else {
      this.attackBox.position.x = this.position.x - this.attackBox.width;
    }
  }

  switchSprite(sprite) {
    // prevent switching sprite while getting hit
    if (
      this.image === this.sprites.hit.image &&
      this.currentFrame < this.sprites.hit.frames - 1
    ) {
      return;
    }

    // prevent switching sprite while attacking
    if (
      this.image === this.sprites.attack1.image &&
      this.currentFrame < this.sprites.attack1.frames - 1
    ) {
      return;
    }

    switch (sprite) {
      case "idle":
        if (this.image != this.sprites.idle.image) {
          this.image = this.sprites.idle.image;
          this.frames = this.sprites.idle.frames;
          this.framesHold = this.sprites.idle.framesHold;
          this.currentFrame = 0;
        }
        break;
      case "run":
        document.querySelector("#run_sound").play();
        if (this.image != this.sprites.run.image) {
          this.image = this.sprites.run.image;
          this.frames = this.sprites.run.frames;
          this.framesHold = this.sprites.run.framesHold;
          this.currentFrame = 0;
        }
        break;
      case "jump":
        document.querySelector("#jump_sound").play();
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
          this.framesHold = this.sprites.attack1.framesHold;
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
    var attack = document.querySelector("#attack_sound");
    attack.volume = 0.3;
    attack.play();
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
