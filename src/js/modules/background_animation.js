class StaticParticle {
  static = true;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  update() {
    //noop
  }
}

class DynamicParticle {
  minSpeed = 0.2;
  maxSpeed = 0.5;
  static = false;

  constructor(drawLimits) {
    this.drawLimits = drawLimits;
    this.x = Math.random() * (this.drawLimits.maxX-this.drawLimits.minX) + this.drawLimits.minX;
    this.y = Math.random() * (this.drawLimits.maxY-this.drawLimits.minX) + this.drawLimits.minY;
    this.directionX = Math.random() * this.maxSpeed - this.minSpeed;
    this.directionY = Math.random() * this.maxSpeed - this.minSpeed;
  }
  update() {
    this.x += this.directionX;
    this.y += this.directionY;

    if (this.x + this.directionX >= this.drawLimits.maxX || this.x + this.directionX <= this.drawLimits.minX) {
      this.directionX = -this.directionX;
    }
    if (this.y + this.directionY >= this.drawLimits.maxY || this.y + this.directionY <= this.drawLimits.minY) {
      this.directionY = -this.directionY;
    }
  }
}

class ParticlePolygon {
  maxExtraVertices = 5;
  minExtraVertices = 2;

  constructor(canvas, baseIndex, allParticlesArray, opacity) {
    this.canvas = canvas;
    this.opacity = opacity;
    this.particlesArray = [allParticlesArray[baseIndex]];

    const verticesCount = Math.floor(Math.random() * (this.maxExtraVertices-this.minExtraVertices)) + this.minExtraVertices;
    for (let i = 0; i < verticesCount; i++) {
      let randomIndex = baseIndex;
      do {
        randomIndex = Math.floor(Math.random() * allParticlesArray.length);
      } while (randomIndex === baseIndex || (allParticlesArray[baseIndex].static == true && allParticlesArray[randomIndex].static == true));
      this.particlesArray.push(allParticlesArray[randomIndex]);
    }
  }

  draw() {
    const c = this.canvas.getContext('2d');
    c.fillStyle = `rgba(255,255,255,${this.opacity})`;
    c.beginPath();
    c.moveTo(this.particlesArray[0].x, this.particlesArray[0].y);
    for (let i = 1; i < this.particlesArray.length; i++) {
      c.lineTo(this.particlesArray[i].x, this.particlesArray[i].y);
    }
    c.lineTo(this.particlesArray[0].x, this.particlesArray[0].y);
    c.fill();
  }
}

function animate(canvasContext, canvas, particlesArray, polygonArray) {
  canvasContext.clearRect(0,0,canvas.width,canvas.height);
  for (let i = 0; i < particlesArray.length; i++) {
    polygonArray[i].draw();
    particlesArray[i].update();
  }

  requestAnimationFrame(animate.bind(null, canvasContext, canvas, particlesArray, polygonArray));
}

export function addParticlesToCanvas(canvas, particlesCount) {
  const canvasContext = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const drawLimits = {
    minX: canvas.width*-0.5,
    minY: canvas.height*-0.5,
    maxX: canvas.width*1.5,
    maxY: canvas.height*1.5,
  };

  let particlesArray = [];
  let polygonArray = [];

  // Add static particles to the corners of the canvas
  particlesArray.push(new StaticParticle(drawLimits.minX, drawLimits.minY));
  particlesArray.push(new StaticParticle(drawLimits.maxX, drawLimits.minY));
  particlesArray.push(new StaticParticle(drawLimits.minX, drawLimits.maxY));
  particlesArray.push(new StaticParticle(drawLimits.maxX, drawLimits.maxY));

  for (let i = particlesArray.length; i < particlesCount; i++) {
    particlesArray.push(new DynamicParticle(drawLimits));
  }

  // This loop must be outside of the previous loop to ensure that the polygons are created with the particles already created
  for (let i = 0; i < particlesArray.length; i++) {
    polygonArray.push(new ParticlePolygon(canvas, i, particlesArray, Math.random()*0.025));
  }

  animate(canvasContext, canvas, particlesArray, polygonArray);
}
