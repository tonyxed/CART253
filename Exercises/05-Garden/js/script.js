/**
Bees are trying to polinate flowers, while the snake(user-controlled) is trying to
eat the Bees, while the Hawk is trying to eat the snake.
*/
"use strict";
// Our garden
let garden = {
  // An array to store the individual flowers
  flowers: [],
  // An array for bees
  bees: [],
  // How many bees in the garden
  numBees: 15,
  // an array for hawks
  hawks: [],
  // how many hawks in the garden
  numHawks: 4,
  // How many flowers in the garden
  numFlowers: 20,
  // The color of the grass (background)
  grassColor: {
    r: 120,
    g: 180,
    b: 120
  }
};
let snake = {
  x: 300,
  y: 300,
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

function draw() {
  // Display the grass
  background(garden.grassColor.r, garden.grassColor.g, garden.grassColor.b);
  //bird Simulation
  simulation();
  // Loop through all the flowers in the array and display them
  for (let i = 0; i < garden.flowers.length; i++) {
    let flower = garden.flowers[i];
    if (flower.alive) {
      flower.shrink();
      flower.display();
    }
  }
  for (let i = 0; i < garden.hawks.length; i++){
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

//birdController
function displaySnake() {
  //mainbody
  push();
  fill(0);
  ellipse(snake.x, snake.y, snake.size);
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
// snake simulation
function simulation() {
  moveSnake();
  displaySnake();
}
