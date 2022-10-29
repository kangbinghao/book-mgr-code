import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import SpaceBetween from "./components/SpaceBetween/indexView.vue"
import FlexEnd from "./components/FlexEnd/indexView.vue"
createApp(App)
     .use(store) 
     .use(router)
     .use(Antd)
     .component("space-between",SpaceBetween)
     .component("flex-end",FlexEnd)
     .mount('#app')
     
