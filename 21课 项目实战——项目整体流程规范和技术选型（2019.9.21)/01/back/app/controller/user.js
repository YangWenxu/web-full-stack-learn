'use strict';

const BaseController = require('./base');

class UserController extends BaseController {
  async info() {
    this.success({
      name:'kkb'
    })
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
  async create(){

    const {ctx} = this
    const {captcha} =ctx.request.body
    console.log(captcha, ctx.session)
    if(captcha.toUpperCase() == ctx.session.captcha.toUpperCase()){
      this.success("新增")
    }else{
      this.error("验证码错误")
    }
    // 新增用户
    
  }
}

module.exports = UserController;
