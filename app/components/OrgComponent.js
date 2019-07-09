import React, { Component } from 'react';  
import { View, Text, StyleSheet, Button } from 'react-native';  
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import {AccessToken} from 'react-native-fbsdk';
import firebase from 'react-native-firebase';
//this component is for items in the organiser
class OrgComponent extends Component {  
  static propTypes = {
    items: PropTypes.array.isRequired
  };

  async componentWillMount() {
    accessData = await AccessToken.getCurrentAccessToken();
    this.setState({
      userId: accessData.getUserId()
    });
    // alert(accessData.getUserId());
  }

  render() {
    return (
      <View style={styles.itemsList}>
        {this.props.items.map((item, index) => {
          return (
            <View key={index}>
            <Text style={styles.itemtext}>{item.date}</Text>
            <Text onPress = {() => this.props.navigation.navigate('EditOrg', item)}>
              <Text style={styles.itemtext}>{item.giftee + ' '}</Text>
              <Text style={styles.itemtext}>{item.name + ' '}</Text>
              <Text style={styles.itemtext}>${item.price + ' '}</Text>
              <Text style={styles.itemtext}>{item.event}</Text>
              {item.bought == true ? <Text> Bought</Text> : (null) }
            </Text>
            <Button title = 'Delete' onPress={() => this.handleDelete(item.key)}/>
            </View>
          );
        })}
      </View>
    );
  }
  
  handleDelete(key) {
    let uid = this.state.userId;
    firebase.database().ref('users/' + uid + '/' + 'organiser/' + key).remove();
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

export default withNavigation(OrgComponent);