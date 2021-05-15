import { canvas, context } from './canvas';
export const rendererFunctions = {
    draw: [],
    update: [],
};
window.rendererFunctions = rendererFunctions;
export default class Renderer {
    constructor() {
        if(typeof this.draw === 'function') {
            this.draw = this.draw.bind(this)
            rendererFunctions.draw.push(this.draw);
        }
        if(typeof this.update === 'function') {
            this.update = this.update.bind(this);
            rendererFunctions.update.push(this.update);
        }
        this.canvas = canvas;
        this.context = context;
    }

    deleteFunctions() {
        if(typeof this.draw === 'function') {
            rendererFunctions.draw = rendererFunctions.draw.filter(fn => fn !== this.draw);
        }
        if(typeof this.update === 'function') {
            rendererFunctions.update = rendererFunctions.update.filter(fn => fn !== this.update);
        }
    }
}
Renderer.canvas = canvas;
Renderer.context = context; 