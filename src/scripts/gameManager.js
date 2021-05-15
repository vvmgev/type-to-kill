import Hero from "./hero";
import { rendererFunctions } from './renderer';
import EnemyManager from './enemy/enemyManager';
import BackgroundManager from './background/backgroundManager';

let scr = 0;

export default class GameManager {
    
    currentEnemy;
    enemies = [];
    fail = 0;

    constructor(context, canvas, actions) {
        this.actions = actions
        this.canvas = canvas;
        this.context = context;
        this.registerListener();
        this.hero = new Hero();
        this.enemyManger = new EnemyManager({gameOver: this.onGameOver});
        this.backgroundManager = new BackgroundManager();
      }

    onLevelPassed = () => this.actions.levelPassed();

    onGameOver = () => {
        cancelAnimationFrame(this.requestAnimationFrameId);
        this.actions.gameOver();
    }

    registerListener() {
        window.addEventListener("keydown", event => {

          this.enemyManger.setEnemy(event.key);
          const currentEnemy = this.enemyManger.getCurrentEnemy();


          if (!this.enemyManger.isEmpty() && currentEnemy?.text[0] === event.key) {
            const isLastLetter = currentEnemy.text.length === 1;
            let word = currentEnemy.text[0];
            currentEnemy.word = word;
            currentEnemy.text = (currentEnemy.text).replace(word, "");
            this.hero.fire(currentEnemy, () => {
                if(isLastLetter) {
                  this.enemyManger.removeEnemy(currentEnemy);
                }
            });
        
            if (currentEnemy.text.length === 0) {
                this.enemyManger.removeCurrentEnemy()
            }
          }
        });
      }

      createEnemies = (words) => {
          this.enemyManger.create(words);
      };


      clearContext() {
        this.context.clearRect(0, 0, innerWidth, innerHeight);
      }
    
      draw() {
        const { context } = this;
        this.clearContext();
        context.fillStyle = "black";
        context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawScore();
        for(let i = 0; i < rendererFunctions.draw.length; i++) {
          rendererFunctions.draw[i]();
        }
        if(this.enemyManger.isEmpty()) {
            this.onLevelPassed();
        }
      }
    
      update() {
        for(let i = 0; i < rendererFunctions.update.length; i++) {
          rendererFunctions.update[i]();
        }
      }

      drawScore() {
        const { context } = this;
        context.font = "18px Arial";
        context.fillStyle = 'white';
        context.fillText("SCORE:", 1200, 20);
        context.fillStyle = 'white';
        context.fillText(scr, 1280, 20);
        context.fillStyle = "lightgrey";
      }
    
      animate = () => {
        this.requestAnimationFrameId = window.requestAnimationFrameId = requestAnimationFrame(this.animate);
        this.draw();
        this.update();
     
      }
   
}