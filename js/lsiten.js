/**
 * 双向绑定
 * model->viewModel->view
 * model<-viewModel<-view
 * 设计模式
 * 观察者模式
 * 1、data-监听->Observer-通知->dep[观察者列表]-回调->watcher（watcher-订阅->dep）
 * 2、watcher-更新->view
 */

 var lsiten = function () {
  this.watcher = new lsitenWatcher();
 }

 lsiten.prototype = {
  constructor: lsiten
 }



 console.log(new lsiten());