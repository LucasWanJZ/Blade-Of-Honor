class Sprite {
  constructor({ position, imageSrc, frames = 1, scale = 1, idx = 0 }) {
    this.position = position;
    this.image = new Image();
    this.image.src = imageSrc;
    this.scale = scale;
    this.frames = frames;
    this.idx = idx;
    this.animationCounter = 0;
  }

  draw() {
    c.drawImage(
      this.image,
      (this.image.width / this.frames) * this.idx,
      0,
      this.image.width / this.frames,
      this.image.height,
      this.position.x,
      this.position.y,
      (this.image.width / this.frames) * this.scale,
      this.image.height * this.scale
    );
  }

  update() {
    this.draw();
    this.animationCounter++;
    if (this.animationCounter % 10 === 0) {
      if (this.idx < this.frames - 1) {
        this.idx++;
      } else {
        this.idx = 0;
      }
    }
  }
}
