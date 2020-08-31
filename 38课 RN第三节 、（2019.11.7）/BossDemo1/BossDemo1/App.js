/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React,{Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import AppContainer from './src';

export default class App extends Component {

    render() {
      return (
        <View style={{flex: 1}}>
          <StatusBar barStyle='dark-content'/>
          <AppContainer/>
        </View>
      );
    }

}