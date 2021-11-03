class Truck {
  constructor(x, y, w, h, vx, size) {
    this.x = x;
    this.y = y;
    this.w = w; //width
    this.h = h; //height
    this.size = size;
    this.vx = vx;
    this.color = {
      r: random(0, 200),
      g: random(0),
      b: random(0, 100, 50),
    };
  }

  movement() {
    this.x += this.vx;
  }

  offScreen() {
    let y = random(50, 300);
    let w = random(60, 110);
    let red = random(255);
    let blue = random(255);
    let green = random(255);
    let vx = random(2, 10);
    if (this.x > width) {
      this.x = 0;
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

  display() {
    push();
    rectMode(CENTER);
    stroke(1000);
    fill(this.color.r, this.color.g, this.color.b);
    rect(this.x, this.y, this.size);
    pop();
  }
}
