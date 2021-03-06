'use strict'

let Point;
let canvasModule;
let Line;
let expect;
let Axis
let CoordinateAxis;
let ParabolMovement;
let Arrow;
let Physics;
let main;
if (typeof require !== 'undefined') {
  Point = require('../src/point.js').Point;
  Line = require('../src/line.js').Line;
  canvasModule = require('../src/canvas-utility.js').canvasModule;
  expect = require('chai').expect;
  CoordinateAxis = require('../src/coordinate-axis.js').CoordinateAxis;
  Axis = require('../src/axis.js').Axis;
  ParabolMovement = require('../src/parabol-movement.js').ParabolMovement;
  Physics = require('../src/physics.js').Physics;
  Arrow = require('../src/arrow.js').Arrow;
  main = require('../src/index.js').main;
} else {
  Point = window.Point;
  Line = window.Line;
  canvasModule = window.canvasModule;
  expect = chai.expect;
  Axis = window.Axis;
  Arrow = window.Arrow;
  CoordinateAxis = window.CoordinateAxis;
  ParabolMovement = window.ParabolMovement;
  Physics = window.Physics;
  main = window.main;
}

describe('canvasModule', () => {
  it('Should have a method to clear a canvas', () => {
    expect(canvasModule.clearScreen).to.be.a('function');
  });
  it('Should have a method to fix the DPI of a canvas', () => {
    expect(canvasModule.fixDpi).to.be.a('function');
  });
});

describe('index.js', () => {
  it('Should have a method to convert grades to radiants', () => {
    expect(main.calculateRadians).to.be.a('function');
  });
  it('Should return the correct angle in radiants', () => {
    expect(main.calculateRadians(45)).to.be.eql(Math.PI / 4);
  });
});

describe('Class Point', () => {
  it('Should exist', () => {
    expect(Point).to.be.a('function');
  });
  context('Point functionality', () => {
    const tempPoint = new Point(0, 1);
    it('Should have a X coordinate', () => {
      expect(tempPoint.x).to.be.a('number');
    });
    it('Should have a Y coordinate', () => {
      expect(tempPoint.x).to.be.a('number');
    });
    it('Should return the correct X', () => {
      expect(tempPoint.x).to.be.equal(0);
    });
    it('Should return the correct Y', () => {
      expect(tempPoint.y).to.be.equal(1);
    });
    it('Should be able to to modify the X', () => {
      const expectedPoint = new Point(0, 0);
      expectedPoint.x = 1;
      expect(expectedPoint.x).to.be.equal(1);
    });
    it('Should be able to to modify the y', () => {
      const expectedPoint = new Point(0, 0);
      expectedPoint.y = 1;
      expect(expectedPoint.y).to.be.equal(1);
    });
  });
});

describe('Class Line', () => {
  it('Should exist', () => {
    expect(Line).to.be.a('function');
  });
  context('Line functionality', () => {
    const tempLine = new Line(new Point(0, 0), new Point(4, 4));
    it('Should have a initial Point', () => {
      expect(tempLine.initialPoint).to.be.a('object');
    });
    it('Should have a final Point', () => {
      expect(tempLine.finalPoint).to.be.a('object');
    });
    it('Should return the correct initial Point', () => {
      expect(tempLine.initialPoint.x).to.be.equal(0);
      expect(tempLine.initialPoint.y).to.be.equal(0);
    });
    it('Should return the correct final Point', () => {
      expect(tempLine.finalPoint.x).to.be.equal(4);
      expect(tempLine.finalPoint.y).to.be.equal(4);
    });
    it('Should be able to modify the initial Point', () => {
      const expectedLine = new Line(new Point(0, 0), new Point(4, 4));
      expectedLine.initialPoint = new Point(0, 4);
      expect(expectedLine.initialPoint.x).to.be.equal(0);
      expect(expectedLine.initialPoint.y).to.be.equal(4);
    });
    it('Should be able to modify the final Point', () => {
      const expectedLine = new Line(new Point(0, 0), new Point(4, 4));
      expectedLine.finalPoint = new Point(4, 4);
      expect(expectedLine.finalPoint.x).to.be.equal(4);
      expect(expectedLine.finalPoint.y).to.be.equal(4);
    });
    it('Should return the correct length', () => {
      expect(tempLine.length()).to.be.equal(4);
    });
    it('Should calculate the distance between a point and the line', () => {
      const tempPoint = new Point(0, 1);
      expect(tempLine.distanceToLine(tempPoint)).to.be.equal(0.707);
    });
  });
});

describe('Class Axis', () => {
  it('Should exist', () => {
    expect(Axis).to.be.a('function');
  });
  context('Axis functionality', () => {
    let tempAxis;
    beforeEach(() => {
      tempAxis = new Axis(Axis.X_TYPE, 100, 2);
    });
    it('Should have return the type', () => {
      expect(tempAxis.type).to.be.eql(Axis.X_TYPE);
    });
    it('Should have return the length', () => {
      expect(tempAxis.length).to.be.eql(100);
    });
    it('Should have return the factor', () => {
      expect(tempAxis.factor).to.be.eql(2);
    });
    it('Type should be adjustable', () => {
      tempAxis.type = Axis.Y_TYPE;
      expect(tempAxis.type).to.be.eql(Axis.Y_TYPE);
    });
    it('Length should be adjustable ', () => {
      tempAxis.length = 200;
      expect(tempAxis.length).to.be.eql(200);
    });
    it('Factor should be adjustable', () => {
      tempAxis.factor = 3;
      expect(tempAxis.factor).to.be.eql(3);
    });
    it('Should have a method to draw the axis', () => {
      expect(tempAxis.draw).to.be.a('function');
    });
    it('Should have a method to draw the numbers of the axis', () => {
      expect(tempAxis._drawNumbers).to.be.a('function');
    });
    it('Should have a method to draw the small lines of the axis', () => {
      expect(tempAxis._drawSmallLines).to.be.a('function');
    });
  });
});

describe('Class CoordinateAxis', () => {
  it('Should exist', () => {
    expect(CoordinateAxis).to.be.a('function');
  });
  context('CoordinateAxis functionality', () => {
    let tempAxis;
    beforeEach(() => {
      tempAxis = new CoordinateAxis(3, 2);
    });
    it('Should have a factor related to X axis', () => {
      expect(tempAxis.xFactor).to.be.a('number');
    });
    it('Should have a factor related to Y axis', () => {
      expect(tempAxis.yFactor).to.be.a('number');
    });
    it('Should return xFactor', () => {
      expect(tempAxis.xFactor).to.be.eql(3);
    });
    it('Should return yFactor', () => {
      expect(tempAxis.yFactor).to.be.eql(2);
    });
    it('Should be possible to set xFactor', () => {
      tempAxis.xFactor = 4;
      expect(tempAxis.xFactor).to.be.eql(4);
    });
    it('Should be possible to set yFactor', () => {
      tempAxis.yFactor = 1;
      expect(tempAxis.yFactor).to.be.eql(1);
    });
    it('Should have a method to draw the axis', () => {
      expect(tempAxis.draw).to.be.a('function');
    });
    it('Should be able to set the axis data', () => {
      tempAxis.setAxisData(27, 9);
      expect(tempAxis.initialPoint).to.be.eql(new Point(1.5, 8.5));
      expect(tempAxis.xLength).to.be.eql(24);
      expect(tempAxis.yLength).to.be.eql(8);
    });
  });
});

describe('Class parabol movement', () => {
  it('Should exist', () => {
    expect(ParabolMovement).to.be.a('function');
  });
  context('ParabolMovement functionality', () => {
    let tempMovement;
    beforeEach(() => {
      tempMovement = new ParabolMovement(Math.PI / 4, 10, 10);
    });
    it('Should have an angle', () => {
      expect(tempMovement.angle).not.to.be.a('undefined');
    });
    it('Should have an initial speed', () => {
      expect(tempMovement.initialSpeed).not.to.be.a('undefined');
    });
    it('Should have an initial height', () => {
      expect(tempMovement.initialHeight).not.to.be.a('undefined');
    });
    it('Should return the x axis speed', () => {
      expect(tempMovement.xSpeed).to.be.eql(Math.sqrt(2) * 5);
    });
    it('Should return the y axis speed', () => {
      expect(tempMovement.ySpeed).to.be.eql(-98 + 5 * Math.sqrt(2));
    });
    it('Should return the x axis position', () => {
      expect(tempMovement.xPosition).to.be.eql(50 * Math.sqrt(2));
    });
    it('Should return the y axis position', () => {
      expect(tempMovement.yPosition).to.be.eql(0);
    });
    it('Should have the max flight time', () => {
      expect(tempMovement.flightTime).to.be.eql(1.44308);
    });
    it('Should have the max X distance', () => {
      expect(tempMovement.maxDistance).to.be.eql(10.20411653794683);
    });
    it('Should return the max height', () => {
      expect(tempMovement.maxHeight).to.be.eql((Math.pow(10, 2) *
        Math.pow(Math.sin(Math.PI / 4), 2)) / (2 * 9.8));
    });
    it('Should be able to set angle', () => {
      tempMovement.angle = 10;
      expect(tempMovement.angle).to.be.eql(10);
    });
    it('Should be able to set initialSpeed', () => {
      tempMovement.initialSpeed = 10;
      expect(tempMovement.initialSpeed).to.be.eql(10);
    });
    it('Should be able to set initialHeight', () => {
      tempMovement.initialHeight = 10;
      expect(tempMovement.initialHeight).to.be.eql(10);
    });
  });
});

describe('Class Physics', () => {
  it('Should exists', () => {
    expect(Physics).to.be.a('function');
  });
  context('Physics functionality', () => {
    let tempPhysics;
    let tempMovement;
    beforeEach(() => {
      tempMovement = new ParabolMovement(Math.PI / 4, 10, 10);
      tempPhysics = new Physics(tempMovement);
    });
    it('Should be able to return the parabolMovement', () => {
      expect(tempPhysics.parabolMovement).to.be.eql(tempMovement);
    });
    it('Should be able to modify the parabolMovement', () => {
      tempMovement = new ParabolMovement(Math.PI / 3, 20, 3);
      tempPhysics.parabolMovement = tempMovement;
      expect(tempPhysics.parabolMovement).to.be.eql(tempMovement);
    });
    it('Should have a method to represent a movement on a canvas', () => {
      expect(tempPhysics.represent).to.be.a('function');
    });
  });
});

describe('Class Arrow', () => {
  it('Should exists', () => {
    expect(Arrow).to.be.a('function');
  });
  const ARROW = new Arrow(1, 1);
  context('Physics functionality', () => {
    it('Should have a initialPoint', () => {
      expect(ARROW).to.have.a.property('_initialPoint');
    });
    it('Should have a length', () => {
      expect(ARROW).to.have.a.property('_length');
    });
    it('Should have a method to draw the arrow', () => {
      ARROW.initialPoint = 2;
      ARROW.length = 3;
      expect(ARROW).to.have.a.property('draw');
    }); 
  });
});
