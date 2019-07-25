import React, { Component } from 'react';  
import { View, Text, StyleSheet } from 'react-native';  
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';

class FriendItemComponent extends Component {  
  static propTypes = {
    item: PropTypes.object,
    friendID: PropTypes.string,
    friendName: PropTypes.string
    //friends: PropTypes.array.isRequired,
  };

  convertName(name) {
    let res = name.split(' ', 4);
    return res[0];
  }

  render() {
    return (
      <View>
          <TouchableOpacity 
            style={styles.container}
            onPress = {() => this.props.navigation.navigate('AddOrg', {
              gifteeName: this.props.friendName,
              id: this.props.friendID,
              name: this.props.item.name,
              price: this.props.item.price,
              gifteeWishlistKey: this.props.item.key,
              productUrl: this.props.item.productUrl
            })}>
              <View style = {styles.item}>
                <View style = {{flex: 1}}>
                  <Text style ={styles.itemtext}>{this.props.item.name}</Text>
                </View>
              <View style = {{flex: 1}}>
                  <Text style = {styles.itemPrice}>{'$' + this.props.item.price}</Text>
                </View>
              </View>
                {(this.props.item.buyer != undefined) 
                  ? <View style={styles.itemBought}>
                    <Text style={styles.boughtText}>{this.convertName(this.props.item.buyer)} is buying the {this.props.item.name}</Text>
                  </View> 
                  : (null) }
            </TouchableOpacity>
          </View>);

}
}
  
//   render() {
//     return (
//       <View>
//           {(this.props.item.buyer == undefined) ? 
//               (<View>
//                 <TouchableOpacity 
//                   style={styles.container}
//                   onPress = {() => this.props.navigation.navigate('AddOrg', {
//                       gifteeName: this.props.friendName,
//                       id: this.props.friendID,
//                       name: this.props.item.name,
//                       price: this.props.item.price,
//                       gifteeWishlistKey: this.props.item.key
//                     })}>
//                     <View style = {styles.item}>
//                       <View style = {{flex: 1}}>
//                         <Text style ={styles.itemtext}> {this.props.item.name}</Text>
//                       </View>
//                       <View style = {{flex: 1}}>
//                         <Text style = {styles.itemPrice}> {'$' + this.props.item.price}</Text>
//                       </View>
//                     </View>     
//                       </TouchableOpacity>
//                   </View>) :
//                   (<View>
//                   <Text style={styles.itemtext}>{this.props.item.buyer} is buying the {this.props.item.name}</Text>
//                   <Text></Text>
//                   </View>)
//           }
//           </View>);

// }

  //navigation should also pass friend as params (friendWishlistScreen)
  //without flatlist version 
  // render() {
  //     return (
  //         <View style={styles.itemList}>
  //             {this.props.items.map((item, index) => {
  //               return (
  //                   <View key={index}>
  //                   { (item.buyer == undefined) ? 
  //                   (<View>
  //                     <TouchableOpacity style={styles.itemtext}
  //                       onPress = {() => this.props.navigation.navigate('AddOrg', {
  //                         gifteeName: this.props.friendName,
  //                         id: friendID,
  //                         name: item.name,
  //                         price: item.price,
  //                         gifteeWishlistKey: item.key
  //                       })}>
  //                           <Text> {item.name}</Text>
  //                       </TouchableOpacity>
  //                       <Text style={styles.itemtext}>{item.price}</Text>
  //                   </View>) :
  //                   (<View>
  //                   <Text style={styles.itemtext}>{item.buyer} is buying the {item.name}</Text>
  //                   <Text></Text>
  //                   </View>)
  //                   }
  //                   </View>
  //               );
  //             })}
  //         </View>
  //     );
      
      
  // }
  

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



//plan: have an onpress action that handles the press 
//but need to find the userID from the friend tho
//id from graph request not the same user.uid

const styles = StyleSheet.create({  
  container: {
    backgroundColor: '#F6F6F6',
    borderColor: '#F6F6F6',
    borderWidth: 1,
    borderRadius: 15,
    flexDirection: 'column',
    height: 55,
    marginVertical: 8,
    alignSelf: 'stretch',
  },
  item: {
    marginTop: 15,
    flexDirection: 'row',
    // alignSelf: 'stretch',
    flex: 1,
  }, 
  itemPrice: {
    fontFamily: 'Nunito-Regular',
    textAlign: 'right',
    marginRight: 20,
    fontSize: 15,
    fontWeight: 'normal',
    color: '#ED5F56',
  },
  itemsList: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  itemtext: {
    fontSize: 15,
    fontFamily: 'Nunito-Regular',
    fontWeight: 'normal',
    flexDirection: 'row',
    paddingLeft: 28,
  },
  itemBought: {
    alignSelf: 'stretch',
    width: '100%',
    flexWrap: 'wrap',
    paddingVertical: 16,
    paddingHorizontal: 137,
    position: 'absolute',
    zIndex: 10,
    backgroundColor: 'white',
    opacity: 0.85,
    borderRadius: 15,
    color: 'black',
    alignItems: 'center',
  }, 
  boughtText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 15,
    justifyContent: 'center',
    width: '290%',
  }
});

export default withNavigation(FriendItemComponent);