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

export class Grid {
  public traversal: number[][];
  public readonly width: number;
  public readonly height: number;

  constructor(traversal: number[][]) {
    const { traversal: clone, width, height }= this.cloneTraversal(traversal);
    this.traversal = clone;
    this.width = width;
    this.height = height;
  }

  private cloneTraversal(traversal: number[][]) {
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

    return { traversal: copy, width, height: traversal.length }
  }

  public toString(): string {
    const lines: string[] = [];

    for (const row of this.traversal) {
      lines.push(row.join(", "));
    }

    return lines.join("\n");
  }

  private positionIsValid(pos: GridPos) {
    return pos.x >= 0 && pos.x < this.width && pos.y >= 0 && pos.y < this.height;
  }

  public traverse(start: GridPos, end: GridPos) {
    if (!this.positionIsValid(start)) {
      throw new Error(`(${start.x}, ${start.y}) is out of bounds of grid (w: ${this.width}, h: ${this.height})`);
    }
    if (!this.positionIsValid(end)) {
      throw new Error(`(${end.x}, ${end.y}) is out of bounds of grid (w: ${this.width}, h: ${this.height})`);
    }
  }
}