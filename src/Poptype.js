export default {
  checkPopper (popper) {
    let type = ''
    // console.log(popper)
    if (popper instanceof HTMLElement) {
      type = 'html'
    } else {
      switch ((typeof popper).toLowerCase()) {
        case 'object':
          let ifs = popper.hasOwnProperty('render') && popper.hasOwnProperty('staticRenderFns')
          ifs = ifs || popper.hasOwnProperty('template')
          if (ifs) type = 'component'
          break
        case 'string':
          type = 'string'
          break
      }
    }
    return type
  }
}
