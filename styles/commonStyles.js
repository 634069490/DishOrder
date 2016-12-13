/**
 * Sample React Native App
 * https://github.com/hanks-zyh
 */

'use strict';
import React, {Component} from 'react';

import  {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Navigator,
} from 'react-native';

var commonStyle = StyleSheet.create({
    button: {
        height: 45,
        margin: 20,
        backgroundColor: '#cad6c5',
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonTxt: {
        color:"#ffffffff"
    },

    baseText: {
        marginLeft: 20,
        marginRight: 20,
        fontFamily: 'Cochin',
    },
    titleText: {
        padding: 10,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: "center",
        color:"#ffffffff",
        backgroundColor:"#a9ea00",
    },
    loginText: {
        margin: 20,
        fontSize: 20,
    },
});

export default commonStyle;