import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button
} from 'react-native';

export default class DetailScreen extends Component {

    static navigationOptions = (props)=> {
        const {navigation} = props;
        const {state: {params}} = navigation;
        return {
            title: params.title,
            headerRight: (
                <Button title='保存' onPress={()=>{
                    navigation.navigate('Third');
                }}/>
            ),
        };
    }

    render() {
        return(
            <View style={{backgroundColor: 'yellow', flex: 1}}>

            </View>
        );
    } 
}