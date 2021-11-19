/**
Anthony Calderone
WHAT I WANT DONE FOR NEXT CLASS
- QOL CHANGES // MORE LIFE TO THE GAME IE: SOUND
- BACKGROUND PLANETS
- CREW MEMBER'S IMAGES
- DIFFERENT LEVELS WITH DEBRIS + MOVEMENT

*/
let playImg;
let shipImg;
let collect = {
  pickups: [],
  numPickUps: 5,
};
let lasers = [];
let numLasers = 10;
let score = 0;
let lives = 100;
let debris = {
  //rocks2
  rocks2: [],
  numRocks2: 100,
  //rocks1
  rocks1: [],
  numRocks1: 50,
};
let crew = {
  astronauts: [],
  numAstronauts: 4,
}

let user = {
  x: 450,
  y: 800,
  size: 20,
  speed: 3.5,
  r: 252,
  g: 186,
  b: 3,
};

"use strict";

function preload() {
  shipImg = loadImage("assets/images/spaceship.png");
  playImg = loadImage("assets/images/play.png");
}


function setup() {
  createCanvas(900, 900);
  //creates the powerup
  for (let i = 0; i < collect.numPickUps; i++){
    let x = random(0, 900);
    let y = random(10, 900);
    let size = 20;
    pickups = new Pickup(x, y, size);
    collect.pickups.push(pickups);
  }
  //  creates rocks1 in the array
  // for (let i = 0; i < debris.numRocks1; i++) {
  //   let x = random(820, 70);
  //   let y = random(450, 820);
  //   let w = random(50, 110);
  //   let h = 20;
  //   let vx = random(2, 5);
  //   let size = random(10, 30);
  //   let rocks1 = new Rock1(x, y, w, h, vx, size);
  //   debris.rocks1.push(rocks1);
  // }
  // creates rocks2 in the array
  for (let i = 0; i < debris.numRocks2; i++) {
    let x = random(0, 900);
    let y = random(0, 0);
    let w = random(100, 130);
    let h = 20;
    let vy = random(1, 3);
    let size = random(10, 30);
    let rocks2 = new Rock2(x, y, w, h, vy, size);
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
    controls();
  } else if (state === 'tutorial') {
    userSimulation();
    debrisSimulation();
    crewSimulation();
    tutorialText();
    points();
    life();
    laserSimulation();
    numLasersRemaining();
    powerupSimulation()
  } else if (state === 'level1') {

  } else if (state === 'level2') {

  } else if (state === 'level3') {

  } else if (state === 'crewSaved') {
    win();
  } else if (state === 'loseLife') {
    loseLife();
  }
}

function powerupSimulation(){
  for (let i = 0; i < collect.pickups.length; i++){
    let pickups = collect.pickups[i];
      pickups.display();
      pickups.collision();
  }
}
function laserSimulation() {
  // displays the lasers in the array
  for (let i = 0; i < lasers.length; i++) {
    lasers[i].display();
    lasers[i].move1();
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
    rocks2.collisionLaser();
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
  image(shipImg, user.x, user.y, 35, 35);
  imageMode(CENTER);
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
  user.y = constrain(user.y, 0, 850);

}
// shoots the lasers
function keyPressed() {
  // shooting lasers
  if (keyCode === 87) {
    let laser = new Laser(user.x, user.y);
    lasers.push(laser)
    numLasers = numLasers - 1;
  }
  if (numLasers === 0) {
    location.reload();
  }
}

// mainMenu state
function mainMenu() {
  push();
  cursor(CROSS);
  strokeWeight(2);
  fill(255);
  textSize(40);
  textAlign(CENTER, TOP);
  background(0);
  textStyle(BOLDITALIC);
  fill(150 + cos(frameCount * 0.2) * 128);
  text("SPACE STORM IS NOW ONLINE!", 450, 450);
  //play button
  fill(255, 0, 0);
  textSize(20);
  rect(370, 200, 150, 75);
  fill(255);
  text("ENTER?", 445, 228);


}
//control state
function controls() {
  push();
  cursor(CROSS);
  strokeWeight(2);
  textSize(30);
  textAlign(CENTER, TOP);
  background(0);
  textStyle(BOLDITALIC);
  fill(150 + cos(frameCount * 0.1) * 128);
  text("Don't know how to play Space Storm? \r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n Press 'ENTER' to begin playing!", 450, 60);
  fill(150 + sin(frameCount * 0.1) * 128);
  textSize(25);
  text("Save your crew members before they are swept away in space!", 450, 250);
  textSize(25)
  fill(150 + cos(frameCount * 0.1) * 128);
  text("Avoid the debris!", 450, 350);
  textSize(25);
  fill(150 + sin(frameCount * 0.1) * 128);
  text("(W)Shoot the debris with your lasers to avoid it!", 450, 450);
  textSize(25)
  fill(150 + cos(frameCount * 0.1) * 128);
  text("Move around using the arrow keys!", 450, 550);
  textSize(25)
  fill(255, 100, 100);
  text("Every saved crew member is worth 500 points!", 450, 640);
  textSize(25)
  fill(255, 100, 100);
  text("If your lives fall below 0 you lose!", 450, 720);
  textSize(25)
  fill(255, 100, 100);
  text("Every power up is worth 200 points!", 450, 680);
  textSize(25)
  fill(255, 100, 100);
  text("You start off with 10 lasers, use them to shoot pickups!", 450, 760);
  pop();
  if (keyCode === 13) {
    state = "tutorial";
  }
}
// tutorial state
function tutorialText() {
  push();
  textAlign(CENTER, TOP);
  textSize(20);
  fill(0, 255, 76);
  text("1", 70, 10);
  textSize(20);
  fill(0, 255, 76);
  text("Level:", 30, 10);
  pop();
}
// scorepoints state
function points() {
  push();
  textAlign(CENTER, RIGHT);
  textSize(20);
  fill(212, 0, 255);
  text(score, 870, 10);
  textSize(20);
  fill(212, 0, 255);
  text("Total Points:", 790, 10);
  pop();
}
// state lifes
function life() {
  push();
  textAlign(CENTER, RIGHT);
  textSize(20);
  fill(255, 0, 115);
  text(lives, 460, 10);
  textSize(20);
  fill(255, 0, 115);
  text("Lives:", 420, 10);
  pop();
}
// crew saved state
function win() {
  push();
  textSize(30);
  background(0);
  textStyle(BOLDITALIC);
  fill(255);
  text("Your total score was:", 350, 600);
  textStyle(BOLDITALIC);
  fill(255);
  text(score, 570, 600);
  textAlign(CENTER, CENTER);
  text("You've saved all the crew members!", 450, 450);
  pop();
}
// losing all lives
function loseLife() {
  push();
  textSize(30);
  background(0);
  textStyle(BOLDITALIC);
  fill(255);
  text("Your total score was:", 250, 600);
  fill(255);
  textStyle(BOLDITALIC);
  text(score, 570, 600);
  fill(150 + sin(frameCount * 0.1) * 128);
  textAlign(CENTER, CENTER);
  textStyle(BOLDITALIC);
  text("You've lost all your lives!", 450, 450);
  pop();
  if (keyIsDown(SHIFT)) {
    location.reload();
  }
}

function numLasersRemaining() {
  push();
  textAlign(LEFT, LEFT);
  textSize(20);
  fill(255);
  text(numLasers, 0, 400);
  pop();
}
// mainmenu
function mouseClicked() {

  if (state === 'mainMenu') {
    if (mouseX < 450 && mouseX > 400) {
      if (mouseY < 275 && mouseY > 200) {
        state = 'controls';
      }
    }
  }
}
