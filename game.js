class Game {
  //cntrl + shift + p dar formato
  constructor(ctx) {
    this.ctx = ctx;

    this.player = new Player(ctx);
    this.bg = new Background(ctx);
    this.hearts = [];
    this.score = new Score(ctx);

    this.enemies = [];

    this.interval = null;

    this.setListeners();
    this.tick = 0;

    this.audio = new Audio("audio/starwarslarga.mp3");

    this.setUpHearts(3)
  }

  start() {
    if (!this.interval){
        this.audio.play();
        this.audio.volume = 0.2

        this.interval = setInterval(() => {
          this.clear();
          this.draw();
          this.move();
          this.checkCollisions();
          this.tick++;
    
          if (this.tick > Math.random() * 200 + 100) {
            this.tick = 0;
            this.addEnemy();
          }
    
          if (this.tick > Math.random() * 200 + 100) {
            this.tick = 0;
            this.addEnemy2();
          }
    
          if (this.tick > Math.random() * 200 + 100) {
            this.tick = 0;
            this.addEnemy3();
          }
        }, 1000 / 60);
    }
  }

  stop() {
    this.audio.pause();
    clearInterval(this.interval);
    this.interval = null;
  }

  addEnemy() {
    const enemy = new Enemy(this.ctx);
    this.enemies.push(enemy);
  }
  addEnemy2() {
    const enemy = new Enemy2(this.ctx);
    this.enemies.push(enemy);
  }

  addEnemy3() {
    const enemy = new Enemy3(this.ctx);
    this.enemies.push(enemy);
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.enemies = this.enemies.filter((e) => e.isVisible());
  }

  draw() {
    this.bg.draw();
    this.player.draw();
    this.enemies.forEach((e) => e.draw());
    this.hearts.forEach((e) => e.draw());
    this.score.draw();
    //pintar el score, draw text
    
  }

  move() {
    this.bg.move();
    this.player.move();
    this.hearts.forEach((e) => e.move());
    this.enemies.forEach((e) => e.move());
  }

  setListeners() {
    document.addEventListener("keydown", (event) => {
      this.player.keyDown(event.keyCode);
    });

    document.addEventListener("keyup", (event) => {
      this.player.keyUp(event.keyCode);
    });
  }

  checkCollisions() {
    this.enemies.forEach((enemy) => {
      if (enemy.collides(this.player)) {
        enemy.alive = false
        this.hearts.pop()
        if (this.hearts.length === 0){
            this.gameOver()
        }

      } 
    });

    this.enemies.forEach((enemy) => {
        this.player.bullets = this.player.bullets.filter(bullet => {
            if (bullet.collides(enemy)){
                enemy.alive = false
                this.UpdateScore()
                return false 
            }else{
                return true
            }
        } )
     
    });
  }

  UpdateScore(){
    this.score.value += 100
  }

  gameOver() {
    clearInterval(this.interval);

    this.clear();
    this.draw();
    this.stop();

    this.enemies = [];
  }

  setUpHearts(numberOfHearts) {
    for (let i = 1; i <= numberOfHearts; i++){
        this.hearts.push(new Heart(this.ctx, this.ctx.canvas.width - 60 * i, 20))
    }
    
  }
}
