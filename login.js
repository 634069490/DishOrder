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

import commonStyle from './styles/commonStyles';

var _navigator;
var DishStylesView = require('./DishStylesChoose.js');

var LoginView = React.createClass({

    getInitialState: function () {
        return {};
    },

    /***
     * 转场动画和手势，在/node_modules/react-native/Libraries/CustomComponents/Navigator/NavigatorSceneConfigs.js可以找到其他动画的定义
     * @returns {NavigatorSceneConfigs.FadeAndroid|{gestures, animationInterpolators}}
     */
    configureScenceAndroid: function () {
        return Navigator.SceneConfigs.PushFromRight;
    },

    renderSceneAndroid: function (route, navigator) {
        _navigator = navigator;
        if (route.id === 'main') {
            return (
                <View>
                    <Text style={commonStyle.titleText}>
                        登陆
                    </Text>

                    <Text style={styles.baseText}>
                        请输入桌牌号:
                    </Text>

                    <TextInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 0, margin: 20}}
                        onChangeText={(text) => this.setState({text})}
                        value={this.state.text}
                    />

                    <TouchableOpacity onPress={ () => _navigator.push({title: 'DishStylesChoose', id: 'dishStylesChoose'}) }
                                      style={ commonStyle.button }>
                        <Text style={commonStyle.buttonTxt}>进入</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        if (route.id === 'dishStylesChoose') {
            return (
                <DishStylesView navigator={navigator} route={route}/>
            );
        }
    },

    render: function () {
        var renderScene = this.renderSceneAndroid;
        var configureScence = this.configureScenceAndroid;
        return (
            <Navigator
                debugOverlay={false}
                initialRoute={{title: 'Main', id: 'main'}}
                configureScence={{configureScence}}
                renderScene={renderScene}
            />
        );
    }
});

var styles = StyleSheet.create({

    baseText: {
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        fontFamily: 'Cochin',
    },

    loginText: {
        margin: 20,
        fontSize: 20,
    },
});

module.exports = LoginView
