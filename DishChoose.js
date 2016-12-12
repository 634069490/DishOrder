/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React, {Component} from 'react';
//noinspection JSUnresolvedVariable
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
    TouchableOpacity,
    TouchableHighlight,
    ToastAndroid,
    Alert,
    BackAndroid,
    Navigator,
} from 'react-native';

import commonStyle from './styles/commonStyles';
var Dimensions = require('Dimensions');

var {width} = Dimensions.get('window');

var _navigator;

BackAndroid.addEventListener('hardwareBackPress', function () {
    if (_navigator == null) {
        return false;
    }
    if (_navigator.getCurrentRoutes().length === 1) {
        return false;
    }
    _navigator.pop();
    return true;
});

//noinspection JSAnnotator
var DishChooseView = React.createClass({

    getInitialState: function () {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            dataSource: ds.cloneWithRows(this.genRows({})),
        };
    },

    componentWillMount: function () {
        this._pressData = {};
    },

    //renderSeparator={this._renderSeperator}
    renderSceneAndroid: function (route, navigator) {
        _navigator = navigator;
        if (route.id === 'main') {
            return (
                <View>
                    <Text style={commonStyle.titleText}>
                        选择菜谱
                    </Text>

                    <ListView contentContainerStyle={styles.listStyle}
                              dataSource={this.state.dataSource}
                              renderRow={this.renderRow}
                              showsVerticalScrollIndicator={false}
                              showsHorizontalScrollIndicator={false}
                    />
                </View>
            );
        }

        if (route.id === 'dishChoose') {
            return (
                <HttpView navigator={navigator} route={route}/>
            );
        }
    },

//renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
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
        )
    },

    renderRow: function (rowData: string, sectionID: number, rowID: number,
                         highlightRow: (sectionID: number, rowID: number) => void) {
        var imgSource = IMAGE_URLS[rowID];
        return (
            <TouchableHighlight style={styles.rowStyle} onPress={() => {
                //this.pressRow(rowID);
            }}>
                <View>
                    <View style={styles.rowStyle}>
                        <Image style={styles.thumb} source={imgSource}/>
                        <Text style={styles.text}>
                            {rowData}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    },

    genRows: function (pressData: {[key: number]: boolean}): Array<string> {
        var dataBlob = [];
        dataBlob.push('全部');
        dataBlob.push('湘菜');
        dataBlob.push('川菜');
        dataBlob.push('上海菜');
        dataBlob.push('东北菜');
        return dataBlob;
    },

    pressRow: function (rowID: number) {
        this._pressData[rowID] = !this._pressData[rowID];
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(
                _navigator.push({title: 'DishChoose', id: 'dishChoose'})
                // this.genRows(this._pressData)
            )
        });
    },
});

var IMAGE_URLS = [
    require('./images/app_icon.png'),
    require('./images/app_icon.png'),
    require('./images/app_icon.png'),
    require('./images/app_icon.png'),
    require('./images/app_icon.png'),
    require('./images/app_icon.png'),
];

var styles = StyleSheet.create({
    rowStyle: {
        alignItems: 'center', //这里要注意，如果每个Item都在外层套了一个 Touchable的时候，一定要设置Touchable的宽高
        width: width / 3,
        height: 103,
        padding: 5,
    },
    listStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    thumb: {
        width: 64,
        height: 64,
    },
    text: {
        marginBottom: 10,
        marginTop: 5
    },

});

module.exports = DishChooseView;
