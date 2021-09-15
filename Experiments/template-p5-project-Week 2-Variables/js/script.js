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
let circleSize = 300;
let circleX = 250;
let circleY = 250;

function setup() {
  createCanvas(500, 500);

}

function draw() {
  background(backgroundShade);
    ellipse(circleX, circleY, circleSize);

}
