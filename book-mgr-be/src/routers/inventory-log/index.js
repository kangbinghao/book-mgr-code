// 设计 出入库详情接口
const Router=require("@koa/router");
const mongoose=require("mongoose")
// 拿到对应的模型
const inventoryLog=mongoose.model("InventoryLog")

// 初始化一个路由 prefix标记当前这个路由的业务是 /invite与认证相关内容
const router=new Router({
    prefix:"/inventory-log"
});
// 设计出入库列表接口
router.get("/list", async(ctx)=>{
  const {
    type,
   
    } = ctx.query
    let {
     size,
     page
    }=ctx.query
  size=Number(size)
  page=Number(page)
  const list=await inventoryLog.find({
    type,
  })
  .sort({  //排序 倒序
    _id:-1
  })
  .skip((page-1)*size)  // 按照规则跳过对应条目数 实现分页显示
  .limit(size)
  .exec()

  const total =await inventoryLog.find({
    type,
  }).countDocuments().exec()

  ctx.body={
    data:{
      total,
      list,
      page,
      size
    },
    code:1,
    msg:"获取列表成功"
  }
})

module.exports=router;