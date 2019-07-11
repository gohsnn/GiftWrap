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

  // render() {
  //   return (
  //     <View style={styles.itemsList}>
  //       {this.props.items.map((item, index) => {
  //         return (
  //           <View key={index}>
  //           <Text style={styles.itemtext}>{item.date}</Text>
  //           <Text onPress = {() => this.props.navigation.navigate('EditOrg', item)}>
  //             <Text style={styles.itemtext}>{item.giftee + ' '}</Text>
  //             <Text style={styles.itemtext}>{item.name + ' '}</Text>
  //             <Text style={styles.itemtext}>${item.price + ' '}</Text>
  //             <Text style={styles.itemtext}>{item.event}</Text>
  //             {item.bought == true ? <Text> Bought</Text> : (null) }
  //           </Text>
  //           <Button title = 'Delete' onPress={() => this.handleDelete(item.key)}/>
  //           </View>
  //         );
  //       })}
  //     </View>
  //   );
  // }
  
  //can just pass item as the argument for checkdate
  //need another argument tho 

  //plan: use Object.keys 
  // convertFormat(items) {
  //   newArr = [];
  //   for (i=0; i < items.length; i++){
  //     newArr.push({
  //       title: Object.keys(items[i]), 
  //       data: Object.values(items[i])
  //     });
  //   }
  //   return newArr;
  // } 
  

  // filterByDate(items, date) {
  //   return items.filter((item) => item.date == date);
  // }

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