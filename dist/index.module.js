import{Controller as e}from"@hotwired/stimulus";import"@kanety/stimulus-static-actions";class t{constructor(e){this.controller=e}get key(){return this.controller.storeKeyValue}get nodes(){return this.controller.nodes}get openedNodes(){return this.controller.openedNodes}load(){if(this.key){var e=this.constructor.load(this.key);if(e){var t=new Set(e);this.nodes.forEach(e=>{t.has(e.getAttribute("data-node-id"))?this.controller.show(e):this.controller.hide(e)})}}}save(){if(this.key){var e=this.openedNodes.map(e=>e.getAttribute("data-node-id"));this.constructor.save(this.key,e)}}static load(e){var t=sessionStorage.getItem(e);try{return JSON.parse(t)}catch(e){return null}}static save(e,t){sessionStorage.setItem(e,JSON.stringify(t))}}class s{constructor(e){this.controller=e}get nodes(){return this.controller.nodes}get visibleNodes(){return this.nodes.filter(e=>!e.parentNode.closest("li.st-tree__node--closed"))}get visibleIcons(){return this.visibleNodes.filter(e=>!e.matches(".st-tree__node--leaf")).map(e=>this.findIcon(e))}keydown(e){if(e.target.matches('a[href="#icon"]')){var t=e.target.parentNode;switch(e.keyCode){case 37:this.moveLeft(t),e.preventDefault();break;case 38:this.moveUp(t),e.preventDefault();break;case 39:this.moveRight(t),e.preventDefault();break;case 40:this.moveDown(t),e.preventDefault()}}}moveUp(e){var t=this.visibleIcons,s=t.indexOf(this.findIcon(e))-1;s>=0&&t[s]&&t[s].focus()}moveDown(e){var t=this.visibleIcons,s=t.indexOf(this.findIcon(e))+1;s>=0&&t[s]&&t[s].focus()}moveRight(e){if(e.matches(".st-tree__node--closed"))this.controller.open(e);else{var t=this.findIcon(e.querySelector("ul:first-of-type > li:first-of-type"));t&&t.focus()}}moveLeft(e){if(e.matches(".st-tree__node--closed")){var t=this.findIcon(e.parentNode.parentNode);t&&t.focus()}else this.controller.close(e)}findIcon(e){return e.querySelector('a[href="#icon"]')}}class o extends e{get nodes(){return this.scope.findAllElements("li")}get openedNodes(){return this.scope.findAllElements("li:not(.st-tree__node--closed)")}connect(){this.init(),this.keyboard=new s(this),this.store=new t(this),this.store.load()}init(){this.nodes.forEach(e=>{this.hasChildren(e)||e.classList.add("st-tree__node--leaf","st-tree__node--closed")})}toggle(e){if(e.target.matches('a[href="#icon"]')){var t=e.target.parentNode;t.matches(".st-tree__node--closed")?this.open(t):this.close(t),e.preventDefault()}}expand(e){this.nodes.forEach(e=>this.show(e)),this.store.save()}collapse(e){this.nodes.forEach(e=>this.hide(e)),this.store.save()}keydown(e){this.keyboard.keydown(e)}open(e){this.show(e),this.store.save(),this.dispatch("opened",{detail:{node:e}})}close(e){this.hide(e),this.store.save(),this.dispatch("closed",{detail:{node:e}})}show(e){e.classList.remove("st-tree__node--closed")}hide(e){e.classList.add("st-tree__node--closed")}hasChildren(e){return Array.from(e.children).some(e=>e.matches("ul"))}}o.values={storeKey:String},o.actions=[["element","click->toggle"],["element","keydown->keydown"],["element",":expand->expand"],["element",":collapse->collapse"]];export{o as default};
//# sourceMappingURL=index.module.js.map
