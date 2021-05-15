import Star from './star';
import Renderer from "../renderer";

const STAR_COUNT = 300;

export default class BackgroundManager extends Renderer {

    starsElements = [];
    
    constructor(){
        super();

        for (let i = 0; i < STAR_COUNT; i++) {
            this.starsElements[i] = new Star(this.canvas, this.context);
        }
    }

    draw() {
        this.starsElements.forEach(start => start.draw());
    }

    update() {
        this.starsElements.forEach(start => start.update());
    }

}