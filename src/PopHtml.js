import Base from './PopBase'

class PopHtml extends Base {
  init () {
    this._pvm = new this._static.Vue({
      el: this._opts.popper,
      data: {
        popxdata: {}
      }
    })
    if (this._pvm.popxdata) this._pvm.popxdata = this._opts.data
    this._pvm.$el.setAttribute('data-uid', this.uuid)
    this.initComplete()
  }
  initComplete () {
    document.body.appendChild(this._pvm.$el)
    super.initComplete()
  }
  get popper () {
    return this._pvm.$el
  }
}

export default PopHtml
