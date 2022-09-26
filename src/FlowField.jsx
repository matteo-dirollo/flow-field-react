import React from 'react';
import Sketch from 'react-p5';
import Particle from './particle';

const FlowField = props => {
  let inc = 0.01;
  let scl = 20;
  let cols, rows;

  let zoff = 0;

  let particles = [];

  let flowfield;

  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    p5.createCanvas(500, 500).parent(canvasParentRef);
    p5.background(0);
    cols = p5.floor(p5.width / scl);
    rows = p5.floor(p5.height / scl);

    flowfield = new Array(cols * rows);
    for (let i = 0; i < 500; i++) {
      particles[i] = new Particle(p5, cols, rows);
    }
  };

  const draw = p5 => {
    p5.stroke(0);
    p5.noFill();
    let yoff = 0;
    for (let y = 0; y < rows; y++) {
      let xoff = 0;
      for (let x = 0; x < cols; x++) {
        let index = x + y * cols;
        let angle = p5.noise(xoff, yoff, zoff) * p5.TWO_PI * 4;
        let v = p5.constructor.Vector.fromAngle(angle);
        v.setMag(1);
        flowfield[index] = v;
        xoff += inc;
        p5.stroke(0, 50);
      }
      yoff += inc;
      zoff += 0.0001;
    }
    for (let i = 0; i < particles.length; i++) {
      particles[i].follow(p5,flowfield);
      particles[i].update(p5);
      particles[i].edges(p5);
      particles[i].show(p5);
    }
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default FlowField;
