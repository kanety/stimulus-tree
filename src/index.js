import { Controller } from '@hotwired/stimulus';
import '@kanety/stimulus-static-actions';
import Store from './store';
import Keyboard from './keyboard';
import Loader from './loader';
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
    return this.nodes.filter(node => this.ancestors(node).slice(0, -1).every(a => this.isOpened(a)));
  }

  connect() {
    this.init();
    this.keyboard = new Keyboard(this);
    this.store = new Store(this);
    this.store.load();
    this.loader = new Loader(this);
    this.loader.init();
  }

  init() {
    this.roots.forEach(root => this.initDescs(root));
  }

  initDescs(origin) {
    this.descendants(origin).forEach(node => {
      if (this.children(node).length == 0 && !this.isLazy(node)) {
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
    this.nodes.filter(node => !this.isOpened(node)).forEach(node => this.open(node));
  }

  collapse(e) {
    this.nodes.filter(node => this.isOpened(node)).forEach(node => this.close(node));
  }

  keydown(e) {
    this.keyboard.keydown(e);
  }

  open(node) {
    this.show(node);
    this.store.save();
    this.dispatch('opened', { detail: { node: node } });

    if (this.isLazy(node) && !this.isLazyLoaded(node)) {
      this.loader.load(node);
    }
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

  isLazy(node) {
    return node.matches('[data-node-lazy]');
  }

  isLazyLoaded(node) {
    return node.matches('[data-node-lazy-loaded]') || this.children(node).length != 0;
  }

  setLazyLoaded(node) {
    node.setAttribute('data-node-lazy-loaded', 'true');
  }
}
