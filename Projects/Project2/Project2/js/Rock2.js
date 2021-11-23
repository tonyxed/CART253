class Rock2 {
  constructor(x, y, w, h, vy, vx, size) {
    this.x = x;
    this.y = y;
    this.w = w; //width
    this.h = h; //height
    this.size = size;
    this.vy = vy;
    this.vx = vx;
    this.r = .05;
    this.color = {
      r: 138,
      g: 202,
      b: 214,
    };
    this.alive = true;
    this.destroyed = false;
  }
  //displays the rocks
  display() {
    if (!this.destroyed) {
      push();
      ellipseMode(CENTER);
      noStroke();
      fill(this.color.r, this.color.g, this.color.b);
      imageMode(CENTER, CENTER);
      image(meteorImg, this.x, this.y, 30, 30);
      pop();
    }
  }

  // movement
  movement() {
    this.y += this.vy;
    this.x += this.vx;
  }
  randomness(){
    let r = random();
    if (r < this.r){
      this.vx = random(-.1,.1);
    }
  }
  //checks if this class is offScreen
  offScreen() {
    let w = random(60, 110);
    let red = random(104, 138);
    let blue = random(137, 205);
    let green = random(143, 220);
    if (this.y > height) {
      this.x = random(0, 900);
      this.y = 0;
      this.w = w;
      this.color.r = red;
      this.color.g = green;
      this.color.b = blue;
      this.vy = this.vy + .1;
    }
  }
  //checks the collision between this class and the user
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
  // checks if the lasers in the array are overlapping with this class
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
