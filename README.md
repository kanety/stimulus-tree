# stimulus-tree

A stimulus controller for simple tree ui.

## Dependencies

* @hotwired/stimulus 3.0

## Installation

Install from npm:

    $ npm install @kanety/stimulus-tree --save

## Usage

Register controller:

```javascript
import { Application } from '@hotwired/stimulus';
import TreeController from '@kanety/stimulus-tree';

const application = Application.start();
application.register('tree', TreeController);
```

Import css:

```css
@import '@kanety/stimulus-tree';
```

Build html as follows:

```html
<ul class="st-tree" data-controller="tree">
  <li data-node-id="1">
    <a href="#icon" class="st-tree__icon"></a>
    <span>text of 1</span>
    <ul>
      <li data-node-id="1.1">
        <a href="#icon" class="st-tree__icon"></a>
        <span>text of 1.1</span>
        <ul>
          <li data-node-id="1.1.1">
            <a href="#icon" class="st-tree__icon"></a>
            <span>text of 1.1.1</span>
          </li>
          <li data-node-id="1.1.2">
            <a href="#icon" class="st-tree__icon"></a>
            <span>text of 1.1.2</span>
          </li>
        </ul>
      </li>
    </ul>
  </li>
</ul>
```

### Options

#### store-key

Save node state to `sessionStorage`:

```html
<ul data-controller="tree"
    data-tree-store-key-value="set_your_key">
</ul>
```

### Callbacks

Set callbacks running when a node is opened or closed:

```javascript
let element = document.querySelector('[data-controller="tree"]');
element.addEventListener('tree:opened', (e) => {
  console.log('opened: ' + e.detail.node.getAttribute('data-node-id'));
});
element.addEventListener('tree:closed', (e) => {
  console.log('closed: ' + e.detail.node.getAttribute('data-node-id'));
});
```

### Event operations

Expand or collapse tree nodes:

```html
<ul data-controller="tree"
    data-action="tree:expand->tree#expand tree:collapse->tree#collapse">
</ul>
```

```javascript
let element = document.querySelector('[data-controller="tree"]');
element.dispatchEvent(new CustomEvent('tree:expand'));
element.dispatchEvent(new CustomEvent('tree:collapse'));
```

### Lazy load

Set URL for getting new HTML to each node using `data-node-lazy` attribute:

```html
<ul class="st-tree" data-controller="tree">
  <li class="st-tree__node--closed" data-node-id="1" data-node-lazy="URL">
    <a href="#icon" class="st-tree__icon"></a>
    <span>text of 1</span>
  </li>
</ul>
```

The new HTML should contains exapnded node like following example:

```html
<ul class="st-tree" data-controller="tree">
  <li class="st-tree__node--closed" data-node-id="1" data-node-lazy="URL">
    <a href="#icon" class="st-tree__icon"></a>
    <span>text of 1</span>
    <ul>
      <li data-node-id="1.1">
        <a href="#icon" class="st-tree__icon"></a>
        <span>text of 1.1</span>
      </li>
    </ul>
  </li>
</ul>
```

## License

The library is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
