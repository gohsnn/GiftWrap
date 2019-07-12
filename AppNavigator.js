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
import AddToWishlistScreen from "./app/views/addItemToWishlist";
import AddtoOrganiserScreen from './app/views/addItemToOrganiser';
import friendWishListScreen from './app/views/friendWishListScreen';
import EditWishlistScreen from './app/views/EditWishlistScreen';
import EditOrganiserScreen from  './app/views/editOrganiserScreen';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart, faClipboardList, faUserFriends, faCogs  } from '@fortawesome/free-solid-svg-icons';

const WishStack = createStackNavigator({
  Wishlist: { screen: WishScreen },
  Add: {screen: AddToWishlistScreen},
  Edit: {screen: EditWishlistScreen}
});
  
const SettingsStack = createStackNavigator({
  Settings: { screen: SettingsScreen }
});
  
const OrganiserStack= createStackNavigator({
  Organiser: { screen: OrganiserScreen},
  AddOrg: {screen: AddtoOrganiserScreen},
  EditOrg: {screen: EditOrganiserScreen}
});
  
const FriendsStack = createStackNavigator({
  FriendsList: { screen: FriendsScreen},
  Friend: {screen: friendWishListScreen},
  AddOrg: {screen: AddtoOrganiserScreen}
});

const TabNavigator = createBottomTabNavigator(
  {
    Wishlist: { screen: WishStack },
    Organiser: { screen: OrganiserStack},
    Friends: { screen: FriendsStack}, 
    Settings: { screen: SettingsStack },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Wishlist') {
          iconName = faHeart;
        } else if (routeName === 'Organiser') {
          iconName = faClipboardList;
        } else if (routeName === 'Friends') {
          iconName = faUserFriends;
        } else if (routeName === 'Settings') {
          iconName = faCogs;
        }

        // You can return any component that you like here!
        return <FontAwesomeIcon icon={ iconName } size={25} color={tintColor}/>;
      },
    }),
    tabBarOptions: {
      showLabel: false,
      activeTintColor: '#ED5F56',
      inactiveTintColor: '#E4E4E4',
    },
  }
 
);
  
  const AuthStack = createStackNavigator({ SignIn: SignInScreen });
  
  const AppNavigator = createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: TabNavigator,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  );

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer; 