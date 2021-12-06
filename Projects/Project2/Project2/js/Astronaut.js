class Astronaut {
  constructor(x, y, size, vy, vx) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.vy = vy;
    this.vx = vx;
    this.float = .5;
    this.color = {
      r: 145,
      g: 255,
      b: 0,
    };
    this.alive = true;
    this.saved = false;
  }
  //display level1
  display() {
    if (!this.saved) {
      push();
      noStroke();
      fill(this.color.r, this.color.g, this.color.b);
      imageMode(CENTER);
      image(astronautImg, this.x, this.y, 40, 40);
      pop();
    }
  }
  //display level2
  display1() {
    if (!this.alive) {
      push();
      noStroke();
      fill(this.color.r, this.color.g, this.color.b);
      imageMode(CENTER);
      image(astronautImg, this.x, this.y, 30, 30);
      pop();
    }
  }
  //move level1
  move() {
    this.y = this.y + this.vy;
    this.x = this.x + this.vx;
  }
  //move level1
  move1() {
    this.y = this.y + this.vy;
  }
  //checks off screen
  offScreen1() {
    let vy = random(1, 3);
    if (this.y > height) {
      this.x = random(0, 900);
      this.y = 0;
      this.vx = vy;
    }
  }
  //floating movement
  floating() {
    let r = random();
    if (r < this.float) {
      this.vx = random(-.4, .4);
    }
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
  // checks collision between rock1 and this class
  collisionRock1() {
    if (!this.saved) {
      for (let i = 0; i < debris.rocks1.length; i++) {
        let d = dist(debris.rocks1[i].x, debris.rocks1[i].y, this.x, this.y);
        if (d < this.size / 2 + debris.rocks1[i].size / 2) {
          this.alive = false;
          this.saved = false;
        }
      }
    }

  }
}
