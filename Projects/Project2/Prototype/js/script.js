/**
Prototype
Anthony Calderone

*/
let traffic = {
  //trucks and the # of them
  trucks: [],
  numTrucks: 40,
  //cars and the # of them
  cars: [],
  numCars: 40,
};


let user = {
  x: 450,
  y: 890,
  size: 20,
  speed: 3,
  r: 255,
  g: 255,
  b: 255,
};
"use strict";

function setup() {
  createCanvas(900, 900);
  // creates the trucks in the array
  for (let i = 0; i < traffic.numTrucks; i++) {
    let x = random(0, 600);
    let y = random(20, 300);
    let w = random(100, 130);
    let h = 20;
    let vx = random(2, 5);
    let size = 15;
    let truck = new Truck(x, y, w, h, vx, size);
    traffic.trucks.push(truck);
  }
//  creates the cars in the array
  for (let i = 0; i < traffic.numCars; i++) {
    let x = random(900, 0);
    let y = random(400, 840);
    let w = random(50, 110);
    let h = 20;
    let vx = random(2, 5);
    let size = 15;
    let car = new Car(x, y, w, h, vx, size);
    traffic.cars.push(car);
  }
}

function draw() {
  background(0);
  userSimulation();

  //displays the trucks in the array
  for (let i = 0; i < traffic.trucks.length; i++) {
    let truck = traffic.trucks[i];
    truck.movement();
    truck.display();
    truck.offScreen();
    truck.collision();
  }
  //displays the cars in the array
  for (let i = 0; i < traffic.cars.length; i++) {
    let car = traffic.cars[i];
    car.movement();
    car.display();
    car.offScreen();
    car.collision();
  }
}


function userSimulation() {
  // properties of the user
  push();
  fill(user.r, user.g, user.b);
  ellipseMode(CENTER);
  ellipse(user.x, user.y, user.size);
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
}
