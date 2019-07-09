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
} from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import {
//   createStackNavigator,
//   createSwitchNavigator,
//   createBottomTabNavigator,
//   createAppContainer
// } from 'react-navigation';
import { TouchableHighlight } from 'react-native-gesture-handler';
import ItemComponent from '../components/ItemComponent'
import firebase from 'react-native-firebase';
import { GraphRequest, GraphRequestManager, AccessToken } from 'react-native-fbsdk';

const db = firebase.database();

var user, userId, itemsRef, accessData;

export default class WishScreen extends React.Component {
  
  state = {
    items: []
  }

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
    const ddmm = res[1] + res[0];
    return db.ref('users/' + 'birthdays/' + userId).set(
      {
        date: ddmm,
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
        //paddingHorizontal: 8,
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
      <Button
      color = '#ed5f56'
      title= "+"
      onPress={() => navigation.navigate('Add')}
      />),

      /*
      headerRight: (
        //add item to wishlist - assume to Settings
        //problem: button requires a string for the title
        /*
        <Button 
        transparent
        onPress={() => this.props.navigation.navigate('Settings')}
        title="+"
        /> */
      /*
      <Button
        onPress={() => this.props.navigation.navigate('Settings')}
        icon={{name: 'plus-square', type: 'font-awesome'}}
        title='' 
      />
      /*
      <TouchableHighlight onPress={() => this.props.navigation.navigate('Settings')}>
        <Icon
          type="FontAwesome"
          name="plus-square"
          style={{ color: "white" }}
        />
      </TouchableHighlight> 
    ), */
    }
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {this.state.items.length > 0 ? (
          <ItemComponent items={this.state.items} disableDeleteButton = {false} />
        ) : (
            <Text>No items</Text>
          )}

        {/* <Button
          title="Add item"
          onPress={() => this.props.navigation.navigate('Add')}
        /> */}

      </View>
    );
  }
}

//   module.export = WishList;