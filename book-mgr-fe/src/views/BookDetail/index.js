import { formatTimestamp, result } from "@/helpers/utils";
import { book ,inventoryLog} from "@/service";
import { useRoute, useRouter } from "vue-router";
import { ref,onMounted } from "vue";
import { message } from "ant-design-vue";
import Update from '@/views/books/Update/indexView.vue'
import {CheckOutlined} from '@ant-design/icons-vue'
const column=[
  {
    title: '数量',
    dataIndex: 'num',
  },
  {
    title: '操作时间',
    dataIndex: 'time',
  },
]

export default ({
  // 组件注册
   components:{Update,CheckOutlined},
   setup() {
    // 实例化页面路由
     const route=useRoute()
     //  拿到 id数据
     const id= route.params.id
    //  定义空响应对象 
     const detailInfo=ref({})
    //  定义调用接口方法
     const getDetail =async()=>{
      const res= await book.detail(id)
      // 执行result方法 判断数据是否拿到
      result(res)
      .success(({data})=>{
        // 处理时间戳为时间字符串  
        // data.publishDate=  formatTimestamp(data.publishDate)
           detailInfo.value=data
      })
    }


    //  构造函数 onmounted 执行调用接口方法
    onMounted(() => {
      // 调用获取详情
         getDetail()
        //  调用获取日志列表
         getInventoryLog()
    })
    // 实例化router
    const router=useRouter()
    // 点击删除按钮
    const remove=async ()=>{
      const res= await book.del(id)
      result(res)
      .success(({msg})=>{
          message.success(msg)
          // 跳转回去books页 router.push("/books") 有局限性，用户返回上一页会拿不到详情数据的
          // router.push("/books")
          router.replace('/books')
      })

    }
    // 设置显示隐藏的变量
    const showUpdateModel= ref(false);
    // 点击修改数据
    const update=(book)=>{
       Object.assign(detailInfo.value,book)
    }
    // 获取出入库日志
    // 列表数据
    const log=ref([])
    // 总数
    const logTotal=ref(0)
    // 分页
    const logCurPage=ref(1)
  //  入库出库 按钮 切换
    const curLogType=ref('IN_COUNT')


    // 获取出入库日志列表
    
    const getInventoryLog=async ()=>{
        const res =await inventoryLog.list(
           curLogType.value,
           logCurPage.value,
           10,
          )
        result(res)
        .success(({data:{list,total}})=>{
          log.value=list
          logTotal.value=total
        })
    }
    // 点击页码分页
    const setLogPage=(page)=>{
       logCurPage.value= page
       getInventoryLog()
    }
  //  筛选日志 入库出库触发
  const logFiler=(type)=>{
    curLogType.value=type
    getInventoryLog()
  }
  
     return {
      d:detailInfo,
      formatTimestamp,
      remove,
      showUpdateModel,
      update,
      logTotal,
      log,
      logCurPage,
      setLogPage,
      column,
      logFiler,
      curLogType,
    }
   }



})