'use strict';
const md5 = require('md5')
const BaseController = require('./base');

let HashSalt = 'Kaikeba@123#$!321'
class UserController extends BaseController {
  async info() {
    let {ctx} = this
    let {email} = ctx.state
    const user = await this.checkEmail(email)
    this.success(user)
    // this.success({
    //   name:'kkb'
    // })
  }
  async captcha(){

    // controller只写业务逻辑，公用的功能，抽象成service，
    // 生成验证码，放在service李最好

    const {ctx} = this
    const captcha = this.service.tools.captcha()

    console.log('图片验证码',captcha.text)
    ctx.session.captcha = captcha.text
    console.log(ctx.session)
    ctx.response.type = 'image/svg+xml'
    ctx.body = captcha.data
  }
  async checkEmail(email){
    const user = await this.ctx.model.User.findOne({email})
    return user
  }
  async login(){
    // 登录
    // 校验用户名和密码
    let {ctx, app} = this
    let {email, password} = ctx.request.body

    let user = await ctx.model.User.findOne({
      email,
      password:md5(password+HashSalt)
    })

    if(user){
      // hash生成
      let {nickname }= user
      const token = app.jwt.sign({
        nickname,
        email,
        _id:user._id
      },app.config.jwt.secret, {
        expiresIn:'1h'
      })
      this.success({token,email,nickname})
    }else{
      this.error('用户名密码错误')
    }
  }
  async isFollow(){
    const {ctx} = this
    const me = await ctx.model.User.findById(ctx.state.userid)
    const isFollow = !!me.following.find(v=> v.toString()==ctx.params.id)
    this.success({isFollow})
  }
  async follow(){
    // 把关注的用户id 放在following字段李
    const {ctx} = this
    let me = await ctx.model.User.findById(ctx.state.userid)
    const isFollow = !!me.following.find(v=> v.toString()==ctx.params.id)
    if(!isFollow){
      me.following.push(ctx.params.id)
      me.save()
      this.message('关注成功')
    }
  }

  async unfollow(){
    // 取消关注 
    const {ctx} = this
    let me = await ctx.model.User.findById(ctx.state.userid)
    const index = me.following.map(id=>id.toString()).indexOf(ctx.params.id)
    if(index>-1){
      me.following.splice(index,1)
      me.save()
      this.message('取消成功')
    }
  }
  async create(){

    const {ctx} = this
    const {captcha,email, password,nickname} =ctx.request.body
    console.log(captcha, ctx.session)
    if(captcha.toUpperCase() == ctx.session.captcha.toUpperCase()){
      // 新增用户
      // mongodb里面新增数据
      // 邮箱和昵称不能重复的 
      if(await this.checkEmail(email)){
        return this.success('邮箱重复了')
      }
      let ret = await ctx.model.User.create({
        email,
        nickname,
        // 密码再次加盐加密
        password:md5(password + HashSalt)
      })
      if(ret._id){
        this.success('新建成功')
      }
    }else{
      this.error("验证码错误")
    }
    // 新增用户
    
  }
  async following(){
    // load关注的人
    const {ctx} = this
    const users = await ctx.model.User.findById(ctx.params.id)
                          .populate('following')
    this.success(users.following)
  }
  async followers(){
    const {ctx} = this
    let users = await ctx.model.User.find({following: ctx.params.id})
    this.success(users)
  }
  async articleStatus(){

    // return this.success(1)
    const {ctx} = this
    const me = await ctx.model.User.findById(ctx.state.userid)
    let like = !!me.likeArticle.find(id => id.toString()==ctx.params.id)
    let dislike = !!me.disLikeArticle.find(id => id.toString()==ctx.params.id)
    this.success({
      like,
      dislike
    })
  }
  async cancelLikeArticle(){
    // 数组删除
    const {ctx} = this
    const me = await ctx.model.User.findById(ctx.state.userid)
    const index = me.likeArticle.map(id=>id.toString()).indexOf(ctx.params.id)
    if(index>-1){
      me.likeArticle.splice(index,1)
      me.save()
      await ctx.model.Article.findByIdAndUpdate(ctx.params.id, {$inc:{like:-1}})
      return this.message('取消成功')
    }

  }
  async likeArticle(){
    // 数组新增
    const {ctx} = this
    const me = await ctx.model.User.findById(ctx.state.userid)
    if(!me.likeArticle.find(id=> id.toString()==ctx.params.id)){
      me.likeArticle.push(ctx.params.id)
      me.save()
      await ctx.model.Article.findByIdAndUpdate(ctx.params.id, {$inc:{like:1}})
      return this.message('点赞成功')
    }
    return this.message('点过了')
  }
  
}

module.exports = UserController;
