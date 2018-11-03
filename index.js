// import { AppRegistry } from 'react-native';
// import MyMap from './my_map';
//
// AppRegistry.registerComponent('Tour2017', () => MyMap);


import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { TabNavigator, DrawerNavigator } from 'react-navigation';
import Feather from 'react-native-vector-icons/Feather';
// import tabNav from './tabnav';
import mapScreen from './map_screen';


const drawernav = DrawerNavigator({
    DrawerItem1: {
        // screen: tabNav,
        screen: mapScreen,
        navigationOptions: {
            drawerLabel: "メニュー",
            drawerIcon: ({ tintColor }) => <Feather name="arrow-left" size={24} />
        },
    }
});

AppRegistry.registerComponent('Tour2017', () => drawernav);
