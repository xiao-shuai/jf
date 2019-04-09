import React,{Component} from 'react'
import {View,Text,TouchableOpacity,Image
    ,ScrollView,StyleSheet,
    ActivityIndicator,
    RefreshControl,TextInput
} from 'react-native'
import {inject,observer} from 'mobx-react'
import {observable} from 'mobx'
import { SafeAreaView } from 'react-navigation';
import { Divider,Overlay } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient';
import { qj } from '../../config/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast, {DURATION} from 'react-native-easy-toast'

class  FeedBack extends Component{

    constructor(props){
        super(props)
        this.state={
           isloading:true
        }

    }

 componentWillMount(){
    fetch('https://easy-mock.com/mock/5ca5a80e9f527b3ab6e14b1d/jf/hometab3')
    .then(res=>res.json())
    .then(res=>{
       this.setState({isloading:false}) 
    }

    ).catch(err=>{
        
    })   
 }
    sub=()=>{
        console.log('77',this.state.text)
       if(this.state.text==undefined){
        this.refs.toast.show('Please enter the content',1000)
       }else{
           fetch('https://easy-mock.com/mock/5ca20f900aa7bf50eb36bcb0/baoxiu/order',{
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            
           }).then(res=>res.json()).then(res=>{
             this.refs.toast.show('Submitted successfully',1000)
              this.setState({text:undefined})
           }).catch(err=>{
                console.log('err--!',err)
           })
       }
    }
    render(){
        if(this.state.isloading){
            return(
                <View style={{width:qj.w,height:qj.h*.8,alignItems:'center',justifyContent:'center'}}>
                <ActivityIndicator  size={'large'} color={qj.themeColor}/>
                 </View>
            )
        }
        return(
            <SafeAreaView style={{flex:1,alignItems:'center'}}>
         <ScrollView>
            <View style={ys.in}>
                <TextInput multiline={true} style={{fontSize:18,height:'100%'}} onChangeText={(text)=>{
                  this.setState({text})
                }}/>
            </View>
            <TouchableOpacity style={ys.sub} onPress={()=>{
                 this.sub()
            }}>
              <Text style={{fontSize:25,color:'white'}}>submit</Text>
            </TouchableOpacity>
         </ScrollView>
 <Toast

ref="toast"

position='top'

opacity={0.8}

/>
            </SafeAreaView>
        )
    }

}
const ys=StyleSheet.create({
    in:{
        width:qj.w*.95,marginTop:20,backgroundColor:qj.themehui,height:qj.h*.26,padding:10,borderRadius:5
    },
     sub:{
        width:'100%',height:qj.h*.05,backgroundColor:qj.themeColor,marginTop:20,borderRadius:5,alignItems:'center',justifyContent:'center'
     },
})
export default FeedBack