<template>
  <div>
    <a-modal :visible="props.show" title="添加书籍" @ok="submit" @cancel="close">
      <a-form :label-col="{span:6}">
      <a-form-item label="书名">
         <a-input  v-model:value="addForm.name" />
      </a-form-item>
      <a-form-item label="价格">
         <a-input-number  :min="0" :max="9999"  v-model:value="addForm.price" />
      </a-form-item>
      <a-form-item label="作者">
         <a-input    v-model:value="addForm.author"/>
      </a-form-item>
      <a-form-item label="出版日期">
        <a-date-picker   v-model:value="addForm.publishDate"/>
      </a-form-item>
      <a-form-item label="分类">
         <a-input    v-model:value="addForm.classify"/>
      </a-form-item>
      <a-form-item label="库存">
        <a-input-number  :min="0" :max="9999"  v-model:value="addForm.count" />
      </a-form-item>
     </a-form>
    </a-modal>
  </div>
</template>
<script>
import { reactive } from 'vue'
import { book } from '@/service'
import { add } from '@/service/book'
import {result,clone}from '@/helpers/utils'
import { message } from 'ant-design-vue'
const defaultFormDate= {
        name:"",
        price:0,
        author:"",
        publishDate:0,
        classify:"" ,
        count:""  
}
export default {
  props:{
    show:Boolean
  },
   setup(props,context) {

    const addForm=  reactive(clone(defaultFormDate))
      const submit=async ()=>{
        const form =clone(addForm)
        form.publishDate=addForm.publishDate.valueOf()
        console.log(form)
        const res = await book.add(form)
        result(res)
           .success((d,{data})=>{
           Object.assign(addForm,defaultFormDate)
           message.success(data.msg)
        })
      }
      // 调用父组件传过来的控制关闭的方法
      const close =()=>{
        context.emit("update:show",false)
      }
      return {addForm,submit,props,close}
   }
}
</script>
<style lang="scss" scoped>

</style>