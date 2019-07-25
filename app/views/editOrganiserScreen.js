import React from 'react';
import {
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Alert, 
  View,
  Switch,
  Linking
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
import { TouchableOpacity } from 'react-native-gesture-handler';
// import console = require('console');

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
          bought: false,
          styleOne: {},
          styleTwo: {},
          styleThree: {},
          eventChanged: false,
          oldDate: ''
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
    productUrl = await this.props.navigation.getParam('productURL', 'NO-PRODUCT-URL');
    console.log(productUrl);
    this.setState({
      name: giftName,
      price: giftPrice,
      giftee: friendName,
      gifteeID: friendID,
      key: key,
      bought: bought,
      oldDate: date,
      productURL: productUrl
    });
  } 

 addItem(item, money, person, event, date, bought) {
  let itemKey = this.state.key;
  if (this.state.eventChanged) {
    db.ref('users/' + userId + '/' + cat + '/' + this.state.oldDate + '/' + itemKey).remove(); 
  }
  return db.ref('users/' + userId + '/' + cat + '/' + date + '/' + itemKey).update(
    {
      name: item,
      price: money,
      key: itemKey,
      giftee: person,
      event: event,
      username: name,
      date: date,
      gifteeID: this.state.gifteeID,
      bought: bought, 
      productURL: this.state.productURL
    }
  );
};

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
  this.setState({
    eventChanged: true
  });
}

toggleBought = (value) => {
    this.setState({bought: value}); 
};

handleDelete= () => {
  let key = this.state.key; 
  Alert.alert(
    'Delete Item',
    'Are you sure you want to delete the item?',
    [
      {text: 'OK', 
      onPress: () => {
        db.ref('users/' + userId + '/' + 'organiser/' + this.state.oldDate + '/' + key).remove();
        this.props.navigation.navigate('Organiser'); 
      }},
      {
        text: 'Cancel',
      },
    ],
    {cancelable: false},
  );
  }

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

handleLink = () => {
  Linking.openURL(this.state.productURL);
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

      <View style = {styles.main}>
        <Text style = {styles.text}>Bought</Text>
        <Switch thumbColor={'#F7F7F7'} trackColor={{true: '#ed5f56'}} onValueChange={this.toggleBought} value={this.state.bought}/>
      </View>
      
      <TouchableOpacity
          style={styles.buttonLink}
          onPress={this.handleLink}
        >
          <Text style={styles.buttonText}>Link</Text>
        </TouchableOpacity>
      
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
  main: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 55,
  },
  text: {
    fontSize: 15,
    color: 'grey',
    alignSelf: 'center'
  },
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
    marginVertical: 60,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonLink: {
    height: 45,
    // flexDirection: 'row',
    backgroundColor: '#F6F6F6',
    borderColor: '#F6F6F6',
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 21,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  both: {
    marginTop: 0,
    flexDirection: 'row',
    height: 55,
    justifyContent: 'space-between'
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
  },
  picker: {
    flexDirection: 'row',
    marginHorizontal: 21,
    marginVertical: 8,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});