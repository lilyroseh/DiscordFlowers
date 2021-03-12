const Flower1 = require("./js/Flower.js").Flower;
const Motor1 = require("./js/Motor.js").Motor;

var path = [];

var angle = 0;
var resolution = 50;

var sun;
var end;

var sliderD;
var sliderN;
var flowers = [];

function setup() {
  createCanvas(600, 600);

  sliderD = createSlider(1, 20, 5, 1);
  sliderN = createSlider(1, 20, 10, 1);
  sliderD.input(draw);
  sliderN.input(draw);

  sun = new Motor1(width / 2, height / 2, width / 4, 0);
  var next = sun;
  for (var i = 0; i < 10; i++) {
    next = next.addChild();
  }
  end = next;
}

function draw() {
  
  var d = sliderD.value();
  var n = sliderN.value();

  push();
  translate(width / 2, height / 2);
  stroke(255);
  noFill();
  strokeWeight(1);
  for (let flower of flowers) {
    flower.animate(0.01);
  }
  pop();    

  for (var i = 0; i < resolution; i++) {
    var next = sun;
    while (next != null) {
      next.update();
      next = next.child;
    }
    path.push(createVector(end.x, end.y));
  }

  var next = sun;
  while (next != null) {
    next.show();
    next = next.child;
  }

  beginShape();
  stroke(255, 0, 255);
  noFill();
  for (var pos of path) {
    vertex(pos.x, pos.y);
  }
  endShape();
}

function mousePressed() {
    flowers.push(new Flower1({
      x: random(width),
      y: random(height),
      d: sliderD.value(),  
      n: sliderN.value(),
      radius: random(100, 200),
    }))
  }