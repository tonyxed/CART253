class Rock1 {
  constructor(x, y, w, h, vx, vy, angle, radius, size) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.vx = vx;
    this.vy = vy;
    this.angle = angle;
    this.radius = radius;
    this.size = size;
    this.speed = 0.01;
    this.centerX = 450;
    this.centerY = 450;
    this.color = {
      r: 138,
      g: 179,
      b: 186,
    }
    this.destroyed = false;
    this.alive = true;
  }
  //moves the rock
  movement() {
    this.y += this.vy;
    this.x += this.vx;
  }
  //displays the rock
  display() {
    if (!this.destroyed) {
      push();
      ellipseMode(CENTER);
      fill(this.color.r, this.color.g, this.color.b);
      imageMode(CENTER, CENTER);
      image(meteor1Img, this.x, this.y, 40, 40);
      pop();
    }
  }
  offScreen() {
    if (this.x > width) {
      this.x = 0;
      this.y = random(50, 820);
      this.vx = this.vx + .1;
    }
  }
  collision() {
    let d = dist(user.x, user.y, this.x, this.y);
    if (d < this.size / 2 + user.size / 2) {
      this.color.r = 255;
      score = score - 1;
      durability = durability - 1;
    }
    if (durability === 0) {
      state = "durabilityLose";
    }
  }
  collisionLaser() {
    if (!this.destroyed) {
      for (let i = 0; i < lasers.length; i++) {
        let d = dist(this.x, this.y, lasers[i].x, lasers[i].y);
        if (d < this.size / 2 + lasers[i].size / 2) {
          if (d < this.size / 2 + lasers[i].size / 2) {
            this.destroyed = true;
            this.alive = false;
            debrisLaser.setVolume(0.1);
            debrisLaser.play();
          }
        }
      }
    }
  }
}
