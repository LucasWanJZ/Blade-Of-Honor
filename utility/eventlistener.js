window.addEventListener("keydown", (event) => {
  //boolean
  let GameIsRunning =
    player.health > 0 && enemy.health > 0 && timer > 0 && timer < 60;
  let noMovePlayer = !player.stunned && !player.attacking1 && !player.charging;
  let noMoveEnemy = !enemy.stunned && !enemy.attacking1 && !enemy.charging;

  const key = event.key.toLowerCase();

  if (GameIsRunning) {
    switch (key) {
      // player1 keys
      case "d":
        if (!player.stunned) {
          keys.d.pressed = true;
          player.lastkey = "d";
        }
        break;
      case "a":
        if (!player.stunned) {
          keys.a.pressed = true;
          player.lastkey = "a";
        }
        break;
      case "w":
        if (!player.stunned) {
          keys.w.pressed = true;
          window.setTimeout(() => {
            keys.w.pressed = false;
          }, 500);
          if (player.jumpcount < 2) {
            player.jumpcount++;
          } else {
            keys.w.pressed = false;
          }
        }
        break;
      case "f":
        if (!player.stunned && !player.charging) {
          player.attack1();
          player.disableAttack2 = true;
          setTimeout(() => {
            player.disableAttack2 = false;
          }, 400);
        }
        break;
      case "g":
        if (!player.stunned && !player.disableAttack2) {
          player.attack2();
        }
        break;
      case "s":
        if (noMovePlayer) {
          player.block();
        }
        break;
      // player 2 keys
      case "arrowleft":
        if (!enemy.stunned) {
          keys.ArrowLeft.pressed = true;
          enemy.lastkey = "ArrowLeft";
        }
        break;
      case "arrowright":
        if (!enemy.stunned) {
          keys.ArrowRight.pressed = true;
          enemy.lastkey = "ArrowRight";
        }
        break;
      case "arrowup":
        if (!enemy.stunned) {
          keys.ArrowUp.pressed = true;
          window.setTimeout(() => {
            keys.ArrowUp.pressed = false;
          }, 500);
          if (enemy.jumpcount < 2) {
            enemy.jumpcount++;
          } else {
            keys.ArrowUp.pressed = false;
          }
        }
        break;
      case "arrowdown":
        if (noMoveEnemy) {
          enemy.block();
        }
        break;
      case "k":
        if (!enemy.stunned && !enemy.charging) {
          enemy.attack1();
          enemy.disableAttack2 = true;
          setTimeout(() => {
            enemy.disableAttack2 = false;
          }, 400);
        }
        break;
      case "l":
        if (!enemy.stunned && !enemy.disableAttack2) {
          enemy.attack2();
        }
        break;
    }
  } else if (timer >= 60) {
    if (event.key === " ") {
      menu_music.play();
    }
  } else {
    if (event.key === "1") {
      music.pause();
      location.reload();
    }
  }
});

window.addEventListener("keyup", (event) => {
  const key = event.key.toLowerCase();

  switch (key) {
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case "w":
      keys.w.pressed = false;
      break;
    case "arrowleft":
      keys.ArrowLeft.pressed = false;
      break;
    case "arrowright":
      keys.ArrowRight.pressed = false;
      break;
    case "arrowup":
      keys.ArrowUp.pressed = false;
      break;
  }
});

window.addEventListener("click", () => {
  if (timer == 60) {
    setTimeout(decreaseTimer, 1500);
    transitionToGame();
    setTimeout(() => {
      document.querySelector("#game_end_ui").style.display = "none";
    }, 1500);
  }
});
