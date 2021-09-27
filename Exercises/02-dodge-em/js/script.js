/**
Dodge-em Exercise
Anthony Calderone

*/

//Variable circleCovid

let circleCovid = {
  x: 0,
  y: 960,
  size: 50,
  vx: 0,
  vy: 0,
  ax: 0,
  ay: 0,
  acceleration: .2,
  maxspeed: 7
};
//Variable playerCircle
let playerCircle = {
  x: 250,
  y: 250,
  size: 50,
  speed: 7
};
"use strict";

function setup() {
  createCanvas(1600, 1000);
}

function draw() {
  noCursor();
  background(0);

  //Static
  for (let i = 0; i < 100; i++) {
    let numX = random(0, width);
    let numY = random(0, height);
    stroke(255),
      ellipse(numX, numY, 2);
  }
  //Collision between circleCovid + playerCircle
  let d = dist(playerCircle.x, playerCircle.y, circleCovid.x, circleCovid.y);
  if (d < circleCovid.size / 2 + playerCircle.size / 2) {
    //noLoop();
  }

  fill(255);
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
  noStroke();
  fill(255, 0, 0);
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
  //if circleCovid leaves right side of screen place on (0,500)
  if (circleCovid.x > width) {
    circleCovid.x = 0;
    circleCovid.y = y;
  }
  // if circleCovid leaves left side of screen place on (0,500)
  if (circleCovid.x < 0) {
    circleCovid.x = width;
    circleCovid.y = 500;
  }
// if circleCovid leaves bottom side of screen place on (0,500)
  if (circleCovid.y > 1000) {
    circleCovid.x = 0;
    circleCovid.y = 500
  }
  // if circleCovid leaves top side of screen place on (0,500)
  if (circleCovid.y < 0) {
    circleCovid.x = 0;
    circleCovid.y = 500;
  }
  //if playerCircle leaves right side of screen place on (0,500)
  if (playerCircle.x > width) {
    playerCircle.x = 0;
    playerCircle.y = 500;
  }
  // if playerCircle leaves left side of screen place on ()
  if (playerCircle.x < 0) {
    playerCircle.x = width;
    playerCircle.y = 500;
  }
  // if playerCircle leaves bottom side of screen place on (0,500)
  if (playerCircle.y > 1000) {
    playerCircle.x = 0;
    playerCircle.y = 500;
  }
  // if playerCircle leaves top side of screen place on (0,500)
  if (playerCircle.y < 0) {
    playerCircle.x = 0;
    playerCircle.y = 500;
  }


}
