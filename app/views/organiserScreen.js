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
import OrgComponent from '../components/OrgComponent';
import firebase from 'react-native-firebase';
import {AccessToken} from 'react-native-fbsdk';

const db = firebase.database();
var user, cat, userId, orgRef, accessData;

export default class OrganiserScreen extends React.Component {
  state = {
    items: []
  }

  async componentWillMount() {
    user = firebase.auth().currentUser;
    accessData = await AccessToken.getCurrentAccessToken();
    userId = accessData.getUserId();   
    itemsRef = db.ref('users/' + userId + '/organiser');
    itemsRef.on('value', snapshot => {
      // let name = snapshot.child("name").val();
      // let price = snapshot.child("price").val();
      let data = snapshot.val();
      if (data) {
        let items = Object.values(data);
        this.setState({ items });
      } 
    });
  }

  static navigationOptions = ({ navigation }) => {
      return {
        title: 'My Organiser',
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
        {this.state.items.length > 0 ? (
          <OrgComponent items={this.state.items} />
        ) : (
          <Text>Nothing to buy yet</Text>
        )}

        <Button
          title="Add gift idea"
          onPress={() => this.props.navigation.navigate('AddOrg')} />
      </View>
    );
  }
}

//   module.export = Organiser;