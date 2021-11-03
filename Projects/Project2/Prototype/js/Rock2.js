class Rock2 {
  constructor(x, y, w, h, vx, size) {
    this.x = x;
    this.y = y;
    this.w = w; //width
    this.h = h; //height
    this.size = size;
    this.vx = vx;
    this.color = {
      r: 138,
      g: 202,
      b: 214,
    };
  }

  movement() {
    this.x += this.vx;
  }

  offScreen() {
    let y = random(50, 300);
    let w = random(60, 110);
    let red = random(104, 138);
    let blue = random(137, 205);
    let green = random(143, 220);
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
    ellipseMode(CENTER);
    noStroke();
    fill(this.color.r, this.color.g, this.color.b);
    ellipse(this.x, this.y, this.size);
    pop();
  }
}
