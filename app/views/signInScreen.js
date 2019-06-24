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
import firebase from 'react-native-firebase';
import { LoginButton, LoginManager, AccessToken } from 'react-native-fbsdk';

export default class SignInScreen extends React.Component {
    static navigationOptions = {
      title: 'Please sign in',
    };
  
    render() {
      return (
        <View style={styles.container}>
          <Button title="Sign in!" onPress={this._signInAsync} />
          {/* <LoginButton
              onLoginFinished={
                (error, result) => {
                  if (error) {
                    console.log("login has error: " + result.error);
                  } else if (result.isCancelled) {
                    console.log("login is cancelled.");
                  } else {
                    AccessToken.getCurrentAccessToken().then(
                      (data) => {
                        console.log(data.accessToken.toString())
                      }
                    )
                  }
                }
              }
              onLogoutFinished={() => console.log("logout.")}/> */}
        </View>
      );
    }
  
    _signInAsync = async () => {
      await this.facebookLogin();
      this.props.navigation.navigate('App');
    };
    
    async facebookLogin() {
      try {
        const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);
    
        if (result.isCancelled) {
          // handle this however suites the flow of your app
          throw new Error('User cancelled request'); 
        }
    
        console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);
    
        // get the access token
        const data = await AccessToken.getCurrentAccessToken();
    
        if (!data) {
          // handle this however suites the flow of your app
          throw new Error('Something went wrong obtaining the users access token');
        }
    
        // create a new firebase credential with the token
        const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
    
        // login with credential
        const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
    
        console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()))
      } catch (e) {
        console.error(e);
      }
    }

  }

  


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
//   module.export = SignIn;