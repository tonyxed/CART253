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
  x: 250,
  y: 250,
  size: 200,
  speed: 2,
  fill: 0,
};

function setup() {
  createCanvas(500, 500);

}

function draw() {
  background(backgroundShade);

  circle.speed = random(-5, 5);
  circle.x += circle.speed;
  circle.y = random(0, height);
  circle.size = random(10, 100);

  circle.fill = random(1, 255);
  fill(circle.fill);

  ellipse(circle.x, circle.y, circle.size);

  console.log(`circle.fill: ${circle.fill} circle.speed: ${circle.speed} circle.y: ${circle.y} circle.size: ${circle.size}`);


}
