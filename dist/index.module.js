import{Controller as e}from"@hotwired/stimulus";import"@kanety/stimulus-static-actions";class t extends e{get nodes(){return Array.from(this.element.querySelectorAll("li"))}get openedNodes(){return Array.from(this.element.querySelectorAll("li:not(.st-tree__node--closed)"))}get visibleNodes(){return this.nodes.filter(e=>!e.parentNode.closest("li.st-tree__node--closed"))}get visibleIcons(){return this.visibleNodes.filter(e=>!e.matches(".st-tree__node--leaf")).map(e=>this.findIcon(e))}connect(){this.init(),this.load()}init(){this.nodes.forEach(e=>{e.querySelector("ul")||e.classList.add("st-tree__node--leaf","st-tree__node--closed")})}load(){var e=this.loadStates();if(e){var t=new Set(e);this.nodes.forEach(e=>{t.has(e.getAttribute("data-node-id"))?this.show(e):this.hide(e)})}}toggle(e){if(e.target.matches('a[href="#icon"]')){var t=e.target.parentNode;t.matches(".st-tree__node--closed")?this.open(t):this.close(t),e.preventDefault()}}expand(e){this.nodes.forEach(e=>this.show(e)),this.saveStates()}collapse(e){this.nodes.forEach(e=>this.hide(e)),this.saveStates()}open(e){this.show(e),this.saveStates(),this.dispatch("opened",{detail:{node:e}})}close(e){this.hide(e),this.saveStates(),this.dispatch("closed",{detail:{node:e}})}show(e){e.classList.remove("st-tree__node--closed")}hide(e){e.classList.add("st-tree__node--closed")}loadStates(){if(this.storeKeyValue){var e=sessionStorage.getItem(this.storeKeyValue);return e?JSON.parse(e):null}}saveStates(){if(this.storeKeyValue){var e=this.openedNodes.map(e=>e.getAttribute("data-node-id"));sessionStorage.setItem(this.storeKeyValue,JSON.stringify(e))}}keydown(e){if(e.target.matches('a[href="#icon"]')){var t=e.target.parentNode;switch(e.keyCode){case 37:this.moveLeft(t),e.preventDefault();break;case 38:this.moveUp(t),e.preventDefault();break;case 39:this.moveRight(t),e.preventDefault();break;case 40:this.moveDown(t),e.preventDefault()}}}moveUp(e){var t=this.visibleIcons,s=t.indexOf(this.findIcon(e))-1;s>=0&&t[s]&&t[s].focus()}moveDown(e){var t=this.visibleIcons,s=t.indexOf(this.findIcon(e))+1;s>=0&&t[s]&&t[s].focus()}moveRight(e){if(e.matches(".st-tree__node--closed"))this.open(e);else{var t=this.findIcon(e.querySelector("ul:first-of-type > li:first-of-type"));t&&t.focus()}}moveLeft(e){if(e.matches(".st-tree__node--closed")){var t=this.findIcon(e.parentNode.parentNode);t&&t.focus()}else this.close(e)}findIcon(e){return e.querySelector('a[href="#icon"]')}}t.values={storeKey:String},t.actions=[["element","click->toggle"],["element","keydown->keydown"],["element",":expand->expand"],["element",":collapse->collapse"]];export{t as default};
//# sourceMappingURL=index.module.js.map
