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
  score : 0,
  bulletSize : 10,
  player : new Player(0, 0, 10, 50, 100, 0.1, 5, 20),
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

    if(game.maxMonsterCount > game.monstersArray.length){
      const x = randomNumber(0, innerWidth);
      const y = randomNumber(0, innerHeight);
      for (let i = 0; i < game.monstersArray; i++) {
        if(i !== 0){
          for (let j = 0; j < game.monstersArray; j++) {
            game.monstersArray[i].checkForCollisionWithOtherMonster(game.monstersArray[j]) ? j = -1 : '';
          }
        }
      }
      const monster = new Monster(x, y, 50);
      game.monstersArray.push(monster);
    }



    game.monstersArray.forEach(item => {
      item.draw();
      item.checkForCollisionWithBullet();
    })
  }

}
  

game.start();





