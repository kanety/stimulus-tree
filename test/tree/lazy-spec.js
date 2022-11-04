const fs = require('fs');

describe('lazy', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <ul data-controller="tree">
        <li class="st-tree__node--closed" data-node-id="1" data-node-lazy="./lazy.1.html">
          <a href="#icon"></a>
          <span>1</span>
        </li>
      </ul>
    `;
  });

  beforeEach(() => {
    fetch.resetMocks();
    fetch.mockResponses(
      [fs.readFileSync('test/fixtures/lazy.1.html', 'utf-8'), { status: 200 }],
      [fs.readFileSync('test/fixtures/lazy.1.1.html', 'utf-8'), { status: 200 }]
    );
  });

  beforeEach((done) => {
    $('[data-controller="tree"]').addEventListener('tree:loaded', e => {
      done();
    });
    $('[data-node-id="1"] > a').click();
  });

  it('loads nodes lazy', () => {
    expect($('[data-node-id="1.1"]').matches('li')).toEqual(true);
    expect($('[data-node-id="1.1.1"]').matches('li')).toEqual(true);
  });
});
