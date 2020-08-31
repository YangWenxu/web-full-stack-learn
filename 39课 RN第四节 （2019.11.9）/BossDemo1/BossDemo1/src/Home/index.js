import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './HomeScreen';

const HomeStackNavigator = createStackNavigator(
    {
        Home:{
            screen: HomeScreen
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