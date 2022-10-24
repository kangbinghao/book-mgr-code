<template>
  <div>
    <a-modal :visible="props.show" title="添加书籍" @ok="submit" @cancel="close">
      <a-form :label-col="{span:6}">
      <a-form-item label="书名">
         <a-input  v-model:value="editForm.name" />
      </a-form-item>
      <a-form-item label="价格">
         <a-input-number  :min="0" :max="9999"  v-model:value="editForm.price" />
      </a-form-item>
      <a-form-item label="作者">
         <a-input    v-model:value="editForm.author"/>
      </a-form-item>
      <a-form-item label="出版日期">
        <a-date-picker   v-model:value="editForm.publishDate"/>
      </a-form-item>
      <a-form-item label="分类">
         <a-input    v-model:value="editForm.classify"/>
      </a-form-item>
     </a-form>
    </a-modal>
  </div>
</template>
<script>
import { reactive,watch } from 'vue'
import moment from 'moment'
import { result } from '@/helpers/utils'
import { book } from '@/service'
import { message } from 'ant-design-vue'

export default {
  props:{
    show:Boolean,
    book:Object // 当前你要修改的书籍对象
  },
   setup(props,context) {
 
      const editForm=reactive({
            name:"",
            price:0,
            author:"",
            publishDate:0,
            classify:"" ,
      })
     
      // 调用父组件传过来的控制关闭的方法
      const close =()=>{
        context.emit("update:show",false)
      }
      // 监听book是否发生改变
      watch(()=>props.book,(current)=>{
            Object.assign(editForm,current)
            editForm.publishDate=moment(Number(editForm.publishDate))
      })
      const submit=async ()=>{
        const res=  await book.update({
          id:props.book._id,
            name:editForm.name,
            price:editForm.price,
            author:editForm.author,
            publishDate:editForm.publishDate.valueOf(), //修改时间戳，让其正确显示
            classify:editForm.classify ,
          
        })
        result(res)
        .success(({data,msg})=>{
            context.emit("update",data)
            // 弹框显示
            message.success(msg)
            // 关闭窗口
            close()
        })
      }
      return {editForm,submit,props,close}
   }
}
</script>
<style lang="scss" scoped>

</style>