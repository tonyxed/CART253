class Slow {
  constructor(x, y,vy,size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.vy = vy;
    this.color = {
      r: random(100),
      g: random(0,100),
      b: random(70, 255),
    };
  }
  movement() {
    this.y += this.vy;
  }

  offScreen(){
    if(this.y > height){
      location.reload();
    }
  }

  display() {
    push();
    ellipseMode(CENTER);
    stroke(1000);
    fill(this.color.r, this.color.g, this.color.b);
    ellipse(this.x, this.y,this.size);
    pop();
  }
}
