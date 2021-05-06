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


document.addEventListener('keydown', ({key, type}) => game.player.handleKeyInput(key, type));
document.addEventListener('keyup', ({key, type}) => game.player.handleKeyInput(key, type));

const game = {
  bulletsArray : [],
  monstersArray : [],
  boostersArray : [],
  boosterTime : 3,
  boosterSize : 30,
  lastBoosterTime : -1,
  boosterLiveTime : 10,
  maxMonsterCount : 10,
  monsterMaxRoad : 1000,
  score : 0,
  bulletSize : 10,
  player : new Player(0, 0, 10, 50, 100, 0.1, 5, 20, 20, 3),
  bullets : [],
  status : 'menu',

  start: () => {
    // game.boostersArray.push(new LifeBooster(200, 200, 100, 'red', 1, new Date().valueOf()));    
    game.status = 'playing';
    game.animate();
  },

  animate: () => {
    if(game.status === 'playing'){
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      requestAnimationFrame(game.animate);
      
      if(game.lastBoosterTime === -1 || (new Date().valueOf() - game.lastBoosterTime) / 1000 >= game.boosterTime ){
        const x = randomNumber(0, innerWidth);
        const y = randomNumber(0, innerHeight);
        const typeIndex = Math.round(randomNumber(0, boosterTypes.length - 1));
        const {color, type} = boosterTypes[typeIndex];
        let booster;
        switch (type){
          case 'life':
            booster = new LifeBooster(x, y, game.boosterSize, color, new Date().valueOf(), type);
            break;
          case 'speed':
            booster = new SpeedBooster(x, y, game.boosterSize, color, new Date().valueOf(), type, 5, 2);
            break;
          case 'super-shot':
            booster = new SuperShotBooster(x, y, game.boosterSize, color, new Date().valueOf(), type, 5, 100);
            break;
        }
        game.lastBoosterTime = new Date().valueOf();
        game.boostersArray.push(booster);
      }
  
      game.boostersArray.forEach(item => {
        if((new Date().valueOf() - item.timestamp) / 1000 >= game.boosterLiveTime){
          item.delete();
        }
        if(isCollision(item, game.player)){
          item.eatenByUser();
        }
        item.draw();
      });
  
      game.bulletsArray.forEach(item => item.update());
      
      
      game.player.draw();
      game.player.update();
  
      for (let i = game.monstersArray.length; i < game.maxMonsterCount; i++) {
        let x = randomNumber(0, innerWidth);
        let y = randomNumber(0, innerHeight);
        for (let j = 0; j < game.monstersArray.length; j++) {
          if(game.monstersArray[j].isCollision(game.player)){
            console.log('Is collision');
            x = randomNumber(0, innerWidth);
            y = randomNumber(0, innerHeight);
            game.monstersArray[j].x = x;
            game.monstersArray[j].x = y;
            j = -1;
          }
          
        }
        const dx = randomNumber(-3, 3);
        const dy = randomNumber(-3, 3);
        const maxRoad = randomNumber(0, game.monsterMaxRoad);
        const monster = new Monster(x, y, 50, dx, dy, maxRoad);
        game.monstersArray.push(monster);
        
      }
  
  
  
      game.monstersArray.forEach(item => {
        if(item.isCollision(game.player)){
          game.player.minusLive();
          item.delete();
        }
        item.update();
        item.checkForCollisionWithBullet();
      })
    }
  },
    

  over : () => {
    game.status = 'result';
    alert('Game over');
  }

}
  

game.start();





