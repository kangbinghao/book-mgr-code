<template>
  <div class="auth">
    <div class="title-info">
      <img class="logo" src="https://www.wudibiancheng.com/uploads/20220918/f344f8979c6fa8c6447dbdd7cb4d97f6.png" alt="">
      <h2 class="title">图书管理系统后台</h2>
    </div>
    <div class="form">
      <a-tabs>
        <a-tab-pane key="1" tab="登录">
          <div class="item"> 
            <a-input placeholder="账号" size="large" v-model:value="loginForm.account"> 
              <template #prefix>
                <user-outlined />
              </template>
            </a-input>
          </div>
          <div class="item"> 
            <a-input-password placeholder="密码" size="large" v-model:value="loginForm.password">
              <template #prefix>
                <LockOutlined />
              </template>
             </a-input-password>
          </div>
          <div class="item"> 
            <a href="#">忘记密码</a>
          </div>
          <div class="item">
            <a-button type="primary" size="large" @click="login">
              登录
            </a-button>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="注册">
          <div class="item"> 
            <a-input placeholder="账号" size="large" v-model:value="regForm.account"> 
              <template #prefix>
                <user-outlined />
              </template>
            </a-input>
          </div>
          <div class="item"> 
            <a-input placeholder="密码" size="large" v-model:value="regForm.password">
              <template #prefix>
                <LockOutlined />
              </template>
             </a-input>
          </div>
          <div class="item"> 
            <a-input placeholder="邀请码" size="large" v-model:value="regForm.inviteCode">
              <template #prefix>
                <MailOutlined />
              </template>
             </a-input>
          </div>
          <div class="item">
            <a-button type="primary" size="large" @click="register">
              注册
            </a-button>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
<script>
import { defineComponent,reactive} from 'vue'
 // 导入图标
import { UserOutlined ,LockOutlined,MailOutlined} from '@ant-design/icons-vue';
import {auth} from "@/service";
import {result} from "@/helpers/utils"
import {message} from 'ant-design-vue'


export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined,
    MailOutlined
   
  },
  setup() {
    //注册表单数据
     const regForm=reactive({
        account:'',
        password:'',
        inviteCode:'',
     })
    //  注册逻辑
     const register= async ()=>{
      if (regForm.account==="") {
          message.info("请输入账户")
          return
      }
      if (regForm.password==="") {
          message.info("请输入密码")
          return
      }
      if (regForm.inviteCode==="") {
          message.info("请输入邀请码")
          return
      } 
      const res=await  auth.register(regForm.account,regForm.password,regForm.inviteCode)
      result(res)
          .success((data)=>{
          message.success(data.msg)
          })
        
     }
    //  登录表单数据
     const loginForm=reactive({
        account:'',
        password:''
     })
    //  登录逻辑
     const login=async ()=>{

      if (loginForm.account==="") {
          message.info("请输入账户")
          return
      }
      if (loginForm.password==="") {
          message.info("请输入密码")
          return
      }
    
      const res= await  auth.login(loginForm.account,loginForm.password)
      result(res)
          .success((data)=>{
          message.success(data.msg)
          })
     }
    return {
      // 注册相关数据
      register,
      regForm,
      // 登录相关数据
      login,
      loginForm
    }
  },
})
</script>
<style lang="scss" scoped>
.auth {
  .title-info{
     margin-top: 100px;
     display: flex;
     justify-content: center;
     align-items: center;
     .logo{
      width: 50px;
      margin-right: 15px;
     }
}
 .form{
  width: 400px;
  margin: 0 auto;
  margin-top: 30px;
  .item{
    margin-bottom: 16px;
    button{
      width: 100%;
    }
  }
 }
}


</style>