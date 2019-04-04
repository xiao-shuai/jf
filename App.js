/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,YellowBox,AsyncStorage} from 'react-native';
import {Provider} from 'mobx-react'
import store from './src/mobx/index'
import AllStack from './src/config/navigation'
import Parse from 'parse/react-native'
function setup() {
  Parse.setAsyncStorage(AsyncStorage)
  Parse.initialize('psjfapp');
  Parse.serverURL =  'http://jinfeng.ANDCORPTEACH.COM:10018/parse'
}
setup()

console.disableYellowBox=true
export default class App extends Component{

  render() {
    return (
<Provider {...store}>
<AllStack />
</Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
