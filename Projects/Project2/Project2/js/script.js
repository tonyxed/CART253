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
let medicImg;
let meteorImg;
let meteor1Img;
let laserImg;
let collect = {
  pickups: [],
  numPickUps: 4,
};
let lasers = [];
let numLasers = 16;
let score = 0;
let durability = 250;
let medicLives = 130;
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
  numRocks1: 40,
};
let crew = {
  astronauts: [],
  numAstronauts: 6,
  medics: [],
  numMedics: 1,
}

let user = {
  x: 450,
  y: 850,
  size: 20,
  speed: 4,
  speed1: 4,
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
  meteor1Img = loadImage("assets/images/meteor1.png");
  medicImg = loadImage("assets/images/medic.png");
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
    let vy = 0;
    let vx = random();
    let size = 20;
    pickups = new Pickup(x, y, vy, vx, size);
    collect.pickups.push(pickups);
  }
  //creates the rocks1
  for (let i = 0; i < debris.numRocks1; i++) {
    let x = random(0, 900);
    let y = random(50, 820);
    let w = random(100, 130);
    let h = 20;
    let vy = random(1, 3);
    let vx = 0;
    let angle = 0;
    let radius = 150;
    let size = random(10, 30);
    let rocks1 = new Rock1(x, y, w, h, vy, vx, angle, radius, size);
    debris.rocks1.push(rocks1);
  }
  //creates the rocks2
  for (let i = 0; i < debris.numRocks2; i++) {
    let x = random(0, 900);
    let y = random(50, 900);
    let w = random(100, 130);
    let h = 20;
    let vy = random(1, 3);
    let vx = 0;
    let size = random(10, 30);
    let rocks2 = new Rock2(x, y, w, h, vy, vx, size);
    debris.rocks2.push(rocks2);
  }
  // creates the astronauts in the array
  for (let i = 0; i < crew.numAstronauts; i++) {
    let x = random(0, 900);
    let y = random(50, 800);
    let size = random(20, 30);
    let vy = random(1, 1);
    let vx = 0;
    let astronauts = new Astronaut(x, y, size, vy, vx);
    crew.astronauts.push(astronauts);
  }
  for (let i = 0; i < crew.numMedics; i++) {
    let x = random(0, 900);
    let y = 900;
    let size = random(20, 30);
    let vy = random(.5, .5);
    let vx = 0;
    let medics = new Medic(x, y, size, vy, vx);
    crew.medics.push(medics);
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
    userSimulation2();
    debrisSimulation1();
    starsSimulation1();
    points();
    tutorialText1();
    laserSimulation();
    numLasersRemaining();
    medicSimulation();
    pickupSimulation();
    medicHP();
  } else if (state === 'level3') {

  } else if (state === 'crewSaved') {
    win();
  } else if (state === 'lose') {
    lasersFinished1();
  } else if (state === 'durabilityLose') {
    durabilityLose();
  } else if (state === 'level2dialogue') {
    level2Dialogue();
  } else if (state === 'medicsAllKilled') {
    medicsAllKilled();
  } else if (state === 'medicCatched') {
    medicCatched();
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

function starsSimulation1() {
  for (let i = 0; i < body.numStars1; i++) {
    body.stars1[i].move1();
    body.stars1[i].display1();
  }

  for (let i = 0; i < body.numStars2; i++) {
    body.stars2[i].move1();
    body.stars2[i].display1();
  }
}

// pickupSimulation
function pickupSimulation() {
  for (let i = 0; i < collect.pickups.length; i++) {
    let pickups = collect.pickups[i];
    pickups.display();
    pickups.collision();
    pickups.move();
    pickups.floating()
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
  //displays rocks2 in the array
  for (let i = 0; i < debris.rocks2.length; i++) {
    let rocks2 = debris.rocks2[i];
    rocks2.movement();
    rocks2.display();
    rocks2.offScreen();
    rocks2.collision();
    rocks2.collisionLaser();
    rocks2.randomness();
  }
}

function debrisSimulation1() {
  //displays rocks1 in the array
  for (let i = 0; i < debris.rocks1.length; i++) {
    let rocks1 = debris.rocks1[i];
    rocks1.movement();
    rocks1.display();
    rocks1.offScreen();
    rocks1.collisionLaser();
    rocks1.collision();
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
    astronauts.floating();
    if (astronauts.saved === true) {
      astronautsSaved += 1;
    }
  }
  if (astronautsSaved === crew.astronauts.length) {
    state = 'level2dialogue';
    victorySound.setVolume(.1);
    victorySound.play();
  }
}

function medicSimulation() {
  let medicsSaved = 0;
  let medicsKilled = 0;
  for (let i = 0; i < crew.medics.length; i++) {
    let medics = crew.medics[i];
    medics.move1();
    medics.offScreen1();
    medics.display();
    medics.collisionRock1();
    medics.checkCollision();
    if (medics.saved === true) {
      medicsSaved += 1;
      victorySound.setVolume(.1);
      victorySound.play();
      state = "medicCatched";
    } else if (medics.killed === true) {
      medicsKilled += 1;
    }
  }
  if (medicsSaved === crew.medics.length) {
    victorySound.setVolume(.1);
    victorySound.play();
  } else if (medicsKilled === crew.medics.length) {
    state = "medicsAllKilled";
  }
}

function userSimulation() {
  // properties of the user
  push();
  fill(user.r, user.g, user.b);
  imageMode(CENTER);
  image(shipImg, user.x, user.y, 50, 50);
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

function userSimulation2() {
  push();
  fill(user.r, user.g, user.b);
  imageMode(CENTER);
  image(shipImg, user.x, user.y, 50, 50);
  pop();
  if (keyIsDown(LEFT_ARROW)) {
    user.x -= user.speed1;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    user.x += user.speed1;
  }
  user.x = constrain(user.x, 0, 870);
  user.y = constrain(user.y, 0, 900);
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
  text("If you die, you are brought back to level 1, no matter what level you are on!", 450, 500);
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
  text("Lasers are carried through each level, use them wisely!", 450, 720);
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
// tutorial state
function tutorialText1() {
  push();
  textAlign(CENTER, TOP);
  textSize(20);
  fill(0, 255, 76);
  text("2", 70, 10);
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
  text(score, 870, 20);
  textSize(20);
  fill(212, 0, 255);
  text("Total Points:", 790, 20);
  pop();
}


// crew saved state
function win() {
  push();
  textSize(30);
  background(0);
  textStyle(BOLDITALIC);
  fill(255);
  textAlign(CENTER,CENTER);
  text("Your total score was:", 350, 600);
  textStyle(BOLDITALIC);
  fill(255);
  text(score, 570, 600);
  textAlign(CENTER, CENTER);
  text("You've beaten level 1!", 450, 450);
  textStyle(BOLDITALIC);
  fill(255);
  textAlign(CENTER,CENTER);
  text("Press 'ENTER' to continue!", 450, 800);
  pop();
  if (keyCode === 13) {
    state = "level2";
    numLasers = 8;
  }
}
// # of lasers left
function numLasersRemaining() {
  push();
  textAlign(TOP, TOP);
  textSize(30);
  fill(255);
  text(numLasers, user.x - 70, user.y);
  pop();

}
// total durability of the ship remaining
function numDurabilityRemaining() {
  push();
  textAlign(LEFT, LEFT);
  textSize(30);
  fill(255);
  text(durability, user.x + 50, user.y + 20);
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
function lasersFinished1() {
  push();
  textSize(30);
  background(0);
  textStyle(BOLDITALIC);
  fill(255);
  textAlign(CENTER,CENTER);
  text("Your total score was:", 350, 600);
  textStyle(BOLDITALIC);
  fill(255);
  text(score, 570, 600);
  textAlign(CENTER, CENTER);
  text("You've ran out of lasers!", 450, 450);
  text("Press 'ENTER' to restart!", 450, 800);
  pop();
  if (keyCode === 13) {
    location.reload();
  }
}
// durability lose
function durabilityLose() {
  push();
  textSize(30);
  background(0);
  textStyle(BOLDITALIC);
  fill(255);
  textAlign(CENTER,CENTER);
  text("Your total score was:", 350, 600);
  textStyle(BOLDITALIC);
  fill(255);
  text(score, 570, 600);
  textAlign(CENTER, CENTER);
  text("Your ship ran out of durability!", 450, 450);
  text("Press 'ENTER' to restart!", 450, 800);
  pop();
  if (keyCode === 13) {
  location.reload();
  }
}

function level2Dialogue() {
  push();
  background(0);
  textSize(17);
  textStyle(BOLDITALIC);
  fill(150 + cos(frameCount * 0.1) * 128);
  textAlign(CENTER,CENTER);
  text("Prevent your medic from losing oxygen! ", 450, 660);
  text("For every debris hit, his oxygen level will go down; and will also go down over time! ", 450, 620);
  pop();
  push();
  textAlign(CENTER,CENTER);
  textSize(17);
  textStyle(BOLDITALIC);
  fill(150 + cos(frameCount * 0.1) * 128);
  text("In the upcoming level, you will need to clear a path for your sole medic!", 450, 580);
  pop();
  push();
  textSize(30);
  textStyle(BOLDITALIC);
  fill(255);
  textAlign(CENTER,CENTER);
  text("Your score was:", 300, 450);
  textSize(30);
  textStyle(BOLDITALIC);
  fill(255);
  text(score, 570, 450);
  textAlign(CENTER, CENTER);
  text("You've beaten level 1!", 450, 150);
  textSize(30);
  textStyle(BOLDITALIC);
  fill(255);
  text("Press 'ENTER' to continue!", 450, 800);
  pop();
  if (keyCode === 13) {
    state = "level2";
  }
}

function medicsAllKilled() {
  push();
  textSize(30);
  background(0);
  textStyle(BOLDITALIC);
  fill(255);
  textAlign(CENTER,CENTER);
  text("Your total score was:", 350, 600);
  textStyle(BOLDITALIC);
  fill(255);
  text(score, 570, 600);
  textAlign(CENTER, CENTER);
  text("Your sole medic was killed!", 450, 450);
  text("Press 'ENTER' to restart!", 450, 800);
  pop();
  if (keyCode === 13) {
    location.reload();

  }
}

function medicHP() {
  push();
  textAlign(TOP, TOP);
  textSize(20);
  fill(255);
  text("Medic lives:", 380, 10);
  text(medicLives, 500, 10);
  pop();
}

function medicCatched() {
  push();
  textSize(30);
  background(0);
  textStyle(BOLDITALIC);
  fill(255);
  textAlign(CENTER,CENTER);
  text("Your total score was:", 350, 600);
  textStyle(BOLDITALIC);
  fill(255);
  text(score, 570, 600);
  textAlign(CENTER, CENTER);
  text("Your sole Medic was saved from this death!", 450, 450);
  text("Press 'ENTER' to continue!", 450, 800);
  pop();
  if (keyCode === 13) {
    state = "level3";
  }
}
