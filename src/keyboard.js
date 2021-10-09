export default class Keyboard {
  constructor(controller) {
    this.controller = controller;
  }

  get nodes() {
    return this.controller.nodes;
  }

  get visibleNodes() {
    return this.nodes.filter(node => !node.parentNode.closest('li.st-tree__node--closed'));
  }

  get visibleIcons() {
    return this.visibleNodes.filter(node => !node.matches('.st-tree__node--leaf')).map(node => this.findIcon(node));
  }

  keydown(e) {
    if (!e.target.matches('a[href="#icon"]')) return;

    let node = e.target.parentNode;

    switch (e.keyCode) {
    case 37: // left
      this.moveLeft(node);
      e.preventDefault();
      break;
    case 38: // up
      this.moveUp(node);
      e.preventDefault();
      break;
    case 39: // right
      this.moveRight(node);
      e.preventDefault();
      break;
    case 40: // down
      this.moveDown(node);
      e.preventDefault();
      break;
    }
  }

  moveUp(node) {
    let icons = this.visibleIcons;
    let index = icons.indexOf(this.findIcon(node)) - 1;
    if (index >= 0 && icons[index]) icons[index].focus();
  }

  moveDown(node) {
    let icons = this.visibleIcons;
    let index = icons.indexOf(this.findIcon(node)) + 1;
    if (index >= 0 && icons[index]) icons[index].focus();
  }

  moveRight(node) {
    if (!node.matches('.st-tree__node--closed')) {
      let icon = this.findIcon(node.querySelector('ul:first-of-type > li:first-of-type'));
      if (icon) icon.focus();
    } else {
      this.controller.open(node);
    }
  }

  moveLeft(node) {
    if (node.matches('.st-tree__node--closed')) {
      let icon = this.findIcon(node.parentNode.parentNode)
      if (icon) icon.focus();
    } else {
      this.controller.close(node);
    }
  }

  findIcon(node) {
    return node.querySelector('a[href="#icon"]');
  }
}
