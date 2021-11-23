/**
Anthony Calderone
WHAT I WANT DONE FOR NEXT CLASS
- RANDOM MOVEMENT ON X-AXIS FOR DEBRIS!
- DIFFERENT LEVELS WITH DEBRIS + MOVEMENT
- BACKGROUND PLANETS
- REFERENCE ALL IMAGES AND SOUNDS
*/

//sounds
let laserSound;
let debrisLaser;
let savedSound;
let debrisImpact;
let pickupSound;
let victorySound;
let loseSound;
let level1Sound;
//images
let playImg;
let shipImg;
let pickupImg;
let astronautImg;
let meteorImg;
let laserImg;
let collect = {
  pickups: [],
  numPickUps: 3,
};
let lasers = [];
let numLasers = 8;
let score = 0;
let durability = 250;
// stars
let body = {
  stars1: [],
  numStars1: 100,
  stars2: [],
  numStars2: 100,
};

let debris = {
  //rocks2
  rocks2: [],
  numRocks2: 70,
  //rocks1
  rocks1: [],
  numRocks1: 50,
};
let crew = {
  astronauts: [],
  numAstronauts: 6,
}

let user = {
  x: 450,
  y: 850,
  size: 20,
  speed: 3.5,
  r: 252,
  g: 186,
  b: 3,
};

"use strict";

function preload() {
  // images
  shipImg = loadImage("assets/images/spaceship.png");
  playImg = loadImage("assets/images/play.png");
  pickupImg = loadImage("assets/images/pickup.png");
  astronautImg = loadImage("assets/images/astronaut.png");
  meteorImg = loadImage("assets/images/meteor.png");
  laserImg = loadImage("assets/images/laser.png");
  // sounds // ALL GOTTEN FROM FREESOUND.ORG
  laserSound = loadSound("assets/sounds/laser.wav");
  debrisLaser = loadSound("assets/sounds/debris.wav");
  savedSound = loadSound("assets/sounds/saved.wav");
  debrisImpact = loadSound("assets/sounds/debrisImpact.wav");
  pickupSound = loadSound("assets/sounds/pickup.wav");
  victorySound = loadSound("assets/sounds/victory.wav");
  loseSound = loadSound("assets/sounds/lose.wav");
  level1Sound = loadSound("assets/sounds/level1Back.wav");
}


function setup() {
  createCanvas(900, 900);

  //creates the pickup
  for (let i = 0; i < collect.numPickUps; i++) {
    let x = random(0, 900);
    let y = random(50, 800);
    let vy = random(0);
    let size = 20;
    pickups = new Pickup(x, y, vy, size);
    collect.pickups.push(pickups);
  }
  //creates the rocks2
  for (let i = 0; i < debris.numRocks2; i++) {
    let x = random(0, 900);
    let y = random(50, 900);
    let w = random(100, 130);
    let h = 20;
    let vy = random(2, 4);
    let size = random(10, 30);
    let rocks2 = new Rock2(x, y, w, h, vy, size);
    debris.rocks2.push(rocks2);
  }
  // creates the astronauts in the array
  for (let i = 0; i < crew.numAstronauts; i++) {
    let x = random(0, 900);
    let y = random(50, 800);
    let size = random(20, 30);
    let vy = random(1, 3);
    let astronauts = new Astronaut(x, y, size, vy);
    crew.astronauts.push(astronauts);
  }
  // creates the stars1
  for (let i = 0; i < body.numStars1; i++) {
    body.stars1[i] = new Stars1();
  }
  // creates the stars2
  for (let i = 0; i < body.numStars2; i++) {
    body.stars2[i] = new Stars2();
  }
}
//state
let state = 'mainMenu';

function draw() {
  background(0);
  //states
  if (state === 'mainMenu') {
    mainMenu();
  } else if (state === 'controls') {
    controls();
  } else if (state === 'level1') {
    userSimulation();
    debrisSimulation();
    crewSimulation();
    tutorialText();
    points();
    laserSimulation();
    numLasersRemaining();
    pickupSimulation();
    numDurabilityRemaining();
    starsSimulation();
  } else if (state === 'level2') {

  } else if (state === 'level3') {

  } else if (state === 'crewSaved') {
    win();
  } else if (state === 'lose') {
    lasersFinished();
  } else if (state === 'durabilityLose') {
    durabilityLose();
  }
}
// displays the stars
function starsSimulation() {

  for (let i = 0; i < body.numStars1; i++) {
    body.stars1[i].move();
    body.stars1[i].display();
  }

  for (let i = 0; i < body.numStars2; i++) {
    body.stars2[i].move();
    body.stars2[i].display();
  }
}

// pickupSimulation
function pickupSimulation() {
  for (let i = 0; i < collect.pickups.length; i++) {
    let pickups = collect.pickups[i];
    pickups.display();
    pickups.collision();
    pickups.move();
  }
}

function laserSimulation() {
  // displays the lasers in the array
  for (let i = 0; i < lasers.length; i++) {
    lasers[i].display();
    lasers[i].move();
    lasers[i].lasersAtZero();
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
    astronauts.offScreen();
    if (astronauts.saved === true) {
      astronautsSaved += 1;
    }
  }
  if (astronautsSaved === crew.astronauts.length) {
    state = 'crewSaved';
    victorySound.setVolume(.1);
    victorySound.play();
  }
}

function userSimulation() {
  // properties of the user
  push();
  noCursor();
  stroke(1000);
  fill(user.r, user.g, user.b);
  image(shipImg, user.x, user.y, 50, 50);
  imageMode(CENTER);
  pop();
  // user movement
  if (keyIsDown(LEFT_ARROW)) {
    user.x -= user.speed;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    user.x += user.speed;
  }
  //constrains the user
  user.x = constrain(user.x, 0, 870);

}
// shoots the lasers
function keyPressed() {
  // shooting lasers
  if (keyCode === 32) {
    numLasers = numLasers - 1;
    let laser = new Laser(user.x, user.y);
    lasers.push(laser)
    laserSound.setVolume(.1);
    laserSound.play();
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
//controls state
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
  text("(SPACE)Shoot the debris with your lasers to avoid it!", 450, 450);
  textSize(25)
  fill(150 + cos(frameCount * 0.1) * 128);
  text("Move around using the arrow keys!", 450, 550);
  textSize(25)
  fill(255, 100, 100);
  text("Every saved crew member is worth 500 points!", 450, 600);
  textSize(25)
  fill(255, 100, 100);
  text("For every debris you hit, your points will be deducted!", 450, 680);
  textSize(25)
  fill(255, 100, 100);
  text("Every pickup is worth 200 points!", 450, 640);
  textSize(25)
  fill(255, 100, 100);
  text("If your lasers reach 0, you lose!", 450, 720);
  textSize(25)
  fill(255, 100, 100);
  text("Your ships durability will decrease over time, so hurry up!", 450, 760);
  pop();
  if (keyCode === 13) {
    state = "level1";
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
  text("You've beaten level 1!", 450, 450);
  pop();
}
// # of lasers left
function numLasersRemaining() {
  push();
  textAlign(TOP, TOP);
  textSize(30);
  fill(255);
  text(numLasers, 450, 0);
  pop();
}
// total durability of the ship remaining
function numDurabilityRemaining() {
  push();
  textAlign(LEFT, LEFT);
  textSize(30);
  fill(255);
  text(durability, user.x, user.y);
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
// lasers finished
function lasersFinished() {
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
  text("You've ran out of lasers!", 450, 450);
  pop();
}
// durability lose
function durabilityLose() {
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
  text("Your ship ran out of durability!", 450, 450);
  pop();
}
