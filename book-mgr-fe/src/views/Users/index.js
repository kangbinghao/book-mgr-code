import { result ,formatTimestamp} from "@/helpers/utils"
import { user } from "@/service"
import { message } from "ant-design-vue"
import { ref ,onMounted} from "vue"
import AddOne from './AddOne/indexView.vue'
import rePwd from './ResetPassword/indexView.vue'

const column=[
  {
    title: '账户',
    dataIndex: 'account',
  },
  {
    title: '创建日期',
    dataIndex: 'createAt',
  },
  {
    title: '操作',
    dataIndex: 'actions'
  },
]
export default{
   components:{AddOne,rePwd},
   setup() {
  
    const  userlist =ref([])
    const curPage=ref(1)    
    const total=ref(0)
    const pagesize=ref(10)
  //  获取用户列表数据
    const getUser= async ()=>{
      const res= await user.list(curPage.value,pagesize.value)
      result(res)
        .success(({data:{list:l,total:t}})=>{
          userlist.value=l
          total.value=t
          console.log(l)
          console.log( userlist)
          // console.log( total.value)
        })
      
    }
    // 被挂载时候
    onMounted(()=>{
      // console.log(12)
      // 执行获取用户列表数据
      getUser()
    })
    // 删除方法
    const remove=async (id)=>{
       const res=  await user.delUser(id)
       result(res)
       .success(({msg})=>{
           message.success(msg)
       })
      //  更新列表
      getUser()
    }
    // 定义添加用户弹框 显示隐藏变量
    const showModel =ref(false)
    // 分页器页码改变时候的回调
    const setPage=(page)=>{
      curPage.value=page
      getUser()
    }
      // 定义重置密码弹框 显示隐藏变量
    const showModelRePwd =ref(false)

    const thisid= ref("")
    // 重置密码
    const resetpwd=async (id)=>{
      //  显示弹框
      showModelRePwd.value=true
      thisid.value=id

   }
    // 搜索用户
    const  keyword=ref("")  // 关键字
    const isSearch=ref(false)
    //搜索方法
    const onSearch= async ()=>{
      
      isSearch.value=true
       const res= await user.search(keyword.value)
       result(res)
       .success(({msg,data})=>{
            message.success(msg)
              //  更新列表
              userlist.value=[]
              userlist.value.push(data)
              total.value=1
              console.log(data)
       })
    }
    // 点击返回
    const backAll=()=>{
      keyword.value=""
      getUser()
      isSearch.value=false

    }
    return {
      userlist,
      total,
      curPage,
      column,
      formatTimestamp,
      remove,
      showModel,
      getUser,
      curPage,
      pagesize,
      setPage,
      resetpwd,
      showModelRePwd,
      thisid,
      keyword,
      onSearch,
      isSearch,
      backAll
    }
   }
     

     




}