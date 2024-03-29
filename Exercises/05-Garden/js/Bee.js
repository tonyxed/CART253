class Bee {

  // constructor() sets up our starting properties
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 40;
    this.minSize = 10;
    this.maxSize = 40;
    this.vx = 0;
    this.vy = 0;
    this.speed = 5;
    this.jitteriness = 0.1;
    this.alive = true;
    this.eaten = false;
  }

  // tries to polinate
  tryToPollinate(flower) {
    let d = dist(this.x, this.y, flower.x, flower.y);
    if (d < this.size / 2 + flower.size / 2 + flower.petalThickness) {
      flower.pollinate();
    }
  }
  // bee growth
  grow() {
    this.size = this.size + this.growRate;
    this.size = constrain(this.size, this.minSize, this.maxSize);
  }

  // move() moves the bee by potentially changing direction
  // and then changing position based on velocity
  move() {
    // First check if we should change direction
    let r = random(0, 1);
    if (r < this.jitteriness) {
      this.vx = random(-this.speed, this.speed);
      this.vy = random(-this.speed, this.speed);
    }

    // Update position with velocity to actually move
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;

    // Constrain to the canvas (guess it's a walled garden!)
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }

  // display() draws our bee onto the canvas
  display() {
    if (!this.eaten) {
      push();
      // Wings on either side
      fill(255, 255, 255);
      noStroke();
      ellipse(this.x - this.size / 2, this.y, this.size / 2);
      ellipse(this.x + this.size / 2, this.y, this.size / 2);
      pop();

      // Body
      push();
      fill(225, 225, 50);
      noStroke();
      ellipse(this.x, this.y, this.size);
      pop();

      // Eyes
      push();
      fill(0, 0, 0);
      noStroke();
      ellipse(this.x - this.size / 10, this.y, this.size / 10);
      ellipse(this.x + this.size / 10, this.y, this.size / 10);
      pop();
    }
  }
  // checks overlap between snake and bee
  // if overlapped, and !eaten, then snake eats them
  overLap() {
    if (!this.eaten) {
      let d = dist(this.x, this.y, snake.x, snake.y);
      if (d < this.size / 2 + snake.size / 2) {
        snake.size += snake.eatSize;
        snake.speed + snake.eatSpeed;
        this.alive = false;
        this.eaten = true;
      }
    }
  }
}
