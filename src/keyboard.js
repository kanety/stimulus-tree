export default class Keyboard {
  constructor(controller) {
    this.controller = controller;
  }

  get visibleIcons() {
    return this.controller.visibleNodes.filter(node => !node.matches('.st-tree__node--leaf')).map(node => this.controller.findIcon(node));
  }

  keydown(e) {
    if (!e.target.matches('a[href="#icon"]')) return;

    let node = e.target.parentNode;

    switch (e.code) {
    case 'ArrowLeft':
      this.moveLeft(node);
      e.preventDefault();
      break;
    case 'ArrowUp':
      this.moveUp(node);
      e.preventDefault();
      break;
    case 'ArrowRight':
      this.moveRight(node);
      e.preventDefault();
      break;
    case 'ArrowDown':
      this.moveDown(node);
      e.preventDefault();
      break;
    }
  }

  moveUp(node) {
    let icons = this.visibleIcons;
    let index = icons.indexOf(this.controller.findIcon(node)) - 1;
    if (index >= 0 && icons[index]) icons[index].focus();
  }

  moveDown(node) {
    let icons = this.visibleIcons;
    let index = icons.indexOf(this.controller.findIcon(node)) + 1;
    if (index >= 0 && icons[index]) icons[index].focus();
  }

  moveRight(node) {
    if (!node.matches('.st-tree__node--closed')) {
      let icon = this.controller.findIcon(node.querySelector('ul:first-of-type > li:first-of-type'));
      if (icon) icon.focus();
    } else {
      this.controller.open(node);
    }
  }

  moveLeft(node) {
    if (node.matches('.st-tree__node--closed')) {
      let icon = this.controller.findIcon(node.parentNode.parentNode)
      if (icon) icon.focus();
    } else {
      this.controller.close(node);
    }
  }
}
