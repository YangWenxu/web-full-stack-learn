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

  router.group({ name:"user", prefix:'/user'}, router=>{
    let {
        info,captcha,
        create,login,
        isFollow,
        follow,unfollow,
        following,followers,
        articleStatus,
        likeArticle,cancelLikeArticle
    } = controller.user
    router.get('/info',jwt, info);

    router.get('/captcha',captcha)
    router.post('/register',create)
    router.post('/login',login)
  
    router.get('/isfollow/:id',jwt,isFollow)
  
    router.put('/follow/:id',jwt,follow)
    router.delete('/follow/:id',jwt,unfollow)

    router.get('/:id/following', following)
    router.get('/:id/followers', followers)

    router.get('/article/:id', jwt, articleStatus)

    // .put点赞，。delete取消点赞
    router.put('/likeArticle/:id',jwt,likeArticle)
    router.delete('/likeArticle/:id',jwt,cancelLikeArticle)
  })
  


  router.group({ name:"article", prefix:'/article'}, router=>{
    let {create, detail, list} = controller.article
    router.post('/create',jwt, create)
    router.get('/:id',detail)
    router.get('/', list)
  })
  
};
