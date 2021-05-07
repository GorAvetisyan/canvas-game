const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const boosterTypes = [
  {
    type : 'life',
    color: 'green'
  },
  {
    type : 'speed',
    color : 'yellow'
  },
  {
    type : 'super-shot',
    color : 'orange'
  }
]




class Game{
  constructor(boosterTime, boosterSize, boosterLiveTime, maxMonsterCount, monsterMaxRoad, bulletSize, player){
    this.boosterLiveTime = boosterLiveTime;
    this.maxMonsterCount = maxMonsterCount;
    this.monsterMaxRoad = monsterMaxRoad;
    this.boosterTime = boosterTime;
    this.boosterSize = boosterSize;
    this.player = player;
    this.bulletSize = bulletSize;
    this.bulletsArray = [];
    this.monstersArray = [];
    this.boostersArray = [];
    this.lastBoosterTime = -1;
    this.score = 0;
    this.status = 'menu';
  }
  
  start = () => {
    // game.boostersArray.push(new LifeBooster(200, 200, 100, 'red', 1, new Date().valueOf()));    
    this.status = 'playing';
    this.animate();
  }

  animate = () => {
    console.log('Game');
    if(this.status === 'playing'){
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      requestAnimationFrame(this.animate);
      
      if(this.lastBoosterTime === -1 || (new Date().valueOf() - this.lastBoosterTime) / 1000 >= this.boosterTime ){
        const x = randomNumber(0, innerWidth);
        const y = randomNumber(0, innerHeight);
        const typeIndex = Math.round(randomNumber(0, boosterTypes.length - 1));
        const {color, type} = boosterTypes[typeIndex];
        let booster;
        switch (type){
          case 'life':
            booster = new LifeBooster(x, y, this.boosterSize, color, new Date().valueOf(), type);
            break;
          case 'speed':
            booster = new SpeedBooster(x, y, this.boosterSize, color, new Date().valueOf(), type, 5, 2);
            break;
          case 'super-shot':
            booster = new SuperShotBooster(x, y, this.boosterSize, color, new Date().valueOf(), type, 5, 100);
            break;
        }
        this.lastBoosterTime = new Date().valueOf();
        this.boostersArray.push(booster);
      }
      this.boostersArray.forEach(item => {
        if((new Date().valueOf() - item.timestamp) / 1000 >= this.boosterLiveTime){
          item.delete();
        }
        if(isCollision(item, this.player)){
          item.eatenByUser();
        }
        item.draw();
      });
      this.bulletsArray.forEach(item => item.update());
      
      
      this.player.draw();
      this.player.update();
  
      for (let i = this.monstersArray.length; i < this.maxMonsterCount; i++) {
        let x = randomNumber(0, innerWidth);
        let y = randomNumber(0, innerHeight);
        for (let j = 0; j < this.monstersArray.length; j++) {
          if(this.monstersArray[j].isCollision(this.player)){
            console.log('Is collision');
            x = randomNumber(0, innerWidth);
            y = randomNumber(0, innerHeight);
            this.monstersArray[j].x = x;
            this.monstersArray[j].x = y;
            j = -1;
          }
          
        }
        const dx = randomNumber(-3, 3);
        const dy = randomNumber(-3, 3);
        const maxRoad = randomNumber(0, this.monsterMaxRoad);
        const monster = new Monster(x, y, 50, dx, dy, maxRoad);
        this.monstersArray.push(monster);
        
      }
  
  
  
      this.monstersArray.forEach(item => {
        if(item.isCollision(this.player)){
          this.player.minusLive();
          item.delete();
        }
        item.update();
        item.checkForCollisionWithBullet();
      })
    }
  }
  
  over = () => {
    this.status = 'result';
    ctx.clearRect(0, 0, innerWidth, innerHeight);
  }

}
  
const player = new Player(0, 0, 10, 50, 100, 0.1, 5, 20, 20, 3);
const game = new Game(10, 30, 3, 10, 1000, 10, player);

document.addEventListener('keydown', ({key, type}) => game.player.handleKeyInput(key, type));
document.addEventListener('keyup', ({key, type}) => game.player.handleKeyInput(key, type));

game.start();





