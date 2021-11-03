/**
Prototype
Anthony Calderone

*/
let debris = {
  //trucks and the # of them
  rocks2: [],
  numRocks2: 30,
  //cars and the # of them
  rocks1: [],
  numRocks1: 30,
};
let crew = {
  astronauts: [],
  numAstronaut: 2,
}


let user = {
  x: 450,
  y: 380,
  size: 20,
  speed: 3,
  r: 252,
  g: 186,
  b: 3,
};
"use strict";

function setup() {
  createCanvas(900, 900);
  //  creates rocks1 in the array
  for (let i = 0; i < debris.numRocks1; i++) {
    let x = random(820, 70);
    let y = random(450, 820);
    let w = random(50, 110);
    let h = 20;
    let vx = random(2, 5);
    let size = random(10, 30);
    let rocks1 = new Rock1(x, y, w, h, vx, size);
    debris.rocks1.push(rocks1);
  }
  // creates rocks2 in the array
  for (let i = 0; i < debris.numRocks2; i++) {
    let x = random(0, 900);
    let y = random(20, 300);
    let w = random(100, 130);
    let h = 20;
    let vx = random(2, 5);
    let size = random(10, 30);
    let rocks2 = new Rock2(x, y, w, h, vx, size);
    debris.rocks2.push(rocks2);
  }
  // creates the astronauts in the array
  for (let i = 0; i < crew.numAstronaut; i++) {
    let x = random(0, 900);
    let y = random(10, 900);
    let size = random(20, 30);
    let vx = random(.1, .26);
    let vy = random(.1, .26);
    let astronauts = new Astronaut(x, y, size, vx, vy);
    crew.astronauts.push(astronauts);
  }
}

function draw() {
  background(30);
  userSimulation();
  allSaved();
  //displays rocks1 in the array
  for (let i = 0; i < debris.rocks1.length; i++) {
    let rocks1 = debris.rocks1[i];
    rocks1.movement();
    rocks1.display();
    rocks1.offScreen();
    rocks1.collision();
  }
  //displays rocks2 in the array
  for (let i = 0; i < debris.rocks2.length; i++) {
    let rocks2 = debris.rocks2[i];
    rocks2.movement();
    rocks2.display();
    rocks2.offScreen();
    rocks2.collision();
  }
  //displays the astronauts in the array
  for (let i = 0; i < crew.astronauts.length; i++) {
    let astronauts = crew.astronauts[i];
    astronauts.display();
    astronauts.checkCollision();
    astronauts.move();
    astronauts.constrain();
  }
}

function allSaved() {

}


function userSimulation() {
  // properties of the user
  push();
  stroke(1000);
  fill(user.r, user.g, user.b);
  ellipseMode(CENTER);
  ellipse(user.x, user.y, user.size);
  pop();
  // user movement
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
  user.x = constrain(user.x, 0, width);
  user.y = constrain(user.y, 0, height);
}
