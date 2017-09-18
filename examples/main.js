const Koa = require('koa')
const views = require('koa-views')
const path = require('path')
const static = require('koa-static')
const staticPath = './static'
const app = new Koa()

app.use(static(
  path.join( __dirname,  staticPath)
))

app.use(views(path.join(__dirname, './views'), {
  extension: 'html'
}))

app.use( async ( ctx ) => {
  let title = 'hello koa2'
  await ctx.render('index', {
    title,
  })
})

app.listen(3000)
console.log('[demo] start-quick is starting at port 3000')