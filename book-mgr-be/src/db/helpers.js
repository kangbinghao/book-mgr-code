// 定义原信息内容 包括创建时间和修改时间
const getMeta=()=>{
  return {
    createAt:{
      type:Number,
      default:(new Date()).getTime(),
    },
    // 数据改变时的时间戳
    updatedAt:{
      type:Number,
      default:(new Date()).getTime(),
    },
  }
}
// 保存之前执行
const preSave=function (next) {
  if (this.isNew) {
    const ts=Date.now()
    this['meta'].createAt=ts;
    this['meta'].updatedAt=ts;
  }else{
    this['meta'].createAt=Date.now()
  }
  next()
}
// 导出函数
module.exports={
  getMeta,
  preSave
}