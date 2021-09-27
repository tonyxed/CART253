/**
Dodge-em Exercise
Anthony Calderone

*/

//Variable circleCovid

let circleCovid = {
  x: 250,
  y: 250,
  size: 100,
  vx: 0,
  vy: 0,
  ax: 0,
  ay: 0,
  acceleration: .1,
  maxspeed: 5
};
//Variable playerCircle
let playerCircle = {
  x: 250,
  y: 250,
  size: 100
};
"use strict";

function setup() {
  createCanvas(windowWidth, windowHeight);
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
  if (d < circleCovid.size / 4 + playerCircle.size / 4) {
    //noLoop();
    }
  playerCircle.x = mouseX;
  playerCircle.y = mouseY;

  //playerCircle
  fill(255);
  ellipse(mouseX, mouseY, playerCircle.size);

  //circleCovid
  let y = random(0, height);
  noStroke();
  fill(255, 0, 0);
  circleCovid.x = circleCovid.x + circleCovid.vx;
  circleCovid.y = circleCovid.y + circleCovid.vy;
  ellipse(circleCovid.x, circleCovid.y, circleCovid.size);

  //circleCovid follows playerCircle
  if (mouseX < circleCovid.x) {
    circleCovid.ax = -circleCovid.acceleration;
  } else {
    circleCovid.ax = circleCovid.acceleration;
  }
  if (mouseY < circleCovid.y) {
    circleCovid.ay = -circleCovid.acceleration;
  } else {
    circleCovid.ay = circleCovid.acceleration;
  }

  //Movement constrains
  circleCovid.vx = circleCovid.vx + circleCovid.ax;
  circleCovid.vx = constrain(circleCovid.vx, -circleCovid.maxspeed, circleCovid.maxspeed);
  circleCovid.vy = circleCovid.vy + circleCovid.ay;
  circleCovid.vy = constrain(circleCovid.vy, -circleCovid.maxspeed, circleCovid.maxspeed);
  if (circleCovid.x > width) {
    circleCovid.x = 0;
    circleCovid.y = y;
  }
}
