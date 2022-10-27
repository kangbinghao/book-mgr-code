import axios from "axios"
// 请求添加接口
export const list=(type='IN_COUNT',page=1,size=20)=>{
    return axios.get("http://localhost:3000/inventory-log/list",
    {
      // 添加 后续get 携带参数
      params:{
        type,
        page,
        size
      }
    })
}
