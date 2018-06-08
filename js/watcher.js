/**
 * 观察者对象
 */
var lsitenWatcher = function (lsiten, exp, cb) {
  this.cb = cb;
  this.lsiten = lsiten;
  this.exp = exp;
  this.value = this.get();
}

lsitenWatcher.prototype = {
  constructor: lsitenWatcher,
  update: () => {
    this.run();
  },
  run: () => {
    var value = this.lsiten.data[this.exp];
    var oldValue = this.value;
    if (value !== oldValue) {
      this.value = value;
      this.cb.call(this.lsiten, value, oldValue);
    }
  },
  get: () => {
    lsitenDep.target = this;
    var value = this.lsiten.data[this.exp]; // 出发该属性的get，添加观察者
    lsitenDep.target = null;
    return value;
  }
}