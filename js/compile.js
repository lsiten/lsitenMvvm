var lsitenCompile = function (el, lsiten) {
  this.lsiten = lsiten;
  this.el = document.querySelector(el);
  this.fragment = null;
  this.init();
}
lsitenCompile.prototype = {
  constructor: lsitenCompile,
  init: () => {
    if (this.el) {
      this.fragment = this.nodeToFragment(this.el);
      this.compileElement(this.fragment);
      this.el.appendChild(this.fragment);
    } else {
      console.log('Dom 元素不存在');
    }
  },
  nodeToFragment: el => {
    var fragment = document.createDocumentFragment();
    var child = el.firstChild;
    while (child) {
      // 将Dom元素移入fragment中
      fragment.appendChild(child);
      child = el.firstChild;
    }
    return fragment;
  },
  compileElement: el => {
    var childNodes = el.childNodes;
    [].slice.call(childNodes).forEach(node => {
      var reg = /\{\{(.*)\}\}/;
      var text = node.textContent;
      if ( this.isElementNode(node)) {
        this.compile(node);
      } else if (this.isTextNode(node) && reg.test(text)) {
        this.compileText(node, reg.exec(text)[1]);
      }

      if (node.childNodes && node.childNodes.length) {
        this.complieElement(node);
      }
    });
  },
  compile: node => {
    var nodeAttrs = node.attributes;
    Array.prototype.forEach.call(nodeAttrs, attr=> {
      var attrName = attr.name;
      if (this.isDirective(attrName)) {
        var exp = attr.value;
        var dir = attrName.substring(2);
        if (this.isEventDirective(dir)) {
          // 事件响应指令
          this.compileEvent(node, this.lsiten, exp, dir);
        } else {
          this.compileMode(node, this.lsiten, exp, dir);
        }

        node.removeAttribute(attrName);
      }
    })
  },
  compileText: (node, exp) => {
    
  }
}