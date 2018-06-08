/**
 *增添data的监听
 */
var lsitenObserver = function (data) {
  thsi.data = data;
  this.walk(data);
}

lsitenObserver.prototype = {
  constructor: lsitenObserver,
  walk: data => {
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key]);
    })
  },
  defineReactive: (data, key, value) => {
    var dep = new lsitenDep();
    // 递归监听data，如果data的数据是对象，新增一个Observer
    this.observe(value);
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get: () => {
        if (lsitenDep.target) {
          dep.addSub(lsitenDep.target);
        }
        return value;
      },
      set: newVal => {
        if (newVal === value) {
          return ;
        }
        value = newVal;
        dep.notify();
      }
    })
  },
  observe: (val) => {
    if (!val || typeof val !== 'object') {
      return '';
    }
    return new lsitenObserver(val);
  }
}