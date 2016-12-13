/**
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

var dishDatas = require('./json/dish.json').dish;

var _navigator;

var dishsChoose = [];

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
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2 || r1.check != r2.check
        });
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
                <View style={commonStyle.basePage}>
                    <View>
                        <Text style={commonStyle.titleText}>
                            选择菜肴
                        </Text>
                        <TouchableOpacity style={commonStyle.titleRowRight} onPress={() => {
                            this.pressSure();
                        }}>
                            <Text style={commonStyle.titleRowRightText} >
                                提交
                            </Text>
                        </TouchableOpacity>
                    </View>

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

    renderRow: function (rowData, sectionID: number, rowID: number,
                         highlightRow: (sectionID: number, rowID: number) => void) {
        var imgSource = IMAGE_URLS[rowID];
        var checkSource;
        if (rowData.check) {
            checkSource = CHECK_URLS[1];
        } else {
            checkSource = CHECK_URLS[0];
        }

        return (
            <TouchableOpacity style={styles.rowStyle} onPress={() => {
                this.pressRow(rowID);
            }}>
                <View>
                    <View style={styles.rowStyle}>
                        <Image style={styles.thumb} source={imgSource}/>
                        <Text style={styles.text}>
                            {rowData.name}
                        </Text>
                        <Image style={styles.thumbCheck} source={checkSource}/>
                    </View>
                </View>
            </TouchableOpacity>
        );
    },

    genRows: function (pressData: {[key: number]: boolean}): Array<string> {
        return dishDatas;
    },


    pressRow(rowID: number) {
        this._pressData[rowID] = !this._pressData[rowID];
        dishDatas[rowID].check = !dishDatas[rowID].check;

        if(dishDatas[rowID].check){
            dishsChoose.push(dishDatas[rowID]);
        }else{
            dishsChoose.splice(dishDatas[rowID]);
        }

        dishDatas = JSON.parse(JSON.stringify(dishDatas));
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.genRows(this._pressData))
        });
    },

    pressSure() {
        var sum = 0;
        for(var i = 0;i<dishsChoose.length;i++){
            sum += dishsChoose[i].price;
        }

        var alertMessage = "共" + dishsChoose.length + "个菜," + "总价为:" + sum;;
        Alert.alert(
            '确认菜单',
            alertMessage,
            [
                {text: '取消', onPress: () => console.log('Cancel Pressed!')},
                {text: '确定', onPress: () => ToastAndroid.show("提交成功",ToastAndroid.LONG)},
            ]
        );
    },
});

var IMAGE_URLS = [
    require('./images/dish.png'),
    require('./images/dish.png'),
    require('./images/dish.png'),
    require('./images/dish.png'),
    require('./images/dish.png'),
    require('./images/dish.png'),
    require('./images/dish.png'),
];

var CHECK_URLS = [
    require('./images/uncheck.png'),
    require('./images/check.png'),
];

var styles = StyleSheet.create({
    rowStyle: {
        alignItems: 'center', //这里要注意，如果每个Item都在外层套了一个 Touchable的时候，一定要设置Touchable的宽高
        width: width / 3,
        height: 120,
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
    thumbCheck: {
        width: 15,
        height: 15,
        marginTop: -8,
    },
    text: {
        marginBottom: 10,
        marginTop: 5
    },
    titleRow: {
        flexDirection: "row",
        //是否换行
        // flexWrap:"nowrap",
        width: width,
        justifyContent: "center",
    },
});

module.exports = DishChooseView;
