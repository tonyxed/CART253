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
let circleSize = 200;
let circleX = 0;
let circleY = 250;
let circleSpeed = 2;
let circleAcceleration = .25;

function setup() {
  createCanvas(500, 500);

}

function draw() {
  background(backgroundShade);
  circleX += circleSpeed;
  circleSpeed += circleAcceleration;
  ellipse(circleX, circleY, circleSize);

}
