import Game from './game';

const LEVELS = {
  1 : ["google"],
  2 : ["google","youtube",],
  3 : ["google","youtube","hike"],
  4 : ["google","youtube","hike","fb"],
  5 : ["google","youtube","hike","fb","eyes"],
}

export default class LevelManager {
  currentLevel = 2;
  constructor(context, canvas) {
    this.game = new Game(context, canvas, {levelPassed: this.levelPassed, gameOver: this.gameOver});
  }

  startLevel(words) {
      this.words = words;
      this.game.createEnemies(this.words);
  }

  startGame = () => {
    this.startLevel(LEVELS[this.currentLevel]);
    this.game.animate();
  }

  gameOver = () => {
    // alert('Game Over')
    console.log('Game Over')
    this.resetGame();
  }

  resetGame() {
    this.currentLevel = 1;
  }

  levelPassed = () => {
    this.nextLevel()
  }

  nextLevel() {
    this.startLevel(LEVELS[++this.currentLevel]);
  }
}