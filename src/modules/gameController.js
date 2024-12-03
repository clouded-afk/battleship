import Ship from "../classes/ship";
import Player from "../classes/player";

import { updatePlayerBoardDisplay, displayTurnInfo } from "./domController";

export default class Game {
  constructor() {
    this.humanPlayer = null;
    this.cpuPlayer = null;
    this.currentTurn = null;
    this.lastCPUHitCoords = null;
  }

  setupGame() {
    this.humanPlayer = new Player();
    this.cpuPlayer = new Player();

    this.humanPlayer.board.createGameboard();
    this.cpuPlayer.board.createGameboard();

    this.currentTurn = this.humanPlayer;
  }

  switchTurn() {
    this.currentTurn =
      this.currentTurn === this.humanPlayer ? this.cpuPlayer : this.humanPlayer;
    displayTurnInfo(this);
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

    if (humanBoard.board[xCoordinate][yCoordinate] === "hit") {
      this.lastCPUHitCoords = { x: xCoordinate, y: yCoordinate };
    } else {
      this.lastCPUHitCoords = null;
    }

    console.log(this.lastCPUHitCoords);
  }

  countCPUShips() {
    let shipCells = 0;

    for (let i = 0; i < this.cpuPlayer.board.board.length; i++) {
      for (let j = 0; j < this.cpuPlayer.board.board[0].length; j++) {
        if (this.cpuPlayer.board.board[i][j] !== null) {
          shipCells++;
        }
      }
    }

    return shipCells;
  }

  randomizeShipPlacement(board) {
    const ships = [
      new Ship(5),
      new Ship(4),
      new Ship(3),
      new Ship(3),
      new Ship(2),
    ];

    let shipCells;
    do {
      board.clearBoard();
      shipCells = 0;

      ships.forEach((ship) => {
        let placed = false;
        while (!placed) {
          const x = Math.floor(Math.random() * 10);
          const y = Math.floor(Math.random() * 10);
          const direction = Math.random() < 0.5 ? "horizontal" : "vertical";

          try {
            placed = board.placeShip(ship, x, y, direction);
          } catch (error) {
            placed = false;
          }
        }
      });

      shipCells = this.countCPUShips();
    } while (shipCells !== 17);
  }

  playRound() {
    if (this.currentTurn === this.cpuPlayer) {
      setTimeout(() => {
        this.sendCPUAttack();
        this.switchTurn();
      }, 1250);
    }
  }

  checkForWinner() {
    if (this.humanPlayer.board.isFleetSunk()) {
      return this.cpuPlayer;
    } else if (this.cpuPlayer.board.isFleetSunk()) {
      return this.humanPlayer;
    }
  }
}
