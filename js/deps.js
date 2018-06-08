var lsitenDep = function () {
  this.subs = [];
}

lsitenDep.prototype = {
  constructor: lsitenDep,
  // 添加观察者列表
  addSub: (sub) => {
    this.subs.push(sub);
  },
  // 通知观察者
  notify: () => {
    this.subs.forEach(sub => {
      sub.update();
    });
  },
  target: null
}
