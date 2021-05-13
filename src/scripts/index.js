import {canvas, context} from './canvas';
import LevelManager from './levelManager'



const levelManager = new LevelManager(context, canvas)
levelManager.startGame();
