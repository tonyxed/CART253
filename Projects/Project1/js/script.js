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
  speeddefault: 5,
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
  maxsize: 300,
};
let bacteria2 = {
  x: 1700,
  y: 700,
  size: 5,
  r: 255,
  g: 255,
  b: 255,
  growthrate: .1,
  growthreduce: .3,
  maxsize: 300,
};
let bacteria3 = {
  x: 700,
  y: 600,
  size: 5,
  r: 255,
  g: 255,
  b: 255,
  growthrate: .05,
  growthreduce: .1,
  maxsize: 300,
};
let bacteria4 = {
  x: 1600,
  y: 300,
  size: 5,
  r: 255,
  g: 255,
  b: 255,
  growthrate: .03,
  growthreduce: .1,
  maxsize: 300,
};

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(shade.r, shade.g, shade.b);
  bacteria1Controller();
  bacteria2Controller();
  bacteria3Controller();
  bacteria4Controller();
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

function bacteria3Controller() {
  //bacteria3
  push();
  fill(bacteria3.r, bacteria3.g, bacteria3.b);
  ellipse(bacteria3.x, bacteria3.y, bacteria3.size);
  pop();
  bacteria3.size += bacteria3.growthrate;
  let db3 = dist(user.x, user.y, bacteria3.x, bacteria3.y);
  if (db3 < bacteria3.size / 4 + user.size / 4) {
    bacteria3.size -= bacteria3.growthreduce;
  }
  if (bacteria3.size >= bacteria3.maxsize) {
    noLoop();
  }
}

function bacteria4Controller() {
  //bacteria4
  push();
  fill(bacteria4.r, bacteria4.g, bacteria4.b);
  ellipse(bacteria4.x, bacteria4.y, bacteria4.size);
  pop();
  bacteria4.size += bacteria4.growthrate;
  let db4 = dist(user.x, user.y, bacteria4.x, bacteria4.y);
  if (db4 < bacteria4.size / 4 + user.size / 4) {
    bacteria4.size -= bacteria4.growthreduce;
  }
  if (bacteria4.size >= bacteria4.maxsize) {
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
    user.speed = user.speeddefault;
  }

  //constrain users speed boost
  user.speed = constrain(user.speed, 5, 9);
}
//acidityController
function acidityController() {
  //agent is (acidity)
  push();
  stroke(1);
  fill(acidity.r, acidity.g, acidity.b);
  ellipse(acidity.x, acidity.y, acidity.size);
  pop();

  //movement

}
