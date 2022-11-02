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

  get roots() {
    return Array.from(this.element.children);
  }

  get nodes() {
    return this.scope.findAllElements('li');
  }

  get openedNodes() {
    return this.nodes.filter(node => this.isOpened(node));
  }

  get visibleNodes() {
    return this.nodes.filter(node => {
      let ancestors = this.ancestors(node).slice(0, -1);
      return ancestors.every(a => this.isOpened(a));
    });
  }

  connect() {
    this.init();
    this.keyboard = new Keyboard(this);
    this.store = new Store(this);
    this.store.load();
  }

  init() {
    this.nodes.forEach(node => {
      if (!this.hasChildList(node)) {
        node.classList.add('st-tree__node--leaf', 'st-tree__node--closed');
      }
    });
  }

  toggle(e) {
    if (!this.isIcon(e.target)) return;

    let node = e.target.parentElement;

    if (this.isOpened(node)) {
      this.close(node);
    } else {
      this.open(node);
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

  parent(node) {
    let parent = node.parentElement.parentElement;
    return parent && parent.matches('li') ? parent : null;
  }

  children(node) {
    let ul = Array.from(node.children).find(child => child.matches('ul'));
    return ul ? Array.from(ul.children) : [];
  }

  ancestors(node) {
    let parent = this.parent(node);
    return parent ? this.ancestors(parent).concat([node]) : [node];
  }

  descendants(node) {
    return [node].concat(this.children(node).flatMap(child => this.descendants(child)));
  }

  hasChildList(node) {
    return Array.from(node.children).some(child => child.matches('ul'));
  }

  isOpened(node) {
    return !node.matches('.st-tree__node--closed');
  }

  isLeaf(node) {
    return node.matches('.st-tree__node--leaf');
  }

  findIcon(node) {
    return node.querySelector('a[href="#icon"]');
  }

  isIcon(elem) {
    return elem.matches('a[href="#icon"]');
  }
}
