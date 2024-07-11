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
function startGame() {
  document.querySelector("#game_end_ui").innerHTML = "IT'S TIME TO DUEL!";
  document.querySelector("#game_end_ui").style.display = "flex";
}

function transitionToGame() {
  // close main menu
  document.querySelector("#main_music").pause();
  document.querySelector("#instruction").style.display = "none";
  document.querySelector("#main_bg").style.display = "none";
  document.querySelector("#hint_id").style.display = "none";
  document.querySelector("#hint_music").style.display = "none";

  // start game
  startGame();
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
let gameEnd = false;
let matchCount = 1;

function updateGame() {
  // player movement
  updateFighterMovement(player, enemy);

  // attack collision detection
  handleAttack(player, enemy);

  // check health bar
  if ((player.health <= 0 || enemy.health <= 0) && gameEnd) {
    checkHealthBar(timerId);
  }
}

// restart game
function restartGame() {
  matchCount++;
  document.querySelector("#main_bg").style.display = "flex";
  document.querySelector("#game_end_ui").innerHTML = "Match " + matchCount;
  document.querySelector("#game_end_ui").style.display = "flex";
  setTimeout(() => {
    document.querySelector("#main_bg").style.display = "none";
    document.querySelector("#game_end_ui").innerHTML = "IT'S TIME TO DUEL!";
  }, 1000);

  // fighters reset
  player.reset();
  enemy.reset();

  // timer reset
  timer = 60;
  document.querySelector("#timer").innerText = timer;
  setTimeout(() => {
    decreaseTimer();
    document.querySelector("#game_end_ui").style.display = "none";
  }, 3000);
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

  if (!player.dead && !enemy.dead) {
    updateGame();
  }

  if (player.wins > 1 || enemy.wins > 1) {
    document.querySelector("#restart").style.display = "flex";
  }

  window.requestAnimationFrame(animate);
}

// game start
animate();
