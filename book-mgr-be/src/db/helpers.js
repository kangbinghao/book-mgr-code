// 定义原信息内容 包括创建时间和修改时间
const getMate=()=>{
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
// 导出函数
module.exports={
  getMate,
}