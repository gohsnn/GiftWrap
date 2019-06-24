import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  Text,
  StatusBar,
  StyleSheet,
  View,
  Image,
} from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
import images from 'assets/images'
import { LoginManager } from 'react-native-fbsdk';



export default class SettingsScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
      return {
        title: 'Settings',
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
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image
          source={images.pooh}
          style={{width: 80, height: 80, resizeMode: 'center'}}
          />
          <Text></Text>
          <Text
          style={{ 
            fontSize: 16,
            fontWeight: 'bold' }}
          >Fancy Pooh</Text>
          <Text>fancyPooh@gmail.com</Text>
          <Text></Text>
          <Button boarded light 
          title="Sign out" onPress={this._signOutAsync} />
        </View>
      );
    }
    /*
    <Button
      title="Go to MyWishlist"
      onPress={() => this.props.navigation.navigate('Wishlist')}
    />
    <Button
      title="Go to Details"
      onPress={() => this.props.navigation.navigate('Details')}
    /> */
    
    _signOutAsync = async () => {
      await facebookLogout();
      this.props.navigation.navigate('Auth');
    };
  }

  function facebookLogout() {
    LoginManager.logOut();
  }

//   module.export = Settings;