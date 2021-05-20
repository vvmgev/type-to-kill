export default class Enamy {
    constructor(text, context, options = {}) {
        this.context = context;
        this.text = text;
        this.x = options.x || Math.round(Math.random()*(window.innerWidth-50));
        this.y = options.y || 10;
        this.yDelta = options.yDelte || 0.5;
        this.width = options.width || 43;
        this.height = options.height || 58;
        this.image = this.createImage('./assets/images/enemy.png');
    }

    createImage(src) {
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