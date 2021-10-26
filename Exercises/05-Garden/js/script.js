/**
Bees are trying to polinate flowers, while the snake(user-controlled) is trying to
eat the Bees, while the Hawk is trying to eat the snake.
*/
"use strict";
let timer = 20;
// Our garden
let garden = {
  // An array to store the individual flowers
  flowers: [],
  // An array for bees
  bees: [],
  // How many bees in the garden
  numBees: 2,
  // an array for hawks
  hawks: [],
  // how many hawks in the garden
  numHawks: 3,
  // How many flowers in the garden
  numFlowers: 18,
  // The color of the grass (background)
  grassColor: {
    r: 120,
    g: 180,
    b: 120
  }
};
let snake = {
  x: 300,
  y: 250,
  size: 30,
  speed: 3,
  eatSize: 10,
  eatSpeed: 1,
};


function setup() {
  createCanvas(600, 600);
  // Create our flowers by counting up to the number of the flowers
  for (let i = 0; i < garden.numFlowers; i++) {
    // Create a new flower
    let x = random(0, width);
    let y = random(0, height);
    let size = random(50, 80);
    let stemLength = random(50, 100);
    let petalColor = {
      r: random(100, 255),
      g: random(100, 255),
      b: random(100, 255),
    };
    let flower = new Flower(x, y, size, stemLength, petalColor);
    // Add the flower to the array of flowers
    garden.flowers.push(flower);
  }
  // Create the bees
  for (let i = 0; i < garden.numBees; i++) {
    let bee = new Bee(random(0, width), random(0, height));
    // pushes the bees to show up in the array
    garden.bees.push(bee);
  }
  for (let i = 0; i < garden.numHawks; i++) {
    let hawk = new Hawk(random(0, width), random(0, height));
    garden.hawks.push(hawk);
  }
}
let state = 'title'; //title,simulation,timerLose,lose
function draw() {
  background(garden.grassColor.r, garden.grassColor.g, garden.grassColor.b);
  //states
  if (state === 'title') {
    state = 'title';
    title();
  }
  if (state === 'simulation') {
    state = 'simulation';
    simulation();
    timerCountdown();
  }
  if (timer === 0) {
    state = 'timerLose';
    timerLose();
  }
  if (state === 'lose') {
    state = 'lose';
    lose();
  }
  // simulates everything in the simulation() function
  function simulation() {
    moveSnake();
    displaySnake();

    // Loop through all the flowers in the array and display them
    for (let i = 0; i < garden.flowers.length; i++) {
      let flower = garden.flowers[i];
      if (flower.alive) {
        flower.shrink();
        flower.display();
      }
    }
    for (let i = 0; i < garden.hawks.length; i++) {
      let hawk = garden.hawks[i];
      hawk.display();
      hawk.move();
      hawk.checkOverLap();
    }

    for (let i = 0; i < garden.bees.length; i++) {
      let bee = garden.bees[i];
      if (bee.alive) {
        bee.display();
        bee.move();
        bee.overLap();

        for (let j = 0; j < garden.flowers.length; j++) {
          let flower = garden.flowers[j];
          if (flower.alive) {
            bee.tryToPollinate(flower);
          }
        }
      }
    }
  }
}

//birdController
function displaySnake() {
  //mainbody
  push();
  fill(0);
  ellipse(snake.x, snake.y, snake.size);
  pop();
  //eyes
  push();
  fill(255);
  noStroke();
  ellipse(snake.x - snake.size / 5, snake.y, snake.size / 5);
  ellipse(snake.x + snake.size / 5, snake.y, snake.size / 5);
  pop();
}
// snake controller
function moveSnake() {
  if (keyIsDown(LEFT_ARROW)) {
    snake.x -= snake.speed;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    snake.x += snake.speed;
  }
  if (keyIsDown(UP_ARROW)) {
    snake.y -= snake.speed;
  }
  if (keyIsDown(DOWN_ARROW)) {
    snake.y += snake.speed;
  }
  snake.x = constrain(snake.x, 0, 600);
  snake.y = constrain(snake.y, 0, 600);
}

function title() {
  push();
  textSize(25);
  background(0);
  textStyle(BOLDITALIC);
  fill(200, 215, 222);
  textAlign(CENTER, CENTER);
  text("You are a Snake, and you must eat all\r\n the Bees in the garden who are polinating \r\n the flowers while avoiding the Hawks \r\n trying to eat you! \r\n\r\n\r\n Press 'SHIFT' in order to play!", 300, 300);
  pop();
  if (keyIsDown(SHIFT)) {
    state = 'simulation';
  }
}

function lose() {
  push();
  textSize(25);
  background(0);
  textStyle(BOLDITALIC);
  fill(200, 215, 222);
  textAlign(CENTER, CENTER);
  text("You were eaten by the Hawk, unlucky. \r\n\r\n Press 'SHIFT' to play again!", 300, 300);
  pop();
  if (keyIsDown(SHIFT)) {
    location.reload();
  }
}

function timerLose() {
  push();
  textSize(25);
  background(0);
  textStyle(BOLDITALIC);
  fill(200, 215, 222);
  textAlign(CENTER, CENTER);
  text("You've ran out of time! \r\n\r\n Press 'SHIFT' to play again!", 300, 300);
  pop();
  if (keyIsDown(SHIFT)) {
    location.reload();
  }
}
function timerCountdown() {
  textAlign(CENTER, CENTER);
  fill(255);
  textSize(40);
  stroke(1);
  text(timer, 300, 30);
  if (frameCount % 60 === 0 && timer > 0) {
    timer--;
  }
}
