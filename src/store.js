export default class Store {
  constructor(controller) {
    this.controller = controller;
  }

  get key() {
    return this.controller.storeKeyValue;
  }

  get nodes() {
    return this.controller.nodes;
  }

  get openedNodes() {
    return this.controller.openedNodes;
  }
  
  load() {
    if (!this.key) return;

    let ids = this.constructor.load(this.key);
    if (!ids) return;

    let idSet = new Set(ids);
    this.nodes.forEach(node => {
      if (idSet.has(node.getAttribute('data-node-id'))) {
        this.controller.show(node);
      } else {
        this.controller.hide(node);
      }
    });
  }

  save() {
    if (!this.key) return;

    let ids = this.openedNodes.map(node => node.getAttribute('data-node-id'));
    this.constructor.save(this.key, ids);
  }

  static load(key) {
    let json = sessionStorage.getItem(key);
    try {
      return JSON.parse(json)
    } catch(error) {
      console.error(error);
      return null;
    }
  }

  static save(key, value) {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch(error) {
      console.error(error);
      return null;
    }
  }
}
