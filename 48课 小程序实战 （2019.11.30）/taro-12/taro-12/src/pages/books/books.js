import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { AtCard ,AtNoticebar} from "taro-ui"

const db = wx.cloud.database()
class Books extends Component{
  state = {
    books:[]
  }
  componentDidMount(){
    let books = db.collection('books12').get().then(res=>{
      // console.log(res)
       this.setState({
      books:res.data
    })
    })
   
  }
  render(){
    return <View>
      <AtNoticebar marquee>开课了</AtNoticebar>
      
      books
      {
        this.state.books.map(book=>{
          return <AtCard
            title={book.title}
            thumb={book.image}
            note={book.rate}

          >
            {/* <image src={books.image}></image> */}
            {book.summary}
          </AtCard>
        })
      }

<AtCard
  note='小Tips'
  extra='额外信息'
  title='这是个标题'
  thumb='http://www.logoquan.com/upload/list/20180421/logoquan15259400209.PNG'
>
  这也是内容区 可以随意定义功能
</AtCard>
    </View>
  }
}

export default Books