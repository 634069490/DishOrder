/**
 * Sample React Native App
 * https://github.com/hanks-zyh
 */

'use strict';
import React, { Component } from 'react';

import {
  AppRegistry,
} from 'react-native';

// var indexPage = require('./index.js');
var indexPage = require('./login.js');

AppRegistry.registerComponent('AwesomeProject', () => indexPage);
