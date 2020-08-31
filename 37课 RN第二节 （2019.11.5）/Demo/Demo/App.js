/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import HomeScreen from './Screens/HomeScreen';
import {createStackNavigator} from 'react-navigation-stack';
import DetailScreen from './Screens/DetailScreen';
import ThirdScreen from './Screens/ThirdScreen';

import {createBottomTabNavigator} from 'react-navigation-tabs';
import Home from './TabScreen/Home';
import Message from './TabScreen/Message';
import Personal from './TabScreen/Personal';

// ----------------------------createStackNavigator-----------------------------------
// var RootStack = createStackNavigator(
//   {
//     Home: {
//       screen: HomeScreen,
//       navigationOptions: {
//         title: '首页',
//         // headerBackTitle: '自定义返回标题'
//         // headerStyle: {
//         //   backgroundColor: 'green',
//         // }
//       }
//     },
//     Detail: {
//       screen: DetailScreen,
//       // navigationOptions: {
//       //   title: '详情',
//       // }
//     },
//     Third: {
//       screen: ThirdScreen,
//       navigationOptions: {
//         title: '跳转页'
//       }
//     }
//   },
//   {
//     initialRouteName: 'Home',
//     defaultNavigationOptions: {
//       // headerStyle:{
//       //     backgroundColor: 'green',
//       // }
//     }
//   }
// );

var RootTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        title: '首页'
        // tabBarLabel: '首页1'
      }
    },
    Message: {
      screen: Message,
      navigationOptions: {
        title: '信息'
      }
    },
    Personal: {
      screen: Personal,
      navigationOptions: {
        title: '个人'
      }
    }
  },
  {
    // order: ['Home','Personal','Message']
    initialRouteName: 'Message',
    // defaultNavigationOptions
  }
)


class App extends Component {
  render() {
    RootStack = createAppContainer(RootTabNavigator);
    return <RootStack/>;
  }
}

export default App;
