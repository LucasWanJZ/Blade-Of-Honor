class Fighter extends Sprite {
  constructor({
    position,
    imageSrc,
    scale = 1,
    offset = { x: 0, y: 0 },
    sprites,
    attackBox = {
      width: undefined,
      height: undefined,
      offset: { x: 0, y: 0 },
    },
    attackFrame,
    framesHold = 5,
    blockOffset = { x: 0, y: 0 },
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
    this.width = 50;
    this.speed = 10;
    this.jumpcount = 0;

    // attack/block box properties
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: attackBox.width,
      height: attackBox.height,
      offset: attackBox.offset,
    };
    this.blockOffset = blockOffset;

    // fighter states
    this.attacking1 = false;
    this.attacking2 = false;
    this.stunned = false;
    this.blocking = false;
    this.charging = false;
    this.death = false;

    // fighter animations
    this.currentFrame = 0;
    this.framesHold = framesHold;
    this.sprites = sprites;
    this.attackFrame = attackFrame;
    this.attackFrame2 = 3;

    for (const sprite in this.sprites) {
      sprites[sprite].image = new Image();
      sprites[sprite].image.src = sprites[sprite].src;
    }
  }

  draw() {
    c.drawImage(
      this.image,
      (this.image.width / this.frames) * this.currentFrame,
      0,
      this.image.width / this.frames,
      this.image.height,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.image.width / this.frames) * this.scale,
      this.image.height * this.scale
    );
    if (this.blocking) {
      c.beginPath();
      c.arc(
        this.position.x + this.width / 2 + this.blockOffset.x,
        this.position.y + this.height / 2 + this.blockOffset.y,
        70,
        0,
        Math.PI * 2
      );
      c.strokeStyle = "rgba(0, 255, 255, 0.8)";
      c.lineWidth = 4;
      c.shadowColor = "rgba(0, 255, 255, 0.8)";
      c.shadowBlur = 10;
      c.stroke();
      c.closePath();
    }

    c.strokeStyle = "#000000";
    c.shadowColor = "rgba(0, 0, 0, 0)";
    c.shadowBlur = 0;
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
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
  }

  switchSprite(sprite) {
    // prevent switching sprite while dead
    if (
      this.image === this.sprites.death.image &&
      this.currentFrame < this.sprites.death.frames - 1
    ) {
      return;
    }

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

    if (
      this.image === this.sprites.attack2.image &&
      this.currentFrame < this.sprites.attack2.frames - 1
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
        var run_audio = document.querySelector("#run_sound");
        run_audio.play();
        if (this.image != this.sprites.run.image) {
          this.image = this.sprites.run.image;
          this.frames = this.sprites.run.frames;
          this.framesHold = this.sprites.run.framesHold;
          this.currentFrame = 0;
        }
        break;
      case "jump":
        var jump_audio = document.querySelector("#jump_sound");
        jump_audio.volume = 0.3;
        jump_audio.play();
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
      case "attack2":
        if (this.image != this.sprites.attack2.image) {
          this.image = this.sprites.attack2.image;
          this.frames = this.sprites.attack2.frames;
          this.framesHold = this.sprites.attack2.framesHold;
          this.currentFrame = 0;
        }
        break;
    }
  }

  attack1() {
    this.switchSprite("attack1");
    var attack = document.querySelector("#attack_sound");
    attack.volume = 0.8;
    attack.play();
    this.attacking1 = true;
    setTimeout(() => {
      this.attacking1 = false;
    }, 300);
  }

  attack2() {
    this.switchSprite("attack2");
    var attack = document.querySelector("#attack2_sound");
    attack.volume = 0.8;
    attack.play();
    this.charging = true;
    this.attacking2 = true;
    const chargeDuration = 500;
    const chargeTimeOut = setTimeout(() => {
      this.charging = false;
      this.attacking2 = false;
    });
    this.chargeTimeOut = chargeTimeOut;
  }

  block() {
    var blockSound = document.querySelector("#block_sound");
    blockSound.volume = 0.2;
    blockSound.play();
    this.blocking = true;
    setTimeout(() => {
      this.blocking = false;
    }, 300);
  }

  staggered2() {
    this.health -= 30;
    if (this.charging) {
      clearTimeout(this.chargeTimeout);
      this.charging = false;
      this.attacking2 = false;
      this.switchSprite("hit");
    } else {
      this.stunned = true;
      if (this.health <= 0) {
        this.switchSprite("death");
      } else {
        this.switchSprite("hit");
        setTimeout(() => {
          this.stunned = false;
        }, 200);
      }
    }
  }
}
