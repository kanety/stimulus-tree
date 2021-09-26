import { Controller } from '@hotwired/stimulus';
import '@kanety/stimulus-static-actions';
import './index.scss';

export default class extends Controller {
  static values = {
    storeKey: String
  };
  static actions = [
    ['element', 'click->toggle'],
    ['element', 'keydown->keydown'],
    ['element', 'tree:expand->expand'],
    ['element', 'tree:collapse->collapse']
  ];

  get nodes() {
    return Array.from(this.element.querySelectorAll('li'));
  }

  get icons() {
    return Array.from(this.element.querySelectorAll('a[href="#icon"]'));
  }

  get openedNodes() {
    return Array.from(this.element.querySelectorAll('li:not(.st-tree__node--closed)'));
  }

  get visibleNodes() {
    return this.nodes.filter(node => !node.parentNode.closest('li.st-tree__node--closed'));
  }

  get visibleIcons() {
    return this.visibleNodes.filter(node => !node.matches('.st-tree__node--leaf')).map(node => this.findIcon(node));
  }
  
  connect() {
    this.init();
    this.load();
  }

  init() {
    this.nodes.forEach(node => {
      if (!node.querySelector('ul')) {
        node.classList.add('st-tree__node--leaf', 'st-tree__node--closed');
      }
    });
  }

  load() {
    let ids = this.loadStates();
    if (!ids) return;

    let idSet = new Set(ids);
    this.nodes.forEach(node => {
      if (idSet.has(node.getAttribute('data-node-id'))) {
        this.show(node);
      } else {
        this.hide(node);
      }
    });
  }

  toggle(e) {
    if (!e.target.matches('a[href="#icon"]')) return;

    let node = e.target.parentNode;
    if (node.matches('.st-tree__node--closed')) {
      this.open(node);
    } else {
      this.close(node);
    }

    e.preventDefault();
  }

  expand(e) {
    this.nodes.forEach(node => this.show(node));
    this.saveStates();
  }

  collapse(e) {
    this.nodes.forEach(node => this.hide(node));
    this.saveStates();
  }

  open(node) {
    this.show(node);
    this.saveStates();
    this.dispatch('opened', { detail: { node: node } });
  }

  close(node) {
    this.hide(node);
    this.saveStates();
    this.dispatch('closed', { detail: { node: node } });
  }

  show(node) {
    node.classList.remove('st-tree__node--closed');
  }

  hide(node) {
    node.classList.add('st-tree__node--closed');
  }
  
  loadStates() {
    if (!this.storeKeyValue) return;

    let json = sessionStorage.getItem(this.storeKeyValue);
    return json ? JSON.parse(json) : null;
  }

  saveStates() {
    if (!this.storeKeyValue) return;

    let ids = this.openedNodes.map(node => node.getAttribute('data-node-id'));
    sessionStorage.setItem(this.storeKeyValue, JSON.stringify(ids));
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
      this.open(node);
    }
  }

  moveLeft(node) {
    if (node.matches('.st-tree__node--closed')) {
      let icon = this.findIcon(node.parentNode.parentNode)
      if (icon) icon.focus();
    } else {
      this.close(node);
    }
  }

  findIcon(node) {
    return node.querySelector('a[href="#icon"]');
  }
}
