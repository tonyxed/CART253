class Laser {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 10;
    this.size = 20;
  }
  //displays the laser
  display() {
    noStroke();
    fill(50, 0, 200);
    imageMode(CENTER);
    image(laserImg, this.x, this.y, 40, 40);

  }
  //moves the laser
  move() {
    this.y = this.y - 6;
  }
  // if lasers at 0 then --->
  lasersAtZero() {
    if (numLasers < 0) {
      state = 'lose';
      loseSound.setVolume(.05);
      loseSound.play();
    }
  }
}
