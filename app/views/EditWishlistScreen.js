import React from 'react';
import {
  Text,
  StyleSheet,
  TextInput,
  Alert,
  View,
} from 'react-native';
import firebase from 'react-native-firebase';
import {AccessToken} from 'react-native-fbsdk';
import { TouchableOpacity } from 'react-native-gesture-handler';


const db = firebase.database();
var user, userId, name, photoUrl, accessData, cat;

export default class EditWishlistScreen extends React.Component {

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
    itemName = this.props.navigation.getParam('name', 'Blank-name');
    itemPrice = this.props.navigation.getParam('price', 'Blank-price');
    itemKey = this.props.navigation.getParam('key', 'Blank-key');
    this.setState({
      name: itemName,
      price: itemPrice,
      key: itemKey,
      styleOne: {},
      styleTwo: {}
    });
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
      <Text></Text>
      <TextInput style={[styles.itemInput, this.state.styleOne]} onChange={this.handleChangeName} value = {this.state.name} onFocus={() => this.onFocusOne()} onBlur={() => this.onBlurOne()}  />
      <TextInput style={[styles.itemInput, this.state.styleTwo]} onChange={this.handleChangePrice} value = {this.state.price} onFocus={() => this.onFocusTwo()} onBlur={() => this.onBlurTwo()} />
      <TouchableOpacity
        style={styles.button}
        onPress={this.handleSubmit}
      >
        <Text style={styles.buttonText}>Done</Text>
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
    fontFamily: 'Nunito-Regular',
    fontSize: 15,
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