// World settings
const gravity = 2;
canvas.width = 1024;
canvas.height = 576;
let timer = 60;
let timerId;
let middle = canvas.width / 2;
let center = canvas.height / 2;

// background
const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./assets/background/background.png",
  height: canvas.height,
  width: canvas.width,
});

const shop = new Sprite({
  position: {
    x: 640,
    y: 128,
  },
  imageSrc: "./assets/background/shop.png",
  height: 50,
  width: 150,
  scale: 2.75,
  frames: 6,
});

const lamp = new Sprite({
  position: {
    x: 90,
    y: center + 20,
  },
  imageSrc: "./assets/background/lamp.png",
  height: 100,
  width: 50,
  scale: 3,
});

// players

const player = new Fighter({
  position: { x: middle - 200, y: center - 100 },
  color: "green",
  direction: direction.RIGHT,
});

const enemy = new Fighter({
  position: { x: middle + 200, y: center - 100 },
  color: "purple",
  direction: direction.LEFT,
});

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
  document.body.addEventListener("click", function () {
    if (music.paused) {
      music.play();
    }
  });
});

// loop
function animate() {
  window.requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  background.update();
  shop.update();
  lamp.update();
  player.update();
  enemy.update();

  // player movement
  updateFighterMovement(player, enemy);

  // collision detection
  handleAttack(player, enemy);

  // check health bar
  if (player.health <= 0 || enemy.health <= 0) {
    checkHealthBar(timerId);
  }
}

decreaseTimer();
animate();
