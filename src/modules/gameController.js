import Gameboard from "../classes/gameboard";
import Ship from "../classes/ship";
import Player from "../classes/player";

import {
  cpuBoardEventHandler,
  updatePlayerBoardDisplay,
} from "./domController";

export default class Game {
  constructor() {
    this.humanPlayer = null;
    this.cpuPlayer = null;
    this.currentTurn = null;
  }

  startGame() {
    this.humanPlayer = new Player();
    this.cpuPlayer = new Player();

    this.humanPlayer.board.createGameboard();
    this.cpuPlayer.board.createGameboard();

    this.currentTurn = this.humanPlayer;
  }

  switchTurn() {
    this.currentTurn =
      this.currentTurn === this.humanPlayer ? this.cpuPlayer : this.humanPlayer;
  }

  sendCPUAttack() {
    const humanBoard = this.humanPlayer.board;
    let xCoordinate, yCoordinate;

    do {
      xCoordinate = Math.floor(Math.random() * 10);
      yCoordinate = Math.floor(Math.random() * 10);
    } while (
      humanBoard.board[xCoordinate][yCoordinate] === "miss" ||
      humanBoard.board[xCoordinate][yCoordinate] === "hit"
    );

    humanBoard.receiveAttack(xCoordinate, yCoordinate);
    updatePlayerBoardDisplay(humanBoard, xCoordinate, yCoordinate);
  }
}
