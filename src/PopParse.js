import Poptype from './Poptype'
import PopCom from './PopCom'
import Static from './Static'
// 解析类型映射
const MAP = {
  'component': PopCom
}

export default function (opts, vm) {
  let type = Poptype.checkPopper(opts.popper)
  // console.log(type)
  let Constr = MAP[type]
  if (!Constr) throw new Error('没有匹配的弹窗解析')
  let tempPop = new Constr(opts, vm)
  tempPop.type = type
  return Static.manage.add(tempPop)
}
