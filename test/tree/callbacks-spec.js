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
    $('[data-controller="tree"]').addEventListener('tree:opened', (e) => {
      message = 'opened: ' + e.detail.node.getAttribute('data-node-id');
    });
    $('[data-controller="tree"]').addEventListener('tree:closed', (e) => {
      message = 'closed: ' + e.detail.node.getAttribute('data-node-id');
    });
  });

  it('runs callbacks', () => {
    $('[data-node-id="1.1"] > a').click();
    expect(message).toEqual('closed: 1.1');
    $('[data-node-id="1.1"] > a').click();
    expect(message).toEqual('opened: 1.1');
  });
});
