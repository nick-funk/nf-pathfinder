export class TreeNode<T> {
  public readonly value: T;

  public marked: boolean;

  public branches: TreeNode<T>[];

  constructor(value: T) {
    this.value = value;
    this.marked = false;

    this.branches = [];
  }

  public addBranch(node: TreeNode<T>) {
    for (const b of this.branches) {
      if (b.value === node.value) {
        return;
      }
    }

    this.branches.push(node);
  }
}