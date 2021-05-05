class Booster{
  constructor(x, y, size, color, timestamp, type){
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = size;
    this.timestamp = timestamp;
    this.type = type;
  }
  draw(){
    ctx.fillStyle = this.color;    
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
  eatenByUser(){
    console.log('Eaten');
    this.delete();
  }
  delete(){
    const index = game.boostersArray.indexOf(this);
    game.boostersArray.splice(index, 1);
  }
}

class LifeBooster extends Booster{
  eatenByUser(){
    super.eatenByUser();
    game.player.plusLive();
  }
}

class SpeedBooster extends Booster{
  constructor(x, y, size, color, timestamp, type, duration, value){
    super(x, y, size, color, timestamp, type);
    this.duration = duration;
    this.value = value;
  }
  eatenByUser(){
    super.eatenByUser();
    game.player.plusSpeed(this.duration, this.value);
  }
}

class SuperShotBooster extends Booster{
  constructor(x, y, size, color, timestamp, type, duration, bulletSize){
    super(x, y, size, color, timestamp, type);
    this.duration = duration;
    this.bulletSize = bulletSize;
  }

  eatenByUser(){
    super.eatenByUser();
    game.player.superShot(this.duration, this.bulletSize);
  }
}

