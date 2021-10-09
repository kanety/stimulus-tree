var e=require("@hotwired/stimulus");require("@kanety/stimulus-static-actions");class t{constructor(e){this.controller=e}get nodes(){return this.controller.nodes}get visibleNodes(){return this.nodes.filter(e=>!e.parentNode.closest("li.st-tree__node--closed"))}get visibleIcons(){return this.visibleNodes.filter(e=>!e.matches(".st-tree__node--leaf")).map(e=>this.findIcon(e))}keydown(e){if(e.target.matches('a[href="#icon"]')){var t=e.target.parentNode;switch(e.keyCode){case 37:this.moveLeft(t),e.preventDefault();break;case 38:this.moveUp(t),e.preventDefault();break;case 39:this.moveRight(t),e.preventDefault();break;case 40:this.moveDown(t),e.preventDefault()}}}moveUp(e){var t=this.visibleIcons,s=t.indexOf(this.findIcon(e))-1;s>=0&&t[s]&&t[s].focus()}moveDown(e){var t=this.visibleIcons,s=t.indexOf(this.findIcon(e))+1;s>=0&&t[s]&&t[s].focus()}moveRight(e){if(e.matches(".st-tree__node--closed"))this.controller.open(e);else{var t=this.findIcon(e.querySelector("ul:first-of-type > li:first-of-type"));t&&t.focus()}}moveLeft(e){if(e.matches(".st-tree__node--closed")){var t=this.findIcon(e.parentNode.parentNode);t&&t.focus()}else this.controller.close(e)}findIcon(e){return e.querySelector('a[href="#icon"]')}}class s extends e.Controller{get nodes(){return this.scope.findAllElements("li")}get openedNodes(){return this.scope.findAllElements("li:not(.st-tree__node--closed)")}connect(){this.init(),this.load(),this.keyboard=new t(this)}init(){this.nodes.forEach(e=>{this.hasChildren(e)||e.classList.add("st-tree__node--leaf","st-tree__node--closed")})}load(){var e=this.loadStates();if(e){var t=new Set(e);this.nodes.forEach(e=>{t.has(e.getAttribute("data-node-id"))?this.show(e):this.hide(e)})}}toggle(e){if(e.target.matches('a[href="#icon"]')){var t=e.target.parentNode;t.matches(".st-tree__node--closed")?this.open(t):this.close(t),e.preventDefault()}}expand(e){this.nodes.forEach(e=>this.show(e)),this.saveStates()}collapse(e){this.nodes.forEach(e=>this.hide(e)),this.saveStates()}keydown(e){this.keyboard.keydown(e)}open(e){this.show(e),this.saveStates(),this.dispatch("opened",{detail:{node:e}})}close(e){this.hide(e),this.saveStates(),this.dispatch("closed",{detail:{node:e}})}show(e){e.classList.remove("st-tree__node--closed")}hide(e){e.classList.add("st-tree__node--closed")}hasChildren(e){return Array.from(e.children).some(e=>e.matches("ul"))}loadStates(){if(this.storeKeyValue){var e=sessionStorage.getItem(this.storeKeyValue);return e?JSON.parse(e):null}}saveStates(){if(this.storeKeyValue){var e=this.openedNodes.map(e=>e.getAttribute("data-node-id"));sessionStorage.setItem(this.storeKeyValue,JSON.stringify(e))}}}s.values={storeKey:String},s.actions=[["element","click->toggle"],["element","keydown->keydown"],["element",":expand->expand"],["element",":collapse->collapse"]],module.exports=s;
//# sourceMappingURL=index.js.map
