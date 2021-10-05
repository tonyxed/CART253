/**
Catch The Ball!
Anthony Calderone
*/
"use strict";

let user = {
  x: 50,
  y: 50,
  size: 70,
  speed: 5,
  speeddefault: 5,
  boost: 0.1,
  vx: 0,
  vy: 0,
};

let circle2 = {
  x: 800,
  y: 400,
  size: 100,
  sizeshrink: .15,
  speed: 30,
  vx: 100,
  vy: 100,
};

let state = 'title'; // title, simulation, love, sadness, small

function setup() {
  createCanvas(1600, 800);
  circle2Setup();
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
  } else if (state === 'small') {
    small();
  }
}
//Moves the circle2
function circle2move() {
  circle2.x = circle2.x + random(-circle2.speed, circle2.speed);
  circle2.y = circle2.y + random(-circle2.speed, circle2.speed);
}
//displays circle2
function displaycircle2() {
  stroke(1);
  fill(190, 235, 14);
  ellipse(circle2.x, circle2.y, circle2.size);
}
//circle2Setup
function circle2Setup() {
  circle2.vx = circle2.vx + random(-circle2.speed, circle2.speed);
  circle2.vy = circle2.vy + random(-circle2.speed, circle2.speed);
}
//displays user
function displayuser() {
  stroke(1);
  fill(0, 170, 179);
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
  // SHIFT FOR SPEED BOOST
  if (keyIsDown(SHIFT)) {
    user.speed += user.boost;
  } else {
    user.speed = user.speeddefault;
  }
  // constrains the user's speed boost
  user.speed = constrain(user.speed, 5, 7);
  // constrains user's movement off screen
  user.x = constrain(user.x, 0, 1000);
  user.y = constrain(user.y, 0, 800);
}

function title() {
  push();
  textSize(50);
  fill(142, 0, 0);
  textAlign(CENTER, CENTER);
  text('Catch the Ball! Press any mouse button to begin!', 800, 380);
  pop();
}

function simulation() {
  circle2move();
  offScreen();
  overLap();
  displaycircle2();
  displayuser();
  userController();
  circle2size();
  toosmall();
}

function love() {
  push();
  textSize(80);
  fill(142, 100, 0);
  textAlign(CENTER, TOP);
  text("You've caught the Ball!", 800, 350);
  pop();
}

function sad() {
  push();
  textSize(60);
  fill(142, 200, 0);
  textAlign(CENTER, TOP);
  text("You've failed to catch the ball!", 800, 370);
  pop();
}

function small() {
  push();
  textSize(60);
  fill(142, 100, 200);
  textAlign(CENTER, CENTER);
  text("The Circle has gotten too small!", 800, 390);
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
  if (circle2.x < 0 || circle2.x > 1600 || circle2.y < 0 || circle2.y > 800) {
    state = 'sadness';
  }
}
// as time goes on circle2 will shrink
function circle2size() {
  circle2.size -= circle2.sizeshrink;
}
// if circle2 is too small, new state will apear (easter egg)
function toosmall() {
  if (circle2.size <= 60) {
    state = 'small';
  }
}

function mousePressed() {
  if (state === 'title') {
    state = 'simulation';
  }
}
