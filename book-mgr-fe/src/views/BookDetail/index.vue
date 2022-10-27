<template>
  <div>
    <a-card>
      <space-between>
        <h2>{{d.name}}</h2>
        <div>
          <a-button size="small"
                    type="primary" @click="showUpdateModel=true">编辑</a-button>
          &nbsp;
          <a-button size="small"
                    type="danger" @click="remove">删除</a-button>
        </div>
      </space-between>
      <a-divider></a-divider>
      <div class="base-info">
        <div class="items">
          <div class="item">
            <div class="title">价格</div>
            <div class="content">{{d.price}}</div>
          </div>
          <div class="item">
            <div class="title">作者</div>
            <div class="content">{{d.author}}</div>
          </div>
          <div class="item">
            <div class="title">分类</div>
            <div class="content">{{d.classify}}</div>
          </div>
        </div>

        <div class="items">
          <div class="item">
            <div class="title">出版日期</div>
            <div class="content">{{formatTimestamp(d.publishDate)}}</div>
          </div>
        </div>
        <Update></Update>
      </div>
    </a-card>
    <div class="log">
      <a-card title="出入库日志">
        <template #extra>
          <span class="left">
            <a href="javascript:;" @click="logFiler('IN_COUNT')">
              <CheckOutlined v-if="curLogType==='IN_COUNT'"></CheckOutlined>
              入库日志
            </a>
          </span>
          &nbsp;
          <span>
           
            <a href="javascript:;" @click="logFiler('OUT_COUNT')">
              <CheckOutlined v-if="curLogType!=='IN_COUNT'"></CheckOutlined>
              出库日志
            </a>
          </span>
        </template>
        <div>
          <a-table bordered  :pagination="false"  :columns="column" :data-source="log">
            <template  v-slot:bodyCell="{column,record}">
                  <template v-if="column.dataIndex === 'time'">
                      {{formatTimestamp(record.meta.createAt)}}
                  </template>
            </template>
          </a-table>
        </div>
     
      <space-between class="pageination">
        <div></div>
        <a-pagination 
             v-model:current="logCurPage" 
            :total="logTotal" 
            :page-size="10" 
            @change="setLogPage"
         />
      </space-between>
    </a-card>
    </div> 
    <update v-model:show="showUpdateModel" :book="d" @update="update"/>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import './index.scss';
</style>