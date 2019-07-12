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
import FriendComponent from '../components/FriendComponent';

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
      // alert(accessData.getUserId());
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

  componentWillMount() {
    this.FBGraphRequest('friends', this.FBLoginCallback);
  }

  static navigationOptions = ({ navigation }) => {
      return {
        title: 'Friends',
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
          flexGrow: 1,
        },
      }
  };
      
  render() {
      return (
        <View style={{ 
          // flex: 1, 
          //flexDirection: 'column',
          // justifyContent: 'flex-start', 
          }}>
            {this.state.friends.length > 0 ? (
          <FriendComponent friends={this.state.friends}/>
        ) : (
            <Text>Time to get some friends</Text>
          )}
            <Text></Text>
        </View>
      );
    }
  }


//   module.export = Friends;