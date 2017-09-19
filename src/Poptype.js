export default {
  checkPopper (popper) {
    let type = ''
    // console.log(popper)
    if (popper instanceof HTMLElement) {
      type = 'html'
    } else {
      switch ((typeof popper).toLowerCase()) {
        case 'object':
          let if1 = popper.hasOwnProperty('render') && popper.hasOwnProperty('staticRenderFns')
          let if2 = popper.hasOwnProperty('template') && (typeof popper.template).toLowerCase() === 'string'
          if (!if2 && popper.template) throw new Error('The template must be a string')
          if (if1 || if2) type = 'component'
          break
        case 'string':
          type = 'string'
          break
      }
    }
    return type
  }
}
