class Motor {
  constructor({ctx, ancestor = null,x_, y_, r_, n, p}) {
    this.ctx = ctx;
    this.ancestor = ancestor;
    this.targetx = 0;
    this.targety = 0;
    this.radius = 100;
    this.color = "black";
    this.shouldDraw = false;
    this.tint = 50;
    this.points = [];
    this.x = x_;
    this.y = y_;
    this.r = r_;
    var k = -4;
    this.n = 1;
    this.parent = p;
    this.child = null;
    this.speed = radians(pow(k, n - 1)) / resolution;
    this.angle = -PI / 2;
  }


  addChild() {
    var newr = this.r / 3.0;
    var newx = this.x + this.r + newr;
    var newy = this.y;
    this.child = new Motor(newx, newy, newr, n + 1, this);
    return this.child;
    
  }

  update() {
    var parent = this.parent;
    if (parent != null) {
      this.angle += this.speed;
      var rsum = this.r + parent.r;
      this.x = parent.x + rsum * cos(this.angle);
      this.y = parent.y + rsum * sin(this.angle);
    }

    this.targetx =
      this.ancestor.targetx +
      Math.cos((this.angle * Math.PI) / 180) * this.radius;
    this.targety =
      this.ancestor.targety +
      Math.sin((this.angle * Math.PI) / 180) * this.radius;
    this.angle += this.speed;

    if (this.log) {
      console.log(this.points.length);
    }

    if (this.shouldDraw) {
      this.points.push({ x: this.targetx, y: this.targety });
      //   if (Math.abs(this.angle) >= this.max) {
      if (this.points.length >= 480) {
        this.points.shift();
        // this.angle = 0;
      }
    }
  }
  draw() {
    this.ctx.lineWidth = 15;
    this.ctx.strokeStyle = this.color;
    this.points.forEach((item, index) => {
      if (index == 0) {
        this.ctx.beginPath();
        this.ctx.moveTo(item.x, item.y);
      } else {
        this.ctx.lineTo(item.x, item.y);
      }
    });
    this.ctx.stroke();
    this.ctx.closePath();

    
  }

  map(x, in_min, in_max, out_min, out_max) {
    return ((x - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
  }
}

module.exports = { Motor };
