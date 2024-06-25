// HTML Canvas
const canvas = document.querySelector("canvas");
canvas.width = 1024;
canvas.height = 576;
const c = canvas.getContext("2d");

// Key pressed
const keys = {
  a: { pressed: false },
  d: { pressed: false },
  w: { pressed: false },
  ArrowLeft: { pressed: false },
  ArrowRight: { pressed: false },
  ArrowUp: { pressed: false },
};

// player's direction
const direction = {
  LEFT: "left",
  RIGHT: "right",
};

// World settings
const gravity = 2;
const middle = canvas.width / 2;
const center = canvas.height / 2;

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
  imageSrc: "./assets/fighters/Samurai Fighter/Idle.png",
  direction: direction.RIGHT,
  scale: 2.5,
  offset: {
    x: 215,
    y: 155,
  },
  sprites: {
    idle: {
      src: "./assets/fighters/Samurai Fighter/Idle.png",
      frames: 8,
      framesHold: 5,
    },
    run: {
      src: "./assets/fighters/Samurai Fighter/Run.png",
      frames: 8,
      framesHold: 5,
    },
    attack1: {
      src: "./assets/fighters/Samurai Fighter/Attack1.png",
      frames: 6,
      framesHold: 5,
    },
    jump: {
      src: "./assets/fighters/Samurai Fighter/Jump.png",
      frames: 2,
      framesHold: 5,
    },
    fall: {
      src: "./assets/fighters/Samurai Fighter/Fall.png",
      frames: 2,
      framesHold: 5,
    },
    hit: {
      src: "./assets/fighters/Samurai Fighter/Take Hit.png",
      frames: 4,
    },
    death: {
      src: "./assets/fighters/Samurai Fighter/Death.png",
      frames: 6,
      framesHold: 15,
    },
  },
  attackBox: {
    width: 150,
    height: 50,
  },
  attackFrame: 3,
});

const enemy = new Fighter({
  position: { x: middle + 200, y: center - 100 },
  imageSrc: "./assets/fighters/Ninja Fighter/Idle.png",
  direction: direction.LEFT,
  scale: 2.25,
  offset: {
    x: 215,
    y: 140,
  },
  sprites: {
    idle: {
      src: "./assets/fighters/Ninja Fighter/Idle.png",
      frames: 4,
      framesHold: 10,
    },
    run: {
      src: "./assets/fighters/Ninja Fighter/Run.png",
      frames: 8,
      framesHold: 5,
    },
    attack1: {
      src: "./assets/fighters/Ninja Fighter/Attack1.png",
      frames: 4,
      framesHold: 8,
    },
    jump: {
      src: "./assets/fighters/Ninja Fighter/Jump.png",
      frames: 2,
    },
    fall: {
      src: "./assets/fighters/Ninja Fighter/Fall.png",
      frames: 2,
    },
    hit: {
      src: "./assets/fighters/Ninja Fighter/Take hit.png",
      frames: 3,
    },
    death: {
      src: "./assets/fighters/Ninja Fighter/Death.png",
      frames: 7,
    },
  },
  attackBox: {
    width: 150,
    height: 50,
  },
  attackFrame: 2,
});
