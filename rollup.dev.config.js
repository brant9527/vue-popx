const path = require('path')
const buble = require('rollup-plugin-buble')
const pkg = require('./package.json')
const banner =
`/**
 * vue-popx v${process.env.VERSION || pkg.version}
 * (c) ${new Date().toLocaleString()} ${pkg.author}
 * @license MIT
 */`

 export default {
  name: 'vue-popx',
  input: 'src/main.js',
  output: {
    file: 'examples/static/vue-popx.js',
    format: 'umd'
  },
  plugins: [buble()],
  globals: {'popper.js': 'Popper'},
  external: ['popper.js'],
  banner
};