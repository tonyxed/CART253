class Stars1 {
  constructor(x, y) {
    this.x = random(0, width);
    this.y = random(0, height);
    this.radius = random(1,2);
    this.speed = 1.5;
  }
  //displays
  display() {
    fill(199, 193, 193);
    noStroke();
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
  }
  //movement
  move() {
    this.y = this.y + this.speed;
    if (this.y > height) {
      this.y = 0;
      this.x = random(0, width);
    }
  }
}
