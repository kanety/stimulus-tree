import { Controller } from '@hotwired/stimulus';
import '@kanety/stimulus-static-actions';
import Store from './store';
import Keyboard from './keyboard';
import './index.scss';

export default class extends Controller {
  static values = {
    storeKey: String
  };
  static actions = [
    ['element', 'click->toggle'],
    ['element', 'keydown->keydown']
  ];

  get nodes() {
    return this.scope.findAllElements('li');
  }

  get openedNodes() {
    return this.scope.findAllElements('li:not(.st-tree__node--closed)');
  }

  get visibleNodes() {
    return this.nodes.filter(node => !node.parentNode.closest('li.st-tree__node--closed'));
  }

  connect() {
    this.init();
    this.keyboard = new Keyboard(this);
    this.store = new Store(this);
    this.store.load();
  }

  init() {
    this.nodes.forEach(node => {
      if (!this.hasChildren(node)) {
        node.classList.add('st-tree__node--leaf', 'st-tree__node--closed');
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
    this.store.save();
  }

  collapse(e) {
    this.nodes.forEach(node => this.hide(node));
    this.store.save();
  }

  keydown(e) {
    this.keyboard.keydown(e);
  }

  open(node) {
    this.show(node);
    this.store.save();
    this.dispatch('opened', { detail: { node: node } });
  }

  close(node) {
    this.hide(node);
    this.store.save();
    this.dispatch('closed', { detail: { node: node } });
  }

  show(node) {
    node.classList.remove('st-tree__node--closed');
  }

  hide(node) {
    node.classList.add('st-tree__node--closed');
  }

  hasChildren(node) {
    return Array.from(node.children).some(child => child.matches('ul'));
  }

  findIcon(node) {
    return node.querySelector('a[href="#icon"]');
  }
}
