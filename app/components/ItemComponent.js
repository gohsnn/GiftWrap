import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import PropTypes from 'prop-types';
import firebase from 'react-native-firebase';
import { AccessToken } from 'react-native-fbsdk';


var user, userId, itemsRef, accessData;

export default class ItemComponent extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    disableButton: PropTypes.bool.isRequired
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

  render() {
    return (
      <View style={styles.itemsList}>
        {this.props.items.map((item, index) => {
          return (
            <View key={index}>
              <Text style={styles.itemtext}>{item.name}</Text>
              <Text style={styles.itemtext}>{item.price}</Text>
              {
                this.props.disableButton ? null :
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

  handleDelete(key) {
    let uid = this.state.userId;
    firebase.database().ref('users/' + uid + '/' + key).remove();
  }
}



const styles = StyleSheet.create({
  itemsList: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  itemtext: {
    fontSize: 12,
    fontWeight: 'normal',
    textAlign: 'center'
  }
});