// 书籍 相关schema模型
const mongose= require("mongoose")
const {getMeta,preSave}=require("../helpers")
// 初始化一个书籍的schema 确定用户文档具体有哪些数据及其数据类型
const BookSchema= new mongose.Schema({
  //  书名
  name:String,
  // 价格
  price:Number,
  // 作者
  author:String,
  // 出版日期
  publishDate:String,
  // 分类
  classify:String,
  // 库存
  count:Number,
  //  通用原信息 单独封装函数 调用时间戳方法
   meta:getMeta(),
})

BookSchema.pre("save",preSave)
// 注册schema
mongose.model("Book",BookSchema)