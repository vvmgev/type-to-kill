import GameManager from './gameManager';
import LevelManager from './level/levelManager';

export default class Game {
  constructor(context, canvas) {
    this.levelManager = new LevelManager(1)
    this.game = new GameManager(context, canvas, {levelPassed: this.levelPassed, gameOver: this.gameOver});
  }

  startLevel() {
      this.game.createEnemies(this.levelManager.getLevel());
  }

  start = () => {
    this.startLevel(this.levelManager.getLevel());
    this.game.animate();
  }

  gameOver = () => {
    console.log('Game Over')
    this.resetGame();
  }

  resetGame() {
    this.levelManager.resetGame();
  }

  levelPassed = () => {
    this.startLevel(this.levelManager.levelPassed());
  }
}