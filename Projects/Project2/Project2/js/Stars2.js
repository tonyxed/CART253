class Stars2 {
  constructor(x, y){
    this.x = random(0, width);
    this.y = random(0, height);
    this.radius = 1;
    this.speed = 2;
  }

  display(){
    fill(255);
    noStroke();
    ellipse(this.x,this.y, this.radius*2, this.radius*2);
  }
  move(){
    this.y = this.y + this.speed;
    if(this.y > height){
      this.y = 0;
      this.x = random(0, width);
    }
  }
}
