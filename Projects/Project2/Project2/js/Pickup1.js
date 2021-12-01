class Pickup1 {
  constructor(x, y, vy, vx, size) {
    this.x = x;
    this.y = y;
    this.vy = vy;
    this.vx = vx;
    this.r = 20;
    this.size = size;
    this.float = 0.2;
    this.shot = false;
    this.present = true;
  }
  //displays the pickups1
  display() {
    if (!this.shot) {
      push();
      fill(255);
      imageMode(CENTER, CENTER);
      image(speedImg, this.x, this.y, 35, 35);
      pop();
    }
  }
  //moving
  move() {
    this.y += this.vy;
    this.x += this.vx;
  }
  floating() {
    let r = random();
    if (r < this.float) {
      this.vx = random(-.6, .6);
    }
  }
  //checks the collision between lasers in the array and this class
  collision() {
    if (!this.shot) {
      for (let i = 0; i < lasers.length; i++) {
        let d = dist(this.x, this.y, lasers[i].x, lasers[i].y);
        if (d < this.size / 2 + lasers[i].size / 2) {
          this.shot = true;
          this.present = false;
          user.speed = user.speed + user.boost;
          user.speed = constrain(user.speed, 4, 6);
          speedSound.setVolume(.1);
          speedSound.play();
        }
      }
    }
  }
}
