import GameManager from './gameManager';
import LevelManager from './level/levelManager';

export default class Game {
  constructor(context, canvas) {
    this.levelManager = new LevelManager(1)
    this.gameManager = new GameManager(context, canvas, {levelPassed: this.levelPassed, gameOver: this.gameOver});
  }

  startLevel() {
      this.gameManager.createEnemies(this.levelManager.getLevel());
  }

  start = () => {
    this.startLevel();
    this.gameManager.animate();
  }

  gameOver = () => {
    console.log('Game Over')
    this.resetGame();
  }

  resetGame() {
    this.levelManager.resetGame();
  }

  levelPassed = () => {
    this.levelManager.levelPassed();
    this.startLevel();
  }
}