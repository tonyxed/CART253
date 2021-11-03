class Astronaut {
  constructor(x, y, size, vx, vy) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.vx = vx;
    this.vy = vy;
    this.color = {
      r: 255,
      g: 255,
      b: 255,
    };
    this.alive = true;
    this.eaten = false;
  }

  display() {
    if (!this.eaten) {
      push();
      noStroke();
      fill(this.color.r, this.color.g, this.color.b);
      ellipse(this.x, this.y, this.size);
      pop();
    }
  }
  move() {
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;
    //floating
    this.vx = random(-.3, .3);
    this.vy = random(-.3, .3);
  }
  constrain() {
    this.x = constrain(this.x, 10, 900);
    this.y = constrain(this.y, 10, 900);
  }

  checkCollision() {
    if (!this.eaten) {
      let d = dist(user.x, user.y, this.x, this.y);
      if (d < this.size / 2 + user.size / 2) {
        this.alive = false;
        this.eaten = true;
      }
    }
  }
}
