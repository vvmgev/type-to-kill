import LEVELS from './levels';
export default class LevelManager {

    constructor(currentLevel = 1) {
        this.currentLevel = currentLevel;
    }

    getLevel(level = this.currentLevel) {
        return LEVELS[level]
    }

    levelPassed() {
        this.currentLevel++;
        return this.getLevel();
    }
    
    resetGame() {
        this.currentLevel = 1;
    }

} 