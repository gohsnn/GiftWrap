import React, { Component } from 'react';

import {
	Text,
	View,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import ShareExtension from 'rn-extensions-share';
import cheerio from 'react-native-cheerio';
import firebase from 'react-native-firebase';
import { AccessToken } from 'react-native-fbsdk';

const db = firebase.database();

export default class Share extends Component {
    constructor() {
        super();
        this.state = {
            text: 'Saving...'
        };
    }
    
    async componentWillMount() {
        user = firebase.auth().currentUser;
        accessData = await AccessToken.getCurrentAccessToken();
        this.setState({
          userId: accessData.getUserId(),
          name: 'blank-name',
          price: 'blank-price', 
        });
    }

	async componentDidMount() {
		const { type, value } = await ShareExtension.data(); // type = 'media' | 'text'
        if (value.indexOf("lazada") != -1) {
            await this.loadGraphicCards(value);
            this.setState({text: 'Item saved successfully.'});
            this.addItem(this.state.name, this.state.price);
        } else {
            this.setState({text: 'ShareGift only works with Lazada.'});
        }
        
	}

	async loadGraphicCards(searchUrl) {
		// const searchUrl = `https://www.lazada.sg/products/english-version-2019-newest-xiaomi-mi-band-4-i333152882-s723204887.html`;
		// const searchUrl = `https://www.lazada.sg/products/summer-men-workwear-shorts-korean-style-large-size-loose-shorts-pure-cotton-multi-pockets-shorts-boutique-pure-cotton-i208730101-s316431413.html?spm=a2o42.home.just4u.4.69cc46b504ZEDz&scm=1007.17519.116426.0&pvid=32c996a0-d260-43bc-a28b-96f731cbd818&clickTrackInfo=tcExpIds%3A251%3Btcsceneid%3AHPJFY%3Bbuyernid%3A10786d13-e360-47ba-919f-a79bfaeba1cb%3Btcbid%3A8%3Btcboost%3A0%3Bpvid%3A32c996a0-d260-43bc-a28b-96f731cbd818%3B`;
		const response = await fetch(searchUrl);   // fetch page
		const htmlString = await response.text();  // get response text
		const $ = cheerio.load(htmlString);
		const giftName = $('title').text();
        const giftPrice = this.priceSearch(htmlString);
        this.setState({
            name: giftName,
            price: giftPrice.toString(),
            url: searchUrl
        });
        // console.log(giftName);
      }
      
      addItem(item, money) {
        let userId = this.state.userId;
        let newItemKey = db.ref('users/' + userId + '/' + 'wishlist').push(
         {
           name: 'blank-name',
           price: 'blank-price',
           key: 'blank-key'
         }
       ).key;
       return db.ref('users/' + userId + '/' + 'wishlist' + '/' + newItemKey).update(
         {
           name: item,
           price: money,
           key: newItemKey,
           productUrl: this.state.url,
           buyer: undefined
         }
       );
     };
	
	  priceSearch(htmlString) {
		let priceIndex = htmlString.search("pdt_price") + 14;
		let discountIndex = htmlString.search("pdt_discount") + 18;
		let originalPrice =  parseFloat(htmlString.slice(priceIndex, priceIndex+5));
		let discount =  parseInt(htmlString.slice(discountIndex, discountIndex+2));
		let res = originalPrice; 
		if (isNaN(discount)) {
		  res = originalPrice;
		} else {
		  res = originalPrice*((100 - discount)/100);
		}
		return Math.ceil(res);
	  }

	  onClose() {
		  ShareExtension.close();
	  }

	render() {
		return ( 
                <View style={styles.container}>
                    <Text style = {styles.text}>{this.state.text}</Text>
					<TouchableOpacity style = {styles.button} onPress = {this.onClose}>
						<Text style = {styles.buttonText}>Close</Text>
					</TouchableOpacity>

			    </View>
			
		);
	}
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        // borderColor: '#ED5F56', 
        // borderWidth: 1, 
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    text: {
        fontFamily: 'Nunito-SemiBold',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'normal',
        color: '#ED5F56',
    },
    button: {
        height: 45,
        flexDirection: 'row',
        backgroundColor: '#F6F6F6',
        borderColor: '#F6F6F6',
        borderWidth: 1,
        borderRadius: 5,
        marginHorizontal: 21,
        marginVertical: 8,
        alignSelf: 'stretch',
        justifyContent: 'center'
      },
      buttonText: {
        fontFamily: 'Nunito-Regular',
        textAlign: 'center',
        fontSize: 15,
        color: '#ED5F56',
        marginTop: 7,
        // justifyContent: 'center',
      }
  });
