import { Grid, GridNode } from "./grid";

export const debugPath = (
  graph: Grid,
  nodes: GridNode[],
  startX: number,
  startY: number,
  endX: number,
  endY: number
) => {
  const lines = [];

  lines.push("path");
  lines.push(nodes.map((n) => `${n.x}:${n.y}`));

  for (let y = 0; y < graph.grid.length; y++) {
    let line = "";
    for (let x = 0; x < graph.grid[y].length; x++) {
      const isWall = graph.grid[y][x].isWall();
      const traversed = !!nodes.find((n) => n.x === x && n.y === y);
      const isStart = x === startX && y === startY;
      const isEnd = x === endX && y === endY;

      if (isStart) {
        line += `[S]`;
      } else if (isEnd) {
        line += `[E]`;
      } else if (isWall) {
        line += `[W]`;
      } else if (traversed) {
        line += `[X]`;
      } else {
        line += `[ ]`;
      }
    }

    lines.push(line);
  }

  return lines.join("\n");
};
