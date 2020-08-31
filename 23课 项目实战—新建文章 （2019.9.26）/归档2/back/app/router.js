'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const jwt = app.middleware.jwt({app})
  router.get('/', controller.home.index);

  // 这个接口，需要登录后 才能获取到
  // 从token信息中，拿到用户数据，然后查库 返回
  router.get('/user/info',jwt, controller.user.info);

  router.get('/user/captcha',controller.user.captcha)
  router.post('/user/register',controller.user.create)
  router.post('/user/login',controller.user.login)

  router.get('/user/isfollow/:id',jwt,controller.user.isFollow)

  router.put('/user/follow/:id',jwt,controller.user.follow)
  router.delete('/user/follow/:id',jwt,controller.user.unfollow)

  router.group({ name:"article", prefix:'/article'}, router=>{
    let {create, detail} = controller.article
    router.post('/create',jwt, create)
    router.get('/:id',detail)
  })
  
};
