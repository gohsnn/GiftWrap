import React, { Component } from 'react';  
import { View, Text, StyleSheet } from 'react-native';  
import PropTypes from 'prop-types';
//this component is for items in the organiser
export default class OrgComponent extends Component {  
  static propTypes = {
    items: PropTypes.array.isRequired
  };

  render() {
    return (
      <View style={styles.itemsList}>
        {this.props.items.map((item, index) => {
          return (
              //NEED TO ADD FIELDS FOR EVENT, DATE, PERSON
            <View key={index}>
              <Text style={styles.itemtext}>{item.giftee}</Text>
              <Text style={styles.itemtext}>{item.name}</Text>
              <Text style={styles.itemtext}>${item.price}</Text>
              <Text style={styles.itemtext}>{item.event}</Text>

            </View>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({  
  itemsList: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  itemtext: {
    fontSize: 12,
    fontWeight: 'normal',
    textAlign: 'center'
  }
});