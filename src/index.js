import "./style.css";
import Game from "./modules/gameController";
import Ship from "./classes/ship";
import { renderBoards, cpuBoardEventHandler } from "./modules/domController";

const game = new Game();
game.startGame();

game.randomizeShipPlacement(game.cpuPlayer.board);
game.randomizeShipPlacement(game.humanPlayer.board);

renderBoards(game);
cpuBoardEventHandler(game);
