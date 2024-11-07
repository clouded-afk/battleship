import Ship from "../classes/ship";

const carrier = new Ship(5);
const destroyer = new Ship(4);

test("hit increases hits by 1 each time its called", () => {
  expect(carrier.hit()).toBe(1);
  expect(carrier.hit()).toBe(2);
  expect(carrier.hit()).toBe(3);
  expect(carrier.hit()).toBe(4);
  expect(carrier.hit()).toBe(5);
});

describe("isSunk", () => {
  it("Ship is sunk", () => {
    expect(carrier.isSunk()).toBe(true);
  });
  it("Ship is not sunk", () => {
    expect(destroyer.isSunk()).toBe(false);
  });
});
