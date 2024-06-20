class Sprite {
  constructor({ position, imageSrc }) {
    this.position = position;
    this.height = 50;
    this.width = 150;
    this.image = new Image();
    this.image.src = imageSrc;
  }

  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }

  update() {
    this.draw();
  }
}
