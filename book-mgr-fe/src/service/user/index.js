import axios from "axios"
// 请求添加接口
export const list=(page=1,size=20)=>{
    return axios.get("http://localhost:3000/user/list",
    {
      // 添加 后续get 携带参数
      params:{
        page, // 当前页
        size, // 每页个数
      }
    })
}
// 请求删除接口方法
export const delUser=(id)=>{
  return axios.delete("http://localhost:3000/user/"+id)
}

// 请求添加用户接口方法
export const add=(account,password)=>{
  return axios.post("http://localhost:3000/user/add",{
      account,
      password
  })
}

// 请求修改密码 接口
export const repassword=(id,repassword)=>{
  return axios.post("http://localhost:3000/user/reset/password",{
      id,
      repassword
  })
}

// 请求 搜索用户接口
export const search=(account)=>{
  return axios.get("http://localhost:3000/user/list/search", {
    // 添加 后续get 携带参数
    params:{
        account
    }
  })
}