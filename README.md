# vue-popx
> 基于popper实现的vue弹出插件


# 安装
```
npm i --save vue-popx popper.js
yarn add vue-popx popper.js
```

# 使用
## 支持类型
- vueComponent

## 参数
- reference: popper参照物
  - default：
  ```
  getBoundingClientRect: () => ({
      left: 0, top: 0, width: 0, height: 0
    }),
    clientWidth: 0,
    clientHeight: 0,
    isFixed: true
  ```
- popper: popper弹出层组建配置，参考vue组件
- options: 参考popper.js options
- data: 如果组件定义了popxdata的data 这里的值将会和他关联

## 例子
```
this.$Popx({popper: {
  template: `<div>{{title}}</div>`,
  data: function () {
    return {
      title: 'Hello Popx'
    }
  }
}})
```

# 致谢
- popper.js
- vue