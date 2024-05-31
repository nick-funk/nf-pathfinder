import { Pos, manhattan, search } from "./aStar";
import { Grid } from "./grid";

export * from "./aStar";
export * from "./grid";
export * from "./BinaryHeap";
export * from "./debug";

export interface Vec2 {
  x: number;
  y: number;
}

export interface NodeResult {
  x: number;
  y: number;
  weight: number;
}

export const computePath = (
  grid: number[][],
  start: Vec2,
  end: Vec2,
  allowDiagonalMovement = true,
  swapCoords = true,
  scaleCoords: Vec2 = { x: 1, y: 1 },
  closest = true,
  heuristic: (pos0: Pos, pos1: Pos) => number = manhattan
): NodeResult[] => {
  const graph = new Grid(grid, { diagonal: allowDiagonalMovement });

  const s = graph.grid[start.x][start.y];
  const e = graph.grid[end.x][end.y];

  const path = search(graph, s, e, { closest, heuristic });

  const mappedCoords = swapCoords
    ? path.map((p) => {
        return { x: p.y, y: p.x, weight: p.weight };
      })
    : path.map((p) => {
        return { x: p.x, y: p.y, weight: p.weight };
      });

  return mappedCoords.map((c) => {
    return {
      x: c.x * scaleCoords.x,
      y: c.y * scaleCoords.y,
      weight: c.weight,
    };
  });
};
