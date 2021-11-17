/**
Anthony Calderone
WHAT I WANT DONE FOR NEXT CLASS
- QOL CHANGES // MORE LIFE TO THE GAME IE: SOUND
- BACKGROUND PLANETS
- CREW MEMBER'S IMAGES
- DIFFERENT LEVELS WITH DEBRIS + MOVEMENT
- ABLE TO SHOOT DEBRIS???

*/
let playImg;
let shipImg;
let score = 0;
let lives = 25;
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
  numAstronauts: 4,
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
function preload(){
  shipImg = loadImage("assets/images/spaceship.png");
  playImg = loadImage("assets/images/play.png");
}


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
  print(mouseX,mouseY);
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
  } else if (state === 'level1') {

  } else if (state === 'level2') {

  } else if (state === 'level3') {

  } else if (state === 'crewSaved') {
    win();
  } else if (state === 'loseLife') {
    loseLife();
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
  user.y = constrain(user.y, 0, height);
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
  text("Avoid the debris!", 430, 350);
  textSize(25);
  fill(150 + sin(frameCount * 0.1) * 128);
  text("Pick up power ups for special abilities!", 450, 450);
  textSize(25)
  fill(150 + cos(frameCount * 0.1) * 128);
  text("Move around using the arrow keys!", 450, 550);
  textSize(25)
  fill(255, 100, 100);
  text("Use your mouse to shoot the debris!", 450, 600);
  textSize(25)
  fill(255, 100, 100);
  text("Every saved crew member is worth 500 points!", 450, 640);
  textSize(25)
  fill(255, 100, 100);
  text("If your lives fall below 25 you lose!", 450, 720);
  textSize(25)
  fill(255, 100, 100);
  text("Every power up is worth 200 points!", 450, 680);
  pop();
  if (keyCode === 13) {
    state = "tutorial";
  }
}
// tutorial state
 function tutorialText(){
   push();
   textAlign(CENTER,TOP);
   textSize(20);
   fill(0, 255, 76);
   text("1", 70, 10 );
   textSize(20);
   fill(0, 255, 76);
   text("Level:", 30, 10 );
   pop();
 }
 // scorepoints state
 function points(){
   push();
   textAlign(CENTER,RIGHT);
   textSize(20);
   fill(212, 0, 255);
   text(score, 870, 10);
   textSize(20);
   fill(212, 0, 255);
   text("Total Points:", 790, 10);
   pop();
 }
 // state lifes
 function life(){
   push();
   textAlign(CENTER,RIGHT);
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
  fill(150 + sin(frameCount * 0.1) * 128);
  textAlign(CENTER, CENTER);
  text("You've saved all the crew members!", 450, 450);
  pop();
}

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
function mouseClicked(){

      if(state === 'mainMenu'){
        if(mouseX < 450 && mouseX > 400){
          if(mouseY < 275 && mouseY > 200) {
            state = 'controls';
          }
        }
      }
    }


// 50x, 400y, 200w, 75h
