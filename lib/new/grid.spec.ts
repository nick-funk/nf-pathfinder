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

it("grid width and height are calculated correctly", () => {
  const traversal = [
    [0, 0, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 0, 0, 0],
  ];

  const grid = new Grid(traversal);

  expect(grid.width).toEqual(5);
  expect(grid.height).toEqual(3);
});

it("grid nodes are calculated correctly", () => {
  const traversal = [
    [0, 1, 0],
    [0, 0, 0],
    [1, 0, 0],
  ];

  const grid = new Grid(traversal);

  const centre = grid.getNode(1, 1);
  expect(centre).toBeDefined();
  expect(centre?.topLeft).toBeDefined();
  expect(centre?.top).toBeUndefined();
  expect(centre?.topRight).toBeDefined();
  expect(centre?.right).toBeDefined();
  expect(centre?.bottomRight).toBeDefined();
  expect(centre?.bottom).toBeDefined();
  expect(centre?.bottomLeft).toBeUndefined();
  expect(centre?.left).toBeDefined();
  expect(centre?.neighbours.length).toEqual(6);

  const topLeft = grid.getNode(0, 0);
  expect(topLeft).toBeDefined();
  expect(topLeft?.topLeft).toBeUndefined();
  expect(topLeft?.top).toBeUndefined();
  expect(topLeft?.topRight).toBeUndefined();
  expect(topLeft?.right).toBeUndefined();
  expect(topLeft?.bottomRight).toBeDefined();
  expect(topLeft?.bottom).toBeDefined();
  expect(topLeft?.bottomLeft).toBeUndefined();
  expect(topLeft?.left).toBeUndefined();
  expect(topLeft?.neighbours.length).toEqual(2);

  const topRight = grid.getNode(2, 0);
  expect(topRight).toBeDefined();
  expect(topRight?.topLeft).toBeUndefined();
  expect(topRight?.top).toBeUndefined();
  expect(topRight?.topRight).toBeUndefined();
  expect(topRight?.right).toBeUndefined();
  expect(topRight?.bottomRight).toBeUndefined();
  expect(topRight?.bottom).toBeDefined();
  expect(topRight?.bottomLeft).toBeDefined();
  expect(topRight?.left).toBeUndefined();
  expect(topRight?.neighbours.length).toEqual(2);

  const bottomLeft = grid.getNode(0, 2);
  expect(bottomLeft).toBeDefined();
  expect(bottomLeft?.topLeft).toBeUndefined();
  expect(bottomLeft?.top).toBeDefined();
  expect(bottomLeft?.topRight).toBeDefined();
  expect(bottomLeft?.right).toBeDefined();
  expect(bottomLeft?.bottomRight).toBeUndefined();
  expect(bottomLeft?.bottom).toBeUndefined();
  expect(bottomLeft?.bottomLeft).toBeUndefined();
  expect(bottomLeft?.left).toBeUndefined();
  expect(bottomLeft?.neighbours.length).toEqual(3);

  const bottomRight = grid.getNode(2, 2);
  expect(bottomRight).toBeDefined();
  expect(bottomRight?.topLeft).toBeDefined();
  expect(bottomRight?.top).toBeDefined();
  expect(bottomRight?.topRight).toBeUndefined();
  expect(bottomRight?.right).toBeUndefined();
  expect(bottomRight?.bottomRight).toBeUndefined();
  expect(bottomRight?.bottom).toBeUndefined();
  expect(bottomRight?.bottomLeft).toBeUndefined();
  expect(bottomRight?.left).toBeDefined();
  expect(bottomRight?.neighbours.length).toEqual(3);
});
