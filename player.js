class Player{
  constructor(x, y, speed, bulletsCount, size, repeateShotTime, bulletsReloadTime, headSize, bulletSpeed, lives){
    this.x = x;
    this.y = y;
    this.repeateShotTime = repeateShotTime;
    this.bulletsCount = bulletsCount;
    this.lastBulletShotTime = 0;
    this.speedEffect = {value : 1, duration : 0};
    this.speed = speed;
    this.bulletsReloadTime = bulletsReloadTime;
    this.lookWay = 'Right'; //Show which direction player is looking on
    this.size = size;
    this.headSize = headSize;
    this.bulletSpeed = bulletSpeed;
    this.lives = lives;
  }

  draw(){
    ctx.fillStyle = 'black';
    ctx.fillRect(this.x, this.y, this.size, this.size);
    switch(this.lookWay){
      case 'Up':
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y -this.headSize, this.size, this.headSize);
        break;
      case 'Right':
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x + this.size, this.y, this.headSize, this.size);
        break;
      case 'Down':
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y + this.size, this.size, this.headSize);
        break;
      case 'Left':
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x - this.headSize, this.y, this.headSize, this.size);
        break;
    }
  }
  move(key){
      if(key.includes('Arrow')){
        this.lookWay = key.split('Arrow')[1];
        this.isMoving = true;
        console.log(key);
      }
  }
  update(){
    if((new Date().valueOf() - this.speedEffect.start) / 1000 >= this.speedEffect.duration && this.speedEffect.duration){
      console.log(this.speed, this.speedEffect.value)
      this.speedEffect.duration = 0;
      this.speed = this.speed / this.speedEffect.value;
    }

    if(this.isMoving){
      switch(this.lookWay){
        case 'Up': this.y - this.headSize - this.speed > 0 ? this.y += -this.speed : ''; break;
        case 'Right': this.x + this.headSize + this.speed + this.size < innerWidth ? this.x += this.speed : ''; break;
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
        bulletsCountUI.innerHTML = game.player.bulletsCount;
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
        case 'Up': dy = -this.bulletSpeed; break;
        case 'Right': dx = this.bulletSpeed; break;
        case 'Down': dy = this.bulletSpeed; break;
        case 'Left': dx = -this.bulletSpeed; break;
      }

      console.log(dy, dx);
      const bullet = new Bullet(this.x + (this.size - game.bulletSize) / 2, this.y + (this.size - game.bulletSize) / 2, dx, dy, game.bulletSize);
      game.bulletsArray.push(bullet);
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
  minusLive(){
    if(this.lives > 1){
      this.lives--;
      playerLivesUI.innerHTML = this.lives;
    }else{
      game.over();
    }
  }
  plusLive(){
    this.lives++;
    playerLivesUI.innerHTML = this.lives;
  }
  plusSpeed(duration, value){
    if(!this.speedEffect.duration){
      this.speed *= value;
      this.speedEffect.start = new Date().valueOf();
      this.speedEffect.duration = duration;
      this.speedEffect.value = value;
    }else{
      this.speedEffect.start = new Date().valueOf();
    }
  }
}
