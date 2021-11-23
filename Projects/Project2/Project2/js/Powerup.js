class Powerup {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }
  display() {
    fill(255);
    ellipse(this.x, this.y, this.size);
  }
  }
