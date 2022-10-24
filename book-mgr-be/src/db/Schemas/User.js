// 用户相关schema模型
const mongose=require("mongoose")
const {getMate}=require("../helpers")
// 初始化一个用户的schema 确定用户文档具体有哪些数据及其数据类型
const UserSchema= new mongose.Schema({
   account:String,
   password:String,
  //  通用原信息 单独封装函数 调用时间戳方法
   meta:getMate(),
})
// 注册schema
mongose.model("User",UserSchema)