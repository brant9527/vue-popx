import Poptype from './Poptype'
import PopCom from './PopCom'
import PopStr from './PopStr'
import PopHtml from './PopHtml'
// 解析类型映射
const MAP = {
  'component': PopCom,
  'string': PopStr,
  'html': PopHtml
}
// 弹窗管理
class PopManage {
  constructor () {
    this._pops = {}
  }
  add (ins) {
    this._pops[ins.uuid] = ins
    return ins.uuid
  }
  popins (uid) {
    return this._pops[uid]
  }
  remove (uid) {
    delete this._pops[uid]
  }
  close (uid) {
    if (uid) {
      this.popins(uid).close()
      this.remove(uid)
    } else {
      for (let key in this._pops) {
        this._pops[key].close()
        this.remove(key)
      }
    }
  }
}
// 实例化
const popmanage = new PopManage()

export default function (opts, vm) {
  let type = Poptype.checkPopper(opts.popper)
  // console.log(type)
  let Constr = MAP[type]
  if (!Constr) throw new Error('没有匹配的弹窗解析')
  if (!vm.$root.popx_manage) vm.$root.popx = popmanage
  let tempPop = new Constr(opts, vm)
  tempPop.type = type
  return popmanage.add(tempPop)
}
