window.addEventListener("keydown", (event) => {
  if (player.health > 0 && enemy.health > 0 && timer > 0 && timer < 60) {
    switch (event.key) {
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
      case "r":
        if (!player.stunned) {
          player.attack1();
        }
        break;
      case " ":
        if (!player.stunned && !player.attacking1) {
          player.attack2();
        }
        break;
      case "s":
        if (!player.stunned && !player.attacking1 && !player.charging) {
          player.block();
        }
        break;
      // player 2 keys
      case "ArrowLeft":
        if (!enemy.stunned) {
          keys.ArrowLeft.pressed = true;
          enemy.lastkey = "ArrowLeft";
        }
        break;
      case "ArrowRight":
        if (!enemy.stunned) {
          keys.ArrowRight.pressed = true;
          enemy.lastkey = "ArrowRight";
        }
        break;
      case "ArrowUp":
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
      case "ArrowDown":
        if (!enemy.stunned && !enemy.attacking1 && !enemy.charging) {
          enemy.block();
        }
        break;
      case "Enter":
        if (!enemy.stunned) {
          enemy.attack1();
        }
        break;
      case "Shift":
        if (!enemy.stunned && !enemy.attacking1) {
          enemy.attack2();
        }
        break;
    }
  } else if (timer == 0 || timer == 60) {
    if (event.key === "1") {
      location.reload();
    } else if (event.key === " ") {
      document.querySelector("#main_music").play();
    }
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case "w":
      keys.w.pressed = false;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
    case "ArrowUp":
      keys.ArrowUp.pressed = false;
      break;
  }
});

window.addEventListener("click", () => {
  if (timer == 60) {
    setTimeout(decreaseTimer, 1500);
    document.querySelector("#instruction").style.display = "none";
    document.querySelector("#main_bg").style.display = "none";
    document.querySelector("#hint_id").style.display = "none";
    document.querySelector("#main_music").pause();
    document.querySelector("#game_end_ui").style.display = "flex";
    document.querySelector("#game_end_ui").innerHTML = "GAME START";
    setTimeout(() => {
      document.querySelector("#game_end_ui").style.display = "none";
    }, 1500);
  }
});
