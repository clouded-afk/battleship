import "./style.css";
import Game from "./modules/gameController";
import { renderBoard } from "./modules/domController";

const game = new Game();
game.createPlayers();
renderBoard(game);
