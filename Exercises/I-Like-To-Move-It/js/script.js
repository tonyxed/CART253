"use strict";

/**************************************************
I-Like-To-Move-It

Exercise #1
**************************************************/

//Variables
let circle1 = {
  x: 250,
  y: 250,
  size: 50,
  speed: 1,
  growth: 1,
  fill: 255,
  alpha: 400,

};

let circle2 = {
  x: 250,
  y: 250,
  size: 50,
  speed: 1,
  growth: 1,
  fill: 1,
  alpha: 400,
};

let circle3 = {
  x: 250,
  y: 250,
  size: 50,
  speed: 1,
  growth: 1,
  fill: 1,
  alpha: 400,
};

let bg = {
  r: 1,
  g: 119,
  b: 245,

};

function setup() {
  createCanvas (500, 500);
}

//Background draw
function draw() {
  background(bg.r, bg.g, bg.b);
  bg.g = map(bg.g, 0, 500, .9, width);

noStroke();

  //circle1
fill(circle1.fill, circle1.alpha);
ellipse(circle1.x, circle1.y, circle1.size);
circle1.y -= circle1.speed;
circle1.y = constrain(circle1.y, 0, 250);
if (circle1.y > height) {
  circle1.speed = -circle1.speed;
}
circle1.size +=circle1.growth;
circle1.size = constrain(circle1.size, 0, width / 2);
circle1.fill = map(circle1.fill, 0, 500, -1.3, width);

  //circle2
fill(circle2.fill, circle2.alpha);
ellipse(circle2.x, circle2.y, circle2.size);
circle2.x = map(mouseX, 0, 250, 1, width / 2);
circle2.y = map(mouseY, 0, 250, 1, width / 2);
circle2.size = map(mouseX, 0, width, 10, 250);
circle2.size = constrain(circle2.size, 0, 200);
circle2.fill = map(mouseX, 0, 500, 1.6, width);

  //circle3
fill(circle3.fill, circle3.alpha);
ellipse(circle3.x, circle3.y, circle3.size);
circle3.y += circle3.speed;
circle3.y = constrain(circle3.y, 0, 500);
circle3.size += circle3.growth;
circle3.size = constrain(circle3.size, 0, 250);
circle3.fill = map(circle3.fill, 0, 500, 1.3, width);

}
