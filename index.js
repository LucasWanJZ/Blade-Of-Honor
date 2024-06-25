// game state
let gameEnd = false;
let gameStart = true;

// timer settings
let timer = 30;
let timerId;

// timer
function decreaseTimer() {
  if (timer > 0) {
    timerId = setTimeout(decreaseTimer, 1000);
    timer--;
    document.querySelector("#timer").innerText = timer;
  } else {
    checkHealthBar(timerId);
    gameEnd = true;
  }
}

// music
document.addEventListener("DOMContentLoaded", function () {
  var music = document.getElementById("bgm");
  music.volume = 0.3;
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

  // collision detection
  handleAttack(player, enemy);

  // check health bar
  if (player.health <= 0 || enemy.health <= 0) {
    checkHealthBar(timerId);
    gameEnd = true;
  }
}

// loop
function animate() {
  if (gameStart) {
    document.querySelector("#game_end_ui").style.display = "flex";
    document.querySelector("#game_end_ui").innerHTML = "GAME START";
    setTimeout(() => {
      document.querySelector("#game_end_ui").style.display = "none";
      gameStart = false;
    }, 1500);
  }

  window.requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  background.update();
  shop.update();
  lamp.update();
  player.update();
  enemy.update();

  if (!player.death && !enemy.death) {
    updateGame();
  }

  if (gameEnd) {
    document.querySelector("#start_sound").play();
  }
}

// game start

setTimeout(decreaseTimer, 1500);
animate();
