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
                  <ul>
                    <li data-node-id="1.1.1.1">
                      <a href="#icon"></a>
                      <span>1.1.1.1</span>
                    </li>
                  </ul>
                </li>
              </ul>
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

  describe('keyboard', () => {
    it('moves focus by up key', () => {
      $('[data-node-id="1.1"] > a').focus();
      $('[data-node-id="1.1"] > a').dispatchEvent(new KeyboardEvent('keydown', { keyCode: 38, bubbles: true }));
      expect(document.activeElement.parentNode.getAttribute('data-node-id')).toEqual('1');
    });

    it('moves focus by down key', () => {
      $('[data-node-id="1.1"] > a').focus();
      $('[data-node-id="1.1"] > a').dispatchEvent(new KeyboardEvent('keydown', { keyCode: 40, bubbles: true }));
      expect(document.activeElement.parentNode.getAttribute('data-node-id')).toEqual('1.1.1');
    });

    it('moves focus by left key', () => {
      $('[data-node-id="1.1"] > a').click();
      $('[data-node-id="1.1"] > a').dispatchEvent(new KeyboardEvent('keydown', { keyCode: 37, bubbles: true }));
      expect(document.activeElement.parentNode.getAttribute('data-node-id')).toEqual('1');
    });

    it('closes node by left key', () => {
      $('[data-node-id="1.1"] > a').focus();
      $('[data-node-id="1.1"] > a').dispatchEvent(new KeyboardEvent('keydown', { keyCode: 37, bubbles: true }));
      expect($('[data-node-id="1.1"]').matches('.st-tree__node--closed')).toEqual(true);
    });

    it('moves focus by right key', () => {
      $('[data-node-id="1.1"] > a').focus();
      $('[data-node-id="1.1"] > a').dispatchEvent(new KeyboardEvent('keydown', { keyCode: 39, bubbles: true }));
      expect(document.activeElement.parentNode.getAttribute('data-node-id')).toEqual('1.1.1');
    });

    it('opens node by right key', () => {
      $('[data-node-id="1.1"] > a').click();
      $('[data-node-id="1.1"] > a').dispatchEvent(new KeyboardEvent('keydown', { keyCode: 39, bubbles: true }));
      expect($('[data-node-id="1.1"]').matches('.st-tree__node--closed')).toEqual(false);
    });
  });
});
