import { combineReducers } from 'redux';
import { createNavigationReducer } from 'react-navigation-redux-helpers';
import AppContainer from './index';
import messageList from './Message/reducer';

const navReducer = createNavigationReducer(AppContainer);

export default combineReducers({
    nav: navReducer,
    messageList
});