import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  Text,
  StatusBar,
  StyleSheet,
  View,
  Icon,
} from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
import { 
  createStackNavigator, 
  createSwitchNavigator, 
  createBottomTabNavigator, 
  createAppContainer,
  TabBarBottom,
} from 'react-navigation';
import AuthLoadingScreen  from "./app/views/authLoadingScreen";
import FriendsScreen  from "./app/views/friendsScreen";
import OrganiserScreen  from "./app/views/organiserScreen";
import WishScreen  from "./app/views/wishScreen";
import SignInScreen  from "./app/views/signInScreen";
import SettingsScreen  from "./app/views/settingsScreen";
import DetailsScreen from "./app/views/detailsScreen";
import AddToWishlistScreen from "./app/views/addItemToWishlist";
import friendWishListScreen from './app/views/friendWishListScreen';

const WishStack = createStackNavigator({
  Wishlist: { screen: WishScreen },
  Details: { screen: DetailsScreen },
  Add: {screen: AddToWishlistScreen},
});
  
const SettingsStack = createStackNavigator({
  Settings: { screen: SettingsScreen },
  Details: { screen: DetailsScreen },
});
  
const OrganiserStack= createStackNavigator({
  Organiser: { screen: OrganiserScreen},
  Details: { screen: DetailsScreen }
});
  
const FriendsStack = createStackNavigator({
  FriendsList: { screen: FriendsScreen},
  Friend: {screen: friendWishListScreen}
});

const TabNavigator = createBottomTabNavigator(
  {
    Wishlist: { screen: WishStack },
    Organiser: { screen: OrganiserStack},
    Friends: { screen: FriendsStack}, 
    Settings: { screen: SettingsStack },
  },
  /*
  {
    defaultNavigationOptions: ({ navigation }) => {
      const { routeName, routes } = navigation.state;
      let params = routes && routes[1] && routes[1].params;
      return {
        tabBarIcon: ({ focused, tintColor }) => {
          return <Icon 
            type="FontAwesome"
            name="users"
            style={{ color: "white" }}
            />;
        },
        tabBarVisible:
          params && params.hideTabBar != null ? !params.hideTabBar : true,
        swipeEnabled:
          params && params.hideTabBar != null ? !params.hideTabBar : true
      }; 
    },
    tabBarOptions: {
      activeTintColor: "#6200EE",
      inactiveTintColor: "#858585",
      style: {
        height: 60,
        paddingVertical: 5,
        backgroundColor: "#fff"
      },
      labelStyle: {
        fontSize: 12,
        lineHeight: 20,
        fontFamily: "CircularStd-Book"
      }
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: "bottom",
    animationEnabled: true,
    swipeEnabled: true
  } */
);
    // {
    //   defaultNavigationOptions: ({ navigation }) => ({
    //     tabBarIcon: ({ focused, tintColor }) => {
    //       const { routeName } = navigation.state;
    //       let iconName;
    //       if (routeName === 'Home') {
    //         iconName = `ios-information-circle${focused ? '' : '-outline'}`;
    //       } else if (routeName === 'Settings') {
    //         iconName = `ios-options${focused ? '' : '-outline'}`;
    //       }
  
    //       // You can return any component that you like here! We usually use an
    //       // icon component from react-native-vector-icons
    //       return <Ionicons name={iconName} size={25} color={tintColor} />;
    //     },
    //   }),
    //   tabBarOptions: {
    //     activeTintColor: 'tomato',
    //     inactiveTintColor: 'gray',
    //   },
    // }
  
  const AuthStack = createStackNavigator({ SignIn: SignInScreen });
  
  const AppNavigator = createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: TabNavigator,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',

      //tried making it the same for every screen but it doesnt respond? 
      //so i added to wishScreen separately
      /*
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: '#ed5f56',
          //borderWidth: 3, did not change anything
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontFamily: "Roboto",
          fontSize: 18,
          margin: 10,
        },
      },
      */
    }
  );

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer; 