import { Application } from '@hotwired/stimulus';
import TreeController from 'index';

const application = Application.start();
application.register('tree', TreeController);

describe('index', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <ul data-controller="tree">
        <li data-node-id="1">
          <a href="#icon"></a>
          <span>1</span>
          <ul>
            <li data-node-id="1.1">
              <a href="#icon"></a>
              <span>1.1</span>
              <ul>
                <li data-node-id="1.1.1">
                  <a href="#icon"></a>
                  <span>1.1.1</span>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    `;
  });

  it('expands and collapses', () => {
    let tree = document.querySelector('[data-controller="tree"]');
    let node1 = document.querySelector('[data-node-id="1"]');
    let node2 = document.querySelector('[data-node-id="1.1"]');

    tree.dispatchEvent(new CustomEvent('tree:collapse'));
    expect(node1.matches('.st-tree__node--closed')).toEqual(true);
    expect(node2.matches('.st-tree__node--closed')).toEqual(true);

    tree.dispatchEvent(new CustomEvent('tree:expand'));
    expect(node1.matches('.st-tree__node--closed')).toEqual(false);
    expect(node2.matches('.st-tree__node--closed')).toEqual(false);
  });
});
