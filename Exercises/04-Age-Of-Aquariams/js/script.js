/**
Age of Aquariam
Anthony Calderone

Eat them Fishes!
*/

"use strict";

let school = [];
let schoolSize = 25;

let shark = {
  x: 300,
  y: 300,
  size: 50,
  speed: 4,
}

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
    size: random(15, 30),
    vx: random(1, 3),
    vy: random(1, 3),
    r: random(255),
    g: random(100,200),
    b: random(100),
    speed: random(1, 8),
    eaten: false,
  };
  return fish;
}

// draws the fish on the canvas
function draw() {
  background(0);
  // for loop for moving the fish
  for (let i = 0; i < school.length; i++) {
    moveFish(school[i]);
    displayFish(school[i]);
    checkOverlap(school[i]);
  }
  displayShark();
  sharkMove();
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
  if (!fish.eaten) {
    push();
    noStroke();
    fill(fish.r, fish.g, fish.b);
    ellipse(fish.x, fish.y, fish.size);
    pop();
  }
}

// displays the user
function displayShark() {
  push();
  fill(255);
  noStroke();
  ellipse(shark.x, shark.y, shark.size);
  pop();
}
// user movement
function sharkMove() {
  if (keyIsDown(LEFT_ARROW)) {
    shark.x -= shark.speed;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    shark.x += shark.speed;
  }
  if (keyIsDown(UP_ARROW)) {
    shark.y -= shark.speed;
  }
  if (keyIsDown(DOWN_ARROW)) {
    shark.y += shark.speed;
  }
  // constains the user from going off screen
  shark.x = constrain(shark.x, 0, width);
  shark.y = constrain(shark.y, 0, height);
}
// checks to see if user overlaps fish
// if overlaps then the user eats the fish
function checkOverlap(fish) {
  if (!fish.eaten) {
    let d = dist(shark.x, shark.y, fish.x, fish.y);
    if (d < fish.size / 2 + shark.size / 2) {
      shark.size += 5;
      shark.speed -= .1;
      fish.eaten = true;
    }
  }
}
