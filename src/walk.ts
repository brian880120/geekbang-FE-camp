interface ICallbacks {
  enter: (node: any, parent: any) => void;
  leave: (node: any, parent: any) => void;
}

const walk = (ast: any, invokers: ICallbacks) => {
  visit(ast, null, invokers.enter, invokers.leave);
}

/*
    visit
    @params {*} node
    @params {*} parent
    @params {*} enter invoke when enter a node
    @params {*} leave invoke when leave a node
*/

const visit = (node: any, parent: any, enter: (node: any, parent: any) => void, leave: (node: any, parent: any) => void) => {
  enter(node, parent);

  //recursive call
  if (Array.isArray(node)) {
    node.forEach(nodeItem => {
      visit(nodeItem, node, enter, leave);
    });
  } else {
    Object.keys(node).forEach(key => {
      if (typeof node[key] === 'object' || Array.isArray(node[key])) {
        visit(node[key], node, enter, leave);
      }
    });
  }
  leave(node, parent);
}

export {
  walk,
}
