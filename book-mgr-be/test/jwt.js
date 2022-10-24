// 实验token加密 令牌
var jwt = require('jsonwebtoken');
// 加密
var token = jwt.sign({ account: 'bar',id:1 }, 'shhhhh');
console.log(token)

// 解密
jwt.verify(token,"shhhhh",(err,playload)=>{
   console.log(err,playload)
})