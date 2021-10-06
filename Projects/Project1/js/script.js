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
- agent's (acidity1, 2 & 3) coming into screen like a shooting star and user has to dodge them. //DONE
- Time limit? // DONE
- Title // DONE
- Game over // DONE
- Winning State? // DONE
- sound
 */
"use strict";
let timer = 60;

let shade = {
  r: 0,
  g: 110,
  b: 105,
};
let user = {
  x: 100,
  y: 900,
  size: 60,
  r: 255,
  g: 255,
  b: 255,
  speeddefault: 5,
  speed: 5,
  boost: 0.12,

};
let acidity1 = {
  x: 900,
  y: 0,
  size: 80,
  r: 152,
  g: 186,
  b: 115,
  vx: 15,
  vy: 15,
};
let acidity2 = {
  x: 10,
  y: 50,
  size: 80,
  r: 152,
  g: 186,
  b: 115,
  vx: 15,
  vy: 15,
};
let acidity3 = {
  x: 0,
  y: 500,
  size: 80,
  r: 152,
  g: 186,
  b: 115,
  vx: 15,
  vy: 15,
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

let state = 'title'; // title, simulation, lose, win, bacterialose

function setup() {
  createCanvas(1950, 1000);
}

function draw() {
  background(shade.r, shade.g, shade.b);

  // background for loop in simulation state
  for (let i = 0; i < 80; i++) {
    let numX = random(0, width);
    let numY = random(0, height);
    stroke(5);
    ellipse(numX, numY, 0, 50);
  }

  // when timer reaches 0 --> timerWin state
  if (timer === 0) {
    state = 'timerWin';
  }
  if (state === 'title') {
    title();
  }
  if (state === 'simulation') {
    simulation();
    timerCountdown();
  }
  if (state === 'lose') {
    lose();
  }
  if (state === 'bacterialose') {
    bacterialose();
  }
  if (state === 'timerWin') {
    timerWin();
  }
}

function simulation() {
  bacteria1Controller();
  bacteria2Controller();
  bacteria3Controller();
  bacteria4Controller();
  userController();
  acidity1Controller();
  acidity2Controller();
  acidity3Controller();
}
// background loop
function bacteria1Controller() {
  // bacteria1
  push();
  fill(bacteria1.r, bacteria1.g, bacteria1.b);
  ellipse(bacteria1.x, bacteria1.y, bacteria1.size);
  pop();
  bacteria1.size += bacteria1.growthrate;

  // bacteria1 dist
  let db1 = dist(user.x, user.y, bacteria1.x, bacteria1.y);
  if (db1 < bacteria1.size / 4 + bacteria1.size / 4) {
    bacteria1.size -= bacteria1.growthreduce;
  }
  if (bacteria1.size >= bacteria1.maxsize) {
    state = 'bacterialose';
  }
}

function bacteria2Controller() {
  // bacteria2
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
    state = 'bacterialose';
  }
}

function bacteria3Controller() {
  // bacteria3
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
    state = 'bacterialose';
  }
}

function bacteria4Controller() {
  // bacteria4
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
    state = 'bacterialose';
  }
}

function userController() {
  // user
  push();
  stroke(1);
  fill(user.r, user.g, user.b);
  ellipse(user.x, user.y, user.size);
  pop();

  // userController
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

  // user speed boost
  if (keyIsDown(SHIFT)) {
    user.speed += user.boost;
  } else {
    user.speed = user.speeddefault;
  }

  // constrain users speed boost
  user.speed = constrain(user.speed, 5, 9);

  // constrain users movement off screen from left to right
  user.x = constrain(user.x, 0, 1900);
  // constrain users movement off screen from top to bottom
  user.y = constrain(user.y, 0, 1000);
}
// acidity1Controller y axis movement
function acidity1Controller() {
  push();
  let x = random(0, height);
  stroke(1);
  fill(acidity1.r, acidity1.g, acidity1.b);
  acidity1.y = acidity1.y + acidity1.vy;
  ellipse(acidity1.x, acidity1.y, acidity1.size);
  pop();
  //collision between acidity1 and user
  let da1 = dist(user.x, user.y, acidity1.x, acidity1.y);
  if (da1 < acidity1.size / 2 + user.size / 2) {
    state = 'lose';
  }
  // if acidity1 leaves bottom of screen, spawned at random (x,y) %% the speed increases by .1
  if (acidity1.y > width) {
    acidity1.x = x;
    acidity1.y = 0;
    acidity1.vy += .1;
  }
}
// acidity2Controller x & y movement
function acidity2Controller() {
  push();
  let x = random(-600, 1800);
  stroke(1);
  fill(acidity2.r, acidity2.g, acidity2.b);
  acidity2.x = acidity2.x + acidity2.vx;
  acidity2.y = acidity2.y + acidity2.vy;
  ellipse(acidity2.x, acidity2.y, acidity2.size);
  pop();
  //collision between acidity2 and user
  let da2 = dist(user.x, user.y, acidity2.x, acidity2.y);
  if (da2 < acidity2.size / 2 + user.size / 2) {
    state = 'lose';
  }
  // if acidity2 leaves right or bottom of screen, spawned at random (x,y) %% the speed increases by .1
  if (acidity2.x > width) {
    acidity2.x = x;
    acidity2.y = 0;
    acidity2.vx += .1;
  }
}
// acidity3Controller x axis movement
function acidity3Controller() {
  push();
  let y = random(0, height);
  stroke(1);
  fill(acidity3.r, acidity3.g, acidity3.b);
  acidity3.x = acidity3.x + acidity3.vx;
  ellipse(acidity3.x, acidity3.y, acidity3.size);
  pop();
  // collision between acidity3 and user
  let da3 = dist(user.x, user.y, acidity3.x, acidity3.y);
  if (da3 < acidity3.size / 2 + user.size / 2) {
    state = 'lose';
  }
  // if acidity3 leaves right or bottom of screen, spawned at random (x,y) %% the speed increases by .1
  if (acidity3.x > width) {
    acidity3.x = 0;
    acidity3.y = y;
    acidity3.vx += .1;
  }
}

// STATES

// title state
function title() {
  push();
  textSize(40);
  background(12, 65, 89);
  textStyle(BOLDITALIC);
  fill(200, 215, 222);
  textAlign(CENTER, CENTER);
  text("Avoid the raining Acidities that are beneficial for Bacteria growth, \r\n and prevent the Bacteria's from getting too large and killing off your host.", 930, 350);
  pop();
  push();
  textSize(50);
  textStyle(BOLDITALIC);
  fill(200, 215, 222);
  textAlign(CENTER, CENTER);
  text("Use the Arrow keys to move. Press the SHIFT key for a speed boost!", 930, 800);
  pop();
  push();
  textSize(50);
  textStyle(BOLDITALIC);
  fill(200, 215, 222);
  textAlign(CENTER, CENTER);
  text("Win by beating the timer!", 930, 860);
  pop();
  push();
  textSize(50);
  textStyle(BOLDITALIC);
  fill(200, 215, 222);
  textAlign(CENTER, CENTER);
  text("Press any key on the mouse to begin playing!", 930, 920);
  pop();
  // title screen background for loop
  for (let i1 = 0; i1 < 20; i1++) {
    let numX = random(0, width);
    let numY = random(0, height);
    stroke(255);
    ellipse(numX, numY, 0, 50);
  }
}
// losing state
function lose() {
  push();
  textSize(50);
  background(12, 65, 89);
  textStyle(BOLDITALIC);
  fill(200, 215, 222);
  textAlign(CENTER, CENTER);
  text("You've been tagged by the Acidity, better luck next time!", 930, 500);
  pop();
  // lose screen background for loop
  for (let i1 = 0; i1 < 20; i1++) {
    let numX = random(0, width);
    let numY = random(0, height);
    stroke(255);
    ellipse(numX, numY, 0, 50);
  }
}
// winning state
function timerWin() {
  push();
  textSize(50);
  background(12, 65, 89);
  textStyle(BOLDITALIC);
  fill(200, 215, 222);
  textAlign(CENTER, CENTER);
  text("You've prevented the Bacteria from engulfing your host, congratulations!", 930, 500);
  pop();
  // timerWin screen background for loop
  for (let i1 = 0; i1 < 20; i1++) {
    let numX = random(0, width);
    let numY = random(0, height);
    stroke(255);
    ellipse(numX, numY, 0, 50);
  }
}
// bacteria size lose
function bacterialose() {
  push();
  textSize(50);
  background(12, 65, 89);
  textStyle(BOLDITALIC);
  fill(200, 215, 222);
  textAlign(CENTER, CENTER);
  text("The Bacteria has gotten too large and has killed your host!", 930, 500);
  pop();
  // bacterialose screen background for loop
  for (let i1 = 0; i1 < 20; i1++) {
    let numX = random(0, width);
    let numY = random(0, height);
    stroke(255);
    ellipse(numX, numY, 0, 50);
  }
}
// starting the game state
function mousePressed() {
  if (state === 'title') {
    state = 'simulation';
  }
}
// timerCountdown //looked up the reference in how to implement a countdown timer
function timerCountdown() {
  textAlign(CENTER, CENTER); //
  textSize(30);
  text(timer, 950, 40);
  if (frameCount % 60 === 0 && timer > 0) {
    timer--;
  }
}
