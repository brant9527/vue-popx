/**
 * vue-popx v0.1.0
 * (c) 2017/9/19 上午10:52:14 Hainc <cnria@qq.com>
 * @license MIT
 */
import Popper from 'popper.js';

var Poptype = {
  checkPopper: function checkPopper (popper) {
    var type = '';
    // console.log(popper)
    if (popper instanceof HTMLElement) {
      type = 'html';
    } else {
      switch ((typeof popper).toLowerCase()) {
        case 'object':
          var if1 = popper.hasOwnProperty('render') && popper.hasOwnProperty('staticRenderFns');
          var if2 = popper.hasOwnProperty('template') && (typeof popper.template).toLowerCase() === 'string';
          if (!if2 && popper.template) { throw new Error('The template must be a string') }
          if (if1 || if2) { type = 'component'; }
          break
        case 'string':
          type = 'string';
          break
      }
    }
    return type
  }
};

// 弹窗管理
var PopManage = function PopManage () {
  this._pops = {};
};
PopManage.prototype.add = function add (ins) {
  this._pops[ins.uuid] = ins;
  return ins.uuid
};
PopManage.prototype.popins = function popins (uid) {
  return this._pops[uid]
};
PopManage.prototype.remove = function remove (uid) {
  delete this._pops[uid];
};
PopManage.prototype.close = function close (uid) {
    var this$1 = this;

  if (uid) {
    this.popins(uid).close();
    this.remove(uid);
  } else {
    for (var key in this$1._pops) {
      this$1._pops[key].close();
      this$1.remove(key);
    }
  }
};

var Static = {
  manage: new PopManage()
};

var Base = (function () {
  function anonymous (opts, vm) {
    this._opts = opts;
    this._static = Static;
    this._vm = vm;
    this._pvm = null;
    this.type = null;
    this.event = {};
    this.uuid = Math.random().toString(16).substr(-4) + '-' + Math.random().toString(16).substr(-4) + '-' + Math.random().toString(16).substr(-4) + '-' + Math.random().toString(16).substr(-4);
    this.init();
  }

  var prototypeAccessors = { ref: {},popper: {} };

  /**
   * 初始化
   */
  anonymous.prototype.init = function init () {};

  /**
   * 初始化完成
   */
  anonymous.prototype.initComplete = function initComplete () {
    var this$1 = this;

    this._pvm['$parent'] = this._vm.$root;
    document.body.appendChild(this._pvm.$el);
    this.popins = new Popper(this.ref, this.popper, this._opts.options);
    if (this.ref.isFixed) {
      var style = Static.Style;
      for (var key in style) {
        if (style.hasOwnProperty(key)) {
          this$1.popper.style[key] = style[key];
          if (key === 'zIndex') {
            style[key] ++;
          }
        }
      }
    }
    this._pvm && this.initEvent();
  };

  /**
   * 初始化事件
   */
  anonymous.prototype.initEvent = function initEvent () {
    var this$1 = this;

    this._pvm.$on('close', function (d) {
      if (this$1._opts.callback) {
        this$1._opts.callback({
          type: 'close',
          payload: d,
          next: this$1._destroy.bind(this$1)
        });
      } else {
        this$1._destroy();
      }
    });
  };

  /**
   * 销毁
   * @private
   */
  anonymous.prototype._destroy = function _destroy () {
    this.popins.destroy();
    this._pvm.$el.remove();
  };

  /**
   * 关闭弹窗
   */
  anonymous.prototype.close = function close () {
    this._pvm.$emit('close');
  };

  /**
   * 更新弹窗
   */
  anonymous.prototype.update = function update () {
    this.popins.update();
  };

  /**
   * 获取参照
   * @returns {Object}
   */
  prototypeAccessors.ref.get = function () {
    return this._opts.reference
  };

  /**
   * 获取弹窗HTMLELEMENT
   */
  prototypeAccessors.popper.get = function () {};

  Object.defineProperties( anonymous.prototype, prototypeAccessors );

  return anonymous;
}());

var PopCom = (function (Base$$1) {
  function PopCom () {
    Base$$1.apply(this, arguments);
  }

  if ( Base$$1 ) PopCom.__proto__ = Base$$1;
  PopCom.prototype = Object.create( Base$$1 && Base$$1.prototype );
  PopCom.prototype.constructor = PopCom;

  var prototypeAccessors = { popper: {} };

  PopCom.prototype.init = function init () {
    var TempC = this._static.Vue.extend(this._opts.popper);
    // 赋值popper vm实例
    this._pvm = new TempC();
    this._pvm.$mount();
    if (this._pvm.popxdata) { this._pvm.popxdata = this._opts.data; }
    this._pvm.$el.setAttribute('data-uid', this.uuid);
    this.initComplete();
  };
  prototypeAccessors.popper.get = function () {
    return this._pvm.$el
  };

  Object.defineProperties( PopCom.prototype, prototypeAccessors );

  return PopCom;
}(Base));

// 解析类型映射
var MAP = {
  'component': PopCom
};

var PopParse = function (opts, vm) {
  var type = Poptype.checkPopper(opts.popper);
  // console.log(type)
  var Constr = MAP[type];
  if (!Constr) { throw new Error('没有匹配的弹窗解析') }
  var tempPop = new Constr(opts, vm);
  tempPop.type = type;
  return Static.manage.add(tempPop)
};

var DEFAULT = {
  reference: {
    getBoundingClientRect: function () { return ({
      left: 0, top: 0, width: 0, height: 0
    }); },
    clientWidth: 0,
    clientHeight: 0,
    isFixed: true
  },
  popper: null,
  options: {
    placement: 'top'
  },
  data: {}
};
var func = function (opts) {
  opts = Object.assign({}, DEFAULT, opts);
  if (!opts.popper) { throw new Error('popper not define') }
  if (opts.reference.isFixed) {
    opts.options.modifiers = {
      applyStyle: { enabled: false }
    };
  }
  return PopParse(opts, this)
};

func.close = function (uid) {
  if (Static.manage) { Static.manage.close(uid); }
};

func.manage = Static.manage;

func.destroy = function () {
  delete func.manage;
  delete Static.Vue.prototype.$Popx;
};

/**
 * popper样式
 * only isFixed is true
 */
func.style = {
  zIndex: 999
};

// func.fire = function (uid, type, payload) {
//   console.log(rvm.popx.popins(uid))
// }

var main = {
  install: function install (Vue) {
    Static.Vue = Vue;
    Static.Style = func.style;
    Vue.prototype.$Popx = func;
  }
};

export default main;
