import React, { Component } from 'react';
import { 
    Text, 
    View, 
    StyleSheet,
    Button,
    Alert} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import StorageUtil from '../util/StorageUtil';
class My extends Component {
    static navigationOptions = {
        title: '个人',
    };
    render() {
        return (
        <View style={styles.container}>
            {/* <Text>我的</Text> */}
            
            <Button title='保存数据' onPress={()=>{
                StorageUtil.setData('key1','测试数据')
                .then((result) => {
                    Alert.alert(result);
                })
            }}/>
            <Button title='删除数据' onPress={()=>{
                StorageUtil.deleteData('key1')
                .then((result) => {
                    Alert.alert(result);
                })
            }}/>
            <Button title='获取数据' onPress={()=>{
                StorageUtil.getData('key1')
                .then((result) => {
                    Alert.alert(result);
                })
            }}/>

        </View>
        );
    }

    //http://m.app.haosou.com/index/getData?type=1&page=1
    // _fetchData() {
    //     // fetch(url, {
    //         // method   请求方式
    //         // headers  请求头
    //         // body
    //     // })
    //     // .then
    //     fetch('http://m.app.haosou.com/index/getData?type=1&page=1')
    //         .then((response) => response.json())
    //         .then((responseJSON)=> {
    //             console.log(responseJSON);
    //         })
    //         .catch((error)=>{
    //             console.log(error);
    //         });
    // }
}


const MyStackNavigator = createStackNavigator(
    {
        My:{
            screen: My
        }
    },
    {
        defaultNavigationOptions: {
            headerTitleStyle: { color: 'white' },
            headerStyle: { backgroundColor: 'rgb(29,216,200)' },
        }
    }
)

export default MyStackNavigator;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
