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
        if (board[startingX][startingY + i] !== null) {
          throw new Error("Ship placement overlaps with another ship");
        }
        board[startingX][startingY + i] = ship;
      } else if (direction === "vertical") {
        if (board[startingX + i][startingY] !== null) {
          throw new Error("Ship placement overlaps with another ship");
        }
        board[startingX + i][startingY] = ship;
      }
    }
  }

  recieveAttack(xCoordinate, yCoordinate) {
    const board = this.board;

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
  }
}
