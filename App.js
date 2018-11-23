import React from 'react';
import HomeScreenContainer from './components/HomeScreenContainer';
import Login from './components/Login';
import Register from './components/Register';
import StartScreen from './components/StartScreen';

import { createStackNavigator, createAppContainer } from 'react-navigation';

const AppNavigator = createStackNavigator({
  StartScreen: {
    screen: StartScreen
  },
  Home: {
    screen: HomeScreenContainer,
  },
  Login: {
    screen: Login,
  },
  Register: {
    screen: Register
  }
}, {
    initialRouteName: 'StartScreen',
});

export default createAppContainer(AppNavigator);