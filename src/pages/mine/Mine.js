import React,{Component} from 'react'
import {View,Text,TouchableOpacity,Image
    ,ScrollView,StyleSheet,
    ActivityIndicator,
    RefreshControl,
    AsyncStorage
} from 'react-native'
import {inject,observer} from 'mobx-react'
import {observable} from 'mobx'
import { SafeAreaView } from 'react-navigation';
import { Divider,Overlay } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient';
import { qj } from '../../config/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast, {DURATION} from 'react-native-easy-toast'
class  Mine extends Component{

    constructor(props){
        super(props)
        this.state={
           isloading:true
        }
        this.option=[
            {
             title:'Version update',
             tiao:'',
            },
            {
             title:'About us',
             tiao:'About',
            },
            {
             title:'Feedback',
             tiao:'FeedBack',
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
   logout=()=>{
       AsyncStorage.removeItem('log')
       this.props.navigation.navigate('Login')
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
              <LinearGradient colors={['#74ebd5', '#ACB6E5']} style={{width:qj.w,height:qj.h*.15,
                alignItems:'center',justifyContent:'center'}}>
              <Text style={{fontSize:18,color:qj.themebai,fontWeight:'600'}}>Energy Internet big data platform</Text>
              <Text style={{marginTop:8,color:'white'}}>----- Logged account -----</Text>
              </LinearGradient>
              {/* under */}
            
              <View style={{width:qj.w,marginTop:10}}>
                  {
                      this.option.map((item,index)=>{
                       return(
             
                      <TouchableOpacity style={{
                          flexDirection:'row',
                          backgroundColor:qj.themehui,
                          marginTop:10,
                          justifyContent:'space-between',
                          height:qj.h*.06,
                          padding:10,
                          alignItems:'center',
                        }} onPress={()=>{ 
                            if(index==0){
                                this.refs.toast.show('This is the latest version!',1000)
                            }else{
                                this.props.navigation.navigate(item.tiao)
                            }
                        }}>
                          <Text style={{fontSize:20,color:'white'}}>{item.title}</Text>
                          <Ionicons name={'ios-arrow-forward'} size={25} color={qj.themehui2}/>
                      </TouchableOpacity>
                      
                       )
                      })
                  }
              </View>
              {/* btn */}
              <TouchableOpacity style={ys.btn} 
              onPress={()=>{
                this.logout()
              }}>
                <Text style={{fontSize:20,fontWeight:'600',color:'white'}}>Log out</Text>
              </TouchableOpacity>
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
  btn:{
    width:qj.w,
    backgroundColor:qj.themehui,
    height:qj.h*.07,
    marginTop:20,
    borderRadius:8,
    alignItems:'center',
    justifyContent:'center'
  }
})
export default Mine


