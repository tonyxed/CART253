/**
Age of Aquariam
Anthony Calderone

Eat them Fishes!
*/

let school = [];
let schoolSize = 4;

"use strict";


function setup() {
  createCanvas(600, 600);
  // for loop for drawing amount of fish on screen
  for (let i = 0; i < schoolSize; i++) {
    school[i] = createFish(random(0, width), random(0, height));
  }
}

function createFish(x, y) {
  let fish = {
    x: x,
    y: y,
    size: 50,
    vx: 0,
    vy: 0,
    speed: 2,
  };
  return fish;
}

// draws the fish on the canvas
function draw() {
  background(0);
  // for loop for moving the fish
  for (let i = 0; i < school.length; i++) {
    moveFish(school[i]);
  }
  // for loop for displaying the fish
  for (let i = 0; i < school.length; i++) {
    displayFish(school[i]);
  }
}
// moves the fish
function moveFish(fish) {
  let change = random(0, 1);
  if (change < 0.05) {
    fish.vx = random(-fish.speed, fish.speed);
    fish.vy = random(-fish.speed, fish.speed);
  }

  // moves the fish
  fish.x = fish.x + fish.vx;
  fish.y = fish.y + fish.vy;
  // constrains the fish
  fish.x = constrain(fish.x, 0, width);
  fish.y = constrain(fish.y, 0, height);
}
// displays the fish
function displayFish(fish) {
  push();
  fill(200, 100, 100);
  noStroke();
  ellipse(fish.x, fish.y, fish.size);
  pop();
}
