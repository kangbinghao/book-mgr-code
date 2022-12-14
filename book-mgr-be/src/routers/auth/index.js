// 设计用户相关接口
const Router=require("@koa/router");
const mongoose=require("mongoose")
const User=mongoose.model("User")
const {getBody}=require("../../helpers/utils")
const jwt=require('jsonwebtoken')
const InviteCode=mongoose.model("InviteCode")
// 初始化一个路由 prefix标记当前这个路由的业务是 /auth与认证相关内容
const router=new Router({
    prefix:"/auth"
});
// 认证路由下 注册/register相关逻辑的编写
router.post("/register",async(ctx)=>{
  //  console.log(ctx.request.body.account)
  // 结构拿到的请求体传过来的数据 拿到账户密码
    const {account,password,inviteCode}=getBody(ctx)
  
    // 非空验证
    if (account===""||password===""||inviteCode==="") {
      ctx.body={
        code:0,
        msg:"字段不能为空",
        data:null,
     }
     return 
    }
    // 找有没有邀请码
    const findCode= await InviteCode.findOne({  
      code:inviteCode
    }).exec()
    
   
    // 如果没找到邀请码
    if ((!findCode) || findCode.user) {
      ctx.body={
        code:0,
        msg:"邀请码不正确",
        data:null,
     }
     return
    }

    // 去找accoun 传递上来的account 的用户
    const findUser= await User.findOne({
      account,
    }).exec()
    // 判断是否已有账户
    if (findUser) {
      ctx.body={
        code:0,
        msg:"已存在该用户",
        data:null,
     }
     return
    }
    // 提供用户名密码
    const user=new User({
      account,
      password
    })
    const res= await user.save()

    findCode.user=res._id

    findCode.meta.updatedAt= new Date().getTime()

    await findCode.save()
    
    ctx.body={
       code:1,
       msg:"注册成功",
       data:res,
    }
});
// 登录路由
router.post("/login",async(ctx)=>{
  // 拿到账号密码
  const {account,password}=getBody(ctx)
   // 非空验证
   if (account===""||password==="") {
    ctx.body={
      code:0,
      msg:"字段不能为空",
      data:null,
   }
   return 
  }

  // 查找数据库里面有没有用户
  const one = await User.findOne({
    account,
  }).exec()
  console.log(one)
  
  if (!one) {
    ctx.body={
      code:0,
      msg:"用户名或密码错误",
      data:null
    }
    return
  }
  const user={
    account:one.account,
    _id:one._id
  }
  if (one.password===password) {
    ctx.body={
      code:1,
      msg:"登录成功",
      data:{
        user,
        token:jwt.sign(user,"book-mgr")
      }
    }
    return
  }
  ctx.body={
    code:0,
    msg:"用户名或密码错误",
    data:null
  }
});
module.exports=router;