interface GraphOptions {
  diagonal: boolean;
  closest?: boolean;
}

export const cleanNode = (node: GridNode) => {
  node.f = 0;
  node.g = 0;
  node.h = 0;
  node.visited = false;
  node.closed = false;
  node.parent = null;
};

export class Grid {
  public nodes: GridNode[];
  public diagonal: boolean;
  public grid: GridNode[][];

  public dirtyNodes: GridNode[];
  private closest: boolean | undefined;

  constructor(gridIn: number[][], options?: GraphOptions) {
    this.nodes = [];
    this.dirtyNodes = [];
    this.diagonal = options ? options.diagonal : false;
    this.closest = options?.closest;
    this.grid = [];

    for (let y = 0; y < gridIn.length; y++) {
      this.grid[y] = [];

      for (let x = 0, row = gridIn[y]; x < row.length; x++) {
        let node = new GridNode(x, y, row[x]);
        this.grid[y][x] = node;
        this.nodes.push(node);
      }
    }

    this.init();
  }

  public init() {
    this.dirtyNodes = [];
    for (let i = 0; i < this.nodes.length; i++) {
      cleanNode(this.nodes[i]);
    }
  }

  public cleanDirty() {
    for (let i = 0; i < this.dirtyNodes.length; i++) {
      cleanNode(this.dirtyNodes[i]);
    }
    this.dirtyNodes = [];
  }

  public markDirty(node: GridNode) {
    this.dirtyNodes.push(node);
  }

  public neighbors(node: GridNode) {
    let ret = [];
    let x = node.x;
    let y = node.y;
    let grid = this.grid;

    // West
    if (grid[y - 1] && grid[y - 1][x]) {
      ret.push(grid[y - 1][x]);
    }

    // East
    if (grid[y + 1] && grid[y + 1][x]) {
      ret.push(grid[y + 1][x]);
    }

    // South
    if (grid[y] && grid[y][x - 1]) {
      ret.push(grid[y][x - 1]);
    }

    // North
    if (grid[y] && grid[y][x + 1]) {
      ret.push(grid[y][x + 1]);
    }

    if (this.diagonal) {
      // Southwest
      if (grid[y - 1] && grid[y - 1][x - 1]) {
        ret.push(grid[y - 1][x - 1]);
      }

      // Southeast
      if (grid[y + 1] && grid[y + 1][x - 1]) {
        ret.push(grid[y + 1][x - 1]);
      }

      // Northwest
      if (grid[y - 1] && grid[y - 1][x + 1]) {
        ret.push(grid[y - 1][x + 1]);
      }

      // Northeast
      if (grid[y + 1] && grid[y + 1][x + 1]) {
        ret.push(grid[y + 1][x + 1]);
      }
    }

    return ret;
  }

  public toString() {
    let graphString = [];
    let nodes = this.grid;
    for (let x = 0; x < nodes.length; x++) {
      let rowDebug = [];
      let row = nodes[x];
      for (let y = 0; y < row.length; y++) {
        rowDebug.push(row[y].weight);
      }
      graphString.push(rowDebug.join(" "));
    }
    return graphString.join("\n");
  }
}

export class GridNode {
  public x: number;
  public y: number;
  public weight: number;

  public h?: number;
  public closed?: boolean;
  public visited?: boolean;
  public parent?: GridNode | null;
  public g?: number;
  public f?: number;

  constructor(x: number, y: number, weight: number) {
    this.x = x;
    this.y = y;
    this.weight = weight;
  }

  public toString() {
    return "[" + this.x + " " + this.y + "]";
  }

  public getCost(fromNeighbor: GridNode) {
    // Take diagonal weight into consideration.
    if (fromNeighbor && fromNeighbor.x != this.x && fromNeighbor.y != this.y) {
      return this.weight * 1.41421;
    }
    return this.weight;
  }

  public isWall() {
    return this.weight === 0;
  }
}
