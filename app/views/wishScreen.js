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
  createAppContainer
} from 'react-navigation';
import { TouchableHighlight } from 'react-native-gesture-handler';
import ItemComponent from '../components/ItemComponent'
// import { db } from '../config';
import firebase from 'react-native-firebase';

const db = firebase.database();

var user, cat, userId, itemsRef;

export default class WishScreen extends React.Component {
  
  // firebase.auth().onAuthStateChanged( user => {
  //   if (user) { 
  //     userId = user.uid;
  //     itemsRef = db.ref('users/' + userId)
  //   }
  // });
  // userId = user.uid;

  state = {
    items: []
  }

  componentDidMount() {
    user = firebase.auth().currentUser;
    userId = user.uid;
    cat = "wishlist";
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
      title: 'My Wishlist',
      headerStyle: {
        backgroundColor: '#ed5f56',
        //paddingHorizontal: 8,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontFamily: "Roboto",
        //position: 'absolute',
        fontSize: 18,
        //margin: 10,
        textAlign: 'center',
        //alignSelf: 'center',
        //justifyContent: 'center',
        //textAlignVertical: 'center',
        flexGrow: 1,
      },

      /*
      headerRight: (
        //add item to wishlist - assume to Settings
        //problem: button requires a string for the title
        /*
        <Button 
        transparent
        onPress={() => this.props.navigation.navigate('Settings')}
        title="+"
        /> */
      /*
      <Button
        onPress={() => this.props.navigation.navigate('Settings')}
        icon={{name: 'plus-square', type: 'font-awesome'}}
        title='' 
      />
      /*
      <TouchableHighlight onPress={() => this.props.navigation.navigate('Settings')}>
        <Icon
          type="FontAwesome"
          name="plus-square"
          style={{ color: "white" }}
        />
      </TouchableHighlight> 
    ), */
    }
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {this.state.items.length > 0 ? (
          <ItemComponent items={this.state.items} />
        ) : (
            <Text>No items</Text>
          )}

        <Button
          title="Add item"
          onPress={() => this.props.navigation.navigate('Add')}
        />

      </View>
    );
  }
}

//   module.export = WishList;