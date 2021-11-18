class Rock1 {
  constructor(x, y, w, h, vx, size) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.vx = vx;
    this.size = size;
    this.color = {
      r: 138,
      g: 179,
      b: 186,
    }
    this.destroyed = false;
  }
  display() {
    if (!this.destroyed){
    push();
    ellipseMode(CENTER);
    noStroke();
    fill(this.color.r, this.color.g, this.color.b);
    ellipse(this.x, this.y, this.size);
    pop();
  }
  }
  movement() {
    this.x -= this.vx;
  }
  offScreen() {
    let x = random(820, 110);
    let y = random(450, 880);
    let w = random(60, 110);
    let red = random(138, 166);
    let blue = random(179, 216);
    let green = random(166, 225);
    let vx = random(3, 8);
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
      lives = lives - 1;
      this.color.r = 255;
      if (lives === 0){
        state = 'loseLife';
      }
    }
  }
  
}
