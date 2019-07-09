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
  Switch
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

export default class EditOrganiserScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          name: '',
          price: '',
          giftee: '',
          gifteeID: '',
          selectedEvent: undefined, 
          date: '0000',
          key: '',
          bought: false
        };
    }
  
  async componentWillMount() {
    user = firebase.auth().currentUser;
    accessData = await AccessToken.getCurrentAccessToken();
    userId = accessData.getUserId();    
    name = user.displayName; 
    photoUrl = user.photoURL;
    cat = "organiser";
    friendName = await this.props.navigation.getParam('giftee', 'NO-FRIEND-NAME');
    friendID = await this.props.navigation.getParam('gifteeID', 'NO-GIFTEE-ID');
    giftName = await this.props.navigation.getParam('name', 'NO-GIFT-NAME');
    giftPrice = await this.props.navigation.getParam('price', 'NO-GIFT-PRICE');
    date = await this.props.navigation.getParam('date', 'NO-GIFT-DATE');
    key = await this.props.navigation.getParam('key', 'NO-KEY');
    bought = await this.props.navigation.getParam('bought', 'NO-BOUGHT');
    this.setState({
      name: giftName,
      price: giftPrice,
      giftee: friendName,
      gifteeID: friendID,
      key: key,
      bought: bought
    })
  } 

 addItem(item, money, person, event, date, bought) {
  let itemKey = this.state.key;
  return db.ref('users/' + userId + '/' + cat + '/' + itemKey).update(
    {
      name: item,
      price: money,
      key: itemKey,
      giftee: person,
      event: event,
      username: name,
      date: date,
      gifteeID: this.state.gifteeID,
      bought: bought
    }
  );
};

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
handleBought = () => {
    this.setState({bought: 1}); 
};

toggleBought = (value) => {
    this.setState({bought: value}); 
};


handleSubmit = () => {
  this.addItem(this.state.name, this.state.price, this.state.giftee, this.state.selectedEvent, this.state.date, this.state.bought);
  Alert.alert('Item saved successfully');
  this.props.navigation.navigate('Organiser');
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
        <Text style={styles.buttonText}>Done</Text>
      </TouchableHighlight>
      
      
      <View style = {styles.main}>
        <Text style = {styles.text}>Bought</Text>
        <Switch thumbColor={'#F7F7F7'} trackColor={{true: '#ed5f56'}} onValueChange={this.toggleBought} value={this.state.bought}/>
      </View>

    </View>
  );
}
  }
const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
    color: 'grey',
    alignSelf: 'center'
  },
  itemInput: {
    height: 50,
    padding: 5,
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