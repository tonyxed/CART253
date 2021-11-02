// class Truck1 {
//   constructor(x, y, w, h) {
//     //values
//     this.x = x;
//     this.y = y;
//     this.width = w;
//     this.height = h;
//     this.vx = 3;
//     this.vy = 0;
//     this.speed = 5;
//     //color
//     this.color = {
//       r: 66,
//       g: 179,
//       b: 245,
//     };
//   }
//
//   move() {
//     this.x += this.vx;
//     this.y += this.vy;
//   }
//   offScreen() {
//     if (this.x > width) {
//       this.x -= width;
//     }
//   }
//
//   display() {
//     push();
//     stroke(1000);
//     fill(this.color.r, this.color.g, this.color.b);
//     rectMode(CENTER);
//     rect(this.x, this.y, this.width, this.height);
//     pop();
//   }
// }
