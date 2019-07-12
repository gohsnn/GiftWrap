import React, { Component } from 'react';  
import { View, Text, StyleSheet, Button, SectionList } from 'react-native';  
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import {AccessToken} from 'react-native-fbsdk';
import firebase from 'react-native-firebase';
//this component is for items in the organiser
class OrgComponent extends Component {  
  static propTypes = {
    item: PropTypes.object.isRequired
  };

  async componentWillMount() {
    accessData = await AccessToken.getCurrentAccessToken();
    this.setState({
      userId: accessData.getUserId()
    });
  }


  render() {
    return (
      <View style={styles.itemsList}>
         <Text onPress = {() => this.props.navigation.navigate('EditOrg', this.props.item)}>
            <Text style={styles.itemtext}>{this.props.item.giftee + ' '}</Text>
            <Text style={styles.itemtext}>{this.props.item.name + ' '}</Text>
            <Text style={styles.itemtext}>${this.props.item.price + ' '}</Text>
            <Text style={styles.itemtext}>{this.props.item.event}</Text>
              {this.props.item.bought == true ? <Text> Bought </Text> : (null) }
         </Text>
         <Button title = 'Delete' onPress={() => this.handleDelete(this.props.item.key, this.props.item.date)}/>
      </View>
    );
  }
  
  handleDelete(key, date) {
    let uid = this.state.userId;
    firebase.database().ref('users/' + uid + '/' + 'organiser/' + date + '/' + key).remove();
  }

}

const styles = StyleSheet.create({  
  itemsList: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  itemtext: {
    fontFamily: 'Nunito-Regular',
    fontSize: 12,
    fontWeight: 'normal',
    textAlign: 'center'
  }
});

export default withNavigation(OrgComponent);