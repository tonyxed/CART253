class Laser {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.r = 10;
    this.size = 20;
  }
  display() {
    noStroke();
    fill(50, 0, 200);
    imageMode(CENTER);
    image(laserImg, this.x, this.y, 40, 40);

  }
  move() {
    this.y = this.y - 6;
  }
  lasersAtZero(){
    if (numLasers === 0){
      state = 'lose';
      loseSound.setVolume(.05);
      loseSound.play();
    }
  }
}
