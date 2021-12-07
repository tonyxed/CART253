/**
Anthony Calderone
Rescue your crew by preventing them from being swept away in space, and by using your lasers to clear the oncoming debris.
If you fail to make it to the mother ship in time after all your crew members have been saved, you will forever be lost in space.
ALL IMAGES GOTTEN FROM : https://www.pngwing.com/
ALL SOUNDS GOTTEN FROM : https://freesound.org/
REFERENCES GOTTEN FROM : https://p5js.org/ && my past exercises!
*/
//sounds
let laserSound;
let speedSound;
let debrisLaser;
let savedSound;
let debrisImpact;
let pickupSound;
let victorySound;
let loseSound;
let level1Sound;
let musicSound;
let crashSound;
//images
let playImg;
let mothershipImg;
let shipImg;
let shieldImg;
let pickupImg;
let astronautImg;
let meteor1Img;
let meteor2Img;
let laserImg;
let speedImg;
let jupiterImg;
let marsImg;
let neptuneImg;
let collect = {
  pickups: [],
  numPickUps: 5,
  pickups1: [],
  numPickUps1: 5,
};
let lasers = [];
let numLasers = 18;
let score = 0;
let finalScore = 0;
let durability = 300;
let timer = 20;
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
  numRocks2: 150,
  //rocks1
  rocks1: [],
  numRocks1: 70,
};
let crew = {
  astronauts: [],
  numAstronauts: 8,
}
let user = {
  x: 950,
  y: 920,
  w: 50,
  h: 50,
  size: 20,
  speed: 2,
  speed1: 4,
  boost: 1,
  ableToMove: false,
};
let motherShip = {
  x: 950,
  y: 70,
  size: 20,
  vx: 2,
  vy: 0,
  float: 0.2,
};
let jupiter = {
  x: 850,
  y: 150,
  speed: .1,
};
let mars = {
  x: 1450,
  y: -100,
  speed: .2,
};
let neptune = {
  x: 550,
  y: 300,
  speed: .3,
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
  laser2Img = loadImage("assets/images/laser2.png");
  meteor1Img = loadImage("assets/images/meteor1.png");
  meteor2Img = loadImage("assets/images/meteor2.png");
  speedImg = loadImage("assets/images/speed.png");
  jupiterImg = loadImage("assets/images/jupiter.png");
  marsImg = loadImage("assets/images/mars.png");
  neptuneImg = loadImage("assets/images/neptune.png");
  mothershipImg = loadImage("assets/images/mothership.png");
  // sounds
  laserSound = loadSound("assets/sounds/laser.wav");
  debrisLaser = loadSound("assets/sounds/debris.wav");
  savedSound = loadSound("assets/sounds/saved.wav");
  debrisImpact = loadSound("assets/sounds/debrisImpact.wav");
  pickupSound = loadSound("assets/sounds/pickup.wav");
  victorySound = loadSound("assets/sounds/victory.wav");
  loseSound = loadSound("assets/sounds/lose.wav");
  level1Sound = loadSound("assets/sounds/level1Back.wav");
  speedSound = loadSound("assets/sounds/speed.wav");
  musicSound = loadSound("assets/sounds/music.wav");
  crashSound = loadSound("assets/sounds/crash.wav");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //background music
  musicSound.setVolume(.02);
  musicSound.play();
  musicSound.loop();
  //creates the pickup
  for (let i = 0; i < collect.numPickUps; i++) {
    let x = random(0, width);
    let y = random(850, 0);
    let vy = 0;
    let vx = random();
    let size = 20;
    pickups = new Pickup(x, y, vy, vx, size);
    collect.pickups.push(pickups);
  }
  //creates the pickup1
  for (let i = 0; i < collect.numPickUps1; i++) {
    let x = random(0, width);
    let y = random(850, 0);
    let vy = 0;
    let vx = 2;
    let size = 20;
    pickups1 = new Pickup1(x, y, vy, vx, size);
    collect.pickups1.push(pickups1);
  }
  //creates the rocks1
  for (let i = 0; i < debris.numRocks1; i++) {
    let x = random(0, width);
    let y = random(850, 0);
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
    let x = random(0, width);
    let y = random(50, height);
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
    let x = random(0, width);
    let y = random(50, height);
    let size = random(20, 30);
    let vy = random(1, 1);
    let vx = 0;
    let astronauts = new Astronaut(x, y, size, vy, vx);
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
  console.log(mouseX, mouseY);
  //states
  if (state === 'mainMenu') {
    mainMenu();
  } else if (state === 'controls') {
    controls();
  } else if (state === 'level1') {
    userSimulation();
    planetsSimulation();
    debrisSimulation();
    crewSimulation();
    userFunctionalities();
    laserSimulation();
    allPickupsSimulation();
    starsSimulation();
    mothershipSimulation();
    points();
  } else if (state === 'lose') {
    lasersFinished1();
  } else if (state === 'durabilityLose') {
    durabilityLose();
  } else if (state === "win") {
    win();
  } else if (state === 'timerLose') {
    timerLose();
  }
}
// displays the stars on level1
function starsSimulation() {
  //stars 1
  for (let i = 0; i < body.numStars1; i++) {
    body.stars1[i].move();
    body.stars1[i].display();
  }
  //stars 2
  for (let i = 0; i < body.numStars2; i++) {
    body.stars2[i].move();
    body.stars2[i].display();
  }
}
// allPickupsSimulation
function allPickupsSimulation() {
  // pickupSimulation level1
  for (let i = 0; i < collect.pickups.length; i++) {
    let pickups = collect.pickups[i];
    pickups.display();
    pickups.collision();
    pickups.move();
    pickups.floating()
  }
  // pickupSimulation level1
  for (let i = 0; i < collect.pickups1.length; i++) {
    let pickups1 = collect.pickups1[i];
    pickups1.display();
    pickups1.collision();
    pickups1.move();
    pickups1.floating()
  }
}
// displays the lasers in the array
function laserSimulation() {
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

//displays the astronauts in the array
function crewSimulation() {
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
  // if all crew members are saved then text will appear and user.ableToMove will = true
  if (astronautsSaved === crew.astronauts.length) {
    user.ableToMove = true;
    push();
    textSize(20);
    fill(150 + cos(frameCount * 0.2) * 128);
    textStyle(BOLDITALIC);
    textAlign(CENTER, CENTER);
    text("All Crew members have been saved, make it to the mother ship before it departs!", width / 2, 450);
    textAlign(CENTER, CENTER);
    fill(255, 221, 0 + cos(frameCount * 0.1) * 128);
    textSize(30);
    stroke(1);
    text(timer, width / 2, 500);
    pop();
    //timerCountdown
    if (frameCount % 60 === 0 && timer > 0) {
      timer--;
    }
    if (timer === 0) {
      state = 'timerLose';
    }
  }
  // if all crew members are saved then user will be able to move
  if (user.ableToMove === true) {
    if (keyIsDown(UP_ARROW)) {
      user.y = user.y - 1;
    }
  }
}
// planetsSimulation
function planetsSimulation() {
  //jupiter

  imageMode(CENTER);
  image(jupiterImg, jupiter.x, jupiter.y, 120, 90);
  jupiter.y = jupiter.y + jupiter.speed;

  //mars

  imageMode(CENTER);
  image(marsImg, mars.x, mars.y, 40, 40);
  mars.y = mars.y + mars.speed;

  //neptune

  imageMode(CENTER);
  image(neptuneImg, neptune.x, neptune.y, 20, 20);
  neptune.y = neptune.y + neptune.speed;

}
// properties of the user level1
function userSimulation() {
  noCursor();
  push();
  imageMode(CENTER);
  image(shipImg, user.x, user.y, user.w, user.h);
  pop();
  // user movement
  if (keyIsDown(LEFT_ARROW)) {
    user.x -= user.speed;
  } else if (keyIsDown(RIGHT_ARROW)) {
    user.x += user.speed;
  }
  //constrains the user
  user.x = constrain(user.x, 0, windowWidth);
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
// motherShip simulation
function mothershipSimulation() {
  push();
  imageMode(CENTER);
  image(mothershipImg, motherShip.x, motherShip.y, 70, 70);
  pop();
  this.x = this.x + this.vx;
  this.y = this.y + this.vy;

  let d = dist(user.x, user.y, motherShip.x, motherShip.y);
  if (d < user.size / 2 + motherShip.size / 2) {
    state = 'win';
    victorySound.setVolume(.1);
    victorySound.play();
  }
}

function userFunctionalities() {
  // # of lasers left
  push();
  textAlign(TOP, TOP);
  textSize(30);
  fill(3, 181, 252);
  text(numLasers, user.x - 70, user.y);
  pop();
  // total durability of the ship remaining
  textAlign(LEFT, LEFT);
  textSize(30);
  fill(252, 3, 3);
  text(durability, user.x + 50, user.y + 20);
  pop();
}

// button on mainMenu
function mouseClicked() {
  if (state === 'mainMenu') {
    if (mouseX < 990 && mouseX > 890) {
      if (mouseY < 275 && mouseY > 200) {
        state = 'controls';
      }
    }
  }
}
// mainMenu state
function mainMenu() {
  push();
  cursor(CROSS);
  strokeWeight(2);
  fill(255);
  textSize(40);
  textAlign(CENTER, CENTER);
  background(0);
  textStyle(BOLDITALIC);
  fill(150 + cos(frameCount * 0.2) * 128);
  text("SPACE STORM IS NOW ONLINE!", width / 2, height / 2);
  //play button
  fill(255, 0, 0);
  textSize(20);
  rect(870, 220, 150, 75);
  fill(255);
  text("ENTER?", 945, 255);
}

//STATE FUNCTIONS

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
  text("Don't know how to play Space Storm? \r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n Press 'ENTER' to begin playing!", width / 2, 60);
  fill(150 + sin(frameCount * 0.1) * 128);
  textSize(25);
  text("Save your crew members before they are swept away in space!", width / 2, 250);
  textSize(25)
  fill(150 + cos(frameCount * 0.1) * 128);
  text("(UP_ARROW)Once all crew members are saved, you will be permitted to extract to the MotherShip!", width / 2, 350);
  textSize(25);
  fill(150 + sin(frameCount * 0.1) * 128);
  text("(SPACE)Shoot the debris with your lasers to avoid them!", width / 2, 450);
  textSize(25)
  fill(150 + cos(frameCount * 0.1) * 128);
  text("Move around using the arrow keys!", width / 2, 560);
  textSize(25)
  fill(255, 100, 100);
  text("Every saved crew member is worth 500 points!", width / 2, 610);
  textSize(25)
  fill(255, 100, 100);
  text("To add to the challenge, your ships durability will decrease over time!", width / 2, 690);
  textSize(25)
  fill(255, 100, 100);
  text("For every debris you hit, your ships durability will go down!", width / 2, 650);
  textSize(25)
  fill(255, 100, 100);
  text("Shooting powerups will either increase your speed, increase your durability and or add to the amount of lasers you currently have!", width / 2, 730);
  pop();
  if (keyCode === 13) {
    state = "level1";
  }
}
// scorepoints state
function points() {
  push();
  textAlign(CENTER, RIGHT);
  textSize(20);
  fill(212, 0, 255);
  text(score, 1000, 25);
  textSize(20);
  fill(212, 0, 255);
  text("Points:", 930, 25);
  pop();
}
// crew saved state
function win() {
  push();
  textSize(30);
  background(0);
  textStyle(BOLDITALIC);
  textStyle(BOLDITALIC);
  fill(255);
  text(score, 1200, 600);
  textAlign(CENTER, CENTER);
  text("Crew members have been saved, make it to the mother ship before it departs!", width / 2, 450);
  pop();
}
// lasers finished state
function lasersFinished1() {
  push();
  textSize(30);
  background(0);
  textStyle(BOLDITALIC);
  fill(255);
  textAlign(CENTER, CENTER);
  text("Your total score was:", width / 2, 600);
  textStyle(BOLDITALIC);
  fill(255);
  text(score, 1200, 600);
  textAlign(CENTER, CENTER);
  text("You've ran out of lasers!", width / 2, 450);
  text("Press 'ENTER' to restart!", width / 2, 800);
  pop();
  if (keyCode === 13) {
    location.reload();
  }
}
// durability lose state
function durabilityLose() {
  push();
  textSize(30);
  background(0);
  textStyle(BOLDITALIC);
  fill(255);
  textAlign(CENTER, CENTER);
  text("Your total score was:", width / 2, 600);
  textStyle(BOLDITALIC);
  fill(255);
  text(score, 1200, 600);
  textAlign(CENTER, CENTER);
  text("Your ship ran out of durability!", width / 2, 450);
  text("Press 'ENTER' to restart!", width / 2, 800);
  pop();
  if (keyCode === 13) {
    location.reload();
  }
}
//winning state
function win() {
  push();
  textSize(30);
  background(0);
  textStyle(BOLDITALIC);
  fill(255);
  textAlign(CENTER, CENTER);
  text("Your total score was:", width / 2, 600);
  textStyle(BOLDITALIC);
  fill(255);
  text(score, 1200, 600);
  textAlign(CENTER, CENTER);
  text("You've extracted succesfully with all your crew members!", width / 2, 450);
  pop();
}
//losing time state
function timerLose() {
  push();
  textSize(30);
  background(0);
  textStyle(BOLDITALIC);
  fill(255);
  textAlign(CENTER, CENTER);
  text("Your total score was:", width / 2, 600);
  textStyle(BOLDITALIC);
  fill(255);
  text(score, 1200, 600);
  textAlign(CENTER, CENTER);
  text("The mother ship has left without you!", width / 2, 450);
  pop();
}
