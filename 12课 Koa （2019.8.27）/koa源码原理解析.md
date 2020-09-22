---
title: koa源码原理解析
date: 2020-09-22 20:07:17
tags: node
---

一个语言的成熟需要时间的积累，,koa是一个新的web框架，致⼒于成为 web 应⽤和 API 开发领域中的⼀个更⼩、更富有表现⼒、更健壮的基⽯。

<!--more-->

## koa

- 概述：koa是一个新的web框架，致⼒于成为 web 应⽤和 API 开发领域中的⼀个更⼩、更富有
	表现⼒、更健壮的基⽯。

  koa是Express的下一代基于nodejs的web框架

  koa2完全使用promise并配合async来实现异步

- 特点：

  1. 轻量，无捆绑
  2. 中间件架构
  3. 优雅的API设计
  4. 增强的错误处理

- 安装：npm i koa -S

- 中间件机制，请求，响应处理

  ```javascript
    const Koa = require('koa')
    const app = new Koa()
    app.use((ctx, next) => {  
        ctx.body = [
            {
                name: 'tom'
            }
        ]
        next()
    })
  
    const router = {}
    router['/html'] = ctx => {
        ctx.type = 'text/html;charset=utf-8'
        ctx.body = `<b>我的名字是:${ctx.body[0].name}</b>`
    }
    app.listen(3000)
  ```
  
  ```javascript
  // 搞个⼩路由
  const router = {}
  router['/html'] = ctx => {
   ctx.type = 'text/html;charset=utf-8'
   ctx.body = `<b>我的名字是:${ctx.body[0].name}</b>`
  }
  const fun = router[ctx.url]
  fun && fun(ctx)
  ```
  
- koa中间件机制  

  ​	  Koa中间件机制就是函数式 组合概念 Compose的概念，将 ⼀组需要顺序执⾏的 函数复合为⼀个函数，外层函数的参数实际是内层函数的返回值。洋葱圈模型可以形象表示这种机 制，是源码中的精髓和难点。

- 常见的中间件操作

  - 静态服务
  
    ```javascript
    app.use(require('koa-static')(__dirname + '/'))
    
    ```
  
    
  
  - 路由
  
    ```javascript
    const router = require('koa-router')()
    router.get('/string', async (ctx, next) => {
     	ctx.body = 'koa2 string'
    })
    router.get('/json', async (ctx, next) => {
         ctx.body = {
        	 title: 'koa2 json'
         }
    })
    app.use(router.routes())
    ```
  
    
  
  - 日志
  
    ```javascript
    app.use(async (ctx,next) => {
         const start = new Date().getTime()
         console.log(`start: ${ctx.url}`);
         await next();
         const end = new Date().getTime()
         console.log(`请求${ctx.url}, 耗时${parseInt(end-start)}ms`)
    })
    ```
  
    
  
  

## koa原理：

- ​	⼀个基于nodejs的⼊⻔级http服务，类似下⾯代码：

  ```javascript
  const http = require('http')
  const server = http.createServer((req, res)=>{
       res.writeHead(200)
       res.end('hi kaikeba')
  })
  server.listen(3000,()=>{
  	 console.log('监听端⼝3000')
  })
  ```

  

- ​    koa的目标是用简单化，流程化，模块化的方式实现回调

  ```javascript
  // 创建kkb.js
  const http = require("http");
  class KKB {
       listen(...args) {
           const server = http.createServer((req, res) => {
              this.callback(req, res);
           });
           server.listen(...args);
       }
       use(callback) {
       	this.callback = callback;
       }
  }
  module.exports = KKB;
  // 调⽤，index.js
  const KKB = require("./kkb");
  const app = new KKB();
  app.use((req, res) => {` `
  	res.writeHead(200);
   	res.end("hi kaikeba");
  });
  app.listen(3000, () => {
   	console.log("监听端⼝3000");
  });
  ```

     ⽬前为⽌，KKB只是个⻢甲，要真正实现⽬标还需要引⼊上下⽂（context）和中间件机制 （middleware）

## context

- koa为了能够简化API，引⼊上下⽂context概念，将原始请求对象req和响应对象res封装并挂载到 context上，并且在context上设置getter和setter，从⽽简化操作。

- 知识储备：getter/setter方法

  ```javascript
  // 测试代码，test-getter-setter.js
  const kaikeba = {
   info:{ name: '开课吧', desc: '开课吧真不错' },
   get name(){
   	return this.info.name
   },
   set name(val){
   	console.log('new name is' + val)
   	this.info.name = val
   }
  }
  console.log(kaikeba.name)
  kaikeba.name = 'kaikeba'
  console.log(kaikeba.name)
  ```

-  封装request，response和context

  [https://github.com/koajs/koa/blob/master/lib/response.js](https://github.com/koajs/koa/blob/master/lib/response.js)

  ```javascript
  // request.js
  module.exports = {
       get url() {
          return this.req.url;
       }
  
       get method(){
          return this.req.method.toLowerCase()
       }
  };
  // response.js
  module.exports = {
       get body() {
      	 return this._body;
       },
       set body(val) {
      	 this._body = val;
       }
  };
  // context.js
  module.exports = {
       get url() {
      	 return this.request.url;
       },
       get body() {
       	return this.response.body;
       },
       set body(val) {
      	 this.response.body = val;
       },
       get method() {
       	return this.request.method
       }
  };
  ```

  ```javascript
  // kkb.js
  // 导⼊这三个类
  const context = require("./context");
  const request = require("./request");
  const response = require("./response");
  class KKB {
       listen(...args) {
           const server = http.createServer((req, res) => {
               // 创建上下⽂
               let ctx = this.createContext(req, res);
  
               this.callback(ctx)
               // 响应
               res.end(ctx.body);
           });
           // ...
       }
       // 构建上下⽂, 把res和req都挂载到ctx之上，并且在ctx.req和ctx.request.req同时保存
       createContext(req, res) {
           const ctx = Object.create(context);
           ctx.request = Object.create(request);
           ctx.response = Object.create(response);
           ctx.req = ctx.request.req = req;
           ctx.res = ctx.response.res = res;
           return ctx;
       }
  }
  ```

  

## 中间件

-  Koa中间件机制：Koa中间件机制就是函数组合的概念，将⼀组需要顺序执⾏的函数复合为⼀个函 数，外层函数的参数实际是内层函数的返回值。洋葱圈模型可以形象表示这种机制，是源码中的精 髓和难点。

- 异步中间件

  ```javascript
  function compose(middlewares) {
       return function() {
           return dispatch(0);
           // 执⾏第0个
           function dispatch(i) {
               let fn = middlewares[i];
               if (!fn) {
               	return Promise.resolve();
               }
               return Promise.resolve(
                   fn(function next() {
                       // promise完成后，再执⾏下⼀个
                       return dispatch(i + 1);
                   })
               );
           }
       };
  }
  ```

  ```javascript
  async function fn1(next) {
       console.log("fn1");
       await next();
       console.log("end fn1");
  }
  async function fn2(next) {
       console.log("fn2");
       await delay();
       await next();
       console.log("end fn2");
  }
  function fn3(next) {
   	console.log("fn3");
  }
  function delay() {
       return new Promise((reslove, reject) => {
   vnm        setTimeout(() => {
              reslove();
           }, 2000);
       });
  }
  const middlewares = [fn1, fn2, fn3];
  const finalFn = compose(middlewares);
  finalFn();
  ```

  

- compose用在koa中，kkb.js

  ```javascript
  const http = require("http");
  const context = require("./context");
  const request = require("./request");
  const response = require("./response");
  
  class KKB {
       // 初始化中间件数组
       constructor() {
          this.middlewares = [];
       }
       listen(...args) {
           const server = http.createServer(async (req, res) => {
               const ctx = this.createContext(req, res);
               // 中间件合成
               const fn = this.compose(this.middlewares);
               // 执⾏合成函数并传⼊上下⽂
               await fn(ctx);
               res.end(ctx.body);
           });
           server.listen(...args);
       }
       use(middleware) {
           // 将中间件加到数组⾥
           this.middlewares.push(middleware);
       }
       // 合成函数
       compose(middlewares) {
           return function(ctx) { // 传⼊上下⽂
               return dispatch(0);
               function dispatch(i) {
                   let fn = middlewares[i];
                   if (!fn) {
                      return Promise.resolve();
                   }
                   return Promise.resolve(
                      fn(ctx, function next() {// 将上下⽂传⼊中间件，mid(ctx,next)
                          return dispatch(i + 1);
                      })
                   );
               }
           };
       }
       createContext(req, res) {
           let ctx = Object.create(context);
           ctx.request = Object.create(request);
           ctx.response = Object.create(response);
           ctx.req = ctx.request.req = req;
           ctx.res = ctx.response.res = res;
           return ctx;
       }
  }
  module.exports = KKB;
  ```

  使用， app.js

  ```javascript
  const delay = () => Promise.resolve(resolve => setTimeout(() => resolve(),2000));
  app.use(async (ctx, next) => {
       ctx.body = "1";
       await next();
       ctx.body += "5";
  });
  app.use(async (ctx, next) => {
       ctx.body += "2";
       await delay();
       await next();
       ctx.body += "4";
  });
  app.use(async (ctx, next) => {
   	ctx.body += "3";
  });
  ```

  koa-compose的[源码](https://github.com/koajs/compose/blob/master/index.js)

## 常见koa中间件的实现

- koa中间件的规范

  - 一个是async函数

  - 接收ctx和next两个参数

  - 任务结束需要执行next

    ```javascript
    const mid = async (ctx, next) => {
         // 来到中间件，洋葱圈左边
         next() // 进⼊其他中间件
         // 再次来到中间件，洋葱圈右边
    }; 
    ```

    

- 中间件常见任务

  - 请求拦截
  - 路由
  - 日志
  - 静态文件服务

- 路由router可能的用法

   

  ```javascript
  const Koa = require('./kkb')
  const Router = require('./router')
  const app = new Koa()
  const router = new Router();
  router.get('/index', async ctx => { ctx.body = 'index page'; });
  router.get('/post', async ctx => { ctx.body = 'post page'; });
  router.get('/list', async ctx => { ctx.body = 'list page'; });
  router.post('/index', async ctx => { ctx.body = 'post page'; });
  // 路由实例输出⽗中间件 router.routes()
  app.use(router.routes());
  ```

  routes()的返回值是⼀个中间件，由于需要⽤到method，所以需要挂载method到ctx之上。

  ```javascript
  // request.js
  module.exports = {
       // add...
       get method(){
      	 return this.req.method.toLowerCase()
       }
  }
  ```

  ```javascript
  // context.js
  module.exports = {
       // add...
       get method() {
          return this.request.method
       },
  }
  ```

  ```javascript
  class Router {
       constructor() {
          this.stack = [];
       }
  
       register(path, methods, middleware) {
           let route = {path, methods, middleware}
           this.stack.push(route);
       }
       // 现在只⽀持get和post，其他的同理
       get(path,middleware){
          this.register(path, 'get', middleware);
       }
       post(path,middleware){
          this.register(path, 'post', middleware);
       }
       routes() {
           let stock = this.stack;
           return async function(ctx, next) {
               let currentPath = ctx.url;
               let route;
  
               for (let i = 0; i < stock.length; i++) {
                  let item = stock[i];
                   if (currentPath === item.path && item.methods.indexOf(ctx.method) >=0) {
                       // 判断path和method
                       route = item.middleware;
                       break;
                  }
               }
  
               if (typeof route === 'function') {
                   route(ctx, next);
                   return;
               }
  
               await next();
           };
  	 }
   }
   module.exports = Router;
  ```

  使用：

  ```javascript
  const Koa = require('./kkb')
  const Router = require('./router')
  const app = new Koa()
  
  const router = new Router();
  router.get('/index', async ctx => {
       console.log('index,xx')
       ctx.body = 'index page';
  });
  router.get('/post', async ctx => { ctx.body = 'post page'; });
  router.get('/list', async ctx => { ctx.body = 'list page'; });
  router.post('/index', async ctx => { ctx.body = 'post page'; });
  // 路由实例输出⽗中间件 router.routes()
  app.use(router.routes());
  app.listen(3000,()=>{
  	 console.log('server runing on port 9092')
  })
  ```

  

- 静态文件服务koa-static

  - 配置绝对资源目录地址，默认为static

  - 获取文件或者目录信息

  - 静态文件读取

    返回

    ```javascript
    // static.js
    const fs = require("fs");
    const path = require("path");
    
    module.exports = (dirPath = "./public") => {
      return async (ctx, next) => {
        if (ctx.url.indexOf("/public") === 0) {
          // public开头 读取文件
          const url = path.resolve(__dirname, dirPath);
          const fileBaseName = path.basename(url);
          const filepath = url + ctx.url.replace("/public", "");
          console.log(filepath);
          // console.log(ctx.url,url, filepath, fileBaseName)
          try {
            stats = fs.statSync(filepath);
            if (stats.isDirectory()) {
              const dir = fs.readdirSync(filepath);
              // const
              const ret = ['<div style="padding-left:20px">'];
              dir.forEach(filename => {
                console.log(filename);
                // 简单认为不带小数点的格式，就是文件夹，实际应该用statSync
                if (filename.indexOf(".") > -1) {
                  ret.push(
                    `<p><a style="color:black" href="${
                      ctx.url
                    }/${filename}">${filename}</a></p>`
                  );
                } else {
                  // 文件
                  ret.push(
                    `<p><a href="${ctx.url}/${filename}">${filename}</a></p>`
                  );
                }
              });
              ret.push("</div>");
              ctx.body = ret.join("");
            } else {
              console.log("文件");
    
              const content = fs.readFileSync(filepath);
              ctx.body = content;
            }
          } catch (e) {
            // 报错了 文件不存在
            ctx.body = "404, not found";
          }
        } else {
          // 否则不是静态资源，直接去下一个中间件
          await next();
        }
      };
    };
    ```

    ```javascript
    // 使⽤
    const static = require('./static')
    app.use(static(__dirname + '/public'));
    ```

    

- 请求拦截：黑名单中存在的ip访问将被拒绝

  ​	请求拦截应用非常广泛，登录状态验证，cors头设置等

  ```javascript
  // iptable.js
  module.exports = async function(ctx, next) {
       const { res, req } = ctx;
       const blackList = ['127.0.0.1'];
       const ip = getClientIP(req);
  
       if (blackList.includes(ip)) {//出现在⿊名单中将被拒绝
           ctx.body = "not allowed";
       } else {
          await next();
       }
  };
  function getClientIP(req) {
       return (
           req.headers["x-forwarded-for"] || // 判断是否有反向代理 IP
           req.connection.remoteAddress || // 判断 connection 的远程 IP
           req.socket.remoteAddress || // 判断后端的 socket 的 IP
           req.connection.socket.remoteAddress
       );
  }
  // app.js
  app.use(require("./interceptor"));
  app.listen(3000, '0.0.0.0', () => {
   	console.log("监听端⼝3000");
  });
  ```

  