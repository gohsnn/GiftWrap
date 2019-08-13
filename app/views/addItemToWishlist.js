import React from 'react';
import {
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
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
    key: 'blank-key',
    styleOne: {},
    styleTwo: {}
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
      photoURL: photoUrl,
      buyer: undefined
    }
  );
};


handleChangeName = e => {
  this.setState({
    name: e.nativeEvent.text
  });
};

handleChangePrice = e => {
  var value = e.nativeEvent.text;
  value = parseFloat(value).toFixed(2);
  this.setState({
    price: value
  });
};

handleSubmit = () => {
  if (this.state.name == 'blank-name' || this.state.price == 'blank-price') {
    Alert.alert(
      'Item was not added',
      'Please input both gift name and price',
      [
        {text: 'OK', onPress: () => this.props.navigation.navigate('AddToWishlistScreen')},
      ],
      {cancelable: false},
      )
  } else {
    this.addItem(this.state.name, this.state.price);
    Alert.alert(
      'Add Item',
      'Item saved successfully',
      [
        {text: 'OK', onPress: () => this.props.navigation.navigate('Wishlist')},
      ],
      {cancelable: false},
    );
  }
};
    
    static navigationOptions = ({ navigation }) => {
  return {
    title: 'Add Item to Wishlist',
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
      width: '80%',
    },
  }
};

onFocusOne = () => {
  const state = { ...this.state };
  state.styleOne = {
    borderColor: '#ED5F56',
  };

  this.setState(state);
}

onBlurOne = () => {
  const state = { ...this.state };
  state.styleOne = {};

  this.setState(state);
}

onFocusTwo = () => {
  const state = { ...this.state };
  state.styleTwo = {
    borderColor: '#ED5F56',
  };

  this.setState(state);
}

onBlurTwo = () => {
  const state = { ...this.state };
  state.styleTwo = {};

  this.setState(state);
}

render() {
  return (
    <View>
      <TextInput style={[styles.itemInput, this.state.styleOne]} onChange={this.handleChangeName} onFocus={() => this.onFocusOne()} onBlur={() => this.onBlurOne()} placeholder = "Gift Name (be as specific as possible!)" />
      <TextInput style={[styles.itemInput, this.state.styleTwo]} keyboardType='numeric' maxLength={6} onChange={this.handleChangePrice} onFocus={() => this.onFocusTwo()} onBlur={() => this.onBlurTwo()} placeholder = "Gift Price" />
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
  itemInput: {
    height: 50,
    paddingLeft: 18,
    marginHorizontal: 21,
    marginVertical: 8,
    fontSize: 15,
    fontFamily: 'Nunito-Regular',
    borderWidth: 1,
    borderColor: '#E4E4E4',
    borderRadius: 5,
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
    borderRadius: 5,
    marginHorizontal: 21,
    marginVertical: 8,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});