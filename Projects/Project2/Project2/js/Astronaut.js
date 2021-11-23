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
  //displays
  display() {
    if (!this.saved) {
      push();
      noStroke();
      fill(this.color.r, this.color.g, this.color.b);
      imageMode(CENTER);
      image(astronautImg, this.x, this.y, 30, 30);
      pop();
    }
  }
  //moves
  move() {
    this.y = this.y + this.vy;

  }
  // checks off screen
  offScreen() {
    let vy = random(1, 3);
    if (this.y > height) {
      this.x = random(0, 900);
      this.y = 0;
      this.vx = vy;
    }
  }
  // checks collision with user and this class
  checkCollision() {
    if (!this.saved) {
      let d = dist(user.x, user.y, this.x, this.y);
      if (d < this.size / 2 + user.size / 2) {
        score = score + 500;
        this.alive = false;
        this.saved = true;
        savedSound.setVolume(.1);
        savedSound.play();
      }
    }
  }
}
