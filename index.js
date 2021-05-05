const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;


document.addEventListener('keydown', ({key, type}) => game.player.handleKeyInput(key, type));
document.addEventListener('keyup', ({key, type}) => game.player.handleKeyInput(key, type));

const game = {
  bulletsArray : [],
  monstersArray : [],
  maxMonsterCount : 10,
  monsterMaxRoad : 1000,
  score : 0,
  bulletSize : 10,
  player : new Player(0, 0, 10, 50, 100, 0.1, 5, 20, 20, 3),
  bullets : [],

  start: () => {
    game.animate();
  },

  animate: () => {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    requestAnimationFrame(game.animate);
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
  },

  over : () => {
    alert('Game over');
  }

}
  

game.start();





