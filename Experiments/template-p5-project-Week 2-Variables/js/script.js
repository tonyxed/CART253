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
  speed: 2,
};

function setup() {
  createCanvas(500, 500);

}

function draw() {
  background(backgroundShade);
  circle.x += circle.speed;
  ellipse(circle.x, circle.y, circle.size);

}
