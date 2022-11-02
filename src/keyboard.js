export default class Keyboard {
  constructor(controller) {
    this.controller = controller;
  }

  get visibleIcons() {
    let nodes = this.controller.visibleNodes.filter(node => !this.controller.isLeaf(node));
    return nodes.map(node => this.controller.findIcon(node));
  }

  keydown(e) {
    if (!this.controller.isIcon(e.target)) return;

    let node = e.target.parentElement;

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
    if (this.controller.isOpened(node)) {
      let child = this.controller.children(node)[0];
      if (child) {
        let icon = this.controller.findIcon(child);
        if (icon) icon.focus();
      }
    } else {
      this.controller.open(node);
    }
  }

  moveLeft(node) {
    if (!this.controller.isOpened(node)) {
      let parent = this.controller.parent(node);
      if (parent) {
        let icon = this.controller.findIcon(parent)
        if (icon) icon.focus();
      }
    } else {
      this.controller.close(node);
    }
  }
}
