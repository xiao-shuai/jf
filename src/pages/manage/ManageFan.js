import React,{Component} from 'react'
import {View,Text,TouchableOpacity,Image
    ,ScrollView,StyleSheet,ActivityIndicator} from 'react-native'
import {inject,observer} from 'mobx-react'
import {observable} from 'mobx'
import { SafeAreaView } from 'react-navigation';
import { Divider,Overlay } from 'react-native-elements'
import { qj } from '../../config/style';
import Ionicons from 'react-native-vector-icons/Ionicons';

class ManageFan extends Component {
    constructor(props){
        super(props)
        this.state={

        }
    }

    render(){
        return(
            <SafeAreaView style={{flex:1}}>

            </SafeAreaView>
        )
    }

}
export default ManageFan