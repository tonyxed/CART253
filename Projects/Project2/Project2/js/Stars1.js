class Stars1 {
  constructor() {
    this.x = random(-500, width);
    this.y = random(0, height);
    this.xx = random(0, width);
    this.yy = random(0, height);
    this.radius = random(1, 2);
    this.speed = 1.5;
  }
  //displays on level1
  display() {
    fill(255);
    noStroke();
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
  }
  //movement level1
  move() {
    this.y = this.y + this.speed;
    if (this.y > height) {
      this.y = 0;
      this.x = random(0, width);
    }
  }
  //displays on level2
  display1() {
    fill(173, 170, 160);
    noStroke();
    ellipse(this.xx, this.yy, this.radius * 4, this.radius * 4);
  }
  //movement level2
  move1() {
    this.yy = this.yy - this.speed;
    if (this.yy < 0) {
      this.yy = 980;
      this.xx = random(0, width);
    }
  }
}
