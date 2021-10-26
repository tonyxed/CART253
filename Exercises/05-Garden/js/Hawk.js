class Hawk {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 40;
    this.vx = 0,
    this.vy = 0,
    this.speed = 5;
    this.random = 0.1;
  }
  // moves the hawk
  move() {
    let i = random(0, 1);
    if (i < this.random) {
      this.vx = random(-this.speed, this.speed);
      this.vy = random(-this.speed, this.speed);
    }
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;

    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }

  display() {
    //body
    push();
    fill(0, 50, 100);
    ellipse(this.x,this.y,this.size);
    pop();
    push();
    // Wings
    fill(235, 64, 52, 200);
    noStroke();
    ellipse(this.x - this.size / 2, this.y, this.size / 2);
    ellipse(this.x + this.size / 2, this.y, this.size / 2);
    pop();
    //Eyes
    push();
    fill(255);
    noStroke();
    ellipse(this.x - this.size / 10, this.y, this.size / 10);
    ellipse(this.x + this.size / 10, this.y, this.size / 10);
    pop();
  }
  checkOverLap() {
    let d = dist(this.x,this.y, snake.x,snake.y);
    if (d < this.size/2 + snake.size/2){
      state = 'lose';
    }
  }
}
