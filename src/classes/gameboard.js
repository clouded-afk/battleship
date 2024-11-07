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

  placeShip(ship, startingX, startingY, direction) {
    const board = this.board;

    for (let i = 0; i < ship.length; i++) {
      if (direction === "horizontal") {
        board[startingX][startingY + i] = ship;
      } else if (direction === "vertical") {
        board[startingX + i][startingY] = ship;
      }
    }
  }
}
