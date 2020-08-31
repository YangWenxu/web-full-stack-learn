import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';

class Home extends Component {
    static navigationOptions = {
        title: '大前端',
    };

    render() {
    return (
        <View style={styles.container}>
        <Text>首页</Text>
        </View>
    );
    }
}

const HomeStackNavigator = createStackNavigator(
    {
        Home:{
            screen: Home
        }
    },
    {
        defaultNavigationOptions: {
            headerTitleStyle: { color: 'white' },
            headerStyle: { backgroundColor: 'rgb(29,216,200)' },
        }
    }
)

export default HomeStackNavigator;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
