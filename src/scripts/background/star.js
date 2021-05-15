export default class Star {
    speed = 2;
    extinction = 4;
    constructor(canvas, context) {
        this.canvas = canvas;
        this.context = context;
        this.screen = {
            w: window.innerWidth,
            h: window.innerHeight,
            c: [ window.innerWidth * 0.5, window.innerHeight * 0.5]
        };
        
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * canvas.width;
    }

    draw() {
        const {canvas, context} = this;
        let x, y, rad, opacity;
        x = (this.x - this.screen.c[0]) * (canvas.width / this.z);
        x = x + this.screen.c[0];
        y = (this.y - this.screen.c[1]) * (canvas.width / this.z);
        y = y + this.screen.c[1];
        rad = canvas.width / this.z;
        opacity = (rad > this.extinction) ? 1.5 * (2 - rad / this.extinction) : 1;
  
        context.beginPath();
        context.fillStyle = "rgba(255, 255, 255, " + opacity + ")";
        context.arc(x, y, rad, 0, Math.PI * 2);
        context.fill();
        context.closePath();
    }
  

    update() {
        this.z -= this.speed;
        if (this.z <= 0) {
            this.z = this.canvas.width;
        }
      }
}


