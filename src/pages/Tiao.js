import React,{Component} from 'react'
import {View,Text,TouchableOpacity,Image
    ,ScrollView,StyleSheet,
    ActivityIndicator,
    RefreshControl,
    ImageBackground,
    TextInput,
    AsyncStorage,
    ProgressViewIOS
} from 'react-native'
import {inject,observer} from 'mobx-react'
import {observable} from 'mobx'
import { SafeAreaView ,NavigationActions,StackActions} from 'react-navigation';
import { Divider,Overlay } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient';
import { qj } from '../config/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast, {DURATION} from 'react-native-easy-toast'
import Parse from 'parse/react-native'
import { WebView } from "react-native-webview";

const  resetAction = StackActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'Home'})
    ]
})
class Tiao extends Component{
    constructor(props){
        super(props)
        this.state={
            progress:0,
         
        }
    }

  componentWillMount(){
    
  }

    render(){
      
        const wz=this.props.navigation.getParam('wz')
         console.log('datawz!!!!',wz)
        return(
            <SafeAreaView style={{flex:1}}>
                              {
                     this.state.progress!==1&&
                 <ProgressViewIOS 
                  progress={this.state.progress}
                  progressTintColor={'red'}
                 />
                 }
                <WebView source={{uri:wz}} 
                  //设置进度 progress值为0～1
                  onLoadProgress={({nativeEvent}) => this.setState(
                    {progress: nativeEvent.progress}
                )} 
                />
            </SafeAreaView>
        )
    }

}
export default Tiao