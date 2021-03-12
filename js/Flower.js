class Flower {
  constructor({x, y, d, n, radius}) {
    this.child = null;
    this.d = d;
    this.n = n;
    this.radius = radius;
    this.a = 0;
    this.x = x;
    this.y = y;
    this.progress = 0;
    this.compute(d, n, radius);
  }

  compute(d,n, radius) {
    this.points = [];
    let k = n / d;
    let total = TWO_PI * this.reduceDenominator(n, d);
    for (let a = 0; a < total; a += 0.02) {
      var r = radius * cos(k * a);
      var x = r * cos(a);
      var y = r * sin(a);
      this.points.push({x, y});
    }
  }
  
  
  show(progress = 1) { // 0 to 1
    
    progress = constrain(progress, 0, 1);
    const amountOfPoints = floor(this.points.length * progress);
    
    
    push();
    
    //beginshape? endshape? vertex
    translate(this.x, this.y);
    for(let i = 0; i < amountOfPoints; i++) {
      const point = this.points[i];
      ellipse(point.x, point.y, 2);
    }
    pop();
  }
  
  animate(speed = 0.01) {
    this.progress +=speed;
    this.show(this.progress);
  }


  reduceDenominator(numerator, denominator) {
    function rec(a, b) {
      return b ? rec(b, a % b) : a;
    }
    return denominator / rec(numerator, denominator);
  }
}
module.exports = { Flower };