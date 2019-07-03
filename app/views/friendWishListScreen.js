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
import { TouchableHighlight } from 'react-native-gesture-handler';
import ItemComponent from '../components/ItemComponent'
import firebase from 'react-native-firebase';
import { AccessToken } from 'react-native-fbsdk';
import PropTypes from 'prop-types';

const db = firebase.database();

var userName, userId, itemsRef, accessData;

export default class WishScreen extends React.Component {
//   static propTypes = {
//       friend: PropTypes.object.isRequired
//   };

  state = {
    items: []
  }

  async componentDidMount() {
    userId = this.props.navigation.getParam('id', 'NO-ID');
    itemsRef = db.ref('users/' + userId + '/wishlist');
    itemsRef.on('value', snapshot => {
      let data = snapshot.val();
      if (data) {
        let items = Object.values(data);
        this.setState({ items });
      } 
    });
  }

  static navigationOptions = ({ navigation }) => {
      const name = navigation.getParam('name', 'NO-NAME');
      const res = name.split(' ', 4);
    return {
      title: res[0] + "'s Wishlist" ,
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
          <ItemComponent items={this.state.items} disableDeleteButton = {true} />
        ) : (
            <Text>No items</Text>
          )}
      </View>
    );
  }
}

