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
    const index = game.bulletsArray.indexOf(this);
    game.bulletsArray.splice(index, 1);
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

