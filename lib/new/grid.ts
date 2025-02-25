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

interface NodeProps {
  x: number;
  y: number;
  topLeft: boolean;
  top: boolean;
  topRight: boolean;
  right: boolean;
  bottomRight: boolean;
  bottom: boolean;
  bottomLeft: boolean;
  left: boolean;
}

export class Node {
  public readonly x: number;
  public readonly y: number;

  public topLeft: boolean;
  public top: boolean;
  public topRight: boolean;
  public right: boolean;
  public bottomRight: boolean;
  public bottom: boolean;
  public bottomLeft: boolean;
  public left: boolean;

  constructor({
    x,
    y,
    topLeft,
    top,
    topRight,
    right,
    bottomRight,
    bottom,
    bottomLeft,
    left,
  }: NodeProps) {
    this.x = x;
    this.y = y;

    this.topLeft = topLeft;
    this.top = top;
    this.topRight = topRight;
    this.right = right;
    this.bottomRight = bottomRight;
    this.bottom = bottom;
    this.bottomLeft = bottomLeft;
    this.left = left;
  }
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
        const topLeft = this.getValueFromTraversal(
          x - 1,
          y - 1,
          this.rawTraversal,
          width,
          height
        );
        const top = this.getValueFromTraversal(x, y - 1, this.rawTraversal, width, height);
        const topRight = this.getValueFromTraversal(
          x + 1,
          y - 1,
          this.rawTraversal,
          width,
          height
        );
        const right = this.getValueFromTraversal(x + 1, y, this.rawTraversal, width, height);
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
        const left = this.getValueFromTraversal(x - 1, y, this.rawTraversal, width, height);

        const node = new Node({
          x,
          y,
          topLeft: topLeft === Traversal.GROUND,
          top: top === Traversal.GROUND,
          topRight: topRight === Traversal.GROUND,
          right: right === Traversal.GROUND,
          bottomRight: bottomRight === Traversal.GROUND,
          bottom: bottom === Traversal.GROUND,
          bottomLeft: bottomLeft === Traversal.GROUND,
          left: left === Traversal.GROUND,
        });

        row.push(node);
      }

      grid.push(row);
    }

    return grid;
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
  ): number | null {
    if (x < 0 || x >= width || y < 0 || y >= height) {
      return null;
    }

    return traversal[y][x];
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
