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
import clear from 'react-native-clear-app-cache'
import I18n from '../../data/i18n'
class  Mine extends Component{

    constructor(props){
        super(props)
        this.state={
           isloading:true,
           cacheSize:"",
           unit:"",

        }
        clear.getAppCacheSize((value,unit)=>{
            this.setState({
                cacheSize:value, //缓存大小
                unit:unit  //缓存单位
            })
        });

    }

    handlerClearAppCache = () => {
        clear.clearAppCache(() => {
            this.refs.toast.show('Clean up the success!',1000)
            console.log("清除成功");
            clear.getAppCacheSize((value, unit) => {
                this.setState({
                    cacheSize: value, //缓存大小
                    unit: unit  //缓存单位
                })
            });
        });
    };

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
        const lan=I18n.t('mine')
        if(this.state.isloading){
            return(
                <View style={{width:qj.w,height:qj.h*.8,alignItems:'center',justifyContent:'center'}}>
                <ActivityIndicator  size={'large'} color={qj.themeColor}/>
                 </View>
            )
        }
        return(
            <SafeAreaView style={{flex:1,alignItems:'center'}}>
              <LinearGradient colors={['#74ebd5', '#ACB6E5']} style={{width:qj.w,height:qj.h*.2,
                alignItems:'center',justifyContent:'center'}}>
              <Text style={{fontSize:20,color:qj.themebai,fontWeight:'600'}}>{lan.title}</Text>
              <Text style={{marginTop:8,color:'white'}}>{lan.log}</Text>
             
            
              </LinearGradient>
              {/* under */}
            
              <View style={{width:qj.w,marginTop:10}}>
                  {
                      lan.option.map((item,index)=>{
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
                            
                                this.handlerClearAppCache()
                            }else{
                                this.props.navigation.navigate(item.tiao)
                            }
                        }}>
                          <Text style={{fontSize:20,color:'white',fontWeight:'600'}}>{item.title}</Text>
                          {
                              index==0?
                              <Text style={{color:'white',fontSize:20}}>{this.state.cacheSize} {this.state.unit}</Text>
                              :
                              <Ionicons name={'ios-arrow-forward'} size={25} color={qj.themehui2}/>
                          }

                      </TouchableOpacity>
                      
                       )
                      })
                  }
              </View>
              {/* btn */}

              <TouchableOpacity 
              onPress={()=>{
                this.logout()
              }}>
                 <LinearGradient colors={['#ACB6E5','#74ebd5']} style={ys.btn} >
                <Text style={{fontSize:20,fontWeight:'600',color:'white'}}>{lan.logout}</Text>
                </LinearGradient>
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
    backgroundColor:qj.themeColor,
    height:qj.h*.07,
    marginTop:20,
    // borderRadius:8,
    alignItems:'center',
    justifyContent:'center'
  }
})
export default Mine


