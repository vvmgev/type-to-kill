import { LEVELS, WORDS } from './levels';
export default class LevelManager {

    words = [];

    constructor(currentLevel = 1) {
        this.currentLevel = currentLevel;
    }

    getCurrentLevel() {
        return this.currentLevel;
    }

    getRandomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    generateWords(level = this.currentLevel) {
        const levelConfig = LEVELS[level];
        this.words = [];
        for(let i = 0; i < levelConfig.count; i++) {
            const randomArrayIndex = this.getRandomNumber(levelConfig.min, levelConfig.max);
            const wordsArr = WORDS[randomArrayIndex];
            const randomWordIndex = this.getRandomNumber(0, wordsArr.length);
            this.words.push(wordsArr[randomWordIndex]);
        }
        return this.words;
    }

    getWords() {
        return this.words;
    }

    levelPassed() {
        return ++this.currentLevel;
    }
    
    resetGame() {
        this.currentLevel = 1;
    }

} 