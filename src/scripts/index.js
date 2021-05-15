import '../assets/style/style.css';
import {canvas, context} from './canvas';
import Game from './game'

const game = new Game(context, canvas)
game.start();