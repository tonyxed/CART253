/**
Age of Aquariam
Anthony Calderone

Eat them Fishes!
*/
"use strict";

let school = [];
let schoolSize = 10;

let user = {
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
    size: 50,
    vx: 0,
    vy: 0,
    speed: 4,
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
  }
  // for loop for displaying the fish
  for (let i = 0; i < school.length; i++) {
    displayFish(school[i]);
  }
  displayUser();
  userMove();
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
// displays the user
function displayUser() {
  push();
  fill(255);
  noStroke();
  ellipse(user.x, user.y, user.size);
  pop();
}
// user movement
function userMove() {
  if (keyIsDown(LEFT_ARROW)) {
    user.x -= user.speed;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    user.x += user.speed;
  }
  if (keyIsDown(UP_ARROW)) {
    user.y -= user.speed;
  }
  if (keyIsDown(DOWN_ARROW)) {
    user.y += user.speed;
  }
  // constains the user from going off screen
  user.x = constrain(user.x, 0, width);
  user.y = constrain(user.y, 0, height);
}
  // collision with user and fish
  function fishEaten(fish){

  }
