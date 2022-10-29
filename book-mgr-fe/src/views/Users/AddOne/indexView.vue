<template>
  <div>
    <a-modal :visible="props.show"
             title="添加用户"
             @ok="submit"
             @cancel="close">
      <a-form :label-col="{span:6}">
        <a-form-item label="账户">
          <a-input v-model:value="addForm.account" />
        </a-form-item>
        <a-form-item label="密码">
          <a-input v-model:value="addForm.password" />
        </a-form-item>

      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { reactive } from 'vue'
import { user } from '@/service'
import { result, clone } from '@/helpers/utils'
import { message } from 'ant-design-vue'
const defaultFormDate = {
  account: '',
  password: '',
}
export default {
  props: {
    show: Boolean,
  },
  
  setup(props, context) {

     // 调用父组件传过来的控制关闭的方法
     const close = () => {
      context.emit('update:show', false)
    }

    const addForm = reactive(clone(defaultFormDate))
    // 提交表单
    const submit = async () => {
      // 克隆表单数据
      const form = clone(addForm)
      const res = await user.add(form.account,form.password)
      result(res).success((d, { data }) => {
        // 数据覆盖
        Object.assign(addForm, defaultFormDate)
        message.success(data.msg)
        // 关闭窗口
        close()
        // 重新加载数据
        //  通知父容器 调用重新加载列表的方法
        context.emit("getList")
      })
    }
   
    return { addForm, submit, props, close }
  },
}
</script>
<style lang="scss" scoped>
</style>