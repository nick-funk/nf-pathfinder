import { it, expect } from "vitest";
import { Grid } from "./grid";

it("grid can draw out to console", () => {
  const traversal = [
    [0, 0, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 0, 0, 0],
  ];

  const grid = new Grid(traversal);

  expect(grid.toString()).toEqual(
    `0, 0, 0, 1, 0\n0, 1, 0, 1, 0\n0, 1, 0, 1, 0\n0, 1, 0, 1, 0\n0, 1, 0, 0, 0`
  );
});

it("grid width and height calculated correctly", () => {
  const traversal = [
    [0, 0, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 0, 0, 0],
  ];

  const grid = new Grid(traversal);

  expect(grid.width).toEqual(5);
  expect(grid.height).toEqual(3);
});
