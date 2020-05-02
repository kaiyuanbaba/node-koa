const koa = require('koa');

const StaticCache = require('koa-static-cache')

const Router = require('koa-router')

const Swig = require('koa-swig')

const BodyParser = require('koa-bodyparser')
const co = require('co')

const app = new koa()

let data = {
    _id: 3,
    todoList: [{
        id: 1,
        title: '学习node',
        done: true
    }, {
        id: 2,
        title: '学习koa',
        done: false
    }, {
        id: 3,
        title: '学习mysly',
        done: false
    }]
}


app.use(StaticCache('./static', {
    prefix: '/static',
    gzip: true
}))

const router = new Router();

app.use(BodyParser())

router.get('/', async ctx => {
    ctx.body = "hello"
})


router.get('/todos', async ctx => {
    ctx.body = {
        code: 0,
        data: data.todoList,
        message: '获取成功'
    }
})

router.post('/toggle', async ctx => {
    let id = ctx.request.body.id || 0
    if (!id) {
        ctx.body = {
            code: 1,
            message: '请传入id'
        }
        return;
    }
    let todo = data.todoList.find(todo => todo.id == id)

    todo.done = !todo.done;
    ctx.body = {
        code: 0,
        data: todo,
        message: '成功'
    }
})

router.post('/remove', async ctx => {
    let id = ctx.request.body.id || 0
    if (!id) {
        ctx.body = {
            code: 1,
            message: '请传入id'
        }
        return;
    }

    data.todoList = data.todoList.filter(todo => todo.id != id)

    ctx.body = {
        code: 0,
        data: data,
        message: '删除成功'
    }
})

router.post('/add', async ctx => {
    let title = ctx.request.body.title || ''
    if (!title) {
        ctx.body = {
            code: 1,
            message: '请传入任意标题'
        }
        return;
    }

    let newTask = {
        id: ++data._id,
        title,
        done: false
    }

    data.todoList.push(newTask)

    ctx.body = {
        code: 0,
        data: data.todoList,
        message: '成功'
    }
})

app.use(router.routes())

app.listen(80)