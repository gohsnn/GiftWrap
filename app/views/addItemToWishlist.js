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

const db = firebase.database();
let user = firebase.auth().currentUser;
let uid = user.uid;

// if (user != null) {
//   let uid = user.uid;

// }
let addItem = (item, money) => {
    db.ref('users/' + uid).push(
      {
          name: item,
          price: money,
          userId: uid
      }
      );
};

export default class AddtoWishlistScreen extends React.Component {
    state = {
        name: '',
        price: ''
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
        addItem(this.state.name, this.state.price);
        Alert.alert('Item saved successfully');
      };
    
    static navigationOptions = ({ navigation }) => {
        return {
          title: 'Add Item to Wishlist',
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

    render() {
        return (
          <View>
            <Text style={styles.title}>Add Item</Text>
            <TextInput style={styles.itemInput} onChange={this.handleChangeName} />
            <TextInput style={styles.itemInput} onChange={this.handleChangePrice} />
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