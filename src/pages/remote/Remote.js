import React,{Component} from 'react'
import {View,Text,
    TouchableOpacity,
    Image,
    Switch,
    ScrollView,
    StyleSheet,
    ActivityIndicator,
    RefreshControl, 

} from 'react-native'
import {inject,observer} from 'mobx-react'
import {observable} from 'mobx'
import { SafeAreaView } from 'react-navigation';
import { Divider ,Overlay} from 'react-native-elements'
import { qj } from '../../config/style';
import Ionicons from 'react-native-vector-icons/Ionicons';

class  Remote extends Component{

    constructor(props){
        super(props)
        this.state={
            isloading:true,
            onRefresh:false,
            visible:false,
            in:0,
            issw:false,
            dizhi:[
                {
                    name:'Jinfeng technology building',
        
                    },
                    {
                    name:'Golden dragon technology building',
                    },
                    {
                    name:'Jianwai technology building',
                    }
            ],
          sb:[
              {
                title:'AAAA',
                maxnum:'888',
                minnum:'100',
              },
              {
                title:'BBBB',
                maxnum:'888',
                minnum:'100',
              }
          ]  
        }

    }
   
    onRefresh=()=>{
     this.setState({onRefresh:true})
    fetch('https://easy-mock.com/mock/5ca5a80e9f527b3ab6e14b1d/jf/hometab3')
    .then(res=>res.json())
    .then(res=>{
       this.setState({onRefresh:false}) 
    }

    ).catch(err=>{
        
    })   
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
            <SafeAreaView style={{flex:1}}>
 {/* title */}
 <View style={{width:qj.w,}}>
              <Text style={{fontSize:20,fontWeight:'500',textAlign:'center'}}>Romote</Text>
              <Divider style={{backgroundColor:qj.themehui,height:5,marginTop:5}}/>
  </View>

 <View style={{width:'100%',alignItems:'center'}}>
                
                  <TouchableOpacity style={ys.xzk} onPress={()=>{
                      this.setState({visible:true})
                  }}>
                   <Text style={{width:'85%',fontSize:18,color:qj.themeColor}}>{
                       this.state.dizhi[this.state.in].name
                       }</Text>
                  <Ionicons name={'ios-arrow-down'} size={25} color={qj.themehui2}/>
                  </TouchableOpacity>
     </View>
     {/* shuo ming */}
     <View style={{width:qj.w,backgroundColor:qj.themehui,marginTop:10,padding:10}}>
         <Text style={{color:qj.themehui2}}>The maximum value can be checked one or two items, do not set do not check can be</Text>
     </View>

   {/* list */}
   <ScrollView contentContainerStyle={{alignItems:'center'}} refreshControl={
       <RefreshControl refreshing={this.state.onRefresh} onRefresh={this.onRefresh}/>
   }>
   <View style={ys.list_title}>
    <Text style={{fontSize:18,color:qj.themehui2}}>The device name</Text>
    <Switch 
    trackColor={qj.themeColor} 
    value={this.state.issw} onValueChange={(value)=>{
       this.setState({issw:value})
    }} />
   </View>

<View style={{
flexDirection:'row',
justifyContent:'space-between',
width:'80%',
marginTop:10,
alignItems:'center'
}}>

    <View style={{alignItems:'center'}}>
    <Ionicons name={'ios-checkmark-circle-outline'} size={30}/>
    <Text>88 (Maximum)</Text>
    <View style={ys.cz}>
    <Text style={ys.cz_text}>reset</Text>
    </View>
    </View>
    {/* right */}
    <View style={{alignItems:'center'}}>
    <Ionicons name={'ios-checkmark-circle-outline'} size={30}/>
    <Text style={{}}>88 (Maximum)</Text>
    <View style={ys.cz}>
    <Text style={ys.cz_text}>reset</Text>
    </View>
    </View>

   
    
</View>

   </ScrollView>

                 {/* tan kaung xz */}
         <Overlay visible={this.state.visible} onBackdropPress={()=>{
             this.setState({visible:false})
         }}>
          <ScrollView contentContainerStyle={{alignItems:'center'}}>
              {
                  this.state.dizhi.map((item,index)=>{
                   return (
                       <TouchableOpacity onPress={()=>{
                          this.setState({
                              visible:false,
                              in:index
                            })
                            this.onRefresh()
                       }} style={ys.dizhi}>
                       <Text style={{fontSize:20,color:qj.themebai}} >{item.name}</Text>
                       </TouchableOpacity>
                   )
                  })
              }
          </ScrollView>
<TouchableOpacity style={{width:'100%',alignItems:'center'}} onPress={()=>{
   this.setState({visible:false})
}}>
    <Ionicons  name={'ios-close'} size={50} color={qj.themehui}/>
</TouchableOpacity>
         </Overlay>

            </SafeAreaView>
        )
    }

}
const ys=StyleSheet.create({
    cz_text:{
        color:qj.themebai,fontSize:20,fontWeight:'600'
    },
    cz:{
        width:qj.w*.22,
        height:qj.w*.1,
        backgroundColor:qj.themeColor,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:8,
        marginTop:8
    },
    dizhi:{
        width:'90%',
        padding:10,
        marginTop:10,
      backgroundColor:qj.themeColor
      },
      xzk:{
        width:qj.w*.95,
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:qj.themehui,
        height:qj.h*.05,
        alignItems:'center',
        padding:8,
        borderRadius:8,
        marginTop:10
      },
      list_title:{
        flexDirection:'row',
        marginTop:10,
        justifyContent:'space-between',
        width:qj.w*.95,
        padding:10,
        backgroundColor:qj.themehui,
        alignItems:'center',
        borderRadius:8
      }
})
export default Remote


