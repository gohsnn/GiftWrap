import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
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
            <Text style={styles.itemtext}>{this.props.item.name + ', '}</Text>
            <Text style={styles.itemPrice}>{this.props.item.price + ' '} </Text>
          </View>
        </TouchableOpacity>
          <Button title = 'Delete' 
          onPress={() => this.handleDelete(this.props.item.key)}/>
      </View>
    );
  } 
  
  //without flatist version 
  /*
  render() {
    return (
      <View style={styles.itemsList}>
        {this.props.items.map((item, index) => {
          return (
            <View key={index}>
              <Text onPress = {() => this.handleEdit(item)}>
                <Text style={styles.itemtext}>{item.name + ' '}</Text>
                <Text style={styles.itemtext}>${item.price}</Text>
              </Text>
              
              {
                (this.props.disableDeleteButton) ? (null) :
                <Button title="Delete"
                onPress={() => this.handleDelete(item.key)}
                /> 
              }
            </View>
          );
        })}
      </View>
    );
  } 

  handleEdit(item) {
    this.props.navigation.navigate('Edit', item);
  } */

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
    flexDirection: 'column',
    height: 65,
    marginVertical: 8,
    alignSelf: 'stretch',
  },
  item: {
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  itemPrice: {
    flexDirection: 'row',
    fontFamily: 'Nunito-Regular',
    fontSize: 15,
    fontWeight: 'normal',
    color: '#ED5F56'
  },
  itemsList: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  itemtext: {
    fontSize: 12,
    fontFamily: 'Nunito-Regular',
    fontWeight: 'normal',
    textAlign: 'center'
  }
});

export default withNavigation(ItemComponent);