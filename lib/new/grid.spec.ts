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
    [1, 0, 0]
  ];

  const grid = new Grid(traversal);

  const centreNode = grid.getNode(1, 1);
  expect(centreNode).toBeDefined();
  expect(centreNode?.topLeft).toEqual(true);
  expect(centreNode?.top).toEqual(false);
  expect(centreNode?.topRight).toEqual(true);
  expect(centreNode?.right).toEqual(true);
  expect(centreNode?.bottomRight).toEqual(true);
  expect(centreNode?.bottom).toEqual(true);
  expect(centreNode?.bottomLeft).toEqual(false);
  expect(centreNode?.left).toEqual(true);

  const topLeftNode = grid.getNode(0, 0);
  expect(topLeftNode).toBeDefined();
  expect(topLeftNode?.topLeft).toEqual(false);
  expect(topLeftNode?.top).toEqual(false);
  expect(topLeftNode?.topRight).toEqual(false);
  expect(topLeftNode?.right).toEqual(false);
  expect(topLeftNode?.bottomRight).toEqual(true);
  expect(topLeftNode?.bottom).toEqual(true);
  expect(topLeftNode?.bottomLeft).toEqual(false);
  expect(topLeftNode?.left).toEqual(false);

  const topRightNode = grid.getNode(2, 0);
  expect(topRightNode).toBeDefined();
  expect(topRightNode?.topLeft).toEqual(false);
  expect(topRightNode?.top).toEqual(false);
  expect(topRightNode?.topRight).toEqual(false);
  expect(topRightNode?.right).toEqual(false);
  expect(topRightNode?.bottomRight).toEqual(false);
  expect(topRightNode?.bottom).toEqual(true);
  expect(topRightNode?.bottomLeft).toEqual(true);
  expect(topRightNode?.left).toEqual(false);
});
