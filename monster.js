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
    game.bulletsArray.forEach(item => {
      
      if(item.x < this.x + this.size && item.x > this.x && item.y > this.y && item.y < this.y + this.size){

        item.delete();
        this.delete();
        game.score++;
        scoreUI.innerHTML = game.score;

      }
    }) 
  }

  delete(){
    const index = game.monstersArray.indexOf(this);
    game.monstersArray.splice(index, 1);
  }
}