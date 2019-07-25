import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Icon,
} from 'react-native';
import { TouchableHighlight, FlatList } from 'react-native-gesture-handler';
import ItemComponent from '../components/ItemComponent'
import FriendItemComponent from '../components/FriendItemComponent';
import firebase from 'react-native-firebase';
import { AccessToken } from 'react-native-fbsdk';
import PropTypes from 'prop-types';

const db = firebase.database();

var userName, userId, itemsRef, accessData;

export default class WishScreen extends React.Component {

  state = {
    items: [],
    friendID: ''
  }

  async componentDidMount() {
    userId = this.props.navigation.getParam('id', 'NO-ID');
    friendID = userId;
    this.setState({friendID: friendID});
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
      title: res[0] + ' ' + res[1] + "'s Wishlist" ,
      headerStyle: {
        backgroundColor: '#fff',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        //paddingHorizontal: 8,
      },
      headerTintColor: '#ed5f56',
      headerTitleStyle: {
        fontWeight: "200",
        fontFamily: "Nunito-Bold",
        //position: 'absolute',
        fontSize: 18,
        //margin: 10,
        textAlign: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: '80%',
        // flex: 1,
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
      <View style={{
        flex: 1,
        marginHorizontal: 21
      }}>
        {this.state.items.length > 0 ? (

          <FlatList
            data = {this.state.items}
            renderItem = {({item}) => 
            <FriendItemComponent 
              item={item}
              friendID={this.state.friendID} 
              friendName = {this.props.navigation.getParam('name', 'NO-NAME')}  
            />}
            keyExtractor={(item, index) => index}
            />
        ) : (
          <Text style={styles.fillerText}>Your friend doesn't want anything yet</Text>
        )}
      </View>
    );
  }

  //without flatlist version
  // render() {
  //   return (
  //     <View style={{
  //       flex: 1,
  //       justifyContent: 'center',
  //       alignItems: 'center'
  //     }}>
  //       {this.state.items.length > 0 ? (
  //         <FriendItemComponent 
  //         items={this.state.items}
  //         friendID={this.state.friendID} 
  //         friendName = {this.props.navigation.getParam('name', 'NO-NAME')}  
  //         />
  //       ) : (
  //         <Text>Your friend doesn't want anything yet</Text>
  //       )}
  //     </View>
  //   );
  // }

  /*
  //from friend screen (to be removed later)
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
  } */
}
const styles = StyleSheet.create({
  fillerText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 15,
    alignSelf: 'center',
    marginTop: 20,
  }
});

