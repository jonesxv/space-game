
class Ship {
  constructor(args) {
    this.position = args.position
    this.velocity = {
      x: 0,
      y: 0
    }
    this.speed = 0.15;
    this.inertia = 0.99;
    this.lastShot = 0;
    this.create = args.create;
    this.onDie = args.onDie;
  }

  // rotate(dir){
  //   if (dir == 'LEFT') {
  //     this.rotation -= this.rotationSpeed;
  //   }
  //   if (dir == 'RIGHT') {
  //     this.rotation += this.rotationSpeed;
  //   }
  // }

  up(val){
    this.velocity.y -= this.speed;

    // Thruster particles
    // let posDelta = rotatePoint({x:0, y:-10}, {x:0,y:0}, (this.rotation-180) * Math.PI / 180);
    // const particle = new Particle({
    //   lifeSpan: randomNumBetween(20, 40),
    //   size: randomNumBetween(1, 3),
    //   position: {
    //     x: this.position.x + posDelta.x + randomNumBetween(-2, 2),
    //     y: this.position.y + posDelta.y + randomNumBetween(-2, 2)
    //   },
    //   velocity: {
    //     x: posDelta.x / randomNumBetween(3, 5),
    //     y: posDelta.y / randomNumBetween(3, 5)
    //   }
    // });
    // this.create(particle, 'particles');
  }

  left(val) {
    this.velocity.x -= this.speed;
  }

  right(val) {
    this.velocity.x += this.speed;
  }

  down(val) {
    this.velocity.y += this.speed;
  }

  render(state){

    if (state.keys.up) {
      this.up(1);
    }
    if (state.keys.left) {
      this.left(1);
    }
    if(state.keys.right) {
      this.right(1);
    }
    if (state.keys.down) {
      this.down(1);
    }

    if(state.keys.space && Date.now() - this.lastShot > 300){
      // const bullet = new Bullet({ship: this});
      // this.create(bullet, 'bullets');
      this.lastShot = Date.now();
    }

    // Move
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.velocity.x *= this.inertia;
    this.velocity.y *= this.inertia;

    // Screen edges
    if((this.position.x + 19) > state.screen.width) {
      this.position.x = state.screen.width - 19;
      // bounce
      this.left(1)
      this.left(1)
      this.left(1)
      this.left(1)
      this.left(1)
    }
    else if(this.position.x < 19) {
      this.position.x = 19;
      this.right(1)
      this.right(1)
      this.right(1)
      this.right(1)
      this.right(1)
    }
    if((this.position.y + 19) > state.screen.height) {
      this.position.y = state.screen.height - 19;
      this.up(1)
      this.up(1)
      this.up(1)
      this.up(1)
      this.up(1)
    }
    else if(this.position.y < 19) {
      this.position.y = 19;
      this.down(1)
      this.down(1)
      this.down(1)
      this.down(1)
      this.down(1)
    }

    // Draw
    const ctx = state.ctx;
    ctx.save();
    ctx.translate(this.position.x, this.position.y);
    // ctx.rotate(this.rotation * Math.PI / 180);
    ctx.strokeStyle = '#ffffff';
    ctx.fillStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, -20);
    ctx.lineTo(5, -5);
    ctx.lineTo(20, 5);
    ctx.lineTo(20, 15);
    ctx.lineTo(5, 5);
    ctx.lineTo(0, 10);
    ctx.lineTo(-5, 5);
    ctx.lineTo(-20, 15)
    ctx.lineTo(-20, 5);
    ctx.lineTo(-5, -5);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
}

export default Ship;