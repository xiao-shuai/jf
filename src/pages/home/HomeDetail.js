import React,{Component} from 'react'
import {View,Text,TouchableOpacity,Image
    ,ScrollView,StyleSheet,ActivityIndicator} from 'react-native'
import {inject,observer} from 'mobx-react'
import {observable} from 'mobx'
import { SafeAreaView } from 'react-navigation';
import { Divider } from 'react-native-elements'

class  HomeDetail extends Component{

    constructor(props){
        super(props)
        this.state={}

    }
  
    render(){
        return(
            <SafeAreaView style={{flex:1}}>

            </SafeAreaView>
        )
    }

}
const ys=StyleSheet.create({

})
export default HomeDetail


