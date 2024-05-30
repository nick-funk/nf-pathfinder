import { search } from "./aStar";
import { Grid } from "./grid";
import { debugPath } from "./debug";

const run = () => {
  const startX = 0;
  const startY = 0;
  const endX = 0;
  const endY = 4;

  console.log(`start: ${startX}, ${startY}`);
  console.log(`end: ${endX}, ${endY}`);

  const startTime = Date.now();

  const graph = new Grid(
    [
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
    ],
    { diagonal: true }
  );

  const start = graph.grid[startY][startX];
  const end = graph.grid[endY][endX];

  const nodes = search(graph, start, end);
  const endTime = Date.now();

  console.log(debugPath(graph, nodes, startX, startY, endX, endY));

  console.log(`solved in: ${endTime - startTime} ms`);
};

run();
