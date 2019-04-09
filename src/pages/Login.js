import React,{Component} from 'react'
import {View,Text,TouchableOpacity,Image
    ,ScrollView,StyleSheet,
    ActivityIndicator,
    RefreshControl,
    ImageBackground,
    TextInput,
    AsyncStorage
} from 'react-native'
import {inject,observer} from 'mobx-react'
import {observable} from 'mobx'
import { SafeAreaView ,NavigationActions,StackActions} from 'react-navigation';
import { Divider,Overlay } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient';
import { qj } from '../config/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast, {DURATION} from 'react-native-easy-toast'

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
    
submit=()=>{
    console.log('zh',this.state.zh,'mm',this.state.mm) 
    if(this.state.zh==undefined){
        this.refs.toast.show('Please enter the account',1000)
    } else if(this.state.mm==undefined){
        this.refs.toast.show('Please enter the password',1000)
    }else {
        fetch('https://easy-mock.com/mock/5ca20f900aa7bf50eb36bcb0/baoxiu/order',{
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            
           }).then(res=>res.json()).then(res=>{
              this.refs.toast.show('Login successful',1000)
              AsyncStorage.setItem('log','okok')
              this.props.navigation.dispatch(resetAction);
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
             <ScrollView contentContainerStyle={{alignItems:'center'}} showsVerticalScrollIndicator={false}>
             <ImageBackground source={require('../img/loginbg.png')} style={{
                 width:qj.w,
                 height:qj.h,alignItems:'center'
                 }}>
                 <Image source={require('../img/logojf.png')} style={{width:'50%',height:'20%',marginTop:20}}/>
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
            </View>

             </ImageBackground>
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
   tin:{
    height:qj.h*.05,backgroundColor:'white',width:qj.w*.9,marginTop:20,borderRadius:5,padding:8,fontSize:18
   },
})
export default Login


