import Renderer from '../renderer';
import Enemy from './enemy';

const MAX = 2;

export default class EnemyManager extends Renderer {
    currentEnemy;
    enemies = [];
    fail = 0;

    constructor(actions) {
        super();
        this.actions = actions;
    }

    hasCurrentEnemy() {
        return !!this.currentEnemy
    }

    findEnemyByLetter(letter) {
        return this.enemies.find(enemy => enemy.y >= 0 && enemy.text[0] === letter);
    }

    getCurrentEnemy() {
        return this.currentEnemy;
    }

    setEnemy(letter) {
        if(this.hasCurrentEnemy()) return;
        this.currentEnemy = this.findEnemyByLetter(letter);
    }

    isLastLetter() {
        return this.currentEnemy.text.length === 1;
    }

    isEmpty() {
        return !this.enemies.length;
    }

    removeCurrentEnemy() {
        this.currentEnemy = undefined;
    }

    isFirstLetterMatch(letter) {
        return this.currentEnemy?.text[0] === letter;
    }

    replace(letter) {
        const isLastLetter = this.currentEnemy.text.length === 1;
        let word = this.currentEnemy.text[0];
        this.currentEnemy.word = word;
        this.currentEnemy.text = (this.currentEnemy.text).replace(word, "");
    }

    create(words) {
        this.enemies = [];
        words.forEach(word => this.enemies.push(new Enemy(word, this.canvas, this.context)))
    }

    removeEnemy(enemy) {
        this.enemies = this.enemies.filter(item => item !== enemy);
    }

    draw() {
        for(let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].draw();
          }
    }

    update() {
        this.enemies.forEach(enemy => {
            enemy.update();
            if ((enemy.y - 50) >= this.canvas.height) {
                this.removeEnemy(enemy)
                if(++this.fail === MAX) {
                    this.actions.gameOver()
                }
            }
          })
    }
}