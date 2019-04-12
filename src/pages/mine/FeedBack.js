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
import Parse from 'parse/react-native'

class  FeedBack extends Component{

    constructor(props){
        super(props)
        this.state={
           isloading:true
        }

    }

 componentWillMount(){
    let feed=Parse.Object.extend('feed')
    let  data = new Parse.Query(feed)
    
     data.find().then(res=>{
         console.log('res---!',res)
         this.setState({
             isloading:false,
             sj:res,
             
         })
     }).catch(err=>{
        console.log("err00",err)
     })
 }
    sub=()=>{
        console.log('77',this.state.text)
       if(this.state.text==undefined){
        this.refs.toast.show('Please enter the content',1000)
       }else{
       
        let feed = Parse.Object.extend('feed')
        let a=new feed()
         a.set("content",[{"content":this.state.text}])
         a.save().then(res=>{
          console.log('okok',res)
          this.refs.toast.show('Feedback success！',1000)
         }

         ).catch(err=>{
            console.log('err--',err)
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
        // console.log('sjsj',this.state.sj.content)
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