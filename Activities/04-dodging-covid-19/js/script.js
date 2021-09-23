/**
Dodging Covid 19
Anthony Calderone

Dodging Covid 19 Activity #4!
*/

//Variable circleCovid

let circleCovid = {
  x: 0,
  y: 150,
  size: 100,
  speed: 4
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
background(0);

//Static
for(let i = 0; i < 1000; i++){
  let numX = random(0, width);
  let numY = random(0, height);
  stroke(255),
  point(numX,numY);
}
//Collision between circleCovid + playerCircle
let d = dist(playerCircle.x, playerCircle.y, circleCovid.x, circleCovid.y);
if (d < circleCovid.size/2 + playerCircle.size/2) {
  noLoop();
}
playerCircle.x = mouseX;
playerCircle.y = mouseY;
//playerCircle
fill(255);
ellipse(mouseX, mouseY, playerCircle.size);

//circleCovid
let y = random(0, height);
noStroke();
fill(255,0,0);
ellipse(circleCovid.x, circleCovid.y, circleCovid.size);
  circleCovid.x += circleCovid.speed;
if(circleCovid.x > width){
  circleCovid.x = 0;
  circleCovid.y = y;
}
  }
