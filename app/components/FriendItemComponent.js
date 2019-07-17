import React, { Component } from 'react';  
import { View, Text, StyleSheet } from 'react-native';  
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';

class FriendItemComponent extends Component {  
  static propTypes = {
    items: PropTypes.array.isRequired,
    friendID: PropTypes.string,
    friendName: PropTypes.string
    //friends: PropTypes.array.isRequired,
  };


  //navigation should also pass friend as params (friendWishlistScreen)
  render() {
      return (
          <View style={styles.itemList}>
              {this.props.items.map((item, index) => {
                return (
                    <View key={index}>
                    { (item.buyer == undefined) ? 
                    (<View>
                      <TouchableOpacity style={styles.itemtext}
                        onPress = {() => this.props.navigation.navigate('AddOrg', {
                          gifteeName: this.props.friendName,
                          id: friendID,
                          name: item.name,
                          price: item.price,
                          gifteeWishlistKey: item.key
                        })}>
                            <Text> {item.name}</Text>
                        </TouchableOpacity>
                        <Text style={styles.itemtext}>{item.price}</Text>
                    </View>) :
                    (<View>
                    <Text style={styles.itemtext}>{item.buyer} is buying the {item.name}</Text>
                    <Text></Text>
                    </View>)
                    }
                    </View>
                );
              })}
          </View>
      );
      
      
  }
  

  /*
  //friend component version
  //navigate(screen, passParams): passing the friend object 
  render() {
    return (
      <View style={styles.friendList}>
        {this.props.friends.map((friend, index) => {
          return (
            <View key={index}>
              <Text style={styles.itemtext} 
              onPress = {() => this.props.navigation.navigate('Friend', friend)}>
              {friend.name}
              </Text>
            </View> 
          );
        })}
      </View>
    );
  }
  */


}
//plan: have an onpress action that handles the press 
//but need to find the userID from the friend tho
//id from graph request not the same user.uid

const styles = StyleSheet.create({  
  itemList: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: 15,
    paddingLeft: 25,
  },
  itemtext: {
    fontFamily: 'Nunito-Regular',
    fontSize: 15,
    fontWeight: 'normal',
    textAlign: 'center'
  }
});

export default withNavigation(FriendItemComponent);