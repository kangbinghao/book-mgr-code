<template>
   <div class="basic-layout">
    <div class="app-header-placeholder"></div> 
     <div class="app-header">
         <div class="left">
          <img class="logo" src="../../assets/logo.png" alt="">
          <div class="title">图书管理系统</div>
         </div>
         <div class="right">
          <div class="hello-msg">你好，admin</div>
          <div class="back">退出</div>
         </div>
        
     </div>
     <div class="app-content">
      <div class="left">
        <app-nav />
      </div>
      <div class="right">
        <router-view></router-view>
      </div>
     </div>
   </div>
   
</template>
<script>
import  {defineComponent} from "vue"
import  Nav  from '../Nav/indexView.vue'
export default defineComponent({
   components:{
      appNav:Nav,
   }
})
</script>
<style lang="scss" scoped>
 .basic-layout{
  .app-header-placeholder{
        width: 100%;
        height: 64px;
      }
   .app-header{
     
      height: 64px;
      position: fixed;
      top: 0;
      left: 0;
      background-color: #fff;
      box-shadow: 0 2px 8px #f0f1f2;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
      width: 100%;
      z-index: 1;
    .left{
      display: flex;
      align-items: center;
      .logo{
        width: 50px;
        margin-right: 14px;
      }
      .title{
        font-size: 18px;
      }
    }
    .right{
       display: flex;
      .hello-msg,.back{
         height: 64px;
         line-height:64px;
         padding: 0 26px;
       
      }
      .back:hover{
         background-color: #eee;
         cursor: pointer;
      }
    }
   }
   .app-content{
    display: flex;
    .left{
      width: 256px;
      background-color: #fff;
      position: fixed;
      top: 64px;
      bottom: 0;
    }
    .right{
      flex: 1;
      padding: 24px;
      margin-left: 256px;
    }
   }
 }
</style>