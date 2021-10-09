import { Controller } from '@hotwired/stimulus';
import '@kanety/stimulus-static-actions';
import Keyboard from './keyboard';
import './index.scss';

export default class extends Controller {
  static values = {
    storeKey: String
  };
  static actions = [
    ['element', 'click->toggle'],
    ['element', 'keydown->keydown'],
    ['element', ':expand->expand'],
    ['element', ':collapse->collapse']
  ];

  get nodes() {
    return this.scope.findAllElements('li');
  }

  get openedNodes() {
    return this.scope.findAllElements('li:not(.st-tree__node--closed)');
  }
  
  connect() {
    this.init();
    this.load();
    this.keyboard = new Keyboard(this);
  }

  init() {
    this.nodes.forEach(node => {
      if (!this.hasChildren(node)) {
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

  keydown(e) {
    this.keyboard.keydown(e);
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

  hasChildren(node) {
    return Array.from(node.children).some(child => child.matches('ul'));
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
}
