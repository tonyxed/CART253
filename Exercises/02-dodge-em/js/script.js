/**
Dodge-em Exercise
Anthony Calderone

*/
let covidImage;

//Variable circleCovid
let circleCovid = {
  x: 250,
  y: 960,
  size: 50,
  vx: 0,
  vy: 0,
  ax: 0,
  ay: 0,
  acceleration: .2,
  maxspeed: 4
};
//Variable playerCircle
let playerCircle = {
  x: 250,
  y: 250,
  size: 80,
  speed: 7
};
"use strict";
//Image
function preload() {
  covidImage = loadImage("assets/images/Covid.png");
}

function setup() {
  createCanvas(1400, 900);

}

function draw() {
  background(0);
  imageMode(CENTER);
  image(covidImage, width / 2, height / 2);

  //Static
  for (let i = 0; i < 1000; i++) {
    let covidX = random(0, width);
    let covidY = random(0, height);
    fill(145,0,0);
    stroke(10),
      ellipse(covidX, covidY, 8);
  }
  //Collision between circleCovid + playerCircle
  let d = dist(playerCircle.x, playerCircle.y, circleCovid.x, circleCovid.y);
  if (d < circleCovid.size / 2 + playerCircle.size / 2) {
    noLoop();
  }

  //playerCircle
  fill(212, 91, 4);
  stroke(0);
  ellipse(playerCircle.x, playerCircle.y, playerCircle.size);

  //playerCircle Movement
  if (keyIsDown(LEFT_ARROW)) {
    playerCircle.x -= 5;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    playerCircle.x += 5;
  }
  if (keyIsDown(UP_ARROW)) {
    playerCircle.y -= 5;
  }
  if (keyIsDown(DOWN_ARROW)) {
    playerCircle.y += 5;
  }

  //circleCovid
  let y = random(0, height);
  stroke(10);
  fill(145, 0, 0);
  circleCovid.x = circleCovid.x + circleCovid.vx;
  circleCovid.y = circleCovid.y + circleCovid.vy;
  ellipse(circleCovid.x, circleCovid.y, circleCovid.size);

  //circleCovid follows playerCircle
  if (playerCircle.x < circleCovid.x) {
    circleCovid.ax = -circleCovid.acceleration;
  } else {
    circleCovid.ax = circleCovid.acceleration;
  }
  if (playerCircle.y < circleCovid.y) {
    circleCovid.ay = -circleCovid.acceleration;
  } else {
    circleCovid.ay = circleCovid.acceleration;
  }

  //circleCovid Movement constrains
  circleCovid.vx = circleCovid.vx + circleCovid.ax;
  circleCovid.vx = constrain(circleCovid.vx, -circleCovid.maxspeed, circleCovid.maxspeed);
  circleCovid.vy = circleCovid.vy + circleCovid.ay;
  circleCovid.vy = constrain(circleCovid.vy, -circleCovid.maxspeed, circleCovid.maxspeed);
  //if circleCovid leaves right side of screen place on (y,0)
  if (circleCovid.x > width) {
    circleCovid.x = 0;
    circleCovid.y = y;
  }
  // if circleCovid leaves left side of screen place on (0,y)
  if (circleCovid.x < 0) {
    circleCovid.x = width;
    circleCovid.y = y;
  }
  // if circleCovid leaves bottom side of screen place on (800,0)
  if (circleCovid.y > 1000) {
    circleCovid.x = 800;
    circleCovid.y = 0;
  }
  // if circleCovid leaves top side of screen place on (800,1000)
  if (circleCovid.y < 0) {
    circleCovid.x = 800;
    circleCovid.y = 900;
  }
  //if playerCircle leaves right side of screen place on (0,y)
  if (playerCircle.x > width) {
    playerCircle.x = 0;
    playerCircle.y = y;
  }
  // if playerCircle leaves left side of screen place on (width,y)
  if (playerCircle.x < 0) {
    playerCircle.x = width;
    playerCircle.y = y;
  }
  // if playerCircle leaves bottom side of screen place on (800,0)
  if (playerCircle.y > 1000) {
    playerCircle.x = 800;
    playerCircle.y = 0;
  }
  // if playerCircle leaves top side of screen place on (800,1000)
  if (playerCircle.y < 0) {
    playerCircle.x = 800;
    playerCircle.y = 900;
  }
}
