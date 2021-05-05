const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const colors = ['red', 'orange', 'yellow', 'green', 'lightblue', 'blue', 'purple'];
const maxRadius = 50;

class Ball{
  constructor(x, y, radius, color, dx, dy){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.minRadius = radius;
    this.color = color;
    this.dx = dx;
    this.dy = dy;
  }

  draw(){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, 0);
    ctx.strokeStyle = this.color;
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.stroke();
  }

  update(){
    this.x += this.dx;
    this.y += this.dy;
    if(this.x <= this.radius || this.x >= window.innerWidth - this.radius){
      this.dx = -this.dx;
    }
    if(this.y <= this.radius || this.y >= window.innerHeight - this.radius){
      this.dy = -this.dy;
    }

    // Checking for canvas borders

    this.draw();
    // this.anyToches();
    this.effect();

    
  }

  effect(){
    if(
      mouse.x - this.x < 50 && mouse.x - this.x > -50 && 
      mouse.y - this.y < 50 && mouse.y - this.y > -50){
        if(this.radius <= maxRadius){
          this.radius += 5;
        }
      }else if(this.radius - 1 > this.minRadius){
        this.radius -= 1;
      }
  } // Scaleing ball when mouse is near it, and then return it to it's normal radius

  checkForCollision(object){
    const {x : x1, y : y1, radius : r1} = this;
    const {x : x2, y : y2, radius : r2} = object;
    if(distance(x1, y1, x2, y2) <= r1 + r2){
      this.deleteThis();
      return true;
    }
    
    
  } // This is for checking for a collison with one object

  // anyTouches(){
  //   for (let i = 0; i < ballArray.length; i++) {
  //     if(i !== 0){
  //       for (let j = 0; j < ballArray.length; j++) {
  //         if(this.checkForCollision(ballArray[j])){
  //           console.log('Collision')
  //           this.deleteThis();
  //           ballArray[j].deleteThis();
  //           j = -1;
  //         }
  //       }
  //     }      
  //   }
  // } // Checking for any touches with other balls

  deleteThis(){
    const ballIndex = ballArray.indexOf(this);
    ballArray.splice(ballIndex, 1);
  } // Deleting element
  
}


function distance(x1, y1, x2, y2){
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


let ballArray = []; // Here I keep all ball instances of Ball class



const mouse = {
  x : '',
  y : '',
  isDown : false
}

document.addEventListener('mousemove', (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
}); // This is for scaling balls


document.addEventListener('mousedown', (e) => {
  mouse.isDown = true;
})


document.addEventListener('mouseup', (e) => {
  mouse.isDown = false;
});

// This top to events are for createing balls while mouse is down

function createBallWhileMouseIsDown(){
  if(mouse.isDown){
    const x = mouse.x;
    const y = mouse.y;
    const dx = getRandomIntInclusive(-3, 3);
    const dy = getRandomIntInclusive(-3, 3);
    const color = colors[getRandomIntInclusive(0, 6)];
    const radius = Math.random() * 30;
    const ball = new Ball(x, y, radius, color, dx, dy);
  
    ballArray.push(ball);
  }
} // Creating balls while mouse is down

window.addEventListener('resize', e => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
}) // This event is for deleting all balls, and createing new ones, when  window is resized

function init(ballsCount){
  ballArray = [];
  for (let i = 0; i < ballsCount; i++) {
    
    const radius = Math.random() * 100;
    let x = getRandomIntInclusive(radius, innerWidth - radius);
    let y = getRandomIntInclusive(radius, innerHeight - radius);

    if(i !== 0){
      for (let j = 0; j < ballArray.length; j++) {
        if(distance(x, y, ballArray[j].x, ballArray[j].y) <= radius + ballArray[j].radius){
          x = getRandomIntInclusive(radius, innerWidth - radius);
          y = getRandomIntInclusive(radius, innerHeight - radius);
          j = -1;
        }
      }
    } // When there is any collision with other balls when a ball is created, change that ball's cordinates

    const color = colors[getRandomIntInclusive(0, 6)];
    const dx = getRandomIntInclusive(-1, 1);
    const dy = getRandomIntInclusive(-1, 1);
    const ball = new Ball(x, y, radius, color, dx, dy);
    ballArray.push(ball);
  }
}

const newBall = new Ball(innerWidth / 2, innerHeight / 2, 100, 'black', 0, 0); // Black ball in the middle of the canvas


function animate(){
  createBallWhileMouseIsDown();
  requestAnimationFrame(animate);
  
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  
  newBall.draw();
  
  
  ballArray.forEach(item => {
    item.update();
    item.checkForCollision(newBall);
  });
  
}





init(5);
animate();