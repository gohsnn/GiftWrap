import React, { Component } from 'react';  
import { View, Text, StyleSheet, Button, SectionList } from 'react-native';  
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import {AccessToken} from 'react-native-fbsdk';
import firebase from 'react-native-firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';
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
      <View >
         <TouchableOpacity style={styles.container} onPress = {() => this.props.navigation.navigate('EditOrg', this.props.item)}>
            <Text style={styles.itemGiftee}>{this.props.item.giftee + ' '}</Text>
            <View style={styles.item}>
              <Text style={styles.itemtext}>{this.props.item.name + ', '}</Text>
              <Text style={styles.itemPrice}>${this.props.item.price + ' '}</Text>
            </View>
              {this.props.item.bought == true ? <Text style={styles.itemBought}> Bought </Text> : (null) }
         </TouchableOpacity>
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
  itemtext: {
    flexDirection: 'row',
    fontFamily: 'Nunito-Regular',
    fontSize: 15,
    fontWeight: 'normal',
    paddingLeft: 28,
  }, 
  itemGiftee: {
    marginTop: 10,
    paddingLeft: 28,
    flexDirection: 'column',
    fontFamily: 'Nunito-Bold',
    fontSize: 15,
    alignSelf: 'stretch',
  },
  itemBought: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 18,
    alignSelf: 'center',
    paddingVertical: 20,
    paddingHorizontal: 137,
    position: 'absolute',
    zIndex: 10,
    backgroundColor: 'white',
    opacity: 0.85,
    borderRadius: 15,
    color: 'black',
  }
});

export default withNavigation(OrgComponent);