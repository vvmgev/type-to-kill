import Renderer from './renderer';
import { intersect } from './util/helper';


export default class Hero extends Renderer {
    bullets = [];
    constructor() {
        super()
        this.settings = {
            image: this.createHeroImage(),
            width : 50,
            height: 50,
            x: window.innerWidth/2 - 25,
            y: window.innerHeight - 30,
            angle: 0
        };

        this.muy  = this.createBulletImage();
    }

    createImage(src) {
        const image = new Image();
        image.src = src;
        return image;
    }

    createHeroImage() {
        return this.createImage('./assets/images/hero.png');
    }

    createBulletImage() {
        return this.createImage('./assets/images/bullet.png');
    }

    drawHero() {
        const {context} = this; 
        context.save()
        context.translate(this.settings.x - 25, this.settings.y - 50)
        context.rotate(this.settings.angle)
        context.drawImage(this.settings.image, -this.settings.width/2, -this.settings.height / 2);
        context.restore()
    }

    draw() {
        const { context } = this;
        this.drawHero(context)
        this.bullets.forEach(({image, x , y, width, height, angle}) => {
            context.save()
            context.translate(x + width / 2, y + height / 2)
            context.rotate(angle)
            context.drawImage(image, -width/2, -width / 2);
            context.restore()
        })
    }

    updateBulletPosition(bullet) {
        const { x, y, xDelta, yDelta, target } = bullet;
        const tx = target.x - x;
        const ty = target.y - y;
        const dist = Math.sqrt(tx * tx + ty * ty);
    
        if (dist >= xDelta) {
            bullet.x += (tx / dist) * xDelta;
            bullet.y += (ty / dist) * yDelta;
        }
    }


    update() {
        const { context } = this;
        this.drawHero(context)
        this.bullets.forEach(bullet => {
            this.updateBulletPosition(bullet);
            bullet.angle = this.getRotateAngle(bullet.target, bullet);
            if(intersect(bullet, bullet.target)) {
                bullet.delete = true;
                bullet.fireCallback();
            }
        })
        this.bullets = this.bullets.filter(bullet => !bullet.delete);

        
    }

    createBullet(target, fireCallback) {
        return {
            image: this.createBulletImage(),
            x: this.settings.x - this.settings.width/2 - 12.5,
            y: this.settings.y - this.settings.height - 10,
            width: 50,
            height: 50,
            xDelta : 5,
            yDelta : 5,
            angle: this.settings.angle,
            target,
            fireCallback,
        }
    }

    getRotateAngle(target, object) {
        const xDistance = Math.abs(object.x - target.x);
        const yDistance = Math.abs(object.y - target.y);
        const angle = Math.atan(yDistance / xDistance) * (180 / Math.PI);
        // return (90 - angle) * (target.x > object.x ? -1 : 1)
        return -Math.PI/180 * (90 - angle) * (target.x > object.x ? -1 : 1);
    }

    fire(target, fireCallback) {
        this.settings.angle = this.getRotateAngle(target, this.settings)
        this.bullets.push(this.createBullet(target, fireCallback));
    }
}