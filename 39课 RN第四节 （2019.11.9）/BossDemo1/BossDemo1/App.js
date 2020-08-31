/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React,{Component} from 'react';
import {
  View,
  StatusBar,
} from 'react-native';
import AppContainer from './src';

import {
  createReduxContainer,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';


import {Provider, connect} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';

import appReducer from './src/reducer';


const AppReduxContainer = createReduxContainer(AppContainer);
const middleWare = createReactNavigationReduxMiddleware(state => state.nav);

const mapStateToProps = state => ({
  state: state.nav,
});

const AppWithNavState = connect(mapStateToProps)(AppReduxContainer);
const store = createStore(appReducer, applyMiddleware(middleWare));


export default class App extends Component {

    render() {
      return (
        <Provider store={store} style={{flex: 1}}>
          <StatusBar barStyle='dark-content'/>
          <AppWithNavState/>
        </Provider>
      );
    }

}