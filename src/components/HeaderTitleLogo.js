import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet,
} from 'react-native';

class HeaderTitleLogo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../img/logo.png')} style={styles.logo} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
  logo: {
    marginLeft: 40,
    width: 143,
    height: 29,
  },
});

export default HeaderTitleLogo;
