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


const db = firebase.database();
var user, userId, name, photoUrl, accessData, cat, item;

export default class AddtoWishlistScreen extends React.Component {

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
  } 

 addItem(item, money) {
   let newItemKey = db.ref('users/' + userId + '/' + cat).push(
    {
      name: 'blank-name',
      price: 'blank-price',
      key: 'blank-key'
    }
  ).key;
  return db.ref('users/' + userId + '/' + cat + '/' + newItemKey).update(
    {
      name: item,
      price: money,
      key: newItemKey,
      photoURL: photoUrl
    }
  );
};

// state = {
//   name: '',
//   price: ''
// };

// //plan get the state from 

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
    'Add Item',
    'Item saved successfully',
    [
      {text: 'OK', onPress: () => this.props.navigation.navigate('Wishlist')},
    ],
    {cancelable: false},
  );
};
    
    static navigationOptions = ({ navigation }) => {
  return {
    title: 'Add Item to Wishlist',
    headerStyle: {
      backgroundColor: '#fff',
    },
    headerTintColor: '#ed5f56',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontFamily: "Roboto",
      fontSize: 18,
      textAlign: 'center',
      flexGrow: 1,
    },
  }
};
//do an if else to check if item is null or not then render the same textInput accordingly
render() {
  return (
    <View>
      <Text style={styles.title}>Add Item</Text>
      <TextInput style={styles.itemInput} onChange={this.handleChangeName} placeholder = "Gift Name" />
      <TextInput style={styles.itemInput} keyboardType='numeric' maxLength={6} onChange={this.handleChangePrice} placeholder = "Gift Price" />
      <TouchableHighlight
        style={styles.button}
        underlayColor="red"
        onPress={this.handleSubmit}
      >
        <Text style={styles.buttonText}>Add</Text>
      </TouchableHighlight>
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
    borderColor: '#ed5f56',
    borderRadius: 8,
    color: 'red'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: '#ed5f56',
    borderColor: '#ed5f56',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});