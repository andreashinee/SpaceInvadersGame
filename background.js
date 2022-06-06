class Background {
    constructor(ctx) {
      this.ctx = ctx;
      this.x = 0;
      this.y = 0;
      this.w = this.ctx.canvas.width;
      this.h = this.ctx.canvas.height;
  
      this.vx = -0.75;
  
      this.BackgroundImg = new Image();
      this.BackgroundImg.src = './img/fondo.png';
    }
  
    draw() {
      this.ctx.drawImage(this.BackgroundImg, this.x, this.y, this.w, this.h);
      this.ctx.drawImage(this.BackgroundImg, this.x + this.w, this.y, this.w, this.h);
    }
  
    move() {
      this.x += this.vx
      if (this.x <= -this.w) {
        this.x = 0;
      }
    }
  }