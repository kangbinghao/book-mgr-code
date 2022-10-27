// 执行 用户schemas 
require("./Schemas/User")
// 执行邀请码 schemas
require("./Schemas/InviteCode")
// 执书籍管理 schemas
require("./Schemas/Book")
// 执书 出入库日志 schemas
require("./Schemas/InventoryLog")

// 连接数据库
const mongoose=require("mongoose")
// connect设计成promise方式 保证在数据库连接完成后在监听执行服务器
const connect= ()=>{
  return new Promise((resolve)=>{
       //连接哪个数据库
  mongoose.connect('mongodb://127.0.0.1:27017/book-mgr')
  // 当连接成功后要执行的事情
  mongoose.connection.on("open",()=>{
    console.log("连接数据库成功")
    resolve()
  })
  })
}
module.exports={connect}
