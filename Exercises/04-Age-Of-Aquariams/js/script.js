/**
Age of Aquariam
Anthony Calderone

Eat them Fishes!
*/

"use strict";
let timer = 20;
let school = [];
let schoolSize = 37;
let shark = {
  x: 300,
  y: 300,
  size: 50,
  speed: 4,
}
let fishSpecial = {
  x: 0,
  y: 0,
  size: 10,
  vx: 1,
  vy: 1,
  r: 255,
  g: 0,
  b: 0,
  speed: 20,
  eaten: false,
};

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
    g: random(100, 200),
    b: random(100),
    speed: random(1, 8),
    eaten: false,
  };
  return fish;
}
let state = 'title'; // title ,simulation, timerOver, fishEaten
// draws the fish on the canvas
function draw() {
  background(0);
  // states
  if (state === 'title') {
    state = 'title';
    title();
  }
  if (state === 'simulation') {
    state = 'simulation';
    simulation();
    timerCountdown();
  }
  if (state === 'fishEaten') {
    state = 'fishEaten';
    fishEaten();
  }
  if (timer === 0) {
    state = 'timerOver';
    timerOver();
  }
  // simulation
  function simulation() {
    displayspecialFish();
    movespecialFish();
    checkspecialFish();
    for (let i = 0; i < school.length; i++) {
      moveFish(school[i]);
      displayFish(school[i]);
      checkOverlap(school[i]);
    }
    displayShark();
    sharkMove();
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
  if (!fish.eaten) {
    push();
    noStroke();
    fill(fish.r, fish.g, fish.b);
    ellipse(fish.x, fish.y, fish.size);
    pop();
  }
}

function displayspecialFish() {
  if (!fishSpecial.eaten) {
    push();
    noStroke();
    fill(fishSpecial.r, fishSpecial.g, fishSpecial.b);
    ellipse(fishSpecial.x, fishSpecial.y, fishSpecial.size);
    pop();
  }
}

function movespecialFish() {
  let change = random(0, 1);
  if (change < 0.05) {
    fishSpecial.vx = random(-fishSpecial.speed, fishSpecial.speed);
    fishSpecial.vy = random(-fishSpecial.speed, fishSpecial.speed);
  }

  // moves the fish
  fishSpecial.x = fishSpecial.x + fishSpecial.vx;
  fishSpecial.y = fishSpecial.y + fishSpecial.vy;
  // constrains the fish
  fishSpecial.x = constrain(fishSpecial.x, 0, width);
  fishSpecial.y = constrain(fishSpecial.y, 0, height);
}
// displays the user
function displayShark() {
  push();
  fill(52, 201, 235);
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
// checks if fishSpecial overlaps with user
function checkspecialFish() {
  if (!fishSpecial.eaten) {
    let d1 = dist(shark.x, shark.y, fishSpecial.x, fishSpecial.y);
    if (d1 < fishSpecial.size / 2 + shark.size / 2) {
      shark.size -= 5;
      shark.speed += .2;
      fishSpecial.eaten = true;
      state = 'fishEaten';
    }
  }
}
// no more fish state
function fishEaten() {
  push();
  textSize(25);
  background(0);
  textStyle(BOLDITALIC);
  fill(200, 215, 222);
  textAlign(CENTER, CENTER);
  text("You've eaten the special fish, NICE!!!", 300, 300);
  pop();
}
// title state
function title() {
  push();
  textSize(25);
  background(0);
  textStyle(BOLDITALIC);
  fill(200, 215, 222);
  textAlign(CENTER, CENTER);
  text("You are a shark, and you must eat all\r\n the fishes in your ecosystem before the\r\n time runs out in order to survive! \r\n\r\n\r\n Press 'SHIFT' in order to play!", 300, 300);
  pop();
  if (keyIsDown(SHIFT)) {
    state = 'simulation';
  }
}
// ending1
function timerOver() {
  push();
  textSize(25);
  background(0);
  textStyle(BOLDITALIC);
  fill(200, 215, 222);
  textAlign(CENTER, CENTER);
  text("You've ran out of time! Press 'Space' to try again!", 300, 300);
  pop();
  if (keyIsDown(32)) {
    location.reload();
  }
}
// timerCountdown
function timerCountdown() {
  textAlign(CENTER, CENTER);
  fill(255);
  textSize(40);
  stroke(1);
  text(timer, 300, 30);
  if (frameCount % 60 === 0 && timer > 0) {
    timer--;
  }
}
