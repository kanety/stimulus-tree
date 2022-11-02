describe('tree', () => {
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
            <li data-node-id="1.2">
              <a href="#icon"></a>
              <span>1.2</span>
              <ul>
                <li data-node-id="1.2.1">
                  <a href="#icon"></a>
                  <span>1.2.1</span>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li data-node-id="2">
          <a href="#icon"></a>
          <span>2</span>
        </li>
      </ul>
    `;
  });

  let tree;

  beforeEach(() => {
    tree = application.getControllerForElementAndIdentifier($('ul'), 'tree');
  });

  it('returns root nodes', () => {
    expect(tree.roots).toEqual([$('[data-node-id="1"]'), $('[data-node-id="2"]')]);
  });

  it('returns parent node', () => {
    expect(tree.parent($('[data-node-id="1.1"]'))).toEqual($('[data-node-id="1"]'));
  });

  it('returns child nodes', () => {
    expect(tree.children($('[data-node-id="1"]'))).toEqual([$('[data-node-id="1.1"]'), $('[data-node-id="1.2"]')]);
  });

  it('returns ancestors', () => {
    expect(tree.ancestors($('[data-node-id="1.2.1"]'))).toEqual(
      [$('[data-node-id="1"]'), $('[data-node-id="1.2"]'), $('[data-node-id="1.2.1"]')]
    );
  });

  it('returns descendants', () => {
    expect(tree.descendants($('[data-node-id="1"]'))).toEqual(
      [$('[data-node-id="1"]'), $('[data-node-id="1.1"]'), $('[data-node-id="1.1.1"]'), $('[data-node-id="1.2"]'), $('[data-node-id="1.2.1"]')]
    );
  });
});
