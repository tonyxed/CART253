class Rock2 {
  constructor(x, y, w, h, vy,size) {
    this.x = x;
    this.y = y;
    this.w = w; //width
    this.h = h; //height
    this.size = size;
    this.vy = vy;
    this.color = {
      r: 138,
      g: 202,
      b: 214,
    };
    this.alive = true;
    this.destroyed = false;
  }

  movement() {
    this.y += this.vy;
  }

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
      this.vy = this.vy + .2;
    }
  }
  collision() {
    let d = dist(user.x, user.y, this.x, this.y);
    if (d < this.size / 2 + user.size / 2) {
    this.color.r = 255;
    score = score - 1;
    durability = durability - 1;
    }
    if(durability === 0){
      state = "durabilityLose";
    }
  }
    collisionLaser(){
      if(!this.destroyed){
        for(let i = 0; i <lasers.length; i++){
        let d = dist (this.x, this.y, lasers[i].x, lasers[i].y);
        if (d < this.size/2 + lasers[i].size/2) {
          if (d < this.size/2 + lasers[i].size/2) {
            this.destroyed = true;
            this.alive = false;
            debrisLaser.setVolume(0.1);
            debrisLaser.play();
      }
        }
      }
      }
    }

  display() {
    if(!this.destroyed) {
    push();
    ellipseMode(CENTER);
    noStroke();
    fill(this.color.r, this.color.g, this.color.b);
    imageMode(CENTER,CENTER);
    image(meteorImg,this.x,this.y, 30, 30);
    pop();
  }
  }

}
