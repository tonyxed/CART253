class Pickup {
  constructor(x, y, vy, size) {
    this.x = x;
    this.y = y;
    this.vy = vy;
    this.r = 20;
    this.size = size;
    this.shot = false;
    this.present = true;
  }
  display() {
      if(!this.shot){
      push();
      fill(255);
      imageMode(CENTER,CENTER);
      image(pickupImg,this.x, this.y, 25, 25);
      pop();
}

}
move(){
  this.y += this.vy;
}

  collision() {
    if(!this.shot){
      for(let i = 0; i <lasers.length; i++){
      let d = dist (this.x, this.y, lasers[i].x, lasers[i].y);
      if (d < this.size/2 + lasers[i].size/2) {
        this.shot = true;
        this.present = false;
        numLasers = numLasers + 5;
        durability = durability + 50;
        pickupSound.setVolume(.1);
        pickupSound.play();
      }
    }
  }
}
}
