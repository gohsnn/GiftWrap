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
import firebase from 'react-native-firebase';

var user, name, photoUrl, email;

export default class SettingsScreen extends React.Component {
  // user = 'blank-user';
  // name = 'blank-name';
  // photoUrl = 'blank-photo';
  // email = 'blank-email';

  componentWillMount() {
    user = firebase.auth().currentUser;
    name = user.displayName; //available
    photoUrl = user.photoURL; //link to graph
    email = user.email;
  }


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
        source={{ uri: photoUrl + '?type=large' }}
        style={{ width: 80, height: 80, resizeMode: 'center' }}
      />
      <Text></Text>
      <Text
        style={{
          fontSize: 16,
          fontWeight: 'bold'
        }}
      >{name}</Text>
      <Text>{email}</Text>
      <Text></Text>
      <Button boarded light
        title="Sign out" onPress={this._signOutAsync} />
    </View>
  );
}

_signOutAsync = async () => {
  await facebookLogout();
  this.props.navigation.navigate('Auth');
};
  }

function facebookLogout() {
  LoginManager.logOut();
}

//   module.export = Settings;