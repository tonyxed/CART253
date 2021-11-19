class Astronaut {
  constructor(x, y, size, vy) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.vy = vy;
    this.color = {
      r: 145,
      g: 255,
      b: 0,
    };
    this.alive = true;
    this.saved = false;
  }

  display() {
    if (!this.saved) {
      push();
      noStroke();
      fill(this.color.r, this.color.g, this.color.b);
      ellipse(this.x, this.y, this.size);
      pop();
    }
  }

  move() {
    this.y = this.y + this.vy;

  }
  
  checkCollision() {
    if (!this.saved) {
      let d = dist(user.x, user.y, this.x, this.y);
      if (d < this.size / 2 + user.size / 2) {
        score = score + 500;
        this.alive = false;
        this.saved = true;
      }
    }
  }

}
