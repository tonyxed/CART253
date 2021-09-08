"use strict";

/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/

// setup()
//
// Description of setup() goes here.

function setup() {
  // Canvas Dimensions
  createCanvas(500, 500);
  // Background [RBG]
  background(245, 152, 66);

  ellipseMode(CENTER);
  // Head of Alien with Dimensions and Color
  noStroke();
  fill(35, 135, 24);
  ellipse(255, 255, 255, 255);
  // Body of Alien
  noStroke();
  fill(35, 135, 24);
  ellipse(255, 500, 400, 300);

  // Left Eye of Alien
  noStroke();
  fill(12, 28, 23);
  ellipse(200, 215, 50, 120);
  // Right Eye of Alien
  noStroke();
  fill(12, 28, 23);
  ellipse(300, 215, 50, 120);
  // Mouth of Alien
  rectMode(CENTER);
  stroke(255, 0, 0);
  strokeWeight(10);
  fill(255, 0, 0);
  rect(255, 320, 45, 10);

}

// draw()
//
// Description of draw() goes here.
function draw() {

}
