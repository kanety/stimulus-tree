import { Application } from '@hotwired/stimulus';
import TreeController from 'index';

const application = Application.start();
application.register('tree', TreeController);

describe('index', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <ul data-controller="tree" data-tree-store-key-value="tree">
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

  it('saves states', () => {
    $('[data-node-id="1"] > a').click();
    expect($('[data-node-id="1"]').matches('.st-tree__node--closed')).toEqual(true);
  });

  it('loads states', () => {
    $('[data-node-id="1"] > a').click();
    expect($('[data-node-id="1"]').matches('.st-tree__node--closed')).toEqual(false);
  });
});
