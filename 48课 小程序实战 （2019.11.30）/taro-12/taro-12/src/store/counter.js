
// 新建一个数据管理
import {observable} from 'mobx'

// mobx实现了一套响应式机制，使用observable把一个普通的对象，转换成响应式

const countStore = observable({
  counter:1,
  increment(){
    this.counter++
  },
  decrement(){
    this.counter--
  },
  incrementAync(){
    setTimeout(()=>{
      this.counter++
    },1000)
  }
})

export default countStore