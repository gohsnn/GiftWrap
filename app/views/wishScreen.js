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
import { SwipeListView, SwipeRow, Animated } from 'react-native-swipe-list-view';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const db = firebase.database();

var user, userId, itemsRef, accessData;

export default class WishScreen extends React.Component {
  
  state = {
    items: [],
    delCount: 0
  }

  //rowTranslateAnimatedValues = {};

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
/*
        this.items.forEach((_, i) => {
        this.rowTranslateAnimatedValues['${i}'] = new Animated.Value(1);
  
      }); */
      } 
    });
    this.FBGraphRequest('birthday', this.FBLoginCallback);
  }

  
  onSwipeValueChange = (swipeData) => {
    const { key, value } = swipeData;
    // 375 or however large your screen is (i.e. Dimensions.get('window').width)
    if (value < -375 && !this.animationIsRunning && this.state.delCount == 0) {
      this.animationIsRunning = true;
      //this.setState({ delCount: -1 }); 
      this.handleDelete(key);
        // Animated.timing(this.rowTranslateAnimatedValues[key], { toValue: 0, duration: 200 }).start(() => {
        //   alert(key);
          // const newData = [...this.state.items];
          //   const prevIndex = this.state.items.findIndex(item => item.key === key);
          //   newData.splice(prevIndex, 1);
          //   this.setState({items: newData});
            //plan is to call handleDelete on that item using its key 
        this.animationIsRunning = false;
          };
        //this.setState({ delCount: 0 });
    }
   

  handleDelete(key) {
    firebase.database().ref('users/' + userId + '/' + 'wishlist/' + key).remove();
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
        width: '107%',
        
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
      <View style={{marginHorizontal: 21,}}>
        {this.state.items.length > 0 ? (
           <SwipeListView
            useFlatList
            data={this.state.items}
            renderItem = {({item}) =>
            <ItemComponent item = {item}/>}
            keyExtractor={(item, index) => index}
            renderHiddenItem={(data, rowMap) => (
              <View styles={styles.backText}>
                <Text></Text>
                {/* <Text style={styles.backText}>Delete</Text> */}
                <FontAwesomeIcon style={styles.icon}  icon={ faTrash } size={22} color={'#ED5F56'}/>
                </View>
            )}
            //leftOpenValue={75}
            rightOpenValue={-375}
            onSwipeValueChange={this.onSwipeValueChange}
            />
          /*
          <SwipeListView
            useFlatList
            data={this.state.items}
            renderItem = {({item}) => (
              <Animated.View style={[styles.rowFrontContainer, 
                {
                  height: this.rowTranslateAnimatedValues[data.item.key].interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 50],
                })               
               }                
              ]}>
                <ItemComponent item = {item}/>
              </Animated.View>
                
            )} 

            */

        ) : (
          <Text style={styles.fillerText}> Tap + to add your first Wishlist Item!</Text> 
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonText: {
    fontFamily: 'Nunito-Light',
    fontSize: 28,
    color: '#ED5F56',
    marginRight: 21,
    marginBottom: 8
  },
  backText: {
    fontSize: 15,
    alignSelf: 'flex-end',
    alignItems: 'baseline',
    marginTop: 10,
    color: '#ED5F56',
  },
  icon: {
    alignSelf: 'flex-end',
    alignItems: 'baseline',
    marginTop: 5
  },
  fillerText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 15,
    alignSelf: 'center',
    marginTop: 20,
  }
});
