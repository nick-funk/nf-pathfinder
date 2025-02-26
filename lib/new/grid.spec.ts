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

  const centreNode = grid.getNode(1, 1);
  expect(centreNode).toBeDefined();
  expect(centreNode?.topLeft).toBeDefined();
  expect(centreNode?.top).toBeUndefined();
  expect(centreNode?.topRight).toBeDefined();
  expect(centreNode?.right).toBeDefined();
  expect(centreNode?.bottomRight).toBeDefined();
  expect(centreNode?.bottom).toBeDefined();
  expect(centreNode?.bottomLeft).toBeUndefined();
  expect(centreNode?.left).toBeDefined();

  const topLeftNode = grid.getNode(0, 0);
  expect(topLeftNode).toBeDefined();
  expect(topLeftNode?.topLeft).toBeUndefined();
  expect(topLeftNode?.top).toBeUndefined();
  expect(topLeftNode?.topRight).toBeUndefined();
  expect(topLeftNode?.right).toBeUndefined();
  expect(topLeftNode?.bottomRight).toBeDefined();
  expect(topLeftNode?.bottom).toBeDefined();
  expect(topLeftNode?.bottomLeft).toBeUndefined();
  expect(topLeftNode?.left).toBeUndefined();

  const topRightNode = grid.getNode(2, 0);
  expect(topRightNode).toBeDefined();
  expect(topRightNode?.topLeft).toBeUndefined();
  expect(topRightNode?.top).toBeUndefined();
  expect(topRightNode?.topRight).toBeUndefined();
  expect(topRightNode?.right).toBeUndefined();
  expect(topRightNode?.bottomRight).toBeUndefined();
  expect(topRightNode?.bottom).toBeDefined();
  expect(topRightNode?.bottomLeft).toBeDefined();
  expect(topRightNode?.left).toBeUndefined();
});
