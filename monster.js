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

  checkForCollisionWithBullet(){
    game.bulletsArray.forEach(item => {
      
      // if(item.x < this.x + this.size && item.x > this.x && item.y > this.y && item.y < this.y + this.size){

      //   item.delete();
      //   this.delete();
      //   game.score++;
      //   scoreUI.innerHTML = game.score;

      // }
      if(this.isCollision(item)){
        item.delete();
        this.delete();
        game.score++;
        scoreUI.innerHTML = game.score;
      }
    }) 
  }

  checkForCollisionWithOtherMonster(monster){

  }

  //TODO: create Collision function for blocks and use it both in checkForCollisionWithBullet and checkForCollisionWithOtherMonster

  isCollision(rect2){
    const rect1 = this;
    if (rect1.x < rect2.x + rect2.size &&
      rect1.x + rect1.size > rect2.x &&
      rect1.y < rect2.y + rect2.size &&
      rect1.y + rect1.size > rect2.y) {
        return true;
      }
  }

  delete(){
    const index = game.monstersArray.indexOf(this);
    game.monstersArray.splice(index, 1);
  }
}