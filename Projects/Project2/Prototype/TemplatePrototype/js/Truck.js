class Truck {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = 2;
    this.vy = 0;
    this.width = w;
    this.height = h;
    this.speed = 5;
    this.size = 20;
  }
  color = {
    r = 255,
    g = 0,
    b = 255,
  };

  move() {
    this.x = this.x - this.vx;
    this.y = this.y - this.vy;
  }
  offScreen(){
    if (this.x > width){
      this.x += width;
    }
  }

  display(){
    push();
    fill(this.r, this.g, this.b);
    rectMode(CENTER);
    rect(this.x,this.y,this.width,this.height);
    pop();
  }
}
