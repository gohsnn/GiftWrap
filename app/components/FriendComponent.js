import React, { Component } from 'react';  
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';  
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';

class FriendComponent extends Component {  
  static propTypes = {
    friends: PropTypes.array.isRequired,
  };
 
  render() {
    return ( 
      <View style={styles.friendList}>
        {this.props.friends.map((friend, index) => {
          return (
            <View key={index}>
              <TouchableOpacity style={styles.button} 
              onPress = {() => this.props.navigation.navigate('Friend', friend)}>
              <Text style = {styles.buttonText}>{friend.name}</Text>
              </TouchableOpacity>
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
    // flex: 1,
    alignItems: 'stretch',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  buttonText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
    marginBottom: 5,
    marginTop: 12,
    paddingLeft: 28,
    alignSelf: 'stretch'
    // paddingLeft: 28 
  },
  button: {
    height: 55,
    flexDirection: 'row',
    backgroundColor: '#F6F6F6',
    borderColor: '#F6F6F6',
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 21,
    marginVertical: 8,
    alignSelf: 'stretch',
    // justifyContent: 'center'
  }
});

export default withNavigation(FriendComponent);