const koa = require('koa');

const koaStaticCache = require('koa-static-cache')

const Router = require('koa-router')

const Swig = require('koa-swig')

const co = require('co')
const app = new koa();

const router = new Router();


var users = [{
    username: '11'
}, {
    username: '22'
}, {
    username: '33'
}, {
    username: '44'
}]


// app.use(koaStaticCache(__dirname + '/static', {
//     // root: __dirname + '/static'
//     prefix: '/public' //如果当前请求的url是以/public开始，则作为静态资源请求
// }))


// app.use((ctx, next) => {
//     // 其他业务逻辑
// })

const render = Swig({
    root: __dirname + '/views', //文件存放目录
    cache: false, //不适用缓存
    ext: '.html'
});


app.context.render = co.wrap(render)

router.get('/list', async(ctx, next) => {
    ctx.body = await ctx.render("list.html", {
        users
    })
})

router.get('/', (ctx, next) => {
    ctx.body = "hello"
})
router.get('/user', (ctx, next) => {
    ctx.body = "user"
})

const userRouter = new Router();
userRouter.get('/', (ctx, next) => {
    ctx.body = "用户首页"
})
userRouter.get('/address', (ctx, next) => {
    ctx.body = "用户地址"
})

// 路由前缀
const itemRouter = new Router({
    prefix: '/item'
});
itemRouter.get('/add', (ctx, next) => {
    ctx.body = "tianjia"
})

// 带id的
const goodRouter = new Router();
goodRouter.get('/goods/:id', (ctx, next) => {
    ctx.body = "添加：" + ctx.params.id // 接受id
})


// 路由重定向 (输入的值，重定向的值，301)
router.redirect('/admin', '/user', 301)

router.use('/user', userRouter.routes())
app.use(router.routes())
app.use(itemRouter.routes())
app.use(goodRouter.routes())
app.listen(80)