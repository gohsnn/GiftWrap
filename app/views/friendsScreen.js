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
import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';

export default class FriendsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
      return {
        title: 'My Friends',
        headerStyle: {
          backgroundColor: '#ed5f56',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontFamily: "Roboto",
          fontSize: 18,
          textAlign: 'center',
          flexGrow: 1,
        },
      }
  };
      
  render() {
      return (
        <View style={{ 
          flex: 1, 
          //flexDirection: 'column',
          justifyContent: 'flex-start', 
          alignItems: 'flex-start' }}>
            <Text></Text>
            <Text style={{
              fontSize: 18,
              fontWeight:'bold'}}
            >     Whose wishlist would you like to see?
            </Text>
            <Text></Text>
            <Text>      ALL MY FRIENDS</Text>
            <Text>      Not your friends</Text>
        </View>
      );
    }
  }


//   module.export = Friends;