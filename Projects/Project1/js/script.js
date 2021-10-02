/**
Enlarged!
Anthony Calderone

You are a White Blood Cell and you need to ensure that the bacteria in your host's
body doesn't enlarge to be able to take over essential organs, while avoiding the
acidity essential for bacterial growth.
*/
/**
- Bacteria grows over time //DONE
- user controlled player (white blood cell) (KEYBOARD) //DONE
- user on top of bacteria === bacteria decrease in size else bacteria keeps growing
over time // DONE
- agent (acidity) chasing player to prevent bacteria growth
- Time limit?
- Title
- Game over
- Winning State?
 */
"use strict";
let shade = {
  r: 81,
  g: 196,
  b: 160,
};
let user = {
  x: 955,
  y: 900,
  size: 70,
  speed: 5,
};
let bacteria1 = {
  x: 500,
  y: 500,
  size: 5,
};

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(shade.r, shade.g, shade.b);
  bacteria1Controller();
  userController();

}

function bacteria1Controller() {
  //bacteria1
  push();
  fill(255);
  ellipse(bacteria1.x, bacteria1.y, bacteria1.size);
  pop();
  bacteria1.size += .2;
  let d = dist(user.x, user.y, bacteria1.x, bacteria1.y);
  if (d < bacteria1.size / 4 + bacteria1.size / 4) {
    bacteria1.size -= .4;
  }
  if (bacteria1.size === 600) {
    noLoop();
  }
}

function userController() {
  //user
  push();
  stroke(1);
  fill(0);
  ellipse(user.x, user.y, user.size);
  pop();
  //userController
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
}
