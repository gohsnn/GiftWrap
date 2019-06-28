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
var user, userId, name, cat, photoUrl, addItem;

export default class AddtoOrganiserScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedEvent: undefined
        };
    }
  
  async componentWillMount() {
    user = firebase.auth().currentUser;
    accessData = await AccessToken.getCurrentAccessToken();
    userId = accessData.getUserId();    
    name = user.displayName; //available
    photoUrl = user.photoURL;
    cat = "organiser";
  } 

 addItem(item, money, person, event, date) {
  // db.ref('users/' + userId + '/' + cat + '/' + userId).push(
  //   {
  //     name: item,
  //     price: money,
  //     giftee: person,
  //     event: event,
  //     username: name,
  //     photo: photoUrl
  //   }
  // );
  let newItemKey = db.ref('users/' + userId + '/' + cat).push(
    {
      name: 'blank-name',
      price: 'blank-price',
      key: 'blank-key',
      giftee: 'blank-giftee',
      event: 'blank-event',
      username: 'blank-username'
    }
  ).key;
  return db.ref('users/' + userId + '/' + cat + '/' + newItemKey).update(
    {
      name: item,
      price: money,
      key: newItemKey,
      giftee: person,
      event: event,
      username: name,
    }
  );
};

state = {
  name: '',
  price: '',
  giftee: '',
  event: ''
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


handleChangeEvent = e => {
    this.setState({
        event: e.nativeEvent.text
    });
}

handleSubmit = () => {
  this.addItem(this.state.name, this.state.price, this.state.giftee, this.state.event);
  Alert.alert('Item saved successfully');
};
    
    static navigationOptions = ({ navigation }) => {
  return {
    title: 'Add Gift to Organiser',
    headerStyle: {
      backgroundColor: '#ed5f56',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontFamily: "Roboto",
      fontSize: 18,
      textAlign: 'center',
      flexGrow: 1,
    },
  }
};

onValueChange(value) {
    this.setState({
        selectedEvent: value
    });
    this.handleChangeEvent;
}

render() {
  return (
    <View>
      <Text style={styles.title}>Add Item</Text>
      <TextInput style={styles.itemInput} onChange={this.handleChangeGiftee} placeholder = "Name of Giftee" />
      <TextInput style={styles.itemInput} onChange={this.handleChangeName} placeholder = "Gift Idea" />
      <TextInput style={styles.itemInput} onChange={this.handleChangePrice} placeholder = "Gift Price" />
        <Form>
            <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down"/>}
            placeholder="Choose event"
            placeholderStyle={{ color: "black" }}
            placeholderIconColor="#007aff"
            style={{ width: undefined }}
            selectedValue={this.state.selectedEvent}
            onValueChange={this.onValueChange.bind(this)}
            >
              <Picker.Item label="Choose event" value="key0"/>
              <Picker.Item label="Birthday" value="key1"/>
              <Picker.Item label="Christmas" value="key2"/>
              <Picker.Item label="Wedding" value="key3"/>
              <Picker.Item label="Mother's Day" value="key4"/>
              <Picker.Item label="Father's Day" value="key5"/>
              <Picker.Item label="Anniversary" value="key6"/>
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
    borderColor: 'red',
    borderRadius: 8,
    color: 'red'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'red',
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});