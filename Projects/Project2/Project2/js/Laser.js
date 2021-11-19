class Laser {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.r = 10;
    this.size = 20;
  }
  display() {
    noStroke();
    fill(50, 0, 200);
    ellipse(this.x, this.y, this.size);
  }
  move1() {
    this.y = this.y - 6;
  }

}
