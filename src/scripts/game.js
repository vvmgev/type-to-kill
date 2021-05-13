import Hero from "./hero";
import Enemy from './enemy';
import Star from './background'

const MAX = 2;
const STAR_COUNT = 300;
let scr = 0;

export default class Game {
    
    currentEnemy;
    enemies = [];
    fail = 0;
    starsElements = [];

    constructor(context, canvas, actions) {
        this.actions = actions
        this.canvas = canvas;
        this.context = context;
        this.hero = new Hero();
        this.registerListener();

        for (let i = 0; i < STAR_COUNT; i++) {
            this.starsElements[i] = new Star(context, canvas);
        }

      }

    onLevelPassed = () => this.actions.levelPassed();

    onGameOver = () => {
        cancelAnimationFrame(this.requestAnimationFrameId);
        this.actions.gameOver();
    }

    registerListener() {
        window.addEventListener("keydown", event => {
        let { enemies } = this; 
          let char = event.key
            if(typeof this.currentEnemy !== 'object') {
            for (let i = 0; i < this.enemies.length; i++){
              if (enemies[i].y >= 0 && enemies[i].text[0] === char){
                this.currentEnemy = enemies[i];
                break;
              }
            }
          }

          if (enemies.length && this.currentEnemy?.text[0] === char) {
            const isLastLetter = this.currentEnemy.text.length === 1;
            let word = this.currentEnemy.text[0];
            this.currentEnemy.word = word;
            this.currentEnemy.text = (this.currentEnemy.text).replace(word, "");
            this.hero.fire(this.currentEnemy, isLastLetter, () => {
                this.filterEnamy();
                if(this.enemies.length === 0) {
                    this.onLevelPassed();
                }
            });
        
            if (this.currentEnemy.text.length === 0) {
                this.currentEnemy = undefined;
            }
          }
        });
      }

      filterEnamy = () => this.enemies = this.enemies.filter(enemy => !enemy.delete);

      createEnemies = (words) => {
          this.enemies = [];
          words.forEach(word => this.enemies.push(new Enemy(word)))
      };


      clearContext(context) {
        context.clearRect(0, 0, innerWidth, innerHeight);
      }
    
      draw(context) {
        this.context = context;
        this.clearContext(context);
        context.fillStyle = "black";
        context.fillRect(0, 0, canvas.width, canvas.height);
        this.drawScore(context)
        this.enemies.forEach(enemy => {
          if(enemy.delete) return;
            enemy.draw(context);
          });
        this.hero.draw(context);
        this.starsElements.forEach(start => start.draw(context, canvas));
      }
    
      update(context, canvas) {
        this.filterEnamy();
        this.enemies.forEach(enemy => {
          enemy.update(context);
          if ((enemy.y - 50) >= this.canvas.height) {
              enemy.delete = true;
              if(++this.fail === MAX) {
                  this.onGameOver()
              }
          }
        })

        if(this.enemies.length === 0 && (this.fail !== MAX) ) {
            this.onLevelPassed()
        }

        this.hero.update(context);
        this.starsElements.forEach(start => start.update(context, canvas));
      }

      drawScore(context) {
        context.font = "18px Arial";
        context.fillStyle = 'white';
        context.fillText("SCORE:", 1200, 20);
        context.fillStyle = 'white';
        context.fillText(scr, 1280, 20);
        context.fillStyle = "lightgrey";
      }
    
      animate = () => {
        this.requestAnimationFrameId = window.requestAnimationFrameId = requestAnimationFrame(this.animate);
        this.draw(this.context, this.canvas);
        this.update(this.context, this.canvas);
     
      }
   
}