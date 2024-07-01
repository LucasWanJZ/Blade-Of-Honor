// game end handler
function checkHealthBar(timerId) {
  clearTimeout(timerId);
  if (player.health == enemy.health) {
    document.querySelector("#game_end_ui").innerHTML = "It's a draw!";
  } else if (player.health > enemy.health) {
    document.querySelector("#game_end_ui").innerHTML = "Player 1 Wins!";
    player.switchSprite("idle");
  } else {
    document.querySelector("#game_end_ui").innerHTML = "Player 2 Wins!";
    enemy.switchSprite("idle");
  }
  document.querySelector("#game_end_ui").style.display = "flex";
}

// player getting hit
function playerHit1() {
  player.health -= 15;
  if (player.health <= 0) {
    player.health = 0;
    player.switchSprite("death");
  } else {
    player.staggered();
  }
  gsap.to("#playerHealth", { width: player.health + "%", duration: 0.25 });
  enemy.attacking1 = false;
  enemy.attacking2 = false;
  if (player.position.x > 50) {
    player.position.x -= 50;
  } else {
    player.position.x = 0;
  }
}

function playerHit2() {
  player.health -= 30;
  console.log(player.health);
  if (player.health <= 0) {
    player.health = 0;
    player.switchSprite("death");
  } else {
    player.staggered();
  }
  gsap.to("#playerHealth", { width: player.health + "%", duration: 0.25 });
  enemy.attacking2 = false;
  enemy.attacking1 = false;
  if (player.position.x > 50) {
    player.position.x -= 50;
  } else {
    player.position.x = 0;
  }
}

//enemy getting hit
function enemyHit1() {
  enemy.health -= 15;
  if (enemy.health <= 0) {
    enemy.health = 0;
    enemy.switchSprite("death");
  } else {
    enemy.staggered();
  }
  gsap.to("#enemyHealth", { width: enemy.health + "%", duration: 0.25 });
  player.attacking1 = false;
  if (enemy.position.x < canvas.width - 30 - enemy.width) {
    enemy.position.x += 50;
  } else {
    enemy.position.x = canvas.width - enemy.width;
  }
}

function enemyHit2() {
  enemy.stunned = true;
  enemy.health -= 30;
  if (enemy.health <= 0) {
    enemy.health = 0;
    enemy.switchSprite("death");
  } else {
    enemy.staggered();
  }
  gsap.to("#enemyHealth", { width: enemy.health + "%", duration: 0.25 });
  player.attacking2 = false;
  if (enemy.position.x < canvas.width - 30 - enemy.width) {
    enemy.position.x += 50;
  } else {
    enemy.position.x = canvas.width - enemy.width;
  }
}

// attack handler
function handleAttack(player, enemy) {
  const playerHitsEnemy = attackCollision({ sprite1: player, sprite2: enemy });
  const enemyHitsPlayer = attackCollision({ sprite1: enemy, sprite2: player });

  // player attacks
  if (playerHitsEnemy) {
    if (player.attacking1) {
      if (enemy.blocking) {
        player.blocked = true;
        setTimeout(() => {
          player.blocked = false;
        }, 300);
        player.staggered();
      } else {
        enemyHit1();
      }
    } else {
      enemyHit2();
    }
  }
  // enemy attacks player
  if (enemyHitsPlayer) {
    if (enemy.attacking1) {
      if (player.blocking) {
        enemy.blocked = true;
        setTimeout(() => {
          enemy.blocked = false;
        }, 300);
        enemy.staggered();
      } else {
        playerHit1();
      }
    } else {
      playerHit2();
    }
  }
}

// movement handler
function updateFighterMovement(fighter1, fighter2) {
  // fighter1 movement
  fighter1.velocity.x = 0;
  if (
    !fighter1.stunned &&
    !fighter1.blocking &&
    !fighter1.charging &&
    !fighter1.attacking1 &&
    !fighter1.attacking2
  ) {
    if (!spriteCollision({ sprite1: fighter1, sprite2: fighter2 })) {
      if (keys.a.pressed && fighter1.lastkey === "a") {
        fighter1.switchSprite("run");
        fighter1.velocity.x = -1;
      } else if (keys.d.pressed && player.lastkey === "d") {
        fighter1.switchSprite("run");
        fighter1.velocity.x = 1;
      } else {
        fighter1.switchSprite("idle");
      }

      if (fighter1.velocity.y > 0) {
        fighter1.switchSprite("fall");
      }

      if (keys.w.pressed && player.jumpcount < 2) {
        fighter1.switchSprite("jump");
        if (fighter1.touchGround) {
          fighter1.velocity.y = -15;
        } else {
          fighter1.velocity.y = -10;
        }
      }
    } else {
      // collision between fighters
      if (fighter1.position.x < fighter2.position.x) {
        if (fighter1.position.x < canvas.width / 2) {
          if (fighter1.position.x > 1) fighter1.position.x -= 1;
          fighter2.position.x += 1;
        } else {
          fighter1.position.x -= 1;
          if (fighter2.position.x < canvas.width - fighter2.width - 1)
            fighter2.position.x += 1;
        }
      } else if (fighter1.position.x > fighter2.position.x) {
        if (fighter1.position.x < canvas.width / 2) {
          fighter1.position.x += 1;
          if (fighter2.position.x > 1) fighter2.position.x -= 1;
        } else {
          fighter2.position.x -= 1;
          if (fighter1.position.x < canvas.width - fighter1.width - 1)
            fighter1.position.x += 1;
        }
      } else if (fighter1.velocity.y > 0) {
        fighter1.position.y -= 3;
      } else if (fighter2.velocity.y > 0) {
        fighter2.position.y -= 3;
      }
    }
  }

  // fighter2 movement
  fighter2.velocity.x = 0;
  if (
    !fighter2.stunned &&
    !fighter2.charging &&
    !fighter2.blocking &&
    !fighter2.attacking1 &&
    !fighter2.attacking2
  ) {
    if (!spriteCollision({ sprite1: fighter1, sprite2: fighter2 })) {
      if (keys.ArrowLeft.pressed && fighter2.lastkey === "ArrowLeft") {
        fighter2.switchSprite("run");
        fighter2.velocity.x = -1;
      } else if (keys.ArrowRight.pressed && fighter2.lastkey === "ArrowRight") {
        fighter2.switchSprite("run");
        fighter2.velocity.x = 1;
      } else {
        fighter2.switchSprite("idle");
      }

      if (fighter2.velocity.y > 0) {
        fighter2.switchSprite("fall");
      }

      if (keys.ArrowUp.pressed && enemy.jumpcount < 2) {
        fighter2.switchSprite("jump");
        if (fighter2.touchGround) {
          fighter2.velocity.y = -15;
        } else {
          fighter2.velocity.y = -10;
        }
      }
    }
  }
}
