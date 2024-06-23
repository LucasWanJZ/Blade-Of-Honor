const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

const keys = {
  a: { pressed: false },
  d: { pressed: false },
  w: { pressed: false },
  ArrowLeft: { pressed: false },
  ArrowRight: { pressed: false },
  ArrowUp: { pressed: false },
};

const direction = {
  LEFT: "left",
  RIGHT: "right",
};
