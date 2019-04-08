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

class  Mine extends Component{

    constructor(props){
        super(props)
        this.state={
           isloading:true
        }
        this.option=[
            {
             title:'Version update'
            },
            {
             title:'About us'
            },
            {
             title:'Feedback'
            }
        ]

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
              <LinearGradient colors={['#74ebd5', '#ACB6E5']} style={{width:qj.w,height:qj.h*.1,
                alignItems:'center',justifyContent:'center'}}>
              <Text style={{fontSize:18,color:qj.themebai,fontWeight:'600'}}>Energy Internet big data platform</Text>
              <Text style={{marginTop:8,color:'white'}}>----- Logged account -----</Text>
              </LinearGradient>
              {/* under */}
            
              <View style={{width:qj.w*.95,marginTop:10,}}>
                  {
                      this.option.map((item,index)=>{
                       return(
             
                      <TouchableOpacity style={{
                          flexDirection:'row',
                          backgroundColor:qj.themehui,
                          marginTop:10,
                          justifyContent:'space-between',
                          height:qj.h*.06,
                          borderRadius:8,
                          alignItems:'center',padding:15
                        
                      }}>
                          <Text style={{fontSize:20,color:'white'}}>{item.title}</Text>
                          <Ionicons name={'ios-arrow-forward'} size={25} color={qj.themehui2}/>
                      </TouchableOpacity>
                      
                       )
                      })
                  }
              </View>
              {/* btn */}
              <TouchableOpacity style={{width:qj.w*.95,
              backgroundColor:qj.themehui,height:qj.h*.07,
              marginTop:20,
              borderRadius:8,
              alignItems:'center',
              justifyContent:'center'
            }} 
              onPress={()=>{

              }}>
                <Text style={{fontSize:20,fontWeight:'600',color:'white'}}>Log out</Text>
              </TouchableOpacity>

            </SafeAreaView>
        )
    }

}
const ys=StyleSheet.create({

})
export default Mine


