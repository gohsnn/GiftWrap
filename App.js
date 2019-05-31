import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  Text,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
// import AuthLoadingScreen  from "../app/views/authLoadingScreen";
// import FriendsScreen  from "../app/views/friendsScreen.js";
// import OrganiserScreen  from "../app/views/organiserScreen.js";
// import WishScreen  from "../app/views/wishScreen.js";
// import SignInScreen  from "../app/views/signInScreen.js";
// import SettingsScreen  from "../app/views/settingsScreen.js";
import AppContainer from "./AppNavigator.js";

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
};