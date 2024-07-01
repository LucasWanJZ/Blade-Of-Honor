// timer
function decreaseTimer() {
  if (timer > 0) {
    timerId = setTimeout(decreaseTimer, 1000);
    timer--;
    document.querySelector("#timer").innerText = timer;
  } else {
    checkHealthBar(timerId);
  }
}

// transition to game
function transitionToGame() {
  // close main menu
  document.querySelector("#main_music").pause();
  document.querySelector("#instruction").style.display = "none";
  document.querySelector("#main_bg").style.display = "none";
  document.querySelector("#hint_id").style.display = "none";
  document.querySelector("#hint_music").style.display = "none";

  // start game
  document.querySelector("#game_end_ui").innerHTML = "GAME START";
  document.querySelector("#game_end_ui").style.display = "flex";
}

// music
document.addEventListener("DOMContentLoaded", function () {
  music.volume = 0.1;
  document.body.addEventListener("click", function () {
    if (music.paused) {
      music.play();
    }
  });
});

//update game
function updateGame() {
  // player movement
  updateFighterMovement(player, enemy);

  // attack collision detection
  handleAttack(player, enemy);

  // check health bar
  if (player.health <= 0 || enemy.health <= 0) {
    checkHealthBar(timerId);

    // end sound
  }
}

// loop
function animate() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  background.update();
  shop.update();
  lamp.update();
  cat.update();
  cat2.update();

  if (timer < 60) {
    player.update();
    enemy.update();
  }

  if (!player.death && !enemy.death) {
    updateGame();
  }

  window.requestAnimationFrame(animate);
}

// game start
animate();
