import { TreeNode } from "./tree";

export enum Traversal {
  GROUND = 0,
  WALL = 1,
}

export class GridPos {
  public readonly x: number;
  public readonly y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public toString(): string {
    return `${this.x}:${this.y}`;
  }
}

interface Node {
  x: number;
  y: number;
  value: Traversal;

  topLeft?: Node;
  top?: Node;
  topRight?: Node;
  right?: Node;
  bottomRight?: Node;
  bottom?: Node;
  bottomLeft?: Node;
  left?: Node;

  neighbours: Node[];

  visited?: boolean;
}

interface TraversalValue {
  x: number;
  y: number;
  value: number;
}

export class Grid {
  public readonly width: number;
  public readonly height: number;

  public rawTraversal: number[][];
  public grid: Node[][];

  constructor(traversal: number[][]) {
    const {
      traversal: rawTraversal,
      width,
      height,
    } = this.cloneTraversal(traversal);
    this.rawTraversal = rawTraversal;
    this.width = width;
    this.height = height;

    this.grid = this.computeGrid(this.width, this.height);
  }

  public computeGrid(width: number, height: number) {
    const grid: Node[][] = [];

    for (let y = 0; y < height; y++) {
      const row: Node[] = [];
      for (let x = 0; x < width; x++) {
        row.push({ x, y, value: this.rawTraversal[y][x], neighbours: [] });
      }

      grid.push(row);
    }

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const node = grid[y][x];
        if (node.value !== Traversal.GROUND) {
          continue;
        }

        const topLeft = this.getValueFromTraversal(
          x - 1,
          y - 1,
          this.rawTraversal,
          width,
          height
        );
        const top = this.getValueFromTraversal(
          x,
          y - 1,
          this.rawTraversal,
          width,
          height
        );
        const topRight = this.getValueFromTraversal(
          x + 1,
          y - 1,
          this.rawTraversal,
          width,
          height
        );
        const right = this.getValueFromTraversal(
          x + 1,
          y,
          this.rawTraversal,
          width,
          height
        );
        const bottomRight = this.getValueFromTraversal(
          x + 1,
          y + 1,
          this.rawTraversal,
          width,
          height
        );
        const bottom = this.getValueFromTraversal(
          x,
          y + 1,
          this.rawTraversal,
          width,
          height
        );
        const bottomLeft = this.getValueFromTraversal(
          x - 1,
          y + 1,
          this.rawTraversal,
          width,
          height
        );
        const left = this.getValueFromTraversal(
          x - 1,
          y,
          this.rawTraversal,
          width,
          height
        );

        node.topLeft = this.convertTraversalToNeighbourNode(grid, topLeft);
        node.top = this.convertTraversalToNeighbourNode(grid, top);
        node.topRight = this.convertTraversalToNeighbourNode(grid, topRight);
        node.right = this.convertTraversalToNeighbourNode(grid, right);
        node.bottomRight = this.convertTraversalToNeighbourNode(grid, bottomRight);
        node.bottom = this.convertTraversalToNeighbourNode(grid, bottom);
        node.bottomLeft = this.convertTraversalToNeighbourNode(grid, bottomLeft);
        node.left = this.convertTraversalToNeighbourNode(grid, left);

        const neighbours: Node[] = [];

        this.addNeighbourIfDefined(neighbours, node.topLeft);
        this.addNeighbourIfDefined(neighbours, node.top);
        this.addNeighbourIfDefined(neighbours, node.topRight);
        this.addNeighbourIfDefined(neighbours, node.right);
        this.addNeighbourIfDefined(neighbours, node.bottomRight);
        this.addNeighbourIfDefined(neighbours, node.bottom);
        this.addNeighbourIfDefined(neighbours, node.bottomLeft);
        this.addNeighbourIfDefined(neighbours, node.left);

        node.neighbours = Array.from(neighbours);
      }
    }

    return grid;
  }

  private addNeighbourIfDefined(
    neighbours: Node[],
    node: Node | undefined | null
  ) {
    if (!node) {
      return;
    }

    neighbours.push(node);
  }

  private convertTraversalToNeighbourNode(
    grid: Node[][],
    traversalValue: TraversalValue | null
  ) {
    if (!traversalValue || traversalValue.value !== Traversal.GROUND) {
      return undefined;
    }

    return grid[traversalValue.y][traversalValue.x];
  }

  public getNode(x: number, y: number): Node | null {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
      return null;
    }

    return this.grid[y][x];
  }

  public getNodeFromTraversal(
    x: number,
    y: number,
    traversal: number[][],
    width: number,
    height: number
  ): TraversalValue | null {
    if (x < 0 || x >= width || y < 0 || y >= height) {
      return null;
    }

    return { value: traversal[y][x], x, y };
  }

  public getValueFromTraversal(
    x: number,
    y: number,
    traversal: number[][],
    width: number,
    height: number
  ): TraversalValue | null {
    if (x < 0 || x >= width || y < 0 || y >= height) {
      return null;
    }

    const value = traversal[y][x];
    if (value !== Traversal.GROUND) {
      return null;
    }

    return { value, x, y };
  }

  public cloneTraversal(traversal: number[][]) {
    let copy: number[][] = [];
    let width: number = 0;

    for (let y = 0; y < traversal.length; y++) {
      const row = traversal[y];
      const newRow: number[] = [];

      width = Math.max(row.length, width);

      for (let x = 0; x < row.length; x++) {
        newRow.push(row[x]);
      }

      copy.push(newRow);
    }

    return { traversal: copy, width, height: traversal.length };
  }

  public toString(): string {
    const lines: string[] = [];

    for (const row of this.rawTraversal) {
      lines.push(row.join(", "));
    }

    return lines.join("\n");
  }

  private positionIsValid(pos: GridPos) {
    return (
      pos.x >= 0 && pos.x < this.width && pos.y >= 0 && pos.y < this.height
    );
  }

  public traverse(start: GridPos, end: GridPos): GridPos[] {
    if (!this.positionIsValid(start)) {
      throw new Error(`(${start.x}, ${start.y}) is out of bounds of grid`);
    }
    if (!this.positionIsValid(end)) {
      throw new Error(`(${end.x}, ${end.y}) is out of bounds of grid`);
    }

    const s = this.getNode(start.x, start.y);
    const e = this.getNode(end.x, end.y);

    if (!s || !e) {
      return [];
    }

    const root = new TreeNode<Node>(s);

    this.dfsTraverse(root, e);
    const path: Node[] = [];
    this.computePath(root, path);

    // console.log(path.map((n) => `${n.x}:${n.y}`));

    return [];
  }

  private computePath(node: TreeNode<Node>, path: Node[]) {
    if (!node.marked) {
      return [];
    }

    path.push(node.value);

    for (const b of node.branches) {
      if (b.marked) {
        this.computePath(b, path);
        break;
      }
    }
  }

  private dfsTraverse(current: TreeNode<Node>, target: Node): boolean {
    current.value.visited = true;

    if (current.value.x === target.x && current.value.y === target.y) {
      console.log("found it!");
      current.marked = true;
      return true;
    }

    for (const n of current.value.neighbours) {
      if (!n.visited) {
        const tn = new TreeNode<Node>(n);
        current.addBranch(tn);

        const result = this.dfsTraverse(tn, target);
        if (result) {
          current.marked = true;
          return result;
        }
      }
    }

    return false;
  }
}
