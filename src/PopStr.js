import Base from './PopBase'

class PopStr extends Base {
  init () {
    let TempC = this._static.Vue.extend({
      template: `<div class="popx-str">${this._opts.popper}</div>`,
      data: () => ({
        popxdata: {}
      })
    })
    // 赋值popper vm实例
    this._pvm = new TempC()
    this._pvm.$mount()
    if (this._pvm.popxdata) this._pvm.popxdata = this._opts.data
    this._pvm.$el.setAttribute('data-uid', this.uuid)
    this.initComplete()
  }
  get popper () {
    return this._pvm.$el
  }
}

export default PopStr
