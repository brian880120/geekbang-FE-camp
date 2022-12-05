interface INode {
  parent: Scope;
}
  
type Node = INode | string;

class Scope {
  node: Node;
  parent: Scope | null;
  names: Set<string>;

  constructor(node: Node) {
    if (typeof node !== 'string') {
      this.parent = node.parent;
    } else {
      this.parent = null;
    }
    this.node = node;
    this.names = new Set<string>();
  }

  add(element: string): void {
    this.names.add(element);
  }

  contains(element: string): boolean {
    return this.findDefiningScope(element) !== undefined;
  }

  findDefiningScope(element: string): Scope | null {
    return Scope.findScope(this, element);
  }

  static findScope(scope: Scope, element: string): Scope | null {
    if (scope.parent === null) {
      if (scope.names.has(element)) return scope;
      return null;
    }

    if (scope.names.has(element)) return scope;
    return this.findScope(scope.parent, element);
  }
}

export default Scope;
