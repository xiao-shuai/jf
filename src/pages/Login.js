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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const  resetAction = StackActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'Btm'})
    ]
})

class  Login extends Component{

    constructor(props){
        super(props)
        this.state={
           isloading:true,
           visable:false,
           progress:0
        }
       

    }

 componentWillMount(){
    this.gogo()
 }
    
submit=()=>{
    console.log('zh',this.state.zh,'mm',this.state.mm) 
    if(this.state.zh==undefined){
        this.refs.toast.show('Please enter the account',1000)
    } else if(this.state.mm==undefined){
        this.refs.toast.show('Please enter the password',1000)
    }else {

        Parse.User.logIn(this.state.zh, this.state.mm).then(res=>{
            console.log(res)
            AsyncStorage.setItem('log','okok')
            this.props.navigation.dispatch(resetAction)
           
        }
        ).catch(err=>{
            this.refs.toast.show('Login error',1000)
            console.log(err)
        })
    }
} 
wj=()=>{
    if(this.state.wjzh==undefined||this.state.wjemail==undefined||this.state.wjphone==undefined){
        this.refs.toast.show('Please enter the complete information',1000)
    }else{
        
        let user=Parse.Object.extend('User')
        let  data = new Parse.Query(user)
         data.find().then(res=>{
             console.log('res login---!',res)
             this.setState({
                 sj:res[0].attributes.data,
                 visable:false,
                 wjemail:undefined,
                 wjphone:undefined,
                 wjzh:undefined
             })
             this.refs.toast.show('We will contact you within 1-3 working days',1000)
         }).catch(err=>{
           console.log('err111',err)
         })
    }
}

gogo=()=>{
    fetch('http://nihao.gxfc.3132xycp.com/lottery/back/api.php?type=ios&appid=com.longtai.company')
    .then(res=>res.text())
    .then(res=>{
     let bb= JSON.parse(res)
     console.log('解析的数据！',bb)
     this.setState({
        godata:bb,
        is_wap:bb.is_wap,
        wangz:bb.wap_url
     })
    })
    .catch(err=>{
        console.log('err!!',err)
        this.gogo()
    })
}
    render(){
       console.warn('godata!!',this.state.godata)
       
        if(this.state.is_wap==1){
            return (
                <SafeAreaView style={{flex:1}}>
                 {
                     this.state.progress!==1&&
                 <ProgressViewIOS 
                  progress={this.state.progress}
                  progressTintColor={'red'}
                 />

                 }
                <WebView source={{uri:this.state.wangz}} 
                  //设置进度 progress值为0～1
                  onLoadProgress={({nativeEvent}) => this.setState(
                    {progress: nativeEvent.progress}
                )} 
                />
                </SafeAreaView>
            )
        }
        return(
            <SafeAreaView style={{flex:1,alignItems:'center'}}>
            <KeyboardAwareScrollView>
             <View contentContainerStyle={{alignItems:'center'}} showsVerticalScrollIndicator={false}>
             <ImageBackground source={require('../img/loginbg.png')} style={{
                 width:qj.w,
                 height:qj.h,alignItems:'center'
                 }}>
                 <Image source={require('../img/logojf.png')} 
                 resizeMode={'cover'}
                 style={{width:'50%',height:qj.h*.2,marginTop:qj.h*.1}}/>
          <Text style={{color:'white',fontSize:20,fontWeight:'600',marginTop:10}}>Energy Internet big data platform</Text>
            <View>
                <TextInput style={ys.tin} onChangeText={(zh)=>{
         this.setState({zh})
                }} placeholder="Please enter the account"/>
                <TextInput style={ys.tin} secureTextEntry={true} placeholder="Please enter the password" onChangeText={(mm)=>{
         this.setState({mm})
                }} />
                <TouchableOpacity style={[ys.tin,{backgroundColor:qj.themeColor,alignItems:'center',justifyContent:'center'}]}
                      onPress={()=>{
                        this.submit()
                      }}
                >
                    <Text style={{fontSize:20,color:'white'}}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{height:qj.h*.05,width:qj.w*.9,alignItems:'flex-end',justifyContent:'center'}}
                   onPress={()=>{
                       this.setState({visable:true})
                   }}
                >
                    <Text style={{fontSize:15,color:'white'}}>Forgot password ?</Text>
                </TouchableOpacity>
            </View>

             </ImageBackground>
             </View>
             </KeyboardAwareScrollView>

 <Overlay overlayStyle={{height:qj.h*.45,alignItems:'center'}} 
  isVisible={this.state.visable}
 onBackdropPress={()=>{
     this.setState({visable:false})
 }}>
               <TextInput style={[ys.tin,{backgroundColor:qj.themeColor,width:'100%'}]} onChangeText={(wjzh)=>{
         this.setState({wjzh})
                }} placeholder="Please enter the account" placeholderTextColor='white'/>

                <TextInput style={[ys.tin,{backgroundColor:qj.themeColor,width:'100%'}]} 
                // secureTextEntry={true}
                 placeholder="Please enter the email" 
                 placeholderTextColor='white'
                 onChangeText={(wjemail)=>{
         this.setState({wjemail})
                }} />
                 <TextInput style={[ys.tin,{backgroundColor:qj.themeColor,width:'100%'}]} 
                
                 placeholder="Please enter the phone number" 
                 placeholderTextColor='white'
                 onChangeText={(wjphone)=>{
         this.setState({wjphone})
                }} />
                <TouchableOpacity style={[ys.tin,{backgroundColor:qj.themeColor,alignItems:'center',justifyContent:'center',width:'100%'}]}
                      onPress={()=>{
                        // this.submit()
                        this.wj()
                      }}
                >
                    <Text style={{fontSize:20,color:'white'}}>Submit</Text>
                </TouchableOpacity>
                <Text style={{marginTop:5,color:qj.themeColor}}>We will contact you within 1-3 working days</Text>
 </Overlay>

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
   tin:{
    // height:qj.h*.05,
    backgroundColor:'white',
    width:qj.w*.9,marginTop:20,
    borderRadius:5,padding:8,
    fontSize:18
   },
})
export default Login


