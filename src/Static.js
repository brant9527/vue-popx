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

export default {
  manage: new PopManage()
}
