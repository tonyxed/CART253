/**
Moving Pictures
Anthony Calderone

03 Moving Pictures Activity!
*/

"use strict";


/**

*/

function preload() {
}

//Variables
let bgShade = 0;

let bg = {
r: 1,
g: 0,
b: 0,
};
let circle1 = {
x: 0,
y: 250,
size: 1,
fill: (255,200),
speed: 1,

};

let circle2 = {
x: 500,
y: 250,
size: 0.9,
fill: (255, 200),
speed: 1,
};

function setup() {
  createCanvas(500, 500);
  noStroke();

}

function draw() {
//Background
background(bg.r, bg.g, bg.b);
bg.r = bg.r + 1;

//circle1
circle1.x += circle1.speed;
circle1.x = constrain(circle1.x, 0, width / 2);
circle1.size = circle1.size + 1;
circle1.size = constrain(circle1.size, 0, width);
fill(circle1.fill);
ellipse(circle1.x, circle1.y, circle1.size);

//circle2
circle2.x -= circle2.speed;
circle2.x = constrain(circle2.x, width / 2, 500);
circle2.size = circle2.size - 0.9;
circle2.size = constrain(circle1.size, 0, width);
fill(circle2.fill);
ellipse(circle2.x, circle2.y, circle2.size);




}
