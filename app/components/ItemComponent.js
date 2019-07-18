import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import firebase from 'react-native-firebase';
import { AccessToken } from 'react-native-fbsdk';
import { withNavigation } from 'react-navigation';


var user, userId, itemsRef, accessData;

class ItemComponent extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    disableDeleteButton: PropTypes.bool.isRequired
  };

  state = {
    userId: 'blank-userId'
  }

  async componentWillMount() {
    user = firebase.auth().currentUser;
    accessData = await AccessToken.getCurrentAccessToken();
    this.setState({
      userId: accessData.getUserId()
    });
  }

  //with flatlist version
  render() {
    return (
      <View >
        <TouchableOpacity 
        style={styles.container} 
        onPress = {() => this.props.navigation.navigate('Edit', this.props.item)}>
          <View style={styles.item}>
            <Text style={styles.itemtext}>{'   ' + this.props.item.name + ', '}</Text>
            <Text style={styles.itemPrice}>{'$' + this.props.item.price + ' '} </Text>
          </View>
        </TouchableOpacity>
        
          <Button title = 'Delete' 
          onPress={() => this.handleDelete(this.props.item.key)}/>
      </View>
    );
  } 

  handleDelete(key) {
    let uid = this.state.userId;
    firebase.database().ref('users/' + uid + '/' + 'wishlist/' + key).remove();
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6F6F6',
    borderColor: '#F6F6F6',
    borderWidth: 1,
    borderRadius: 15,
    height: 65,
    //positioning 
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'baseline',
    alignContent: 'space-between'
    //alignContent: 'stretch',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'baseline',
    alignContent: 'space-between'
  },
  itemtext: {
    fontSize: 12,
    //alignSelf: 'baseline',
    fontFamily: 'Nunito-Regular',
    fontWeight: 'normal',
    flexDirection: 'row',
    alignContent: 'stretch',
    alignSelf: 'flex-start'
    //textAlign: 'center'
  },
  itemPrice: {
    //flexDirection: 'column',
    fontFamily: 'Nunito-Regular',
    paddingLeft: 100,
    fontSize: 15,
    fontWeight: 'normal',
    color: '#ED5F56',
    alignSelf: 'flex-end',
  },
  /*itemsList: {
    flex: 1,
    flexDirection: 'column',
    //justifyContent: 'space-around',
  }*/
});

export default withNavigation(ItemComponent);