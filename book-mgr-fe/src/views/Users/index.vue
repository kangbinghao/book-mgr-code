<template>
  <div>
    <a-card>
      <h2>用户管理</h2>
      <a-divider></a-divider>
      <space-between>
        <div class="search">
          <a-input-search placeholder="根据账户搜索"
                          enter-button
                          v-model:value="keyword"
                          @search="onSearch"> </a-input-search>
         <a v-if="isSearch"
             href="javascript:;"
             @click="backAll">返回</a>
        </div>
     
      <a-button  @click="showModel=true">添加用户</a-button>
    </space-between>
      <a-divider></a-divider>
      <div>
        <a-table 
           bordered 
          :pagination="false" 
          :columns="column"
          :data-source="userlist"
        > 
        <template  v-slot:bodyCell="{column,record}">
                  <template v-if="column.dataIndex === 'createAt'">
                      {{formatTimestamp(record.meta.createAt)}}
                  </template>
                  <template v-if="column.dataIndex === 'actions'">
                        <a href="javascript:;" @click="resetpwd(record._id)">重置密码</a>
                        /
                        <a href="javascript:;" @click="remove(record._id)">删除</a>
                  </template>
            </template>
      </a-table>
      </div>
    <flex-end class="flex-end" >
      <!-- 分页器 -->
    <a-pagination 
    v-model:current="curPage" 
    :total="total"  
    :page-size="pagesize" 
    @change="setPage"
    ></a-pagination>
    </flex-end>
    </a-card>
  </div>
  <add-one v-model:show='showModel' @getList="getUser()"/>
  <re-pwd  v-model:show='showModelRePwd' :id="thisid"/>
</template>




<script src="./index.js"></script>
<style lang="scss" scoped>
 @import './index.scss'

</style>
