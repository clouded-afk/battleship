import { displayError } from "../modules/domController";

export default class Gameboard {
  constructor() {
    this.board = [];
  }

  createGameboard() {
    const board = this.board;

    for (let i = 0; i < 10; i++) {
      const row = [];
      for (let j = 0; j < 10; j++) {
        row.push(null);
      }
      board.push(row);
    }
    return board;
  }

  clearBoard() {
    const board = this.board;

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[0].length; j++) {
        board[i][j] = null;
      }
    }
  }

  placeShip(ship, startingX, startingY, direction) {
    const board = this.board;

    if (
      startingX < 0 ||
      startingX > board.length ||
      startingY < 0 ||
      startingY > board[0].length
    ) {
      throw new Error("Invalid Coordinates");
    }

    if (direction === "horizontal") {
      if (startingY + ship.length > board[0].length) {
        throw new Error("Invalid Coordinates");
      }
      for (let i = 0; i < ship.length; i++) {
        if (board[startingX][startingY + i] !== null) {
          throw new Error("Invalid Position");
        }
      }
      for (let i = 0; i < ship.length; i++) {
        board[startingX][startingY + i] = ship;
      }
    } else {
      if (startingX + ship.length > board.length) {
        throw new Error("Invalid Coordinates");
      }
      for (let i = 0; i < ship.length; i++) {
        if (board[startingX + i][startingY] !== null) {
          throw new Error("Invalid Position");
        }
      }
      for (let i = 0; i < ship.length; i++) {
        board[startingX + i][startingY] = ship;
      }
    }

    return true;
  }

  receiveAttack(xCoordinate, yCoordinate) {
    const board = this.board;

    try {
      if (
        xCoordinate < 0 ||
        xCoordinate >= board.length ||
        yCoordinate < 0 ||
        yCoordinate >= board[0].length
      ) {
        throw new Error("Invalid Coordinates to Attack!");
      }

      if (
        board[xCoordinate][yCoordinate] === "hit" ||
        board[xCoordinate][yCoordinate] === "miss"
      ) {
        throw new Error("Coordinates have already been attacked!");
      }

      if (board[xCoordinate][yCoordinate] !== null) {
        const ship = board[xCoordinate][yCoordinate];

        ship.hit();
        board[xCoordinate][yCoordinate] = "hit";
      } else {
        board[xCoordinate][yCoordinate] = "miss";
      }
    } catch (error) {
      displayError(error);
    }
  }

  isFleetSunk() {
    const board = this.board;

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[0].length; j++) {
        if (
          board[i][j] !== null &&
          board[i][j] !== "hit" &&
          board[i][j] !== "miss"
        ) {
          return false;
        }
      }
    }
    return true;
  }
}
