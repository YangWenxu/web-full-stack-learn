import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button
} from 'react-native';

export default class ThirdScreen extends Component {

    render() {
        return(
            <View style={{backgroundColor: 'red', flex: 1}}>
                <Button title='跳转测试' onPress={()=>{
                    // this.props.navigation.navigate('Detail');
                    // this.props.navigation.push('Detail');

                    this.props.navigation.goBack();
                    // this.props.navigation.popToTop();
                }}/>
            </View>
        );
    } 
}