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
    let icon = document.querySelector('[data-node-id="1"] > a');
    icon.click();
    expect(icon.parentNode.matches('.st-tree__node--closed')).toEqual(true);
    icon.click();
    expect(icon.parentNode.matches('.st-tree__node--closed')).toEqual(false);
  });

  describe('keyboard', () => {
    it('moves focus by up key', () => {
      let icon = document.querySelector('[data-node-id="1.1"] > a');
      icon.focus();
      icon.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 38, bubbles: true }));
      expect(document.activeElement.parentNode.getAttribute('data-node-id')).toEqual('1');
    });

    it('moves focus by down key', () => {
      let icon = document.querySelector('[data-node-id="1.1"] > a');
      icon.focus();
      icon.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 40, bubbles: true }));
      expect(document.activeElement.parentNode.getAttribute('data-node-id')).toEqual('1.1.1');
    });

    it('moves focus by left key', () => {
      let icon = document.querySelector('[data-node-id="1.1"] > a');
      icon.click();
      icon.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 37, bubbles: true }));
      expect(document.activeElement.parentNode.getAttribute('data-node-id')).toEqual('1');
    });

    it('closes node by left key', () => {
      let icon = document.querySelector('[data-node-id="1.1"] > a');
      icon.focus();
      icon.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 37, bubbles: true }));
      expect(icon.parentNode.matches('.st-tree__node--closed')).toEqual(true);
    });

    it('moves focus by right key', () => {
      let icon = document.querySelector('[data-node-id="1.1"] > a');
      icon.focus();
      icon.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 39, bubbles: true }));
      expect(document.activeElement.parentNode.getAttribute('data-node-id')).toEqual('1.1.1');
    });

    it('opens node by right key', () => {
      let icon = document.querySelector('[data-node-id="1.1"] > a');
      icon.click();
      icon.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 39, bubbles: true }));
      expect(icon.parentNode.matches('.st-tree__node--closed')).toEqual(false);
    });
  });
});
