interface INode {
  parent: Scope;
}
  
type Node = INode | string;

class Scope {
  node: Node;
  names: Set<string>;
  scopes!: Map<string, Scope>;

  constructor(node: Node) {
    this.node = node;
    this.names = new Set<string>();
  }

  add(element: string): void {
    this.names.add(element);
    this.scopes.set(element, this);
  }

  contains(element: string): boolean {
    return this.names.has(element);
  }

  findDefiningScope(element: string): Scope | undefined {
    return this.scopes.get(element);
  }
}

export default Scope;
