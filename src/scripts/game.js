import Hero from "./hero";
import { rendererFunctions } from './renderer';
import EnemyManager from './enemy/enemyManager';
import BackgroundManager from './background/backgroundManager';
import LevelManager from './level/levelManager';
import { startNewGamaPromise, newLevelPromise } from './menu'


let scr = 0;
const FIRST_LEVEL = 1;


export default class Game {

  currentEnemy;
  enemies = [];
  fail = 0;
  isLevelPassed = false;

  constructor(context) {
    this.context = context;
    this.backgroundManager = new BackgroundManager();
    this.levelManager = new LevelManager(FIRST_LEVEL)

    startNewGamaPromise(this.levelManager.getCurrentLevel()).then(() => {
      this.startNewGame();
    })
    this.animate();
  }


  startNewGame = () => {
    this.registerListener();
    this.hero = new Hero();
    this.enemyManger = new EnemyManager({ gameOver: this.onGameOver });
    this.createEnemies(this.levelManager.generateWords());
  }

  resetGame() {
    this.levelManager.resetGame();
  }

  showWaveText() {
    const waveNumber = waveElem.querySelector('.wave-number');
    console.log(waveNumber);
  }

  levelPassed = () => {
    const currentEnemy = this.levelManager.levelPassed();
    newLevelPromise(currentEnemy).then(() => {
      this.createEnemies(this.levelManager.generateWords());
    })
  }

  gameOver = () => {
    console.log('Game Over')
    this.resetGame();
  }

  onGameOver = () => {
    cancelAnimationFrame(this.requestAnimationFrameId);
    this.gameOver();
  }

  onPauseGame() {
    cancelAnimationFrame(this.requestAnimationFrameId);
  }

  continueGame() {
    this.animate();
  }

  windowFocus() {
    document.addEventListener("focusout", () => {
      console.log('visibilitychange')
    });
  }

  registerListener() {
    this.windowFocus();

    window.addEventListener("keydown", event => {
      if (event.key === 'Escape') {
        // this.onPauseGame();
        return;
      }

      this.enemyManger.setEnemy(event.key);
      const currentEnemy = this.enemyManger.getCurrentEnemy();


      if (!this.enemyManger.isEmpty() && currentEnemy?.text[0] === event.key) {
        const isLastLetter = currentEnemy.text.length === 1;
        let word = currentEnemy.text[0];
        currentEnemy.word = word;
        currentEnemy.text = (currentEnemy.text).replace(word, "");
        this.hero.fire(currentEnemy, () => {
          if (isLastLetter) {
            this.enemyManger.removeEnemy(currentEnemy);
            scr++
          }
        });

        if (currentEnemy.text.length === 0) {
          this.enemyManger.removeCurrentEnemy()
        }
      }
    });
  }

  createEnemies = (words) => {
    this.isLevelPassed = false;
    this.enemyManger.create(words);
  };


  clearContext() {
    const { context } = this;
    context.clearRect(0, 0, innerWidth, innerHeight);
    context.fillStyle = "black";
    context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);
  }

  draw() {
    for (let i = 0; i < rendererFunctions.draw.length; i++) {
      rendererFunctions.draw[i]();
    }
    if (!this.isLevelPassed && this.enemyManger && this.enemyManger.isEmpty()) {
        this.levelPassed();
    }
  }

  update() {
    for (let i = 0; i < rendererFunctions.update.length; i++) {
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
    this.clearContext();
    this.drawScore();
    this.draw();
    this.update();
  }
}