/**
Pong of War!
Anthony Calderone
----------- NEEDS TO BE FILLED OUT----------- NEEDS TO BE FILLED OUT----------- NEEDS TO BE FILLED OUT
This is a template. You must fill in the title,
author, and this description to match your project!
----------- NEEDS TO BE FILLED OUT----------- NEEDS TO BE FILLED OUT----------- NEEDS TO BE FILLED OUT
*/

/**
- AI controlled player
- User controlled player (arrow key movement)
- Ball controller
- Score Sysem
- Text defining the "game"
- Title Screen
- Winning Screen
- Losing Screen
- Time Limit
- High Score
- Placed in Functions
- etc...
*/
"use strict";

//Variables
let bot = {
  x: 110,
  y: 500,
  w: 40,
  h: 210,
  size: 100,
  vx: 0,
  vy: 0,

};
let user = {
  x: 2020,
  y: 500,
  w: 40,
  h: 210,
  size: 100,
  vx: 0,
  vy: 0,


};
let ball = {
  x: 960,
  y: 500,
  size: 50,
  vx: 0,
  vy: 0,

};

function setup() {
  createCanvas(windowWidth, windowHeight);
}


function draw() {
  background(0);
  positionOfControllers();


}

function positionOfControllers() {
  //botControl
  rectMode(CENTER, CENTER);
  fill(189, 4, 4);
  rect(bot.x, bot.y, bot.w, bot.h, bot.size);
  //userControl
  rectMode(CENTER, CENTER);
  fill(7, 31, 219);
  rect(user.x, user.y, user.w, user.h, user.size);
  //ballControl
  fill(255);
  ellipse(ball.x, ball.y, ball.size);
}
