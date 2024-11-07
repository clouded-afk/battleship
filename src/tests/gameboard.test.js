import Gameboard from "../classes/gameboard";
import Ship from "../classes/ship";

describe("Gameboard", () => {
  let testBoard;
  let ship;

  beforeEach(() => {
    testBoard = new Gameboard();
    testBoard.createGameboard();
    ship = new Ship(4);
  });

  test("Vertial Ship Placement", () => {
    testBoard.placeShip(ship, 0, 0, "vertical");

    expect(testBoard.board[0][0]).toBe(ship);
    expect(testBoard.board[1][0]).toBe(ship);
    expect(testBoard.board[2][0]).toBe(ship);
    expect(testBoard.board[3][0]).toBe(ship);
  });

  test("Horizontal Ship Placement", () => {
    testBoard.placeShip(ship, 0, 0, "horizontal");

    expect(testBoard.board[0][0]).toBe(ship);
    expect(testBoard.board[0][1]).toBe(ship);
    expect(testBoard.board[0][2]).toBe(ship);
    expect(testBoard.board[0][3]).toBe(ship);
  });

  test("Overlapping Ship placement", () => {
    testBoard.placeShip(ship, 0, 0, "vertical");

    expect(() => {
      testBoard.placeShip(ship, 0, 0, "horizontal");
    }).toThrow("Ship placement overlaps with another ship");
  });
});
