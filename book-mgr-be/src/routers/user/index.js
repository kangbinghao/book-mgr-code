// 设计邀请码接口
const Router=require("@koa/router");
const mongoose=require("mongoose")
const User=mongoose.model("User")
const config=require('../../project.config')
const router=new Router({
    prefix:"/user"
});
// 获取列表数据
router.get("/list",async (ctx)=>{
       let {
         page, // 当前页
         size, // 每页个数
       }=ctx.query;  // 获取接口穿过来的数据
       page=Number(page)  // 改为number类型
       size=Number(size)
      //  console.log(page,size)
       const list =await User
          .find()  // 找数据库用户数据
          .sort({  //排序 倒序
            _id:-1
          })
          .skip((page-1)*size) // 筛选出当前页
          .limit(size)     // 拿多少条 size代表每页多少条
          .exec()          // 执行一下
       
        //  获取数据总数
         const total=await User.countDocuments().exec()
         //返回相应体数据
         
      ctx.body ={  
        msg:"获取列表成功",
        data: { 
              list,
              page,
              size,
              total
            },
        code:1

      }
})
// 删除用户接口
router.delete("/:id",async (ctx)=>{
  const { id }=ctx.params
  const delMsg=await User.deleteOne({
    _id:id
  })
  ctx.body={
    data:delMsg,
    code:1,
    msg:"删除成功"
  }
})
// 添加用户接口
router.post('/add',async (ctx)=>{
  const {
    account,
    password="123456"
  }= ctx.request.body;
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
      password:password || '123456'
    })
    const res= await user.save()

    ctx.body={
      code:1,
      msg:"添加成功",
      data:res,
   }
})
// 重置密码
router.post('/reset/password',async (ctx)=>{
     const {
       id,   // id
       repassword
     }  = ctx.request.body;
   
      const user= await User.findOne({
         _id:id
       }).exec()

      if (!user) {
         ctx.body={
          code:0,
          msg:"修改失败：未找到对应id",
         }
         return
      }
      user.password= repassword 
      // Object.assign(user,{password:repassword})
      const res=  await user.save()
      ctx.body={
        code:1,
        msg:"修改成功！",
        data:{
          account:res.account,
          password:res.password,
          _id:res._id
        },
       }
})
// 搜索用户
router.get('/list/search',async (ctx)=>{
    const  { account }=ctx.query
    const one = await User.findOne({
      account:account
    }).exec()
    if (!one) {
       ctx.body={
         code:0,
         msg:"查找失败"
       }
       return
    }
    ctx.body={
      code:1,
      data:one,
      msg:"查找成功"
    }

})
module.exports=router;