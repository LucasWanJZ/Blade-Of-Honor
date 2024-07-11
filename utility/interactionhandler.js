// Game End Handler
function checkHealthBar(timerId) {
  gameEnd = false;
  clearTimeout(timerId);

  const gameEndUI = document.querySelector("#game_end_ui");
  const isDraw = player.health === enemy.health;
  const playerWon = player.health > enemy.health;
  const winner = playerWon ? player : enemy;

  updatePlayerWins(playerWon);
  handleGameEndMessage(gameEndUI, isDraw, playerWon);
  gameEndUI.style.display = "flex";
  winner.switchSprite("idle");
  end_sound.play();

  if (player.wins < 2 && enemy.wins < 2) {
    prepareForNextDuel(gameEndUI);
  } else {
    music.pause();
    document.querySelector("#end_music").play();
  }
}

// Game End UI Handler
function handleGameEndMessage(gameEndUI, isDraw, playerWon) {
  if (isDraw) {
    gameEndUI.innerHTML = "It's a Draw!";
  } else if (playerWon) {
    handlePlayerWinMessage(gameEndUI);
  } else {
    handleEnemyWinMessage(gameEndUI);
  }
}

// Player Win Message
function handlePlayerWinMessage(gameEndUI) {
  if (player.wins === 1) {
    document.querySelector("#pm1").style.display = "block";
    gameEndUI.innerHTML = "Prepare for the next duel!";
  } else {
    document.querySelector("#pm2").style.display = "block";
    gameEndUI.innerHTML = "Hiroshi Wins!";
  }
}

// Enemy Win Message
function handleEnemyWinMessage(gameEndUI) {
  if (enemy.wins === 1) {
    document.querySelector("#em1").style.display = "block";
    gameEndUI.innerHTML = "Prepare for the next duel!";
  } else {
    document.querySelector("#em2").style.display = "block";
    gameEndUI.innerHTML = "Jiro Wins!";
  }
}

// Update Winner
function updatePlayerWins(playerWon) {
  if (playerWon) {
    player.wins++;
  } else {
    enemy.wins++;
  }
}

// next Match
function prepareForNextDuel(gameEndUI) {
  setTimeout(() => {
    gameEndUI.style.display = "none";
    document.querySelector("#restart").style.display = "none";
    restartGame();
  }, 2000);
}

// attack condition
function attackCondition(fighter1, fighter2) {
  if (fighter1.attacking1) {
    if (fighter2.blocking) {
      fighter1.blocked = true;
      setTimeout(() => {
        fighter1.blocked = false;
      }, 300);
      fighter1.staggered();
    } else {
      fighter2.hit(15, 50);
    }
    fighter1.attacking1 = false;
  } else {
    fighter2.hit(30, 70);
    fighter1.attacking2 = false;
  }
}

// attack handler
function handleAttack(player, enemy) {
  const playerHitsEnemy = attackCollision({ sprite1: player, sprite2: enemy });
  const enemyHitsPlayer = attackCollision({ sprite1: enemy, sprite2: player });

  // player attacks
  if (playerHitsEnemy) {
    attackCondition(player, enemy);
  }
  // enemy attacks player
  if (enemyHitsPlayer) {
    attackCondition(enemy, player);
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
