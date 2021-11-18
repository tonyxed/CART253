class Laser {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.size = 20;
  }
  display() {
    noStroke();
    fill(50, 0, 200);
    ellipse(this.x, this.y, this.size);
  }
  move() {
    this.y = this.y - 6;
  }
  collision(){
    let d = dist(this.x, this.y, pick.x, pick.y);
    if (d < this.size / 2 + pick.size / 2) {
      console.log("PICKEDUP");
  }
}
}
