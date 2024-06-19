const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const gravity = 2;
canvas.width = 1024 * 2;
canvas.height = 576 * 2;

const keys = {
  a: { pressed: false },
  d: { pressed: false },
  w: { pressed: false },
  ArrowLeft: { pressed: false },
  ArrowRight: { pressed: false },
  ArrowUp: { pressed: false },
};

const direction = {
  LEFT: "left",
  RIGHT: "right",
};

// attack handler
function handleAttack(player, enemy) {
  const playerHitsEnemy = attackCollision({ sprite1: player, sprite2: enemy });
  const enemyHitsPlayer = attackCollision({ sprite1: enemy, sprite2: player });

  if (playerHitsEnemy) {
    if (player.direction === direction.RIGHT) {
      enemy.position.x += 20;
    }
    if (player.direction === direction.LEFT) {
      enemy.position.x -= 20;
    }
    player.isAttacking = false;
    console.log("player hit");
  }
  if (enemyHitsPlayer) {
    if (enemy.direction === direction.RIGHT) {
      player.position.x += 20;
    }
    if (enemy.direction === direction.LEFT) {
      player.position.x -= 20;
    }
    enemy.isAttacking = false;
    console.log("enemy hit");
  }
}

// players
const player = new Sprite({
  position: { x: 200, y: 200 },
  velocity: { x: 0, y: 0 },
  color: "red",
  direction: direction.RIGHT,
});

const enemy = new Sprite({
  position: { x: 400, y: 400 },
  velocity: { x: 0, y: 0 },
  color: "green",
  direction: direction.LEFT,
});

function animate() {
  window.requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();

  // player movement
  player.velocity.x = 0;
  if (!spriteCollision({ sprite1: player, sprite2: enemy })) {
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
  } else {
    if (player.direction === direction.RIGHT) {
      if (player.position.x < enemy.position.x) {
        player.position.x -= 1;
        enemy.position.x += 1;
      } else {
        player.position.x += 1;
        enemy.position.x -= 1;
      }
    } else if (player.direction === direction.LEFT) {
      if (player.position.x > enemy.position.x) {
        player.position.x += 1;
        enemy.position.x -= 1;
      } else {
        player.position.x -= 1;
        enemy.position.x += 1;
      }
    } else if (player.velocity.y > 0) {
      player.position.y -= 3;
    } else if (enemy.velocity.y > 0) {
      enemy.position.y -= 3;
    }
  }

  // enemy movement
  enemy.velocity.x = 0;
  if (!spriteCollision({ sprite1: player, sprite2: enemy })) {
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
  }

  // collision detection
  handleAttack(player, enemy);
}

animate();
