import addOne from '@/views/books/AddOne/indexView.vue'
import Update from '@/views/books/Update/indexView.vue'
import { ref,onMounted} from 'vue'
import { book } from '@/service'
import { result,formatTimestamp,clone } from '@/helpers/utils'
import { message,Modal,Input} from 'ant-design-vue'
export default {
  components:{addOne,Update},
   setup() {
    const columns=[
          {
            title: '书名',
            dataIndex: 'name',
          },
          {
            title: '作者',
            dataIndex: 'author',
          },
          {
            title: '价格',
            dataIndex: 'price',
          },
          {
            title: '库存',
            dataIndex: 'count',
          },
          {
            title: '出版日期',
            name:"publishDate",
            dataIndex:"publishDate",
            // 老版插槽写法
            // slots:{
            //   customRender:"publishDate"
            // }
          },
          {
            title: '分类',
            dataIndex: 'classify',
          },
          {
            title: '操作',
            dataIndex: 'actions',
          },
         
        ]
   
      // 表格显示和隐藏 变量
      const show =ref(false)
      const showUpdateModel=ref(false)
      // 定义变量获取图书数据
      const list=ref([])
      // 总数
      const total=ref(0)
      const curPage=ref(1)
      const keyword=ref("")
      const isSearch=ref(false)
      // 定义空对象存储要编辑的 书籍对象
      const curEditBook=ref({})
      //封装获取数据的方法
      const getList= async ()=>{
           // 调用获取列表数据的方法
           const res= await book.list({
            page:curPage.value,
            size:10,
            keyword:keyword.value,
           });
          // console.log(res)
         result(res)
        //  结构拿到对应的值
         .success(({data:{list:l,total:t}})=>{
            list.value=l
            total.value=t
         })
      }
        // 当页面被挂载时候
      onMounted(async ()=>{
         getList()
      })
      // 设置页面当前页
     const setPage=(page)=>{
         curPage.value=page
         getList()
     }
    //  点击搜索
     const onSearch=()=>{
      getList()
      //  ！！ 隐式转换 字符串非空 true 字符串为空则false
      isSearch.value= !!keyword.value
     }
    //  返回方法
     const backAll=()=>{
       keyword.value=""
       getList()
       isSearch.value=false
     }
    //  删除方法
    const remove=async (record)=>{
       const {_id}=record
      //  console.log(_id)
       const res= await book.del(_id)
       result(res)
      //  调用成功方法
       .success(({msg})=>{
           message.success(msg)
          //  更新列表
          getList()
       })
     
    }
    // 弹框
    const updateCount=(type,record)=>{
      let word="增加"
      if(type==="OUT_COUNT"){
        word="减少"
      }

      Modal.confirm({
        title:"要"+word+"多少库存",
        // 给对话框增加输入框节点
        content:(
          <div>
            <Input class="__book_input_count"/>
          </div>
          ),
          // 点击ok时候做的事情
         onOk:async()=>{
             const el=document.querySelector(".__book_input_count");
             let num=el.value
             const res= await book.updateCount({
                  id:record._id,
                  num,
                  type,
             })
             result(res)
             .success((data)=>{
                  if (type==="IN_COUNT"){
                    num = Math.abs(num)
                  }else{
                    num = - Math.abs(num)
                  }
                  const one=list.value.find((item)=>{
                    return item._id===record._id
                  })
                  if(one){
                    console.log(num)
                    one.count=one.count+num
                    message.success(`成功${word} ${Math.abs(num)}本书`)
                  }
             })
        }
      })
    }
     
    // 编辑修改数据方法
    const update= async (record)=>{
        showUpdateModel.value=true
        curEditBook.value=record
    }
    const updateCurBook=(newData)=>{
      Object.assign(curEditBook.value,newData)
    }
      return {
        columns,
        show,
        list,
        formatTimestamp,
        curPage,
        total,
        setPage,
        keyword,
        onSearch,
        backAll,
        isSearch,
        remove,
        updateCount,
        showUpdateModel,
        update,
        curEditBook,
        updateCurBook

      }
   }
}