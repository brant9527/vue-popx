import PopParse from './PopParse'
import Static from './Static'

const DEFAULT = {
  reference: {
    getBoundingClientRect: () => ({
      left: 0, top: 0, width: 0, height: 0
    }),
    clientWidth: 0,
    clientHeight: 0,
    isFixed: true
  },
  popper: null,
  options: {
    placement: 'top'
  },
  data: {}
}
let rvm = null
const func = function (opts) {
  opts = Object.assign({}, DEFAULT, opts)
  if (!opts.popper) throw new Error('popper not define')
  if (!rvm) rvm = this.$root
  if (opts.reference.isFixed) {
    opts.options.modifiers = {
      applyStyle: { enabled: false }
    }
  }
  return PopParse(opts, this)
}

func.close = function (uid) {
  if (Static.manage) Static.manage.close(uid)
}

func.manage = Static.manage

func.destroy = function () {
  delete func.manage
  delete Static.Vue.prototype.$Popx
}

/**
 * popper样式
 * only isFixed is true
 */
func.style = {
  zIndex: 999
}

// func.fire = function (uid, type, payload) {
//   console.log(rvm.popx.popins(uid))
// }

export default {
  install (Vue) {
    Static.Vue = Vue
    Static.Style = func.style
    Vue.prototype.$Popx = func
  }
}
