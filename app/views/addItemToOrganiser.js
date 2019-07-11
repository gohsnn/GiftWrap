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
import {Container, 
        Input, 
        InputGroup, 
        Left, 
        Content, 
        Header, 
        Footer, 
        FooterTab, 
        Icon, 
        Picker,
        Form,
        Right} from "native-base";
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
          date: '0000'
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
    this.setState({
      name: giftName,
      price: giftPrice,
      giftee: friendName,
      gifteeID: friendID,
      gifteeWishlistKey: gifteeWishlistKey
    })
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
      gifteeWishlistKey: 'blank-giftee-wishlist-key'
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
      gifteeWishlistKey: this.state.gifteeWishlistKey
    }
  );
};
  reserveItem() {
    // alert(this.state.gifteeID + ' ' + this.state.gifteeWishlistKey);
    return db.ref('users/' + this.state.gifteeID + '/' + 'wishlist/' + this.state.gifteeWishlistKey).update(
      {buyer: name}
    );
  }

// state = {
//   name: '',
//   price: '',
//   giftee: '',
//   event: ''
// };

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
  this.setState({
    price: e.nativeEvent.text
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
  //plan: pass the information down as params for the friend.
  //information to pass down would be the item id? 
  //or maybe instead update on the actual item itself whether it is bought or not as a 1 or 0? 
  //or maybe save who is buying the gift, if no one it'll be a specific value like   
  await this.addItem(this.state.name, this.state.price, this.state.giftee, this.state.selectedEvent, this.state.date);
  await this.reserveItem();
  Alert.alert('Item saved successfully');
  this.props.navigation.navigate('Friend');
  this.props.navigation.navigate('Organiser');
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

// onValueChange(value) {
//     this.setState({
//         selectedEvent: value
//         // event: value
//     });
//     // alert(this.state.event);
//     this.handleChangeEvent;
// }

render() {
  return (
    <View>
      <Text style={styles.title}>Add Item</Text>
      <TextInput style={styles.itemInput} onChange={this.handleChangeGiftee} value = {this.state.giftee}/>
      <TextInput style={styles.itemInput} onChange={this.handleChangeName} value = {this.state.name} />
      <TextInput style={styles.itemInput} onChange={this.handleChangePrice} value = {this.state.price} />
        <Form>
            <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down"/>}
            placeholder="Choose event"
            placeholderStyle={{ color: "black" }}
            placeholderIconColor="#007aff"
            style={{ width: undefined }}
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
    color: '#ed5f56'
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