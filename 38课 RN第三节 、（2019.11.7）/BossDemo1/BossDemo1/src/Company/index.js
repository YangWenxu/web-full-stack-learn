import CompanyScreen from './CompanyScreen';
import {createStackNavigator} from 'react-navigation-stack';
import CompanyDetail from './CompanyDetail';
const CompanyStackNavigator = createStackNavigator(
    {
        Company:{
            screen: CompanyScreen
        },
        CompanyDetail: {
            screen: CompanyDetail
        }
    },
    {
        defaultNavigationOptions: {
            headerTitleStyle: { color: 'white' },
            headerStyle: { backgroundColor: 'rgb(29,216,200)' },
        }
    }
);

// CompanyStackNavigator.defaultNavigationOptions = ({navigation}) => {
CompanyStackNavigator.navigationOptions = ({navigation}) => {
    let tabBarVisible = true;
    if(navigation.state.index > 0) {
        tabBarVisible = false;
    }
    return {
        tabBarVisible,
    };
};

export default CompanyStackNavigator;
