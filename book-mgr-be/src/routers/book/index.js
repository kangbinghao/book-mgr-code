// 设计书籍信息接口
const Router=require("@koa/router");
const mongoose=require("mongoose");
const { getBody } = require("../../helpers/utils");


const Book= mongoose.model("Book")

// 设计查找方法
const findBookOne=async (id)=>{
  const one= await Book.findOne({
    _id:id,
  }).exec()
  return one
}

// 初始化一个路由 prefix标记当前这个路由的业务是 /invite与认证相关内容
const router=new Router({
    prefix:"/book"
});

// 添加书籍接口
router.post("/add",async(ctx)=>{
    //  解构拿到请求体上面携带的数据
     const{
      //  书名
      name,
      // 价格
      price,
      // 作者
      author,
      // 出版日期
      publishDate,
      // 分类
      classify,
      //库存
      count
     } =getBody(ctx)
  
     const book=new Book({
            name,
            price,
            author,
            publishDate,
            classify,
            count
     })
     const res=await book.save()
     console.log(res)
     ctx.body={
      data:res,
      code:1,
      msg: "添加成功",
     }
});
// 书籍列表接口
router.get("/list",async(ctx)=>{
  // 结构传过来的值，默认是1页20个数据
  // https://aa.cc.com/user?page=2&keyword=书名#fdsafds
   const {
    page=1,
    keyword=""  //书名
   }=ctx.query

   let {
    size=10,
   }=ctx.query
  size=Number(size)
  const query={}
  if(keyword){
    query.name=keyword
  }

    const list=await  Book
      .find(query)
      .sort({  //排序 倒序
        _id:-1
      })
      .skip((page-1)*size) //跳过忽略几条数据
      .limit(size)
      .exec();
      // 拿到总数据量
      const total=await Book.countDocuments()
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
// delete 删除接口
// PATH /book/:id
router.delete('/:id',async (ctx)=>{
   const {
    id
   } =ctx.params;

  const delMsg= await Book.deleteOne({
    _id:id,
   })
   
   ctx.body={
    data:delMsg,
    msg:'删除成功',
    code:1
   }
})
// 出入库类型  0代表 入库 2代表出
const BOOK_CONST={
  IN:'IN_COUNT',
  OUT:"OUT_COUNT"
}
// 入库出口
router.post('/update/count', async (ctx)=>{
  // 获取出入库详情日志的数据库 模型
  const InventoryLog=mongoose.model("InventoryLog")


  // 取出请求体id 数量 操作类型
   const {id,type}= ctx.request.body
   let {num}= ctx.request.body

   num=Number(num)
   const book=await Book.findOne({
        _id:id
   }).exec()
   if (!book) {
    ctx.body={
      code:0,
      msg:"没有找到书籍"
    }
    return
   }
  //  判断类型是入库
   if (type === BOOK_CONST.IN) {
      num = Math.abs(num)
   }else{
      num = -Math.abs(num)
   }
   book.count=book.count+num;
   if (book.count<0) {
     ctx.body={
      code:0,
      msg:"出库失败，剩下的数量不足以出库"
     }
     return
   }
  //  修改数据库保存
   const res= await book.save()
   // 把关于出入库的信息记录下来
   const log=new InventoryLog({
          num,
          type
   })
  //  存储 log日志
   log.save()

   ctx.body={
    data:res,
    code:1,
    msg:"操作成功"
   }
})
// 书籍修改接口
router.post('/update',async (ctx)=>{
  // 1 拿到前端传过来的参数
   const {
    id,
    // name,
    // price,
    // author,
    // publishDate,
    // classify,
    ...others  // 剩余参数集合成了一个对象
   }=ctx.request.body
  // 2 findone 方法查找书籍id 判断是否找到
  const one = await Book.findOne({
    _id:id
  }).exec()
  // 如果返回为空则没找到
  if (!one){
    ctx.body={
      msg:"没有找到书籍",
      code:0
     
    }
    return
  }
    
    // 找到了书籍 判断用户都传递了哪些内容就去修改对应内容
    //定义空对象
    const newQuery={}
    //   Object.entries(others) 拿到others的键值对数组 foreach进行遍历
    Object.entries(others).forEach(([key,value])=>{
      // 判断如有值则存储到新数组
      if (value) {
        newQuery[key]=value
      }
    })

    // 把新数组与one内的属性进行 属性值的额合并（更新） 
    Object.assign(one,newQuery)
    // 存储更新数据库
    const res= await one.save()
    // 返回响应体
    ctx.body={
      data:res,
      code:1,
      msg:"保存成功"
    }
  })
// 
router.get('/detail/:id',async (ctx)=>{
  // 获取id
  const {
    id
  }=ctx.params
  // 查找id
  const one =await findBookOne(id)
  // 判断是否找到
  if(!one){
    ctx.body={
      msg:"没有找到书籍",
      code:0
    }
    return 
  }
  ctx.body={
    msg:"查询成功",
    data:one,
    code:1
  }

})
module.exports=router;