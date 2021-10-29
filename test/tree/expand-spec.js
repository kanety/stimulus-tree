describe('expand', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <ul data-controller="tree" data-action="tree:expand->tree#expand tree:collapse->tree#collapse">
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
    $('[data-controller="tree"]').dispatchEvent(new CustomEvent('tree:collapse'));
    expect($('[data-node-id="1"]').matches('.st-tree__node--closed')).toEqual(true);
    expect($('[data-node-id="1.1"]').matches('.st-tree__node--closed')).toEqual(true);

    $('[data-controller="tree"]').dispatchEvent(new CustomEvent('tree:expand'));
    expect($('[data-node-id="1"]').matches('.st-tree__node--closed')).toEqual(false);
    expect($('[data-node-id="1.1"]').matches('.st-tree__node--closed')).toEqual(false);
  });
});
