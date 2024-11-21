import "./style.css";
import Game from "./modules/gameController";
import Ship from "./classes/ship";
import {
  renderPlayerBoard,
  cpuBoardEventHandler,
  renderCPUBoard,
  enableRandomizeButton,
  enableStartButton,
} from "./modules/domController";

const game = new Game();

game.startGame();

game.randomizeShipPlacement(game.cpuPlayer.board);
game.randomizeShipPlacement(game.humanPlayer.board);
enableRandomizeButton(game);
enableStartButton(game);

renderPlayerBoard(game);
