import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  Text,
  StatusBar,
  StyleSheet,
  View,
  SectionList
} from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import OrgComponent from '../components/OrgComponent';
import firebase from 'react-native-firebase';
import {AccessToken} from 'react-native-fbsdk';
import moment from 'moment';

const db = firebase.database();
var user, cat, userId, orgRef, accessData;

export default class OrganiserScreen extends React.Component {
  state = {
    items: []
  }

  async componentWillMount() {
    user = firebase.auth().currentUser;
    accessData = await AccessToken.getCurrentAccessToken();
    userId = accessData.getUserId();   
    itemsRef = db.ref('users/' + userId + '/organiser');
    await itemsRef.orderByKey().on('value', snapshot => {
      let data = snapshot.val();
      if (data) {
        let items = Object.values(data).reverse();
        let keys = Object.keys(data).reverse();
        // alert(JSON.stringify(keys));
        this.setState(
          { 
            items: items,
            dates: keys
          });
      }  
    });
  }

  convertFormat(items, dates) {
    newArr = [];
    for (i=0; i < items.length; i++){
      newArr.push({
        title: dates[i], 
        data: Object.values(items[i])
      });
    }
    return newArr;
  } 


  static navigationOptions = ({ navigation }) => {
      return {
        title: 'Organiser',
        headerStyle: {
          backgroundColor: '#fff',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTintColor: '#ed5f56',
        headerTitleStyle: {
          fontWeight: "200",
          fontFamily: "Nunito-Bold",
          fontSize: 18,
          textAlign: 'center',
          flexGrow: 1,
        },
      }
  };

  handleDelete(key) {
    let uid = this.state.userId;
    firebase.database().ref('users/' + uid + '/' + 'organiser/' + key).remove();
  }

  formatDate(date) {
    return moment("2019" + date).format("Do MMM");
  }

  render() {
    return (
      <View style={{flex: 1, marginHorizontal: 21,}}>
        {this.state.items.length > 0 ? (
          <SectionList
          sections={this.convertFormat(this.state.items, this.state.dates)}
          renderItem = {({item}) =>  
          <OrgComponent item = {item}/>}
          renderSectionHeader={({section}) => <Text style= {styles.headers}>{this.formatDate(section.title) + ', ' + section.data[0].event}</Text>}
          keyExtractor={(item, index) => index}
          />
        ) : (
          <Text style={styles.fillerText}>Nothing to buy yet</Text> 
        )}
      </View>
    );
  }
  
  
}

const styles = StyleSheet.create({
  headers: {
    fontFamily: 'Nunito-Bold',
    textTransform: 'capitalize',
    color: '#ED5F56',
    fontSize: 18, 
    paddingTop: 10
  },
  fillerText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 15,
    alignSelf: 'center',
    marginTop: 20,
  }
});



//   module.export = Organiser;