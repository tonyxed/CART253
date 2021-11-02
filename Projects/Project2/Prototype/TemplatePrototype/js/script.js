/**
Final Project Protype
Anthony Calderone

Final Project Prototype //
*/

"use strict";
let trucks = []
let numTrucks = 3;


function setup() {
  createCanvas(500, 700);
  //creates the trucks in the array
  for (let i = 0; i < numTrucks; i++) {
    let truck = new Truck(x, y, w, h);
    let x = random(0, width);
    let y = random(0, height);
    let w = random(20, 40);
    let h = random(5, 10);
    //adds the trucks to the array
    trucks.push(truck);
  }
}

function draw() {
  background(0);
  //displays the trucks in the array
  for (let i = 0; i < trucks.length; i++) {
    let truck = trucks[i];
    truck.display();
    truck.move();
    truck.offScreen();
  }
}
