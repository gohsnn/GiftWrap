import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  Text,
  StatusBar,
  StyleSheet,
  View,
  Icon,
  TouchableOpacity
} from 'react-native';
import { TouchableHighlight, FlatList } from 'react-native-gesture-handler';
import ItemComponent from '../components/ItemComponent'
import firebase from 'react-native-firebase';
import { GraphRequest, GraphRequestManager, AccessToken } from 'react-native-fbsdk';

const db = firebase.database();

var user, userId, itemsRef, accessData;

export default class WishScreen extends React.Component {
  
  state = {
    items: []
  }

  //to store user's birthday in overall database
  async FBGraphRequest(fields, callback) {
    const accessData = await AccessToken.getCurrentAccessToken();
    // Create a graph request asking for user information
    const infoRequest = new GraphRequest('/me', {
      accessToken: accessData.accessToken,
      parameters: {
        fields: {
          string: fields
        }
      }
    }, callback.bind(this));
    // Execute the graph request created above
    new GraphRequestManager().addRequest(infoRequest).start();
    // alert(accessData.getUserId());
  };


 async FBLoginCallback(error, result) {
  if (error) {
    this.setState({
      showLoadingModal: false,
      notificationMessage: I18n.t(welcome.FACEBOOK_GRAPH_REQUEST_ERROR)
    });
  } else {
    accessData = await AccessToken.getCurrentAccessToken();
    userId = accessData.getUserId();
    const res = (result.birthday).split('/', 4);
    const mmdd = res[0] + res[1];
    // alert(JSON.stringify(mmdd))
    return db.ref('users/' + 'birthdays/' + userId).set(
      {
        date: mmdd,
      }
    );
  }
}


  async componentDidMount() {
    user = firebase.auth().currentUser;
    accessData = await AccessToken.getCurrentAccessToken();
    userId = accessData.getUserId();
    itemsRef = db.ref('users/' + userId + '/' + 'wishlist');
    itemsRef.on('value', snapshot => {
      let data = snapshot.val();
      if (data) {
        let items = Object.values(data);
        this.setState({ items });
      } 
    });
    this.FBGraphRequest('birthday', this.FBLoginCallback);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Wishlist',
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
        width: '110%',
        
      },
      headerRight:(
      // <Button
      // color = '#ed5f56'
      // title= "+"
      // onPress={() => navigation.navigate('Add')}
      // />),
      <TouchableOpacity
        style={styles.button}
        underlayColor="red"
        onPress={() => navigation.navigate('Add')}
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>),
    }
  };

  //with flatlist version
  render() {
    return (
      <View style={{flex: 1, marginHorizontal: 21,}}>
        {this.state.items.length > 0 ? (
          <List>
            <FlatList
              renderItem = {({item}) =>
              <ItemComponent item = {item}/>}
              keyExtractor={(item, index) => index}
            />
          </List>
        
        ) : (
          <Text>Nothing to buy yet</Text> 
        )}
      </View>
    );
  }

  //without flatlist version
  /*
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {this.state.items.length > 0 ? (
          <ItemComponent items={this.state.items} disableDeleteButton = {false} />
        ) : (
            <Text>No items</Text>
          )}

      </View>
    );
  } */
}

const styles = StyleSheet.create({
  buttonText: {
    fontFamily: 'Nunito-Light',
    fontSize: 28,
    color: '#ED5F56',
    marginRight: 21,
    marginBottom: 8
  }
});
