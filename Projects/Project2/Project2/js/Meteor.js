class Meteor {
  constructor(x, y, vx, vy, size) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.size = size;
  }
  // display
  display() {
    fill(random(255));
    noStroke();
    image(meteor2Img, this.x, this.y, 40, 40);
  }
  //movement
  move() {
    this.y += 4;
    this.x += 2;
  }
  //checks offScreen
  offScreen() {
    if (this.y > height) {
      this.y = 0;
      this.x = random(0, width);
      this.size = 30;
      fill(random());
    } else if (this.x > width) {
      this.y = 0;
      this.x = random(0, height);
      this.size = 30;
      fill(random());
    }
  }
}
