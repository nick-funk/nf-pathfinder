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

        const node = grid[y][x];
        node.topLeft = this.convertTraversalToNode(grid, topLeft);
        node.top = this.convertTraversalToNode(grid, top);
        node.topRight = this.convertTraversalToNode(grid, topRight);
        node.right = this.convertTraversalToNode(grid, right);
        node.bottomRight = this.convertTraversalToNode(grid, bottomRight);
        node.bottom = this.convertTraversalToNode(grid, bottom);
        node.bottomLeft = this.convertTraversalToNode(grid, bottomLeft);
        node.left = this.convertTraversalToNode(grid, left);

        const neighbours: Node[] = [];
        this.addNeighbourIfDefined(neighbours, node.topLeft);
        this.addNeighbourIfDefined(neighbours, node.top);
        this.addNeighbourIfDefined(neighbours, node.topRight);
        this.addNeighbourIfDefined(neighbours, node.right);
        this.addNeighbourIfDefined(neighbours, node.bottomRight);
        this.addNeighbourIfDefined(neighbours, node.bottom);
        this.addNeighbourIfDefined(neighbours, node.bottomLeft);
        this.addNeighbourIfDefined(neighbours, node.left);

        node.neighbours = neighbours;
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

  private convertTraversalToNode(
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

    return { value: traversal[y][x], x, y };
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

  public traverse(start: GridPos, end: GridPos) {
    if (!this.positionIsValid(start)) {
      throw new Error(`(${start.x}, ${start.y}) is out of bounds of grid`);
    }
    if (!this.positionIsValid(end)) {
      throw new Error(`(${end.x}, ${end.y}) is out of bounds of grid`);
    }
  }
}
