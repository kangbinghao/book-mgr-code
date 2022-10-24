<template>
  <div>
    <a-card>
      <h2>图书列表</h2>
      <a-divider></a-divider>
      <space-between>
        <div class="search">
        <a-input-search
          placeholder="根据书名搜索" 
          enter-button 
          v-model:value="keyword"
          @search="onSearch"
          > </a-input-search>
          <a v-if="isSearch" href="javascript:;" @click="backAll">返回</a>
      </div>
      <a-button @click="show=true">添加一条</a-button>
      </space-between>
      <a-divider></a-divider>
      <a-table :columns="columns" :data-source="list" :pagination="false">
        <!-- 老版插槽能出效果但会报错 -->
      <!-- <template #publishDate="data">
        {{formatTimestamp(data.record.publishDate)}}
        {{data.record.publishDate}}
      </template> -->
      <!-- 新版插槽定义 -->
       <template  v-slot:bodyCell="{column,record}">
        <!-- 日期 -->
          <template v-if="column.dataIndex === 'publishDate'">
            {{formatTimestamp(record.publishDate)}}
          </template>
          <!-- 操作 -->
          <template v-if="column.dataIndex === 'actions'">
              <a href="javascript:;" @click="remove(record)">删除</a>
          </template>
          <!-- 库存 -->
          <template v-if="column.dataIndex === 'count'">
            <a href="javascript:;" @click="editCount">入库</a>
            {{record.count}}
            <a href="javascript:;">出库</a>
             
          </template>
       </template>

      </a-table>
     <space-between style="margin-top:24px">
      <div></div>
      <a-pagination 
             v-model:current="curPage" 
            :total="total" 
            :page-size="10" 
            @change="setPage"
      ></a-pagination>
     </space-between>

    </a-card>
    <add-one v-model:show="show"/>
  </div>
</template>
