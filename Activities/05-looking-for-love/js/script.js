"use strict";

//user
let user = {
  x: 250,
  y: 250,
  size: 100
};

//covid
let covid = {
  x: 0,
  y: 250,
  size: 100,
  speed: 10
};

function setup() {
createCanvas(windowWidth, windowHeight);
}


function draw() {
background(0);

//static
for (let i = 0; i < 100; i++){
  let x = random(0, width);
  let y = random(0, height);
  let s = random(0, 50);
  stroke(100);
  ellipse(x,y,s);
}

//Collision with covid and user
let distance = dist(covid.x, covid.y, user.x, user.y);
if (distance < covid.size/2 + user.size/2) {
  noLoop();
}


//User Input
user.x = mouseX;
user.y = mouseY;

fill(255);
ellipse(user.x, user.y, user.size);

//Covid19
noStroke();
fill(255,0,0);
ellipse(covid.x, covid.y, covid.size);
covid.x += covid.speed;
if(covid.x > width) {
  covid.x = 0;
  covid.y = random(0, height);
}
  }
