import { Application } from '@hotwired/stimulus';
import TreeController from 'index';

const application = Application.start();
application.register('tree', TreeController);

describe('callbacks', () => {
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

  let message;
  beforeEach(() => {
    let tree = document.querySelector('[data-controller="tree"]');
    tree.addEventListener('tree:opened', (e) => {
      message = 'opened: ' + e.detail.node.getAttribute('data-node-id');
    });
    tree.addEventListener('tree:closed', (e) => {
      message = 'closed: ' + e.detail.node.getAttribute('data-node-id');
    });
  });

  it('runs callbacks', () => {
    let icon = document.querySelector('[data-node-id="1.1"] > a');
    icon.click();
    expect(message).toEqual('closed: 1.1');
    icon.click();
    expect(message).toEqual('opened: 1.1');
  });
});
