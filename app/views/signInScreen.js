import React from 'react';
import {
  Button,
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import firebase from 'react-native-firebase';
import { LoginButton, LoginManager, AccessToken } from 'react-native-fbsdk';
import { TouchableOpacity } from 'react-native-gesture-handler';
import images from 'assets/images';

export default class SignInScreen extends React.Component {
    static navigationOptions = {
      headerStyle: {
        backgroundColor: '#ed5f56',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      },
    };
  
    render() {
      return (
        <View style={styles.container}>
          <Image source={images.giftwrapLogo} style = {styles.logo}/>
          <TouchableOpacity 
          style= {styles.button}
          onPress={this._signInAsync}> 
          <Text style= {styles.buttonText}> LOGIN WITH FACEBOOK </Text>
          </TouchableOpacity>
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
        const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_friends', 'user_birthday']);
    
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
    backgroundColor: '#ED5F56',
  },
  logo: {
    width: 170,
    height: 85
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: '#F6F6F6',
    borderColor: '#F6F6F6',
    borderWidth: 1,
    borderRadius: 25,
    marginHorizontal: 21,
    marginBottom: 80,
    marginTop: 5,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 12,
    color: '#ed5f56',
    alignSelf: 'center',
    marginBottom: 5,
    paddingHorizontal: 60, 
  }

});
//   module.export = SignIn;