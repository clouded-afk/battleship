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

  test("Invalid attack location", () => {
    expect(() => {
      testBoard.recieveAttack(-1, 8);
    }).toThrow("Invalid Coordinates to Attack!");
  });

  test("Coordinates Already Attacked, (hit)", () => {
    testBoard.placeShip(ship, 0, 0, "vertical");
    testBoard.recieveAttack(4, 0);

    expect(() => {
      testBoard.recieveAttack(4, 0);
    }).toThrow("Coordinates have already been attacked!");
  });

  test("Coordinates Already Attacked, (miss)", () => {
    testBoard.recieveAttack(7, 5);

    expect(() => {
      testBoard.recieveAttack(7, 5);
    }).toThrow("Coordinates have already been attacked!");
  });

  test("Attack Hits Ship", () => {
    testBoard.placeShip(ship, 0, 0, "vertical");
    testBoard.recieveAttack(2, 0);

    expect(testBoard.board[2][0]).toBe("hit");
  });

  test("Attack Misses Ship", () => {
    testBoard.placeShip(ship, 0, 0, "vertical");
    testBoard.recieveAttack(4, 7);

    expect(testBoard.board[4][7]).toBe("miss");
  });

  test("Hit increases Ship hits property", () => {
    testBoard.placeShip(ship, 0, 0, "vertical");
    testBoard.recieveAttack(2, 0);
    testBoard.recieveAttack(3, 0);

    expect(testBoard.board[0][0].hits).toBe(2);
  });

  test("Fleet is sunk", () => {
    expect(testBoard.isFleetSunk()).toBe(true);
  });

  test("Fleet is NOT sunk", () => {
    testBoard.placeShip(ship, 0, 0, "vertical");

    expect(testBoard.isFleetSunk()).toBe(false);
  });
});
