import React, {Component} from 'react';
import {Text, View, Button, Image, StyleSheet, Dimensions} from 'react-native';
const wWidth = Dimensions.get('window').width;

class CompanyDetail extends Component {
  static navigationOptions = {
    headerTitle: '公司详情'
  };

  render() {
      return (
        <View style={{flex: 1, backgroundColor: 'blue'}}/>
      )
  }
}

export default CompanyDetail;