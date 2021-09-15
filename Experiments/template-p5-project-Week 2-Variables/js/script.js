/**
Variables
Anthony Calderone

Variables as a whole!
*/

"use strict";

function preload() {

}

//Variables
let backgroundShade = 0;
let circle = {
  x: 0,
  y: 250,
  size: 200,
  speed: 1,
  fill: 0,
};

function setup() {
  createCanvas(500, 500);

}

function draw() {
  background(backgroundShade);

  //circle.speed = random(-5, 5);
  circle.x += circle.speed;
  circle.x = constrain(circle.x, 0, width);
  //circle.y = random(0, height);
  //circle.size = random(10, 100);

  circle.size = map(mouseY, 0, height, 100, 255);
  circle.fill = map(mouseX, 0, width, 0, height);
  fill(circle.fill);
  ellipse(circle.x, circle.y, circle.size);

  console.log(`circle.fill: ${circle.fill} circle.speed: ${circle.speed} circle.y: ${circle.y} circle.size: ${circle.size}`);


}
