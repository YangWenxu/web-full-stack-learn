import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
class Message extends Component {

    static navigationOptions = {
        title: '消息',
    };

  render() {
    return (
      <View style={styles.container}>
        <Text>消息</Text>
      </View>
    );
  }
}

const MessageStackNavigator = createStackNavigator(
    {
        Message:{
            screen: Message
        }
    },
    {
        defaultNavigationOptions: {
            headerTitleStyle: { color: 'white' },
            headerStyle: { backgroundColor: 'rgb(29,216,200)' },
        }
    }
)

export default MessageStackNavigator;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
