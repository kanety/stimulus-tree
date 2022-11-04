export default class Loader {
  constructor(controller) {
    this.controller = controller;
  }

  init() {
    this.controller.roots.forEach(root => this.loadDescs(root));
  }

  loadDescs(origin) {
    let nodes = this.controller.descendants(origin).filter(node => {
      return this.controller.isLazy(node) && this.controller.isOpened(node) && !this.controller.isLazyLoaded(node)
    });
    nodes.forEach(node => this.load(node));
  }

  async load(node) {
    node.setAttribute('aria-busy', 'true');

    try {
      let response = await fetch(node.getAttribute('data-node-lazy'));
      if (response.ok) {
        let text = await response.text();
        this.loaded(node, text);
        this.loadDescs(node);
      }
    } catch(e) {
      console.error(e);
    }

    node.removeAttribute('aria-busy');
  }

  loaded(node, html) {
    this.replace(node, html);
    this.controller.initDescs(node);
    this.controller.store.save();
    this.controller.dispatch('loaded', { detail: { node: node, html: html } });
  }

  replace(node, html) {
    let nodeID = node.getAttribute('data-node-id');
    let tmp = document.createElement('div');
    tmp.innerHTML = html;
    node.innerHTML = tmp.querySelector(`[data-node-id="${nodeID}"]`).innerHTML;
    this.controller.setLazyLoaded(node);
  }
}
