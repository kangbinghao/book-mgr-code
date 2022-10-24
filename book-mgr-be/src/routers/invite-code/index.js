// 设计邀请码接口
const Router=require("@koa/router");
const mongoose=require("mongoose")
// const {getBody}=require("../../helpers/utils")
const InviteCode=mongoose.model("InviteCode")
const {v4:uuidv4}=require("uuid")
// 初始化一个路由 prefix标记当前这个路由的业务是 /invite与认证相关内容
const router=new Router({
    prefix:"/invite"
});

// 登录路由
router.get("/add",async(ctx)=>{
  const code=new InviteCode({
    code:uuidv4(),
    user:""
  })
  const saved = await code.save()
  ctx.body={
    code:1,
    data:saved,
    msg:"创建成功"
  }
});
module.exports=router;