class Car {
  constructor(x, y, w, h, vx, size) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.vx = vx;
    this.size = size;
    this.color = {
      r: random(200),
      g: random(100),
      b: random(50),
    }
  }
  display() {
    push();
    rectMode(CENTER);
    stroke(1000);
    fill(this.color.r, this.color.g, this.color.b);
    rect(this.x, this.y, this.size);
    pop();
  }
  movement() {
    this.x -= this.vx;
  }
  offScreen(){
    let y = random(600, 880);
    let w = random(60, 110);
    let red = random(16, 100);
    let blue = random(100, 200);
    let green = random(100, 255);
    let vx = random (3, 8);
    if (this.x < 0) {
      this.x = width;
      this.y = y;
      this.w = w;
      this.color.r = red;
      this.color.g = green;
      this.color.b = blue;
      this.vx = vx;
    }
  }
  collision() {
    let d = dist(user.x, user.y, this.x, this.y);
    if (d < this.size / 2 + user.size / 2) {
      location.reload();
    }
  }
}
