import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

// inject有点类似react-redux中的connect

import './index.scss'

// 先从mobx读取数据
// console.log(Taro)  
@inject('counterStore')
@observer
class Index extends Component{
  increment= ()=>{
    const { counterStore } = this.props
    counterStore.increment()
    // this.props.counterStore.increment()
  }
  render(){
    // const {counterStore} = this.props
    const { counterStore: { counter } } = this.props
    // console.log(counterStore)
    return <View>
      <View>{counter}</View>
      <Button onClick={this.increment} type="primary">+</Button>

    </View>
  }
}

// @inject('counterStore')
// @observer
// class Index1 extends Component {

//   config = {
//     navigationBarTitleText: '首页'
//   }

//   componentWillMount () { }

//   componentWillReact () {
//     console.log('componentWillReact')
//   }

//   componentDidMount () { }

//   componentWillUnmount () { }

//   componentDidShow () { }

//   componentDidHide () { }

//   increment = () => {
//     const { counterStore } = this.props
//     counterStore.increment()
//   }

//   decrement = () => {
//     const { counterStore } = this.props
//     counterStore.decrement()
//   }

//   incrementAsync = () => {
//     const { counterStore } = this.props
//     counterStore.incrementAsync()
//   }

//   render () {
//     const { counterStore: { counter } } = this.props
//     return (
//       <View className='index'>
//         <Button onClick={this.increment}>+</Button>
//         <Button onClick={this.decrement}>-</Button>
//         <Button onClick={this.incrementAsync}>Add Async</Button>
//         <Text>{counter}</Text>
//         <View>xx</View>
//       </View>
//     )
//   }
// }

export default Index 
