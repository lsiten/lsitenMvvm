/**
 * 双向绑定
 * model->viewModel->view
 * model<-viewModel<-view
 * 设计模式
 * 观察者模式
 * 1、data-监听->Observer-通知->dep[观察者列表]-回调->watcher（watcher-订阅->dep）
 * 2、watcher-更新->view
 */

 var lsiten = function (options) {
  this.data = options.data;
  this.methods = options.methods;
  let _this = this;
  Object.keys(this.data).forEach(key =>{
    this.proxyKeys(key);
  })
  lsitenObserver(this.data);
  new lsitenCompile(options.el, this);
  typeof options.mounted === 'function' && options.mounted.call(this);
 }

 lsiten.prototype = {
  constructor: lsiten,
  // data的代理
  proxyKeys: function (key) {
    Object.defineProperty(this, key, {
      enumerable: false,
      configurable: true,
      get: () => {
        return this.data[key];
      },
      set: newVal => {
        this.data[key] = newVal;
      }
    })
  }
 }


let myLsiten = new lsiten({
  data: {
    a: 1,
    b: 2
  },
  el: '#test',
  methods: {
    test: () => {
      console.log(this.a);
    }
  }
})

 console.log(myLsiten, myLsiten.methods.test());