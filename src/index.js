import "./style.css";
import Game from "./modules/gameController";
import Ship from "./classes/ship";
import {
  renderPlayerBoard,
  cpuBoardEventHandler,
  renderCPUBoard,
  enableRandomizeButton,
} from "./modules/domController";

const game = new Game();

game.startGame();

game.randomizeShipPlacement(game.cpuPlayer.board);
game.randomizeShipPlacement(game.humanPlayer.board);
enableRandomizeButton(game);

renderPlayerBoard(game);
renderCPUBoard(game);
console.log(game.humanPlayer.board.board);
