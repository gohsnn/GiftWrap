import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  Text,
  StatusBar,
  StyleSheet,
  Platform,
  TextInput,
  TouchableHighlight,
  Alert,
  View,
} from 'react-native';
// import {Container, 
//         Input, 
//         InputGroup, 
//         Left, 
//         Content, 
//         Header, 
//         Footer, 
//         FooterTab, 
//         Button, 
//         Icon, 
//         Picker,
//         Form,
//         Right} from "native-base";
// import { Ionicons } from '@expo/vector-icons';
// import { db } from "../config";
import firebase from 'react-native-firebase';
import {AccessToken} from 'react-native-fbsdk';
import { TouchableOpacity } from 'react-native-gesture-handler';


const db = firebase.database();
var user, userId, name, photoUrl, accessData, cat;

export default class EditWishlistScreen extends React.Component {

  state = {
    name: 'blank-name',
    price: 'blank-price',
    key: 'blank-key'
  }
  
  async componentWillMount() {
    user = firebase.auth().currentUser;
    accessData = await AccessToken.getCurrentAccessToken();
    userId = accessData.getUserId();    
    name = user.displayName; //available
    photoUrl = user.photoURL;
    cat = "wishlist";
    itemName = this.props.navigation.getParam('name', 'Blank-name');
    itemPrice = this.props.navigation.getParam('price', 'Blank-price');
    itemKey = this.props.navigation.getParam('key', 'Blank-key');
    this.setState({
      name: itemName,
      price: itemPrice,
      key: itemKey
    });
    // alert(itemName + ' ' + itemKey);
  } 

 addItem(item, money) {
  let key = this.state.key;
  return db.ref('users/' + userId + '/' + cat + '/' + key).update(
    {
      name: item,
      price: money,
      key: key,
      photoURL: photoUrl
    }
  );
};


handleChangeName = e => {
  this.setState({
    name: e.nativeEvent.text
  });
};

handleChangePrice = e => {
  this.setState({
    price: e.nativeEvent.text
  });
};

handleSubmit = () => {
  this.addItem(this.state.name, this.state.price);
  Alert.alert(
    'Edit Item',
    'Item saved successfully',
    [
      {text: 'OK', onPress: () => this.props.navigation.navigate('Wishlist')},
    ],
    {cancelable: false},
  );
};
    
    static navigationOptions = ({ navigation }) => {
  return {
    title: 'Edit',
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
      width: '75%',
    },
  }
};

render() {
  return (
    <View>
      <Text></Text>
      <TextInput style={styles.itemInput} onChange={this.handleChangeName} value = {this.state.name} />
      <TextInput style={styles.itemInput} onChange={this.handleChangePrice} value = {this.state.price} />
      <TouchableOpacity
        style={styles.button}
        // underlayColor="red"
        onPress={this.handleSubmit}
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}
  }
const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#6565fc'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center'
  },
  itemInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: '#E4E4E4',
    borderRadius: 8,
    color: '#646464'
  },
  buttonText: {
    fontFamily: 'Nunito-Light',
    fontSize: 28,
    color: '#ED5F56',
    alignSelf: 'center',
    marginBottom: 5
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: '#F6F6F6',
    borderColor: '#F6F6F6',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});