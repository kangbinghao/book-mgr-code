import {message} from "ant-design-vue"
// 拿到请求数据后的处理和显示的方法
export const result =(res,authshowErrorMsg=true)=>{
   const {data}=res
   if ((data.code===0)&& authshowErrorMsg) {
     message.error(data.msg)
   }
   return {
    success(cd){
       if (data.code!==0) {
         cd(data,res)
       }
       return this
    },
    fail(cd){
      if (data.code===0) {
        cd(data,res)
      }
      return this
    },
    finally(cd){
      cd(data,res)
      return this
    }
   }
}
// 深度拷贝 方法
export const clone=(obj)=>{
  return JSON.parse(JSON.stringify(obj))
}
// 时间戳转日期方法
export const  formatTimestamp=(ts)=>{
  const date= new Date(Number(ts))
  const YYYY=date.getFullYear()
  const MM=date.getMonth()+1
  const DD=date.getDate()
  const hh =date.getHours()
  const mm=date.getMinutes() 
  const ss=date.getSeconds()

  return `${YYYY}/${MM}/${DD} ${hh}:${mm}:${ss}`

}