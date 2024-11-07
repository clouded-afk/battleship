export default class Gameboard {
  constructor() {
    this.board = [];
  }

  createGameboard() {
    const board = this.board;

    for (let i = 0; i < 10; i++) {
      const row = [];
      for (let j = 0; j < 10; j++) {
        row.push([i, j]);
      }
      board.push(row);
    }
    return board;
  }
}
