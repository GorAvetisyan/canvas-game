const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const scoreUI = document.getElementById('score');
const bulletsCountUI = document.getElementById('bullets-count');
const bulletProgressUI = document.getElementById('bullet-progress');
const alertsUI = document.getElementById('alerts');
const reloadingBulletsUI = document.getElementById('reloading-bullets');
const reloadingBulletsProgressUI = document.getElementById('reloading-bullets-progress');


canvas.width = innerWidth;
canvas.height = innerHeight;

const bulletsArray = [];
const monstersArray = [];
const maxMonsterCount = 10;
let score = 0;


class Player{
  constructor(x, y, speed, bulletsCount, size, repeateShotTime, bulletsReloadTime){
    this.x = x;
    this.y = y;
    this.repeateShotTime = repeateShotTime;
    this.bulletsCount = bulletsCount;
    this.lastBulletShotTime = 0;
    this.speed = speed;
    this.bulletsReloadTime = bulletsReloadTime;
    this.lookWay = 'Right'; //Show which direction player is looking on
    this.size = size;
  }


  draw(){
    ctx.fillStyle = 'black';
    ctx.fillRect(this.x, this.y, this.size, this.size);
    switch(this.lookWay){
      case 'Up':
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y -10, this.size, 10);
        break;
      case 'Right':
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x + this.size, this.y, 10, this.size);
        break;
      case 'Down':
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y + this.size, this.size, 10);
        break;
      case 'Left':
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x - 10, this.y, 10, this.size);
        break;
    }
  }

  move(key){
    switch(key){
      case 'ArrowUp': 
        // this.y -= this.speed; 
        // this.lookWay = key.split('Arrow')[1];
        // break;
      case 'ArrowRight': 
        // this.lookWay = key.split('Arrow')[1];
        // this.x += this.speed; 
        // break;
      case 'ArrowDown': 
        // this.lookWay = key.split('Arrow')[1];
        // this.y += this.speed; 
        // break;
      case 'ArrowLeft': 
        // this.lookWay = key.split('Arrow')[1];
        // this.x -= this.speed; 
        // break;
        this.lookWay = key.split('Arrow')[1];
        this.isMoving = true;
        console.log(key);
    }
  
  }



  update(){
    if(this.isMoving){
      switch(this.lookWay){
        case 'Up': this.y - this.speed > 0 ? this.y += -this.speed : ''; break;
        case 'Right': this.x + this.speed + this.size < innerWidth ? this.x += this.speed : ''; break;
        case 'Down': this.y + this.speed + this.size < innerHeight ? this.y += this.speed : ''; break;
        case 'Left': this.x - this.speed > 0 ? this.x += -this.speed : ''; break;
      }
      this.draw();
      
    }
    const deltaTimeBullet = (new Date().valueOf() - this.lastBulletShotTime) / 1000;
    bulletProgressUI.value = deltaTimeBullet;
    if(this.startBulletsReloadTime){
      const deltaTimeReloadingBullets = (new Date().valueOf() - this.startBulletsReloadTime) / 1000;
      reloadingBulletsProgressUI.value = deltaTimeReloadingBullets;
      if(deltaTimeReloadingBullets >= this.bulletsReloadTime){
        this.bulletsCount = 50;
        this.startBulletsReloadTime = undefined;
        bulletsCountUI.innerHTML = player.bulletsCount;
        reloadingBulletsUI.style.display = 'none';
      } 
    }

  }

  shot(key){
    const time = new Date().valueOf();
    const deltaTime = (time - this.lastBulletShotTime) / 1000;
    if(key == ' ' && deltaTime > this.repeateShotTime && this.bulletsCount && !this.startBulletsReloadTime){
      let dx; 
      let dy;
      switch(this.lookWay){
        case 'Up': dy = -this.speed; break;
        case 'Right': dx = this.speed; break;
        case 'Down': dy = this.speed; break;
        case 'Left': dx = -this.speed; break;
      }

      console.log(dy, dx);
      const bullet = new Bullet(this.x + 45, this.y + 45, dx, dy);
      bulletsArray.push(bullet);
      this.lastBulletShotTime = new Date().valueOf();
      this.bulletsCount--;
      bulletsCountUI.innerHTML = this.bulletsCount;
    }
    if(!this.bulletsCount && !this.startBulletsReloadTime){
      alertsUI.innerHTML = 'Press R to reload bullets';
    }
  }

  reloadBullets(){
    console.log('redload')
    this.startBulletsReloadTime = new Date().valueOf();
    reloadingBulletsUI.style.display = 'inline';
    alertsUI.innerHTML = '';

  }

  handleKeyInput(key, type){
    console.log(type)
    if(type === 'keydown'){
      this.move(key);
      this.shot(key);
    }
    if(type === 'keyup' && key.includes('Arrow')){
      this.isMoving = false;
    }
    if(key === 'r'){
      this.reloadBullets();
    }
  
  }
}

const player = new Player(0, 0, 10, 50, 100, 0.1, 5);
bulletProgressUI.max = player.repeateShotTime;
bulletsCountUI.innerHTML = player.bulletsCount;
reloadingBulletsProgressUI.max = player.bulletsReloadTime;

class Bullet{
  constructor(x, y, dx, dy){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;

  }


  draw(){
    ctx.fillStyle = 'black';
    ctx.fillRect(this.x, this.y, 10, 10);
    
  }

  delete(){
    const index = bulletsArray.indexOf(this);
    bulletsArray.splice(index, 1);
  }

  update(){
    if(this.dx){
      if(this.x > 0 && this.x < innerWidth){
        this.x += this.dx;
      }else{
        this.delete();
      }
    }

    if(this.dy){
      if(this.y > 0 && this.y < innerHeight){
        this.y += this.dy;
      }else{
        this.delete();
      }

    }

    this.draw();
  }

  
  
}

class Monster{
  constructor(x, y, size, dx, dy, maxRoad){
    this.x = x;
    this.y = y;
    this.size = size;
    this.dx = dx;
    this.dy = dy;
    this.maxRoad = maxRoad;
  }

  draw(){
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.size, this.size);

  };

  checkForCollision(){
    bulletsArray.forEach(item => {
      
      if(item.x < this.x + this.size && item.x > this.x && item.y > this.y && item.y < this.y + this.size){

        item.delete();
        this.delete();
        score++;
        scoreUI.innerHTML = score;

      }
    }) 
  }

  delete(){
    const index = monstersArray.indexOf(this);
    monstersArray.splice(index, 1);
  }
}

function randomNumber(min, max) { 
  return Math.random() * (max - min) + min;
} 

const bullets = [];

document.addEventListener('keydown', ({key, type}) => player.handleKeyInput(key, type));
document.addEventListener('keyup', ({key, type}) => player.handleKeyInput(key, type));
function animate(){
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  requestAnimationFrame(animate);
  bulletsArray.forEach(item => item.update());
  
  
  player.draw();
  player.update();

  if(maxMonsterCount > monstersArray.length){
    const x = randomNumber(0, innerWidth);
    const y = randomNumber(0, innerHeight);
    const monster = new Monster(x, y, 50);
    monstersArray.push(monster);
  }



  monstersArray.forEach(item => {
    item.draw();
    item.checkForCollision();
  })
}


animate();