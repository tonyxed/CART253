/**
Catch The Ball!
Anthony Calderone
*/
"use strict";

let user = {
  x: 500,
  y: 400,
  size: 100,
  speed: 5,
  vx: 0,
  vy: 0,
};

let circle2 = {
  x: 500,
  y: 400,
  size: 100,
  speed: 5,
  vx: 0,
  vy: 0,
};

let state = 'title'; // title, simulation, love, sadness

function setup() {
  createCanvas(1000, 800);
  circlesSetup();
}

function draw() {
  background(0);

  if (state === 'title') {
    title();
  } else if (state === 'simulation') {
    simulation();
  } else if (state === 'love') {
    love();
  } else if (state === 'sadness') {
    sad();
  }
}
//Moves the circle2
function circle2move() {
  circle2.x = circle2.x + circle2.vx;
  circle2.y = circle2.y + circle2.vy;
}
//displays circle2
function displaycircle2() {
  ellipse(circle2.x, circle2.y, circle2.size);
}
//displays user
function displayuser() {
  fill(255);
  ellipse(user.x, user.y, user.size)
}
//user movement with arrow keys
function userController() {
  // LEFT ARROW MOVEMENT
  if (keyIsDown(LEFT_ARROW)) {
    user.x -= user.speed;
  }
  // RIGHT ARROW MOVEMENT
  if (keyIsDown(RIGHT_ARROW)) {
    user.x += user.speed;
  }
  // DOWN ARROW MOVEMENT
  if (keyIsDown(DOWN_ARROW)) {
    user.y += user.speed;
  }
  // UP ARROW MOVEMENT
  if (keyIsDown(UP_ARROW)) {
    user.y -= user.speed;
  }
}

function circlesSetup() {
  user.x = width / 3;
  circle2.x = 2 * width / 3;

  circle2.vx = random(-circle2.speed, circle2.speed);
  circle2.vy = random(-circle2.speed, circle2.speed);
}


function title() {
  push();
  textSize(90);
  fill(142, 0, 0);
  textAlign(CENTER, TOP);
  text('Catch The Ball!', 500, 350);
  pop();
}

function simulation() {
  circle2move();
  offScreen();
  overLap();
  displaycircle2();
  displayuser();
  userController();
}

function love() {
  push();
  textSize(80);
  fill(142, 100, 0);
  textAlign(CENTER, TOP);
  text("You've caught the Ball!", 500, 350);
  pop();
}

function sad() {
  push();
  textSize(80);
  fill(142, 200, 0);
  textAlign(CENTER, TOP);
  text("You didn't catch the ball!", 500, 350);
  pop();
}

function overLap() {
  //Check if two circles are overlapping
  let d = dist(user.x, user.y, circle2.x, circle2.y);
  if (d < user.size / 2 + circle2.size / 2) {
    state = 'love';
  }
}
//Checking if circles gone off screen
function offScreen() {
  if (user.x > width || user.x < 0 || user.x > height || user.y < 0 || user.y > height || circle2.x < 0 || circle2 > width || circle2.y < 0 || circle2.y > height) {
    //state = 'sadness';
  }
}

function mousePressed() {
  if (state === 'title') {
    state = 'simulation';
  }
}
