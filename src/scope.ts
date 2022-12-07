type Node = {
  parent: Scope;
};

class Scope {
  parent: Scope | null;
  names: Set<string>;

  constructor(node?: Node) {
    if (node) {
      this.parent = node.parent;
    } else {
      this.parent = null;
    }
    this.names = new Set<string>();
  }

  add(element: string): void {
    this.names.add(element);
  }

  contains(element: string): boolean {
    return this.findDefiningScope(element) !== null;
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
