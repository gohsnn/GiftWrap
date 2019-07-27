import React from 'react';
import {
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  Alert, 
  View,
} from 'react-native';
import {Icon, 
        Picker,
        Form,} from "native-base";
import firebase from 'react-native-firebase';
import {AccessToken} from 'react-native-fbsdk';

const db = firebase.database();
var user, userId, name, cat, photoUrl, addItem, friendID, giftName, friendName;

export default class AddtoOrganiserScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          name: '',
          price: '',
          giftee: '',
          gifteeID: '',
          selectedEvent: undefined, 
          date: '0000',
          styleOne: {},
          styleTwo: {},
          styleThree: {}
        };
    }
  
  async componentWillMount() {
    user = firebase.auth().currentUser;
    accessData = await AccessToken.getCurrentAccessToken();
    userId = accessData.getUserId();    
    name = user.displayName; //available
    photoUrl = user.photoURL;
    cat = "organiser";
    friendName = await this.props.navigation.getParam('gifteeName', 'no friend name');
    friendID = await this.props.navigation.getParam('id', 'NO-ID');
    giftName = await this.props.navigation.getParam('name', 'NO-GIFT-NAME');
    giftPrice = await this.props.navigation.getParam('price', 'NO-GIFT-PRICE');
    gifteeWishlistKey = await this.props.navigation.getParam('gifteeWishlistKey', 'NO-GIFTEE-WISHLIST-KEY');
    productURL = await this.props.navigation.getParam('productUrl', 'NO-PRODUCT-URL');
    console.log(productURL);
    this.setState({
      name: giftName,
      price: giftPrice,
      giftee: friendName,
      gifteeID: friendID,
      productURL: productURL,
      gifteeWishlistKey: gifteeWishlistKey
    });
  } 

 addItem(item, money, person, event, date) {
  let newItemKey = db.ref('users/' + userId + '/' + cat + '/' + date).push(
    {
      name: 'blank-name',
      price: 'blank-price',
      key: 'blank-key',
      giftee: 'blank-giftee',
      event: 'blank-event',
      username: 'blank-username',
      date: 'blank-date',
      gifteeID: 'blank-giftee-id',
      gifteeWishlistKey: 'blank-giftee-wishlist-key',
      productURL: 'blank-productURL'
    }
  ).key;
  return db.ref('users/' + userId + '/' + cat + '/' + date + '/' + newItemKey).update(
    {
      name: item,
      price: money,
      key: newItemKey,
      giftee: person,
      event: event,
      username: name,
      date: date,
      gifteeID: this.state.gifteeID,
      gifteeWishlistKey: this.state.gifteeWishlistKey,
      productURL: this.state.productURL
    }
  );
};
  reserveItem() {
    // alert(this.state.gifteeID + ' ' + this.state.gifteeWishlistKey);
    return db.ref('users/' + this.state.gifteeID + '/' + 'wishlist/' + this.state.gifteeWishlistKey).update(
      {buyer: name}
    );
  }


handleChangeGiftee = e => {
    this.setState({
        giftee: e.nativeEvent.text
    });
}

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


handleChangeEvent = () => {
  let event  = this.state.selectedEvent;
  if (event == 'birthday') {
    itemsRef = db.ref('users/' + 'birthdays/' + this.state.gifteeID);
    itemsRef.on('value', snapshot => {
      let data = snapshot.val();
      if (data) {
        this.setState({
          date: data.date
        });
      } 
    });
  } else {
    itemsRef = db.ref('users/' + 'events/' + event);
    itemsRef.on('value', snapshot => {
      let data = snapshot.val();
      if (data) {
        this.setState({
          date: data.date
        });
      } 
    });
  }
}

handleSubmit = async () => {
  if (this.state.selectedEvent == '' || this.state.selectedEvent ==  undefined) {
    Alert.alert(
      'Item was not added',
      'Please select an event',
      [
        {text: 'OK', onPress: () => this.props.navigation.navigate('AddOrg')},
      ],
      {cancelable: false},
      )
  } else {
    await this.addItem(this.state.name, this.state.price, this.state.giftee, this.state.selectedEvent, this.state.date);
    await this.reserveItem();
    Alert.alert('Item saved successfully');
    this.props.navigation.navigate('Friend');
    this.props.navigation.navigate('Organiser');
  }

};
    
    static navigationOptions = ({ navigation }) => {
  return {
    title: 'Add Gift to Organiser',
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

onFocusThree = () => {
  const state = { ...this.state };
  state.styleThree = {
    borderColor: '#ED5F56',
  };

  this.setState(state);
}

onBlurThree = () => {
  const state = { ...this.state };
  state.styleThree = {};

  this.setState(state);
}


render() {
  return (
    <View>
      <TextInput style={[styles.itemInput, this.state.styleOne]} onChange={this.handleChangeGiftee} value = {this.state.giftee} onFocus={() => this.onFocusOne()} onBlur={() => this.onBlurOne()}/>
      <TextInput style={[styles.itemInput, this.state.styleTwo]} onChange={this.handleChangeName} value = {this.state.name} onFocus={() => this.onFocusTwo()} onBlur={() => this.onBlurTwo()}/>
      <TextInput style={[styles.itemInput, this.state.styleThree]} onChange={this.handleChangePrice} value = {this.state.price} onFocus={() => this.onFocusThree()} onBlur={() => this.onBlurThree()}/>
        <Form>
            <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down"/>}
            placeholder="Choose event"
            placeholderStyle={{ color: "black" }}
            placeholderIconColor="#007aff"
            style={styles.picker}
            selectedValue={this.state.selectedEvent}
            onValueChange={ async (itemValue, itemIndex) => {
            await this.setState({selectedEvent: itemValue});
            this.handleChangeEvent();
            } }
            >
              <Picker.Item label="Choose event" value=""/>
              <Picker.Item label="Birthday" value="birthday"/>
              <Picker.Item label="Christmas" value="christmas"/>
              <Picker.Item label="Valentine's Day" value="valentine's"/>
              <Picker.Item label="Mother's Day" value="mother's day"/>
              <Picker.Item label="Father's Day" value="father's day"/>
            </Picker>
          </Form>

      <TouchableOpacity
        style={styles.button}
        underlayColor="red"
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
  },
  picker: {
    flexDirection: 'row',
    marginHorizontal: 21,
    marginVertical: 8,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});