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
// 优化时间格式
const tsPadStart=(str)=>{
  str=String(str)
  return str.padStart(2,"0")
}
// 时间戳转日期方法
export const  formatTimestamp=(ts)=>{
  const date= new Date(Number(ts))
  const YYYY=date.getFullYear()
  const MM=tsPadStart(date.getMonth()+1) 
  const DD=tsPadStart( date.getDate())
  const hh =tsPadStart(date.getHours())
  const mm=tsPadStart(date.getMinutes())
  const ss=tsPadStart(date.getSeconds())

  return `${YYYY}/${MM}/${DD} ${hh}:${mm}:${ss}`

}