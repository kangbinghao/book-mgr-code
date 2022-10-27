// 库存相关 schemas
const mongoose= require("mongoose")
const {getMeta,preSave}=require("../helpers")
// 初始化一个书籍的schema 确定用户文档具体有哪些数据及其数据类型
const InventoryLogSchema= new mongoose.Schema({
  //  是出库还是入库
  type:String,
  // 数量
  num:Number,
  // 用户
  user:String,
  // 什么时间     通用原信息 单独封装函数 调用时间戳方法
   meta:getMeta()
})
InventoryLogSchema.pre("save",preSave)
mongoose.model('InventoryLog',InventoryLogSchema)