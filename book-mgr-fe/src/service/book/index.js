import axios from "axios"
// 请求添加接口
export const add=(form)=>{
    return axios.post("http://localhost:3000/book/add",
    form)
}
// 请求列表接口
export const list=(data)=>{
  return axios.get("http://localhost:3000/book/list",
  {
    params:data
  })
}
// 请求删除接口
export const del=(id)=>{
  // console.log(id)
  return axios.delete(
    `http://localhost:3000/book/${id}`
  )
}
// 入库出库
export const updateCount=(data={})=>{
  return axios.post(
    `http://localhost:3000/book/update/count`,
    data,
  )
}
// 书籍信息修改
export const update=(data={})=>{
  return axios.post(
    `http://localhost:3000/book/update`,
    data,
  )
}
// 书籍详情
export const detail =(id)=>{
  return axios.get(
    `http://localhost:3000/book/detail/${id}`
  )
}