/**
Prototype
Anthony Calderone

*/
let enemies = {
  //slow enemies and the # of them
  slows: [],
  numSlows: 20,
};


let user = {
  x: 450,
  y: 880,
  size: 30,
  speed: 3.5,
  r: 255,
  g: 255,
  b: 255,
};
"use strict";

function setup() {
  createCanvas(900, 900);

  // creates the slow enemies in the array
  for (let i = 0; i < enemies.numSlows; i++) {
    let x = random(1, 900);
    let y = random(150, 0);
    let vy = random(.5, 1);
    let size = 30;
    let slow = new Slow(x, y, vy, size);
    enemies.slows.push(slow);
  }
}

function draw() {
  background(0);
  userSimulation();

  //displas the slow enemies in the array
  for (let i = 0; i < enemies.slows.length; i++) {
    let slow = enemies.slows[i];
    slow.movement();
    slow.display();
    slow.offScreen();
  }
}


function userSimulation() {
  // properties of the user
  push();
  fill(user.r, user.g, user.b);
  ellipseMode(CENTER);
  ellipse(user.x, user.y, user.size);
  pop();
  // user movement
  if (keyIsDown(LEFT_ARROW)) {
    user.x -= user.speed;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    user.x += user.speed;
  }
  user.x = constrain(user.x, 0, width);
}
