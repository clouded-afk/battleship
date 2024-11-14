import "./style.css";
import Game from "./modules/gameController";
import Ship from "./classes/ship";
import { renderBoards, cpuBoardEventHandler } from "./modules/domController";

const game = new Game();
game.startGame();

const one = new Ship(5);
const two = new Ship(4);
const three = new Ship(3);
const four = new Ship(3);
const five = new Ship(2);

game.humanPlayer.board.placeShip(one, 0, 0, "horizontal");
game.humanPlayer.board.placeShip(two, 4, 5, "horizontal");
game.humanPlayer.board.placeShip(three, 8, 4, "horizontal");
game.humanPlayer.board.placeShip(four, 1, 0, "vertical");
game.humanPlayer.board.placeShip(five, 5, 4, "vertical");

game.cpuPlayer.board.placeShip(one, 0, 0, "horizontal");
game.cpuPlayer.board.placeShip(two, 4, 5, "horizontal");
game.cpuPlayer.board.placeShip(three, 8, 4, "horizontal");
game.cpuPlayer.board.placeShip(four, 4, 0, "vertical");
game.cpuPlayer.board.placeShip(five, 5, 4, "horizontal");

renderBoards(game);
cpuBoardEventHandler(game);
