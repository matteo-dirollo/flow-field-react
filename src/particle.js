export default function Particle(p5, scl, cols) {
  this.pos = p5.createVector(p5.random(p5.width), p5.random(p5.height));
  this.vel = p5.createVector(0, 0);
  this.acc = p5.createVector(0, 0);
  this.maxspeed = 5;
  this.h = 0;

  this.prevPos = this.pos.copy();

  this.update = function (p5) {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  };

  this.follow = function (p5, vectors) {
    var x = p5.floor(this.pos.x / scl);
    var y = p5.floor(this.pos.y / scl);
    var index = x + y * cols;
    var force = vectors[index];
    this.applyForce(p5, force);
  };

  this.applyForce = function (p5, force) {
    this.acc.add(force);
  };

  this.show = function (p5) {
    p5.stroke(255, 4);
    p5.strokeWeight(0.6);
    p5.line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    this.updatePrev();
  };

  this.updatePrev = function (p5) {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  };
  this.edges = function (p5) {
    if (this.pos.x > p5.width) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if (this.pos.x < 0) {
      this.pos.x = p5.width;
      this.updatePrev();
    }
    if (this.pos.y > p5.height) {
      this.pos.y = 0;
      this.updatePrev();
    }
    if (this.pos.y < 0) {
      this.pos.y = p5.height;
      this.updatePrev();
    }
  };
}
