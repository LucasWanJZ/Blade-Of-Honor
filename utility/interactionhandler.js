// game end handler
function checkHealthBar(timerId) {
  clearTimeout(timerId);
  const gameEndUI = document.querySelector("#game_end_ui");
  if (player.health == enemy.health) {
    gameEndUI.innerHTML = "It's a Draw!";
  } else if (player.health > enemy.health) {
    gameEndUI.innerHTML = "Hiroshi Wins!";
    player.switchSprite("idle");
  } else {
    gameEndUI.innerHTML = "Jiro Wins!";
    enemy.switchSprite("idle");
  }
  end_sound.play();
  document.querySelector("#restart").style.display = "flex";
  gameEndUI.style.display = "flex";
}

// player getting hit
function handlePlayerHit(damage, moveBack) {
  player.health -= damage;
  if (player.health <= 0) {
    player.health = 0;
    player.switchSprite("death");
  } else {
    player.staggered();
  }
  gsap.to("#playerHealth", { width: player.health + "%", duration: 0.25 });
  player.position.x = Math.max(player.position.x - moveBack, 0);
}

// enemy getting hit
function handleEnemyHit(damage, moveBack) {
  enemy.health -= damage;
  if (enemy.health <= 0) {
    enemy.health = 0;
    enemy.switchSprite("death");
  } else {
    enemy.staggered();
  }
  gsap.to("#enemyHealth", { width: enemy.health + "%", duration: 0.25 });
  enemy.position.x = Math.min(
    enemy.position.x + moveBack,
    canvas.width - enemy.width
  );
}

// players attack
function playerHit1() {
  handlePlayerHit(15, 50);
}
function playerHit2() {
  handlePlayerHit(30, 50);
}
function enemyHit1() {
  handleEnemyHit(15, 50);
}
function enemyHit2() {
  handleEnemyHit(30, 50);
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
      player.attacking1 = false;
    } else {
      enemyHit2();
      player.attacking2 = false;
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
        enemy.attacking1 = false;
      }
    } else {
      playerHit2();
      enemy.attacking2 = false;
    }
  }
}

// movement handler
function handleMovement(
  fighter,
  keys,
  leftKey,
  rightKey,
  upKey,
  oppositeFighter
) {
  let cantMove =
    !fighter.stunned &&
    !fighter.blocking &&
    !fighter.charging &&
    !fighter.attacking1 &&
    !fighter.attacking2;
  fighter.velocity.x = 0;
  if (cantMove) {
    if (!spriteCollision({ sprite1: fighter, sprite2: oppositeFighter })) {
      if (keys[leftKey].pressed && fighter.lastkey === leftKey) {
        fighter.switchSprite("run");
        fighter.velocity.x = -1;
      } else if (keys[rightKey].pressed && fighter.lastkey === rightKey) {
        fighter.switchSprite("run");
        fighter.velocity.x = 1;
      } else {
        fighter.switchSprite("idle");
      }
      if (fighter.velocity.y > 0) {
        fighter.switchSprite("fall");
      }
      if (keys[upKey].pressed && fighter.jumpcount < 2) {
        fighter.switchSprite("jump");
        fighter.velocity.y = fighter.touchGround ? -15 : -10;
      }
    } else {
      handleCollision(fighter, oppositeFighter);
    }
  }
}

function handleCollision(fighter1, fighter2) {
  if (fighter1.position.x < fighter2.position.x) {
    if (fighter1.position.x < canvas.width / 2) {
      fighter1.position.x = Math.max(fighter1.position.x - 1, 0);
      fighter2.position.x = Math.min(
        fighter2.position.x + 1,
        canvas.width - fighter2.width
      );
    } else {
      fighter1.position.x = Math.max(fighter1.position.x - 1, 0);
      fighter2.position.x = Math.min(
        fighter2.position.x + 1,
        canvas.width - fighter2.width
      );
    }
  } else if (fighter1.position.x > fighter2.position.x) {
    if (fighter1.position.x < canvas.width / 2) {
      fighter1.position.x = Math.min(
        fighter1.position.x + 1,
        canvas.width - fighter1.width
      );
      fighter2.position.x = Math.max(fighter2.position.x - 1, 0);
    } else {
      fighter1.position.x = Math.min(
        fighter1.position.x + 1,
        canvas.width - fighter1.width
      );
      fighter2.position.x = Math.max(fighter2.position.x - 1, 0);
    }
  } else if (fighter1.velocity.y > 0) {
    fighter1.position.y -= 3;
  } else if (fighter2.velocity.y > 0) {
    fighter2.position.y -= 3;
  }
}

function updateFighterMovement(fighter1, fighter2) {
  handleMovement(fighter1, keys, "a", "d", "w", fighter2);
  handleMovement(
    fighter2,
    keys,
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    fighter1
  );
}
