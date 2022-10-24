const koa=require("koa")
const koaBody = require("koa-body")
const {connect}=require("./db")
// cors 解决跨域
const cors=require("@koa/cors")
const registerRoutes=require('./routers')

const app= new koa()
// 先调用connect保证数据库连接成功后再执行后续操作
connect().then(()=>{
  // 调用处理跨域的中间件 在响应头当中标记 Access-Control-Allow-Origin: http://localhost:8080告诉浏览器这个接口地址支持跨域
  app.use(cors())
  // koaBody来处理请求体相关信息
  app.use(koaBody())
  
  registerRoutes(app)
  // 启动http服务
  // 接受 http 请求 并做处理 处理完成后响应
  app.listen(3000,()=>{
    console.log("启动成功")
  })
})
