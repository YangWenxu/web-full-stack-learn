
// 用户字段设计
module.exports = app=>{
  let mongoose = app.mongoose
  let Schema = mongoose.Schema

  const ArticleSchema = new Schema({
    __v:{type:Number, select:false},
    title:{type:String, required:true},
    // 文章的markdown
    article:{type:String, required:true,select:false},
    article_html:{type:String, required:true},
    // 一对多，每个文章都有作者,只存储用户的id
    author:{
      type:Schema.Types.ObjectId,
      ref:'User',
      required:true
    },
    views:{type:Number, required:false, default:1}

  })

  return mongoose.model('Article', ArticleSchema)
}