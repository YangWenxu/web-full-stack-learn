import React,{Component} from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import Home from './Home';
import Company from './Company';
import Message from './Message';
import My from './My';
import Icon from 'react-native-vector-icons/FontAwesome';
import WelcomePage from './Welcome';

const TabNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: {
                title: '职位',
            }
        },
        Company: {
            screen: Company,
            navigationOptions: {
                title: '公司',
                // tabBarIcon
            }
        },
        Message: {
            screen: Message,
            navigationOptions: {
                title: '信息',
            }
        },
        My: {
            screen: My,
            navigationOptions: {
                title: '个人',
            }
        },
    },
    {
        initialRouteName: 'Home',
        defaultNavigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, tintColor, horizontal}) => {
                const {routeName} = navigation.state;
                let iconName;
                if(routeName === 'Home') {
                    iconName = 'globe';
                } else if (routeName === 'Company') {
                    iconName = 'building-o';
                  } else if (routeName === 'Message') {
                    iconName = 'comments-o';
                  } else if (routeName === 'My') {
                    iconName = 'user-circle-o';
                  }
                return <Icon name={iconName} size={20} color={tintColor}/>;
            }
        }),
        tabBarOptions: {
            // showLabel: false 是否显示文字
            activeTintColor: 'rgb(29,216,200)',
            inactiveTintColor: 'gray'
        }
    }
);

const AppInitNavigator = createStackNavigator({
    welcome: {
        screen: WelcomePage,
        navigationOptions:{
            header: null
        }
    }
});

const switchNavigator = createSwitchNavigator({
    Init: AppInitNavigator,
    Main: TabNavigator
});



const AppNavigator = createAppContainer(switchNavigator);

export default AppNavigator;
