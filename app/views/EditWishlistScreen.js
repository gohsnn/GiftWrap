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
      styleTwo: {},
      userId: userId
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
  var value = e.nativeEvent.text;
  value = parseFloat(value).toFixed(2);
  this.setState({
    price: value
  });
};

handleSubmit = () => {
  if (this.state.name == 'blank-name' || this.state.price == 'blank-price'
  || this.state.name == '' || this.state.price == '') {
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

handleDelete= () => {
  let uid = this.state.userId;
  let key = this.state.key; 
  Alert.alert(
    'Delete Item',
    'Are you sure you want to delete the item?',
    [
      {text: 'OK', 
      onPress: () => {
        db.ref('users/' + uid + '/' + 'wishlist/' + key).remove();
        this.props.navigation.navigate('Wishlist'); 
      }},
    ],
    {cancelable: true},
  );
  
}



    
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
      <View style = {styles.both}> 
        <TouchableOpacity
          style={styles.buttonDelete}
          onPress={this.handleDelete}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonDone}
          onPress={this.handleSubmit}
        >
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
      </View>
      
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
  both: {
    flexDirection: 'row',
    height: 55,
    justifyContent: 'space-between'
  },
  buttonText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 15,
    color: '#ED5F56',
    alignSelf: 'center',
    marginBottom: 5,
  },
  buttonDelete: {
    flex:1,
    width: 169,
    backgroundColor: '#F6F6F6',
    borderColor: '#F6F6F6',
    borderWidth: 1,
    marginHorizontal: 2,
    marginLeft: 21,
    marginVertical: 8,
    alignSelf: 'stretch',
    justifyContent: 'center',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0, 
    borderBottomLeftRadius: 5,
  }, 
  buttonDone: {
    flex: 1,
    width: 169,
    backgroundColor: '#F6F6F6',
    borderColor: '#F6F6F6',
    borderWidth: 1,
    marginRight: 21,
    marginVertical: 8,
    justifyContent: "center",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5, 
    borderBottomLeftRadius: 0,
    alignSelf: 'stretch'
  }
});