/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React, {Component} from 'react';
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
var DishChooseView = require('./DishChoose.js');
var GridView = require('./GridView.js');

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
var DishStylesView = React.createClass({
    statics: {
        title: '<ListView>',
        description: 'Performant, scrollable listStyle of data.'
    },

    getInitialState: function () {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            dataSource: ds.cloneWithRows(this._genRows({})),
        };
    },

    configureScenceAndroid: function () {
        return Navigator.SceneConfigs.PushFromRight;
    },

    componentWillMount: function () {
        this._pressData = {};
    },

    renderSceneAndroid: function(route, navigator){
        _navigator = navigator;
        if(route.id === 'main'){
            return (
                <View style={commonStyle.basePage}>
                    <Text style={commonStyle.titleText}>
                        选择菜谱
                    </Text>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this._renderRow}
                        renderSeparator={this._renderSeperator}
                    />
                </View>
            );
        }

        if(route.id === 'dishChoose'){
            return (
                <DishChooseView navigator={navigator} route={route} />
                // <GridView navigator={navigator} route={route} />
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
                initialRoute={{ title: 'Main', id:'main'}}
                configureScence={{ configureScence }}
                renderScene={renderScene}
            />
        )
    },

    _renderRow: function (rowData: string, sectionID: number, rowID: number,
                          highlightRow: (sectionID: number, rowID: number) => void) {
        var rowHash = Math.abs(hashCode(rowData));
        var imgSource = IMAGE_URLS[rowHash % IMAGE_URLS.length];
        return (
            <TouchableOpacity onPress={() => {
                this._pressRow(rowID);
            }}>
                <View>
                    <View style={styles.rowStyle}>
                        <Image style={styles.thumb} source={imgSource}/>
                        <Text style={styles.text}>
                            {rowData}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    },

    _genRows: function (pressData: {[key: number]: boolean}): Array<string> {
        var dataBlob = [];
        dataBlob.push('全部');
        dataBlob.push('湘菜');
        dataBlob.push('川菜');
        dataBlob.push('上海菜');
        dataBlob.push('东北菜');
        return dataBlob;
    },

    _pressRow: function (rowID: number) {
        _navigator.push({title:'DishChoose',id:'dishChoose'})
        this._pressData[rowID] = !this._pressData[rowID];
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(
                // _navigator.push({title:'DishChoose',id:'dishChoose'})
                this._genRows(this._pressData)
            )
        });
    },

    _renderSeperator: function (sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
        return (
            <View
                key={`${sectionID}-${rowID}`}
                style={{
                    height: adjacentRowHighlighted ? 4 : 1,
                    backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
                }}
            />
        );
    }
});

var IMAGE_URLS = [
    require('./images/dish.png'),
    require('./images/dish.png'),
    require('./images/dish.png'),
    require('./images/dish.png'),
    require('./images/dish.png'),
    require('./images/dish.png'),
];

/* eslint no-bitwise: 0 */
var hashCode = function (str) {
    var hash = 15;
    for (var ii = str.length - 1; ii >= 0; ii--) {
        hash = ((hash << 5) - hash) + str.charCodeAt(ii);
    }
    return hash;
};

var styles = StyleSheet.create({
    rowStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "center",
        padding: 10,
    },
    thumb: {
        width: 64,
        height: 64,
    },
    text: {
        flex: 1,
        marginLeft: 10
    },
});

module.exports = DishStylesView;
