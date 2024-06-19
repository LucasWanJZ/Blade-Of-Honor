// Description:
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const gravity = 2;
canvas.width = 1024;
canvas.height = 576;

const keys = {
  a: { pressed: false },
  d: { pressed: false },
  w: { pressed: false },
  ArrowLeft: { pressed: false },
  ArrowRight: { pressed: false },
  ArrowUp: { pressed: false },
};

const player = new Sprite({
  position: { x: 200, y: 200 },
  velocity: { x: 0, y: 0 },
  color: "red",
});

const enemy = new Sprite({
  position: { x: 400, y: 400 },
  velocity: { x: 0, y: 0 },
  color: "green",
});

function animate() {
  window.requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();

  // player movement
  player.velocity.x = 0;
  if (keys.a.pressed && player.lastkey === "a") {
    player.velocity.x = -1;
  } else if (keys.d.pressed && player.lastkey === "d") {
    player.velocity.x = 1;
  }

  if (keys.w.pressed && player.jumpcount < 2) {
    if (player.touchGround) {
      player.velocity.y -= 30;
    } else {
      player.velocity.y = -20;
    }
  }

  // enemy movement
  enemy.velocity.x = 0;
  if (keys.ArrowLeft.pressed && enemy.lastkey === "ArrowLeft") {
    enemy.velocity.x = -1;
  } else if (keys.ArrowRight.pressed && enemy.lastkey === "ArrowRight") {
    enemy.velocity.x = 1;
  }

  if (keys.ArrowUp.pressed && enemy.jumpcount < 2) {
    if (enemy.touchGround) {
      enemy.velocity.y -= 30;
    } else {
      enemy.velocity.y = -20;
    }
  }

  // collision detection
  if (
    player.attackBox.position.x + player.attackBox.width >= enemy.position.x &&
    player.attackBox.position.x <= enemy.position.x + enemy.width &&
    player.attackBox.position.y + player.attackBox.height >= enemy.position.y &&
    player.attackBox.position.y <= enemy.position.y + enemy.height &&
    player.isAttacking
  ) {
    player.isAttacking = false;
    console.log("hit");
  }
}

animate();
