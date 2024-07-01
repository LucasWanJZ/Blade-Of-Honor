function attackCollision({ sprite1, sprite2 }) {
  return (
    sprite1.attackBox.position.x + sprite1.attackBox.width >=
      sprite2.position.x &&
    sprite1.attackBox.position.x <= sprite2.position.x + sprite2.width &&
    sprite1.attackBox.position.y + sprite1.attackBox.height >=
      sprite2.position.y &&
    sprite1.attackBox.position.y <= sprite2.position.y + sprite2.height &&
    ((sprite1.attacking1 && sprite1.currentFrame == sprite1.attackFrame) ||
      (sprite1.attacking2 && sprite1.currentFrame == sprite1.attackFrame2))
  );
}

function spriteCollision({ sprite1, sprite2 }) {
  return (
    sprite1.position.x + sprite1.width >= sprite2.position.x &&
    sprite1.position.x <= sprite2.position.x + sprite2.width &&
    sprite1.position.y + sprite1.height >= sprite2.position.y &&
    sprite1.position.y <= sprite2.position.y + sprite2.height
  );
}
