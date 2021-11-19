class Pickup {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.r = 20;
    this.size = size;
    this.shot = false;
    this.present = true;
  }
  display() {
      if(!this.shot){
        push();
      fill(255);
      ellipse(this.x, this.y, this.size);
      pop();
}
  }
  collision() {
    if(!this.shot){
      for(let i = 0; i <lasers.length; i++){
      let d = dist (this.x, this.y, lasers[i].x, lasers[i].y);
      if (d < this.size/2 + lasers[i].size/2) {
        push();
        textAlign(CENTER,CENTER);
        textSize(20);
        fill(255);
        text("You've picked up an extra 5 lasers!", 450, 500);
        pop();
        this.shot = true;
        this.present = false;
        numLasers = numLasers + 5;
      }
    }
  }
}
}
