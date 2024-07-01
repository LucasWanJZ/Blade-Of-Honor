// timer settings
let timer = 60;
let timerId;

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

// music
document.addEventListener("DOMContentLoaded", function () {
  var music = document.getElementById("bgm");
  music.volume = 0.5;
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
    var end_sound = document.querySelector("#end_sound");
    end_sound.play();
  }
}

// loop
function animate() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  background.update();
  shop.update();
  lamp.update();

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
