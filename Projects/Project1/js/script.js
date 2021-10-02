/**
Enlarged!
Anthony Calderone

You are a White Blood Cell and you need to ensure that the bacteria in your host's
body doesn't enlarge to be able to take over essential organs, while avoiding the
acidity essential for bacterial growth.
*/
/**
- Bacteria grows over time //DONE
- user controlled player (white blood cell) (KEYBOARD) //DONE
- user on top of bacteria === bacteria decrease in size else bacteria keeps growing over time // DONE
- agent (acidity) chasing player to prevent bacteria growth
- Time limit?
- Title
- Game over
- Winning State?
 */
"use strict";
let shade = {
  r: 81,
  g: 196,
  b: 160,
};
let user = {
  x: 950,
  y: 900,
  size: 70,
  r: 0,
  g: 0,
  b: 0,
  speed: 5,
  boost: 0.12,

};
let acidity = {
  x: 950,
  y: 50,
  size: 30,
  r: 255,
  g: 0,
  b: 0,
  vx: 0,
  vy: 0,
  ax: 0,
  ay: 0,
  acceleration: 0.2,
  maxspeed: 1,
};
let bacteria1 = {
  x: 300,
  y: 200,
  size: 5,
  r: 255,
  g: 255,
  b: 255,
  growthrate: .2,
  growthreduce: 0.5,
  maxsize: 500,
};
let bacteria2 = {
  x: 1500,
  y: 600,
  size: 5,
  r: 255,
  g: 255,
  b: 255,
  growthrate: .1,
  growthreduce: .3,
  maxsize: 600,
};
let bacteria3 = {
  x: 600,
  y: 200,
  size: 5,
  r: 255,
  g: 255,
  b: 255,
  growthrate: .1,
  growthreduce: 0.2,
  maxsize: 400,
};

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(shade.r, shade.g, shade.b);
  bacteria1Controller();
  bacteria2Controller();
  userController();
  acidityController();
}

function bacteria1Controller() {
  //bacteria1
  push();
  fill(bacteria1.r, bacteria1.g, bacteria1.b);
  ellipse(bacteria1.x, bacteria1.y, bacteria1.size);
  pop();
  bacteria1.size += bacteria1.growthrate;

  //bacteria1 dist
  let db1 = dist(user.x, user.y, bacteria1.x, bacteria1.y);
  if (db1 < bacteria1.size / 4 + bacteria1.size / 4) {
    bacteria1.size -= bacteria1.growthreduce;
  }
  if (bacteria1.size >= bacteria1.maxsize) {
    noLoop();
  }
}

function bacteria2Controller() {

  //bacteria2
  push();
  fill(bacteria2.r, bacteria2.g, bacteria2.b);
  ellipse(bacteria2.x, bacteria2.y, bacteria2.size);
  pop();
  bacteria2.size += bacteria2.growthrate;
  let db2 = dist(user.x, user.y, bacteria2.x, bacteria2.y);
  if (db2 < bacteria2.size / 4 + user.size / 4) {
    bacteria2.size -= bacteria2.growthreduce;
  }
  if (bacteria2.size >= bacteria2.maxsize) {
    noLoop();
  }
}

function userController() {
  //user
  push();
  stroke(1);
  fill(user.r, user.g, user.b);
  ellipse(user.x, user.y, user.size);
  pop();

  //userController
  if (keyIsDown(LEFT_ARROW)) {
    user.x -= user.speed;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    user.x += user.speed;
  }
  if (keyIsDown(UP_ARROW)) {
    user.y -= user.speed;
  }
  if (keyIsDown(DOWN_ARROW)) {
    user.y += user.speed;
  }

  //user speed boost
  if (keyIsDown(SHIFT)) {
    user.speed += user.boost;
  } else {
    user.speed = 5;
  }

  //constrain users speed boost
  user.speed = constrain(user.speed, 5, 9);
}
//acidityController
function acidityController() {
  push();
  stroke(1);
  fill(acidity.r, acidity.g, acidity.b);
  ellipse(acidity.x, acidity.y, acidity.size);
  pop();
}
