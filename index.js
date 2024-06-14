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
});

const enemy = new Sprite({
  position: { x: 400, y: 400 },
  velocity: { x: 0, y: 0 },
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

  if (keys.w.pressed && player.position.y + player.height === canvas.height) {
    player.velocity.y -= 30;
  }

  // enemy movement
  enemy.velocity.x = 0;
  if (keys.ArrowLeft.pressed && enemy.lastkey === "ArrowLeft") {
    enemy.velocity.x = -1;
  } else if (keys.ArrowRight.pressed && enemy.lastkey === "ArrowRight") {
    enemy.velocity.x = 1;
  }

  if (
    keys.ArrowUp.pressed &&
    enemy.position.y + enemy.height === canvas.height
  ) {
    enemy.velocity.y -= 30;
  }
}

animate();
