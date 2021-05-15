let selectColor = ["#DB291D",'#F85F68','#77B1AD','#F0B99A','#E1CF79','#F5998E','#B16774',"#FAB301",
       "#F85F68","#4FAA6D","orange","green","#58A8C9","#CDD6D5","#ECD2A2","white"];
let y = -10;
export default class Enamy {
    constructor(text, canvas, context) {
        this.canvas = canvas;
        this.context = context;
        this.x = Math.round(Math.random()*(window.innerWidth-50));
        this.y = y = y - 50;
        this.radius = 30;
        this.color = selectColor[Math.floor(Math.random()*(selectColor.length-1))];;
        this.yDelta = 1;
        this.text = text;
        this.width = 43;
        this.height = 58;

        this.image = new Image();
        this.image.src = './assets/images/enemy.png';
    }

    createImage() {
        const image = new Image();
        image.src = src;
        return image;
    }

    draw() {
        const { context } = this;
        context.drawImage(this.image, this.x, this.y);
        context.font = "15px Arial";
        context.fillStyle = "white";
        context.fillText(this.text, this.x, this.y + this.height + 15);
    }

    update() {
        this.y += this.yDelta;
    }

    type() {
        context.font = '40px Arial';
        context.strokeStyle = 'lightgrey';
        context.strokeText(this.word, 670, 580);
    }

}