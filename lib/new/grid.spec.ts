import { it, expect } from "vitest";
import { Grid, GridPos } from "./grid";

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

it("grid cloned traversal properly", () => {
  const traversal = [
    [0, 1, 0],
    [1, 0, 1]
  ];

  const grid = new Grid(traversal);
  const result = grid.cloneTraversal(traversal);

  for (let y = 0; y < traversal.length; y++) {
    for (let x = 0; x < traversal[y].length; x++) {
      const t = traversal[y][x];
      const c = result.traversal[y][x];

      expect(c).toEqual(t);
    }
  }
});

it("grid nodes are calculated correctly", () => {
  const traversal = [
    [0, 1, 0],
    [0, 0, 0],
    [1, 0, 0],
  ];

  const grid = new Grid(traversal);

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
  expect(topLeft?.neighbours).toContain(topLeft?.bottom);
  expect(topLeft?.neighbours).toContain(topLeft?.bottomRight);

  const top = grid.getNode(1, 0);
  expect(top).toBeDefined();
  expect(top?.topLeft).toBeUndefined();
  expect(top?.top).toBeUndefined();
  expect(top?.topRight).toBeUndefined();
  expect(top?.right).toBeUndefined();
  expect(top?.bottomRight).toBeUndefined();
  expect(top?.bottom).toBeUndefined();
  expect(top?.bottomLeft).toBeUndefined();
  expect(top?.left).toBeUndefined();
  expect(top?.neighbours.length).toEqual(0);

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
  expect(topRight?.neighbours).toContain(topRight?.bottom);
  expect(topRight?.neighbours).toContain(topRight?.bottomLeft);

  const left = grid.getNode(0, 1);
  expect(left).toBeDefined();
  expect(left?.topLeft).toBeUndefined();
  expect(left?.top).toBeDefined();
  expect(left?.topRight).toBeUndefined();
  expect(left?.right).toBeDefined();
  expect(left?.bottomRight).toBeDefined();
  expect(left?.bottom).toBeUndefined();
  expect(left?.bottomLeft).toBeUndefined();
  expect(left?.left).toBeUndefined();
  expect(left?.neighbours.length).toEqual(3);
  expect(left?.neighbours).toContain(left?.top);
  expect(left?.neighbours).toContain(left?.right);
  expect(left?.neighbours).toContain(left?.bottomRight);

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
  expect(centre?.neighbours).toContain(centre?.topLeft);
  expect(centre?.neighbours).toContain(centre?.topRight);
  expect(centre?.neighbours).toContain(centre?.right);
  expect(centre?.neighbours).toContain(centre?.bottomRight);
  expect(centre?.neighbours).toContain(centre?.bottom);
  expect(centre?.neighbours).toContain(centre?.left);

  const right = grid.getNode(2, 1);
  expect(right).toBeDefined();
  expect(right?.topLeft).toBeUndefined();
  expect(right?.top).toBeDefined();
  expect(right?.topRight).toBeUndefined();
  expect(right?.right).toBeUndefined();
  expect(right?.bottomRight).toBeUndefined();
  expect(right?.bottom).toBeDefined();
  expect(right?.bottomLeft).toBeDefined();
  expect(right?.left).toBeDefined();
  expect(right?.neighbours.length).toEqual(4);
  expect(right?.neighbours).toContain(right?.top);
  expect(right?.neighbours).toContain(right?.bottom);
  expect(right?.neighbours).toContain(right?.bottomLeft);
  expect(right?.neighbours).toContain(right?.left);

  const bottomLeft = grid.getNode(0, 2);
  expect(bottomLeft).toBeDefined();
  expect(bottomLeft?.topLeft).toBeUndefined();
  expect(bottomLeft?.top).toBeUndefined();
  expect(bottomLeft?.topRight).toBeUndefined();
  expect(bottomLeft?.right).toBeUndefined();
  expect(bottomLeft?.bottomRight).toBeUndefined();
  expect(bottomLeft?.bottom).toBeUndefined();
  expect(bottomLeft?.bottomLeft).toBeUndefined();
  expect(bottomLeft?.left).toBeUndefined();
  expect(bottomLeft?.neighbours.length).toEqual(0);

  const bottom = grid.getNode(1, 2);
  expect(bottom).toBeDefined();
  expect(bottom?.topLeft).toBeDefined();
  expect(bottom?.top).toBeDefined();
  expect(bottom?.topRight).toBeDefined();
  expect(bottom?.right).toBeDefined();
  expect(bottom?.bottomRight).toBeUndefined();
  expect(bottom?.bottom).toBeUndefined();
  expect(bottom?.bottomLeft).toBeUndefined();
  expect(bottom?.left).toBeUndefined();
  expect(bottom?.neighbours.length).toEqual(4);
  expect(bottom?.neighbours).toContain(bottom?.topLeft);
  expect(bottom?.neighbours).toContain(bottom?.top);
  expect(bottom?.neighbours).toContain(bottom?.topRight);
  expect(bottom?.neighbours).toContain(bottom?.right);

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
  expect(bottomRight?.neighbours).toContain(bottomRight?.topLeft);
  expect(bottomRight?.neighbours).toContain(bottomRight?.top);
  expect(bottomRight?.neighbours).toContain(bottomRight?.left);
});

it("grid traverses simple path correctly", () => {
  const traversal = [
    [0, 1, 0],
    [0, 1, 0],
    [0, 0, 0],
  ];

  const grid = new Grid(traversal);

  const start = new GridPos(0, 0);
  const end = new GridPos(0, 2);

  const path = grid.traverse(start, end);

  console.log(path.map((n) => `${n.x}:${n.y}`));

  expect(path.length).toEqual(5);
  expect(path[0].toString()).toEqual(`0:0`);
  expect(path[0].toString()).toEqual(`0:1`);
  expect(path[0].toString()).toEqual(`1:2`);
  expect(path[0].toString()).toEqual(`2:1`);
  expect(path[0].toString()).toEqual(`2:0`);
});
