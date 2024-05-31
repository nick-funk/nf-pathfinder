import { BinaryHeap } from "./BinaryHeap";
import { GridNode, Grid } from "./grid";

export interface Pos {
  x: number;
  y: number;
}

const pathTo = (node: GridNode) => {
  let curr = node;
  let path = [];
  while (curr.parent) {
    path.unshift(curr);
    curr = curr.parent;
  }
  return path;
};

const getHeap = () => {
  return new BinaryHeap((node) => {
    return node.f;
  });
};

export const search = (
  graph: Grid,
  start: GridNode,
  end: GridNode,
  options?: { closest: boolean; heuristic: (pos0: any, pos1: any) => number }
) => {
  graph.cleanDirty();
  let heuristic = options?.heuristic ? options.heuristic : manhattan;
  let closest = options?.closest || false;

  let openHeap = getHeap();
  let closestNode = start; // set the start node to be the closest if required

  start.h = heuristic(start, end);
  graph.markDirty(start);

  openHeap.push(start);

  while (openHeap.size() > 0) {
    // Grab the lowest f(x) to process next.  Heap keeps this sorted for us.
    let currentNode = openHeap.pop();

    // End case -- result has been found, return the traced path.
    if (currentNode === end) {
      return pathTo(currentNode);
    }

    // Normal case -- move currentNode from open to closed, process each of its neighbors.
    currentNode.closed = true;

    // Find all neighbors for the current node.
    let neighbors = graph.neighbors(currentNode);

    for (let i = 0, il = neighbors.length; i < il; ++i) {
      let neighbor = neighbors[i];

      if (neighbor.closed || neighbor.isWall()) {
        // Not a valid node to process, skip to next neighbor.
        continue;
      }

      // The g score is the shortest distance from start to current node.
      // We need to check if the path we have arrived at this neighbor is the shortest one we have seen yet.
      let gScore = currentNode.g + neighbor.getCost(currentNode);
      let beenVisited = neighbor.visited;

      if (!beenVisited || gScore < neighbor.g!) {
        // Found an optimal (so far) path to this node.  Take score for node to see how good it is.
        neighbor.visited = true;
        neighbor.parent = currentNode;
        neighbor.h = neighbor.h || heuristic(neighbor, end);
        neighbor.g = gScore;
        neighbor.f = neighbor.g! + neighbor.h;
        graph.markDirty(neighbor);
        if (closest) {
          // If the neighbour is closer than the current closestNode or if it's equally close but has
          // a cheaper path than the current closest node then it becomes the closest node
          if (
            neighbor.h < closestNode.h! ||
            (neighbor.h === closestNode.h && neighbor.g! < closestNode.g!)
          ) {
            closestNode = neighbor;
          }
        }

        if (!beenVisited) {
          // Pushing to heap will put it in proper place based on the 'f' value.
          openHeap.push(neighbor);
        } else {
          // Already seen the node, but since it has been rescored we need to reorder it in the heap
          openHeap.rescoreElement(neighbor);
        }
      }
    }
  }

  if (closest) {
    return pathTo(closestNode);
  }

  // No result was found - empty array signifies failure to find path.
  return [];
};

export const manhattan = (pos0: Pos, pos1: Pos) => {
  let d1 = Math.abs(pos1.x - pos0.x);
  let d2 = Math.abs(pos1.y - pos0.y);
  return d1 + d2;
};

export const diagonal = (pos0: Pos, pos1: Pos) => {
  let D = 1;
  let D2 = Math.sqrt(2);
  let d1 = Math.abs(pos1.x - pos0.x);
  let d2 = Math.abs(pos1.y - pos0.y);
  return D * (d1 + d2) + (D2 - 2 * D) * Math.min(d1, d2);
};
