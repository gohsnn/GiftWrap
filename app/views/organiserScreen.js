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

const db = firebase.database();
var user, cat, userId, orgRef;

export default class OrganiserScreen extends React.Component {
  state = {
    items: []
  }

  componentDidMount() {
    user = firebase.auth().currentUser;
    userId = user.uid;
    cat = "organiser";
    itemsRef = db.ref('users/' + cat + userId);
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
        <Text>So many gifts to buy</Text>
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