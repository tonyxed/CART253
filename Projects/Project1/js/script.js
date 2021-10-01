/**
Anthony Calderone

Juggle of War!
*/

/**
- user controlled player (arrow keys)
- ai controlled "balls" to be kept in the air by bouncing off of user's paddle (downward accelaration)
- title screen
- end screen (when no more balls are being juggled)
- random movement of ai controlled "balls" when hitting user paddle
- background // Done
- sound of some sort
- images of some sort
- reset system?
- time limit?
*/
"use strict";

let user = {
  x: -180,
  y: 450,
  w: 250,
  h: 25,
  size: 50,
  speed: 5,
  boost: 7,
};
let shade = {
  r: 119,
  g: 135,
  b: 127,
};

function setup() {
  createCanvas(1800, 1000);
}

function draw() {
  background(shade.r, shade.g, shade.b);
  userBasic();
  userController();

}

function userBasic() {
  //user basic
  push();
  stroke(1);
  angleMode(DEGREES);
  translate(width / 2, height / 2);
  fill(25, 111, 181);
  rect(user.x, user.y, user.w, user.h);
  pop();
}

function userController() {
  //user movement LEFT_ARROW
  if (keyIsDown(LEFT_ARROW)) {
    user.x -= user.speed;
  }
  //user movement RIGHT_ARROW
  if (keyIsDown(RIGHT_ARROW)) {
    user.x += user.speed;
  }
  // user movement speed boost moving left using UP_ARROW
  if (keyIsDown(UP_ARROW)) {
    user.x -= user.boost;
  }
  // user movement speed boost moving right using DOWN_ARROW
  if (keyIsDown(DOWN_ARROW)) {
    user.x += user.boost;
  }
}
