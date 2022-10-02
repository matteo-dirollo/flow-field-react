import React from 'react';
import Sketch from 'react-p5';
import Particle from './particle';

const FlowField = props => {
  var inc = 0.1;
  var scl = 10;
  var cols, rows;

  var zoff = 0;

  var particles = [];

  var flowfield;

  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    p5.createCanvas(400, 400).parent(canvasParentRef);
    // p5.pixelDensity(1);
    p5.background(0);

    cols = p5.floor(p5.width / scl);
    rows = p5.floor(p5.height / scl);

    flowfield = new Array(cols * rows);
    for (var i = 0; i < 1600; i++) {
      particles[i] = new Particle(p5, cols, rows);
    }
  };

  const draw = p5 => {
    p5.stroke(255, 50);
    p5.noFill();
    var yoff = 0;
    for (var y = 0; y < rows; y++) {
      var xoff = 0;
      for (var x = 0; x < cols; x++) {
        var index = x + y * cols;
        var angle = p5.noise(xoff, yoff, zoff) * p5.TWO_PI * 4;
        var v = p5.constructor.Vector.fromAngle(angle);
        v.setMag(1);
        flowfield[index] = v;
        xoff += inc;
        p5.stroke(255, 50);
      }
      yoff += inc;
      zoff += 0.0001;
    }
    for (var i = 0; i < particles.length; i++) {
      particles[i].follow(p5, flowfield);
      particles[i].update(p5);
      particles[i].edges(p5);
      particles[i].show(p5);
    }
    p5.redraw();
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default FlowField;
