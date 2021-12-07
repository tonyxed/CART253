/**
Anthony Calderone
ALL IMAGES GOTTEN FROM : https://www.pngwing.com/
ALL SOUNDS GOTTEN FROM : https://freesound.org/
REFERENCES GOTTEN FROM : https://p5js.org/ && my past exercises!
*/
//CREATE NEW PICKUPS OR WHATEVR FOR THE SECOND LEVEL + NEW LASERS
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
let shipImg;
let pickupImg;
let astronautImg;
let medicImg;
let meteorImg;
let meteor1Img;
let meteor2Img;
let laserImg;
let speedImg;
let jupiterImg;
let marsImg;
let neptuneImg;
let collect = {
  pickups: [],
  numPickUps: 4,
  pickups1: [],
  numPickUps1: 4,
};
let lasers = [];
let numLasers = 30;
let score = 0;
let finalScore = 0;
let durability = 150;
let medicLives = 200;
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
  numRocks2: 100,
  //rocks1
  rocks1: [],
  numRocks1: 70,
  //meteors
  meteors: [],
  numMet: 3,
};
let crew = {
  astronauts: [],
  numAstronauts: 1,
  medics: [],
  numMedics: 1,
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
  r: 252,
  g: 186,
  b: 3,
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
  meteor1Img = loadImage("assets/images/meteor1.png");
  meteor2Img = loadImage("assets/images/meteor2.png");
  medicImg = loadImage("assets/images/medic.png");
  speedImg = loadImage("assets/images/speed.png");
  jupiterImg = loadImage("assets/images/jupiter.png");
  marsImg = loadImage("assets/images/mars.png");
  neptuneImg = loadImage("assets/images/neptune.png");
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
  // creates the medics in the array
  for (let i = 0; i < crew.numMedics; i++) {
    let x = random(0, width);
    let y = random(0);
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
let state = 'level1';

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
    jupiterSimulation();
    marsSimulation();
    neptuneSimulation();
    debrisSimulation();
    crewSimulation();
    tutorialText();
    points();
    laserSimulation();
    numLasersRemaining();
    pickupSimulation();
    pickup1Simulation();
    numDurabilityRemaining();
    starsSimulation();
  } else if (state === 'level2') {
    userSimulation2();
    debrisSimulation1();
    points();
    tutorialText1();
    laserSimulation();
    numLasersRemaining();
    medicSimulation();
    medicHP();
    starsSimulation1();
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
// displays the stars on level1
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
// displays the stars on level2
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

// pickupSimulation level1
function pickupSimulation() {
  for (let i = 0; i < collect.pickups.length; i++) {
    let pickups = collect.pickups[i];
    pickups.display();
    pickups.collision();
    pickups.move();
    pickups.floating()
  }
}
// pickupSimulation level1
function pickup1Simulation() {
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
//displays rocks1 in the array
function debrisSimulation1() {
  for (let i = 0; i < debris.rocks1.length; i++) {
    let rocks1 = debris.rocks1[i];
    rocks1.movement();
    rocks1.display();
    rocks1.offScreen();
    rocks1.collisionLaser();
    rocks1.collision();
    rocks1.floating();
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
  if (astronautsSaved === crew.astronauts.length) {
    state = 'level2dialogue';
    victorySound.setVolume(.1);
    victorySound.play();
  }
}
//displays the meteors in the array
function meteorSimulation() {
  for (let i = 0; i < debris.meteors.length; i++) {
    let meteors = debris.meteors[i];
    meteors.move();
    meteors.display();
    meteors.offScreen();
  }
}
//displays the medics in the array
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
    medics.floating();
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
//jupiter
function jupiterSimulation() {
  imageMode(CENTER);
  image(jupiterImg, jupiter.x, jupiter.y, 120, 90);
  jupiter.y = jupiter.y + jupiter.speed;
}
//mars
function marsSimulation() {
  imageMode(CENTER);
  image(marsImg, mars.x, mars.y, 40, 40);
  mars.y = mars.y + mars.speed;
}
//neptune
function neptuneSimulation() {
  imageMode(CENTER);
  image(neptuneImg, neptune.x, neptune.y, 20, 20);
  neptune.y = neptune.y + neptune.speed;
}
// properties of the user level1
function userSimulation() {
  push();
  fill(user.r, user.g, user.b);
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
// properties of the user level2
function userSimulation2() {
  push();
  fill(user.r, user.g, user.b);
  imageMode(CENTER);
  image(shipImg, user.x, user.y, 50, 50);
  pop();
  if (keyIsDown(LEFT_ARROW)) {
    user.x -= user.speed1;
  } else if (keyIsDown(RIGHT_ARROW)) {
    user.x += user.speed1;
  }
  user.x = constrain(user.x, 0, width);

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
  text("Avoid the debris!", width / 2, 350);
  textSize(25);
  fill(150 + sin(frameCount * 0.1) * 128);
  text("(SPACE)Shoot the debris with your lasers to avoid them!", width / 2, 450);
  textSize(25)
  fill(150 + cos(frameCount * 0.1) * 128);
  text("Move around using the arrow keys!", width / 2, 550);
  textSize(25)
  fill(255, 100, 100);
  text("If you die, you are brought back to level 1, no matter what level you are on!", width / 2, 500);
  textSize(25)
  fill(255, 100, 100);
  text("Every saved crew member is worth 500 points!", width / 2, 600);
  textSize(25)
  fill(255, 100, 100);
  text("To add to the challenge, your ships durability will decrease over time!", width / 2, 680);
  textSize(25)
  fill(255, 100, 100);
  text("For every debris you hit, your ships durability will go down!", width / 2, 640);
  textSize(25)
  fill(255, 100, 100);
  text("Lasers are carried through each level, use them wisely!", width / 2, 720);
  textSize(25)
  fill(255, 100, 100);
  text("Shooting powerups will either increase your speed, increase your durability and or add to the amount of lasers you currently have!", width / 2, 760);
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
  text("1", 850, 10);
  textSize(20);
  fill(0, 255, 76);
  text("Level:", 800, 10);
  pop();
}
// tutorial state
function tutorialText1() {
  push();
  textAlign(CENTER, TOP);
  textSize(20);
  fill(0, 255, 76);
  text("2", 850, 10);
  textSize(20);
  fill(0, 255, 76);
  text("Level:", 800, 10);
  pop();
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
  fill(255);
  textAlign(CENTER, CENTER);
  text("Your total score was:", width / 2, 600);
  textStyle(BOLDITALIC);
  fill(255);
  text(score, 1200, 600);
  textAlign(CENTER, CENTER);
  text("You've beaten level 1!", width / 2, 450);
  textStyle(BOLDITALIC);
  fill(255);
  textAlign(CENTER, CENTER);
  text("Press 'ENTER' to continue!", width / 2, 800);
  pop();
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

// lasers finished
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
// durability lose
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
//level2Dialogue
function level2Dialogue() {
  push();
  background(0);
  textSize(17);
  textStyle(BOLDITALIC);
  fill(150 + cos(frameCount * 0.1) * 128);
  textAlign(CENTER, CENTER);
  text("Prevent your medic from losing oxygen! ", width / 2, 660);
  text("The amount of lasers being carried over:", width / 2, 700);
  push();
  fill(200, 100, 50);
  text(numLasers, 1150 , 700);
  pop();
  text("For every debris hit, his oxygen level will go down; and will also go down over time! ", width / 2, 620);
  pop();
  push();
  textAlign(CENTER, CENTER);
  textSize(17);
  textStyle(BOLDITALIC);
  fill(150 + cos(frameCount * 0.1) * 128);
  text("In the upcoming level, you will need to clear a path for your sole medic!", width / 2, 580);
  pop();
  push();
  textSize(30);
  textStyle(BOLDITALIC);
  fill(255);
  textAlign(CENTER, CENTER);
  text("Your score was:", width / 2, 450);
  textSize(30);
  textStyle(BOLDITALIC);
  fill(255);
  text(score, 1200, 450);
  textAlign(CENTER, CENTER);
  text("You've beaten level 1!", width / 2, 150);
  textSize(30);
  textStyle(BOLDITALIC);
  fill(255);
  text("Press 'ENTER' to continue!", width / 2, 800);
  pop();
  if (keyCode === 13) {
    state = "level2";
  }
}
// medics killed
function medicsAllKilled() {
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
  text("Your sole medic was killed!", width / 2, 450);
  fill(random(255));
  pop();
}
//medic hp
function medicHP() {
  push();
  textAlign(TOP, TOP);
  textSize(20);
  fill(235, 64, 52);
  text("Medic's lives:", 800, 60);
  text(medicLives, width / 2, 60);
  pop();
}
//medics catched
function medicCatched() {
  push();
  textSize(30);
  background(0);
  textStyle(BOLDITALIC);
  fill(255);
  textAlign(CENTER, CENTER);
  text("Your final score was:", width / 2, 600);
  textStyle(BOLDITALIC);
  fill(255);
  text(score + finalScore, 1200, 600);
  textAlign(CENTER, CENTER);
  text("Your sole Medic was saved from his death!", width / 2, 450);
  pop();
}
