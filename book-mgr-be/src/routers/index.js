// 设置注册路由

// 引入文件
const auth = require('./auth');
const inviteCode = require('./invite-code');
const book = require('./book');
const inventoryLog = require('./inventory-log');
const user = require('./user');

// 注册路由中间件
module.exports = (app) => {
  app.use(auth.routes());
  app.use(inviteCode.routes());
  app.use(book.routes());
  app.use(inventoryLog.routes());
  app.use(user.routes())

};