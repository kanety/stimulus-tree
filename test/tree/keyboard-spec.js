describe('keyboard', () => {
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

  it('moves focus by up key', () => {
    $('[data-node-id="1.1"] > a').focus();
    $('[data-node-id="1.1"] > a').dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowUp', bubbles: true }));
    expect(document.activeElement.parentNode.getAttribute('data-node-id')).toEqual('1');
  });

  it('moves focus by down key', () => {
    $('[data-node-id="1.1"] > a').focus();
    $('[data-node-id="1.1"] > a').dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown', bubbles: true }));
    expect(document.activeElement.parentNode.getAttribute('data-node-id')).toEqual('1.1.1');
  });

  it('moves focus by left key', () => {
    $('[data-node-id="1.1"] > a').click();
    $('[data-node-id="1.1"] > a').dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowLeft', bubbles: true }));
    expect(document.activeElement.parentNode.getAttribute('data-node-id')).toEqual('1');
  });

  it('closes node by left key', () => {
    $('[data-node-id="1.1"] > a').focus();
    $('[data-node-id="1.1"] > a').dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowLeft', bubbles: true }));
    expect($('[data-node-id="1.1"]').matches('.st-tree__node--closed')).toEqual(true);
  });

  it('moves focus by right key', () => {
    $('[data-node-id="1.1"] > a').focus();
    $('[data-node-id="1.1"] > a').dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowRight', bubbles: true }));
    expect(document.activeElement.parentNode.getAttribute('data-node-id')).toEqual('1.1.1');
  });

  it('opens node by right key', () => {
    $('[data-node-id="1.1"] > a').click();
    $('[data-node-id="1.1"] > a').dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowRight', bubbles: true }));
    expect($('[data-node-id="1.1"]').matches('.st-tree__node--closed')).toEqual(false);
  });
});
