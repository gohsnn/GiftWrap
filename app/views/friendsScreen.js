import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  Text,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { GraphRequest, GraphRequestManager, AccessToken} from 'react-native-fbsdk';
import firebase from 'react-native-firebase';
// import console = require('console');




export default class FriendsScreen extends React.Component {
  state = {
      friends: [],
      summary: 'bleh'
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
      // alert();
    };


   async FBLoginCallback(error, result) {
    if (error) {
      this.setState({
        showLoadingModal: false,
        notificationMessage: I18n.t(welcome.FACEBOOK_GRAPH_REQUEST_ERROR)
      });
    } else {
      //not using redux but firebase so maybe save it there instead
      this.setState({
        friends: result.friends.data,
        summary: result.friends.summary.total_count
      });
    }
  }

  componentDidMount() {
    this.FBGraphRequest('friends', this.FBLoginCallback);
  }

  static navigationOptions = ({ navigation }) => {
      return {
        title: 'My Friends',
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
        <View style={{ 
          flex: 1, 
          //flexDirection: 'column',
          justifyContent: 'flex-start', 
          alignItems: 'flex-start' }}>
            <Text></Text>
            <Text style={{
              fontSize: 18,
              fontWeight:'bold'}}
            >     Whose wishlist would you like to see?
            </Text>
            <Text>{this.state.email}</Text>
            <Text></Text>
            <Text>      ALL MY FRIENDS</Text>
            <Text>      Not your friends</Text>
        </View>
      );
    }
  }


//   module.export = Friends;