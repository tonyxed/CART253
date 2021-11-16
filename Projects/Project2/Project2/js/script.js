/**
Prototype
Anthony Calderone
(rough idea of needed implementations)
- life system (every time hit by debris, hp decrease + debris gone)
- different types of debris for each level
- sound of some sort
- interative menu
- background planets
- images
*/
let debris = {
  //rocks2 and the # of them
  rocks2: [],
  numRocks2: 30,
  //rocks1 and the # of them
  rocks1: [],
  numRocks1: 30,
};
let crew = {
  astronauts: [],
  numAstronauts: 3,
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
  for (let i = 0; i < crew.numAstronauts; i++) {
    let x = random(0, 900);
    let y = random(10, 900);
    let size = random(20, 30);
    let vx = random(.1, .26);
    let vy = random(.1, .26);
    let astronauts = new Astronaut(x, y, size, vx, vy);
    crew.astronauts.push(astronauts);
  }
}
//state
let state = 'mainMenu';

function draw() {
  background(30);
  //states
  if (state === 'mainMenu') {
    mainMenu();
  } else if (state === 'controls') {

  } else if (state === 'tutorial') {
    userSimulation();
    debrisSimulation();
    crewSimulation();
  } else if (state === 'level1') {

  } else if (state === 'level2') {

  } else if (state === 'level3') {

  } else if (state === 'crewSaved') {
    win();
  } else if (state === 'lose') {
    lose();
  } else if (timer === 0) {

  }
}
// simulation of the crew members
function debrisSimulation() {
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

}

function crewSimulation() {
  //displays the astronauts in the array
  let astronautsSaved = 0;
  for (let i = 0; i < crew.astronauts.length; i++) {
    let astronauts = crew.astronauts[i];
    astronauts.display();
    astronauts.checkCollision();
    astronauts.move();
    astronauts.constrain();
    if (astronauts.saved === true) {
      astronautsSaved += 1;
    }
  }
  if (astronautsSaved === crew.astronauts.length) {
    state = 'crewSaved';
  }
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

// mainMenu state
function mainMenu() {
  push();
  noCursor();
  textSize(25);
  background(0);
  textStyle(BOLDITALIC);
  fill(128 + sin(frameCount*0.1) * 128);
  textAlign(CENTER, CENTER);
  text("Welcome to my Prototype! (Save your Crew!)(Green) (Title in progress)\r\n\r\n [PROTOTYPE! SUBJECT TO CHANGE] \r\n  \r\n Press 'SHIFT' to start prototyping! ", 450, 450);
  pop();
  if (keyIsDown(SHIFT)) {
    state = 'tutorial';
  }

}

// crew saved state
function win() {
  push();
  textSize(30);
  background(0);
  textStyle(BOLDITALIC);
  fill(200, 215, 222);
  textAlign(CENTER, CENTER);
  text("You've saved all the crew members!\r\n\r\n [PROTOTYPE! SUBJECT TO CHANGE] \r\n", 450, 450);
  pop();
}

function lose() {
  push();
  textSize(30);
  background(0);
  textStyle(BOLDITALIC);
  fill(200, 215, 222);
  textAlign(CENTER, CENTER);
  text("You got crushed by the debris!\r\n\r\n [PROTOTYPE! SUBJECT TO CHANGE] \r\n \r\n Press 'SHIFT' to prototype again!", 450, 450);
  pop();
  if (keyIsDown(SHIFT)) {
    location.reload();
  }
}
