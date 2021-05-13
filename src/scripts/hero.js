import { intersect } from './helper';


export default class Hero {
    bullets = [];
    constructor() {
        this.settings = {
            image: this.createHeroImage(),
            width : 50,
            height: 50,
            x: window.innerWidth/2 - 25,
            y: window.innerHeight - 50,
            angle: 0
        };
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

    drawHero(context) {
        context.save()
        context.translate(this.settings.x - 25, this.settings.y - 50)
        context.rotate(-this.settings.angle*Math.PI/180)
        context.drawImage(this.settings.image, -this.settings.width/2, -this.settings.height / 2);
        context.restore()
    }

    draw(context) {
        this.context = context;
        this.drawHero(context)
        this.bullets.forEach(({image, x , y, width, height}) => {
            // context.save()
            // context.translate(x, y)
            // context.rotate(this.settings.angle)
            // context.drawImage(image, -width/2, -height / 2);
            // context.restore()
            context.drawImage(image, x, y, width, height);

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


    update(context) {
        this.drawHero(context)
        this.bullets.forEach(bullet => {
            this.updateBulletPosition(bullet);
            if(intersect(bullet, bullet.target) < 4) {
                bullet.delete = true;
                if(bullet.isLastBullet) {
                    bullet.target.delete = true;
                    bullet.fireCallback();
                }
            }
        })
        this.bullets = this.bullets.filter(bullet => !bullet.delete);
    }

    createBullet(target, isLastBullet, fireCallback) {
        return {
            image: this.createBulletImage(),
            x: this.settings.x,
            y: this.settings.y - this.settings.height,
            width: 50,
            height: 50,
            xDelta : 10,
            yDelta : 10,
            target,
            isLastBullet,
            fireCallback,
        }
    }

    rotate(x, y) {
        const xDistance = Math.abs(this.settings.x - x);
        const yDistance = Math.abs(this.settings.y - y);
        const angle = Math.atan(yDistance / xDistance) * (180 / Math.PI);
        this.settings.angle = (90 - angle) * (x > this.settings.x ? -1 : 1);
    }

    fire(target, isLastBullet, fireCallback) {
        this.rotate(target.x, target.y)
        this.bullets.push(this.createBullet(target, isLastBullet, fireCallback));
    }
}