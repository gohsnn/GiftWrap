import React, { Component } from 'react';  
import { View, Text, StyleSheet } from 'react-native';  
import PropTypes from 'prop-types';

export default class FriendComponent extends Component {  
  static propTypes = {
    friends: PropTypes.array.isRequired
  };

  render() {
    return (
      <View style={styles.friendList}>
        {this.props.friends.map((friend, index) => {
          return (
            <View key={index}>
              <Text style={styles.itemtext}>{friend.name}</Text>
            </View>
          );
        })}
      </View>
    );
  }
}

//plan: have an onpress action that handles the press 
//but need to find the userID from the friend tho
//id from graph request not the same user.uid

const styles = StyleSheet.create({  
  friendList: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: 15,
    paddingLeft: 25,
  },
  itemtext: {
    fontSize: 15,
    fontWeight: 'normal',
    textAlign: 'center'
  }
});