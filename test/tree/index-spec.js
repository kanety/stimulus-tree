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
            </li>
          </ul>
        </li>
      </ul>
    `;
  });

  it('opens and closes', () => {
    $('[data-node-id="1"] > a').click();
    expect($('[data-node-id="1"]').matches('.st-tree__node--closed')).toEqual(true);
    $('[data-node-id="1"] > a').click();
    expect($('[data-node-id="1"]').matches('.st-tree__node--closed')).toEqual(false);
  });
});
