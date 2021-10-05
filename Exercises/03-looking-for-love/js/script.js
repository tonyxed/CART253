/**
Looking for Love
Anthony Calderone
*/
"use strict";

let circle1 = {
  x: undefined,
  y: 250,
  size: 100,
  speed: 5,
  vx: 0,
  vy: 0,
};

let circle2 = {
  x: undefined,
  y: 250,
  size: 100,
  speed: 5,
  vx: 0,
  vy: 0,
};

let state = 'title'; // title, simulation, love, sadness

function setup() {
  createCanvas(500, 500);
  circlesSetup();
}

function circlesSetup() {
  circle1.x = width / 3;
  circle2.x = 2 * width / 3;

  circle1.vx = random(-circle1.speed, circle1.speed);
  circle1.vy = random(-circle1.speed, circle1.speed);
  circle2.vx = random(-circle2.speed, circle2.speed);
  circle2.vy = random(-circle2.speed, circle2.speed);
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

function title() {
  push();
  textSize(100);
  fill(142, 0, 0);
  textAlign(CENTER, TOP);
  text('love?', 250, 100);
  pop();
}

function simulation() {
  move();
  offScreen();
  overLap();
  display();
}

function love() {
  push();
  textSize(100);
  fill(142, 100, 0);
  textAlign(CENTER, TOP);
  text('Loved!', 250, 100);
  pop();
}
  function sad() {
    push();
    textSize(100);
    fill(142, 200, 0);
    textAlign(CENTER, TOP);
    text('Sadness!', 250, 100);
    pop();
  }
//Moves the circles
function move() {
  circle1.x = circle1.x + circle1.vx;
  circle1.y = circle1.y + circle1.vy;

  circle2.x = circle2.x + circle2.vx;
  circle2.y = circle2.y + circle2.vy;
}
//Checking if circles gone off screen
function offScreen() {
  if (circle1.x > width || circle1.x < 0 || circle1.x > height || circle1.y < 0 || circle1.y > height || circle2.x < 0 || circle2 > width || circle2.y < 0 || circle2.y > height) {
    state = 'sadness';
  }
}

function overLap() {
  //Check if two circles are overlapping
  let d = dist(circle1.x, circle1.y, circle2.x, circle2.y);
  if (d < circle1.size / 2 + circle2.size / 2) {
    state = 'love';
  }
}

function display() {
  ellipse(circle1.x, circle1.y, circle1.size);
  ellipse(circle2.x, circle2.y, circle2.size);
}

function mousePressed() {
  if (state === 'title') {
    state = 'simulation';
  }
}
