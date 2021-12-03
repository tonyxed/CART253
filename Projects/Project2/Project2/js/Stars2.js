class Stars2 {
  constructor() {
    this.x = random(0, width);
    this.y = random(0, height);
    this.xx = random(0, width);
    this.yy = random(0, height);
    this.radius = random(1, 3);
    this.speed = 1.5;
  }
  //diplays
  display() {
    fill(255);
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
  //diplays
  display1() {
    fill(255);
    noStroke();
    ellipse(this.xx, this.yy, this.radius * 3, this.radius * 3);
  }
  //movement
  move1() {
    this.yy = this.yy - this.speed;
    if (this.yy < 0) {
      this.yy = 900;
      this.xx = random(0, width);
    }
  }
}
