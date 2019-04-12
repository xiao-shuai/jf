import React,{Component} from 'react'
import {View,Text,TouchableOpacity,Image
    ,ScrollView,StyleSheet,
    ActivityIndicator,
    RefreshControl
} from 'react-native'
import {inject,observer} from 'mobx-react'
import {observable} from 'mobx'
import { SafeAreaView } from 'react-navigation';
import { Divider,Overlay } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient';
import { qj } from '../../config/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Parse from 'parse/react-native'
class  About extends Component{

    constructor(props){
        super(props)
        this.state={
           isloading:true,
        }

    }

 componentWillMount(){
    let About=Parse.Object.extend('about')
    let  data = new Parse.Query(About)
     data.find().then(res=>{
         console.log('res---!',res)
         this.setState({
             isloading:false,
             sj:res[0].attributes.data,
             
         })
     }).catch(err=>{
       console.log('err111',err)
     })
    // fetch('https://easy-mock.com/mock/5ca5a80e9f527b3ab6e14b1d/jf/hometab3')
    // .then(res=>res.json())
    // .then(res=>{
    //    this.setState({isloading:false}) 
    // }

    // ).catch(err=>{
        
    // })   
 }
    
    render(){
       
        if(this.state.isloading){
            return(
                <View style={{width:qj.w,height:qj.h*.8,alignItems:'center',justifyContent:'center'}}>
                <ActivityIndicator  size={'large'} color={qj.themeColor}/>
                 </View>
            )
        }
        console.log('sjsjs',this.state.sj)
        return(
            <SafeAreaView style={{flex:1,alignItems:'center'}}>
              
            <ScrollView contentContainerStyle={{alignItems:'center'}}>
                <View style={{width:qj.w,alignItems:'center'}}>
                <Image source={require('../../img/logojf.png')} style={{
                    width:qj.w*.6,height:qj.w*.6,marginTop:10
                }}/>
                <Text style={{fontSize:20,color:qj.themehui2}}>v 1.0</Text>
                </View>
                {/*  */}
                <Divider style={{width:'100%',height:15,backgroundColor:qj.themehui,marginTop:20}}/>
               <View style={{width:qj.w*.95,marginTop:20,}}>
                   {
                    this.state.sj.map((item,index)=>{
                return(
                    <View style={{flexDirection:'row',
                    justifyContent:'space-between',
                    borderBottomColor:qj.themehui,
                    // marginTop:10,
                    padding:10,
                    borderBottomWidth:1}}>
                      <View style={{flexDirection:'row',}}>
                          <Ionicons name={item.icon} size={25} color={qj.themehui2}/>
                          <Text style={{fontSize:18,marginLeft:15,color:qj.themehui2}}>{item.name}</Text>
                      </View>
                      <Text style={{fontSize:16,color:qj.themehui2}}>{item.phone}</Text>
                    </View>
                )
                    })
                   }
                </View> 
            </ScrollView>
            
              
            </SafeAreaView>
        )
    }

}
const ys=StyleSheet.create({

})
export default About