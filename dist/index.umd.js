!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("@hotwired/stimulus"),require("@kanety/stimulus-static-actions")):"function"==typeof define&&define.amd?define(["@hotwired/stimulus","@kanety/stimulus-static-actions"],t):(e||self).StimulusTree=t(e.Stimulus)}(this,function(e){class t{constructor(e){this.controller=e}get key(){return this.controller.storeKeyValue}get nodes(){return this.controller.nodes}get openedNodes(){return this.controller.openedNodes}load(){if(this.key){var e=this.constructor.load(this.key);if(e){var t=new Set(e);this.nodes.forEach(e=>{t.has(e.getAttribute("data-node-id"))?this.controller.show(e):this.controller.hide(e)})}}}save(){if(this.key){var e=this.openedNodes.map(e=>e.getAttribute("data-node-id"));this.constructor.save(this.key,e)}}static load(e){var t=sessionStorage.getItem(e);try{return JSON.parse(t)}catch(e){return console.error(e),null}}static save(e,t){try{sessionStorage.setItem(e,JSON.stringify(t))}catch(e){return console.error(e),null}}}class s{constructor(e){this.controller=e}get visibleIcons(){return this.controller.visibleNodes.filter(e=>!this.controller.isLeaf(e)).map(e=>this.controller.findIcon(e))}keydown(e){if(this.controller.isIcon(e.target)){var t=e.target.parentElement;switch(e.code){case"ArrowLeft":this.moveLeft(t),e.preventDefault();break;case"ArrowUp":this.moveUp(t),e.preventDefault();break;case"ArrowRight":this.moveRight(t),e.preventDefault();break;case"ArrowDown":this.moveDown(t),e.preventDefault()}}}moveUp(e){var t=this.visibleIcons,s=t.indexOf(this.controller.findIcon(e))-1;s>=0&&t[s]&&t[s].focus()}moveDown(e){var t=this.visibleIcons,s=t.indexOf(this.controller.findIcon(e))+1;s>=0&&t[s]&&t[s].focus()}moveRight(e){if(this.controller.isOpened(e)){var t=this.controller.children(e)[0];if(t){var s=this.controller.findIcon(t);s&&s.focus()}}else this.controller.open(e)}moveLeft(e){if(this.controller.isOpened(e))this.controller.close(e);else{var t=this.controller.parent(e);if(t){var s=this.controller.findIcon(t);s&&s.focus()}}}}class r{constructor(e){this.controller=e}init(){this.controller.roots.forEach(e=>this.loadDescs(e))}loadDescs(e){this.controller.descendants(e).filter(e=>this.controller.isLazy(e)&&this.controller.isOpened(e)&&!this.controller.isLazyLoaded(e)).forEach(e=>this.load(e))}load(e){try{var t=this;function r(){e.removeAttribute("aria-busy")}e.setAttribute("aria-busy","true");var s=function(s,r){try{var o=Promise.resolve(fetch(e.getAttribute("data-node-lazy"))).then(function(s){var r=function(){if(s.ok)return Promise.resolve(s.text()).then(function(s){t.loaded(e,s),t.loadDescs(e)})}();if(r&&r.then)return r.then(function(){})})}catch(e){return r(e)}return o&&o.then?o.then(void 0,r):o}(0,function(e){console.error(e)});return Promise.resolve(s&&s.then?s.then(r):r())}catch(e){return Promise.reject(e)}}loaded(e,t){this.replace(e,t),this.controller.initDescs(e),this.controller.store.save(),this.controller.dispatch("loaded",{detail:{node:e,html:t}})}replace(e,t){var s=e.getAttribute("data-node-id"),r=document.createElement("div");r.innerHTML=t,e.innerHTML=r.querySelector('[data-node-id="'+s+'"]').innerHTML,this.controller.setLazyLoaded(e)}}class o extends e.Controller{get roots(){return Array.from(this.element.children)}get nodes(){return this.scope.findAllElements("li")}get openedNodes(){return this.nodes.filter(e=>this.isOpened(e))}get visibleNodes(){return this.nodes.filter(e=>this.ancestors(e).slice(0,-1).every(e=>this.isOpened(e)))}connect(){this.init(),this.keyboard=new s(this),this.store=new t(this),this.store.load(),this.loader=new r(this),this.loader.init()}init(){this.roots.forEach(e=>this.initDescs(e))}initDescs(e){this.descendants(e).forEach(e=>{0!=this.children(e).length||this.isLazy(e)||e.classList.add("st-tree__node--leaf","st-tree__node--closed")})}toggle(e){if(this.isIcon(e.target)){var t=e.target.parentElement;this.isOpened(t)?this.close(t):this.open(t),e.preventDefault()}}expand(e){this.nodes.filter(e=>!this.isOpened(e)).forEach(e=>this.open(e))}collapse(e){this.nodes.filter(e=>this.isOpened(e)).forEach(e=>this.close(e))}keydown(e){this.keyboard.keydown(e)}open(e){this.show(e),this.store.save(),this.dispatch("opened",{detail:{node:e}}),this.isLazy(e)&&!this.isLazyLoaded(e)&&this.loader.load(e)}close(e){this.hide(e),this.store.save(),this.dispatch("closed",{detail:{node:e}})}show(e){e.classList.remove("st-tree__node--closed")}hide(e){e.classList.add("st-tree__node--closed")}parent(e){var t=e.parentElement.parentElement;return t&&t.matches("li")?t:null}children(e){var t=Array.from(e.children).find(e=>e.matches("ul"));return t?Array.from(t.children):[]}ancestors(e){var t=this.parent(e);return t?this.ancestors(t).concat([e]):[e]}descendants(e){return[e].concat(this.children(e).flatMap(e=>this.descendants(e)))}isOpened(e){return!e.matches(".st-tree__node--closed")}isLeaf(e){return e.matches(".st-tree__node--leaf")}findIcon(e){return e.querySelector('a[href="#icon"]')}isIcon(e){return e.matches('a[href="#icon"]')}isLazy(e){return e.matches("[data-node-lazy]")}isLazyLoaded(e){return e.matches("[data-node-lazy-loaded]")||0!=this.children(e).length}setLazyLoaded(e){e.setAttribute("data-node-lazy-loaded","true")}}return o.values={storeKey:String},o.actions=[["element","click->toggle"],["element","keydown->keydown"]],o});
//# sourceMappingURL=index.umd.js.map
