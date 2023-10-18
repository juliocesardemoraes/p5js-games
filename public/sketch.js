let snakeObject = null;
let food = null;
let defaultVelocity = 1;
const scale = 20;
let lastButtonPressed = "";
let endGame = false;

function setup() {
  createCanvas(600, 600);
  snakeObject = new Snake();
  food = new Food();
  frameRate(60);
}

function draw() {
  if (!endGame) {
    background(165, 220, 56);
    fill(165, 220, 56);
    rect(50, 50, 500, 500);

    snakeObject.show();
    snakeObject.update();
    food.show();

    frameRate(30);
    text("word", 10, 60);

    if (snakeObject.eat(food.x, food.y)) {
      food = new Food();
    }
  }
  if (snakeObject.death()) {
    background("black");
    endGame = true;
  }
}

function keyPressed() {
  if (lastButtonPressed === keyCode) return;

  if (keyCode === UP_ARROW) {
    snakeObject.dir(0, -defaultVelocity, "up");
    lastButtonPressed = keyCode;
  }
  if (keyCode === DOWN_ARROW) {
    snakeObject.dir(0, defaultVelocity, "down");
    lastButtonPressed = keyCode;
  }
  if (keyCode === RIGHT_ARROW) {
    snakeObject.dir(defaultVelocity, 0, "right");
    lastButtonPressed = keyCode;
  }
  if (keyCode === LEFT_ARROW) {
    snakeObject.dir(-defaultVelocity, 0, "left");
    lastButtonPressed = keyCode;
  }
}

function Snake() {
  this.x = 300;
  this.y = 300;
  this.xspeed = defaultVelocity;
  this.yspeed = 0;
  this.tail = [];
  this.counter = 0;
  this.total = 0;

  this.dir = function (x, y, dir) {
    if (dir === "left" && this.xspeed > 0) return;
    if (dir === "right" && this.xspeed < 0) return;
    if (dir === "up" && this.yspeed > 0) return;
    if (dir === "down" && this.yspeed < 0) return;

    this.yspeed = y;
    this.xspeed = x;
  };

  this.eat = function (x, y) {
    const distance = dist(this.x, this.y, x, y);

    if (distance < 25) {
      this.total++;
      defaultVelocity += 0.1;
      return true;
    }
  };

  this.update = function () {
    if (this.total === this.tail.length) {
      for (let i = 0; i < this.tail.length - 1; i++) {
        this.tail[i] = this.tail[i + 1];
      }
    }
    this.tail[this.total - 1] = createVector(this.x, this.y);

    this.x = this.x + this.xspeed * (scale / 2);
    this.y = this.y + this.yspeed * (scale / 2);
  };

  this.show = function () {
    fill(39, 48, 31);
    for (let i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, scale, scale);
    }
    fill(39, 48, 31);
    rect(this.x, this.y, scale, scale);
  };

  this.death = function () {
    for (let i = 0; i < this.tail.length; i++) {
      if (this.x === this.tail[i].x && this.y === this.tail[i].y) {
        return true;
      }
    }

    if (this.x < 30 || this.x > 550 || this.y < 30 || this.y > 550) {
      return true;
    }
  };
}

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

function Food() {
  const cols = 600 / scale; //30
  const rows = 600 / scale;

  this.x = clamp(floor(random(scale, rows * scale - scale)), 70, 480);
  this.y = clamp(floor(random(scale, cols * scale - scale)), 70, 480);

  this.show = function () {
    fill("red");
    rect(this.x, this.y, scale, scale);
  };
}
