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
import { Divider ,Overlay, CheckBox} from 'react-native-elements'
import { qj } from '../../config/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast, {DURATION} from 'react-native-easy-toast'
import { TextInput } from 'react-native-gesture-handler';
import I18n from '../../data/i18n'
import Parse from 'parse/react-native'
class  Remote extends Component{

    constructor(props){
        super(props)
        this.state={
            visible3:false,
            visible2:false,
            left1:true,
            left2:false,
            left3:true,
            right1:false,
            right2:true,
            right3:true,
            isloading:true,
            onRefresh:false,
            visible:false,
            in:0,
            issw:false,
            issw2:true,
            issw3:true,
            data:I18n.t('remote').data,
   
        }

    }
   
    onRefresh=()=>{
     this.setState({onRefresh:true})
     let remote=Parse.Object.extend('remote')
       let  data = new Parse.Query(remote)
        data.find().then(res=>{
            console.log('res remote---!',res)
            this.setState({
              onRefresh:false,
            })
        }).catch(err=>{
         console.log('err-!',err)
        }) 
    // fetch('https://easy-mock.com/mock/5ca5a80e9f527b3ab6e14b1d/jf/hometab3')
    // .then(res=>res.json())
    // .then(res=>{
    //    this.setState({onRefresh:false}) 
    // }

    // ).catch(err=>{
        
    // })   

    }
get=()=>{

  // fetch('https://easy-mock.com/mock/5ca5a80e9f527b3ab6e14b1d/jf/hometab3')
  // .then(res=>res.json())
  // .then(res=>{
  //    this.setState({isloading:false}) 
  // }

  // ).catch(err=>{
      
  // })  
  
  let remote=Parse.Object.extend('remote')
       let  data = new Parse.Query(remote)
        data.find().then(res=>{
            console.log('res remote---!',res)
            this.setState({
                isloading:false,
            })
        }).catch(err=>{
         console.log('err-!',err)
        }) 
  
}
  componentWillMount(){
    this.get()
  }  

  reset=(num)=>{
      console.log('uuuu',this.state.resetnum,'num---!',num)
       
      if(this.state.resetnum!==undefined){
        let data=this.state.data
        data[num].minnum=this.state.resetnum
        this.setState({data:data,resetnum:undefined})
        
      }
  }
  reset2=(num)=>{
    console.log('222uu',this.state.resetnum2,'num---!',num)
     
    if(this.state.resetnum2!==undefined){
      let data=this.state.data
      data[num].maxnum=this.state.resetnum2
      this.setState({data:data,resetnum2:undefined})
      
    }
}

    render(){
      const lan=I18n.t('remote')
        if(this.state.isloading){
            return(
                <View style={{width:qj.w,
                height:qj.h*.8,
                alignItems:'center',justifyContent:'center'}}>
                <ActivityIndicator  size={'large'} color={qj.themeColor}/>
                 </View>
            )
        }
        return(
            <SafeAreaView style={{flex:1}}>
 {/* title */}
 <View style={{width:qj.w,}}>
              <Text style={{fontSize:20,
                fontWeight:'500',textAlign:'center'}}>{lan.title}</Text>
              <Divider style={{backgroundColor:qj.themehui,height:5,marginTop:5}}/>
  </View>

 <View style={{width:'100%',alignItems:'center'}}>
                
                  <TouchableOpacity style={ys.xzk} onPress={()=>{
                      this.setState({visible:true})
                  }}>
                   <Text style={{width:'85%',fontSize:18,color:qj.themeColor}}>{
                       lan.dizhi[this.state.in].name
                       }</Text>
                  <Ionicons name={'ios-arrow-down'} size={25} color={qj.themehui2}/>
                  </TouchableOpacity>
     </View>
     {/* shuo ming */}
     <View style={{width:qj.w,backgroundColor:qj.themehui,marginTop:10,padding:10,alignItems:'center'}}>
         <Text style={{color:qj.themehui2}}>{lan.sm}</Text>
     </View>

   {/* list */}
   <ScrollView contentContainerStyle={{alignItems:'center'}} showsVerticalScrollIndicator={false} refreshControl={
       <RefreshControl refreshing={this.state.onRefresh} onRefresh={this.onRefresh} />
   }>
    {
       this.state.data.map((item,index)=>{
      return(
      <View style={{width:'95%',alignItems:'center'}} key={index}>
<View style={ys.list_title}>
  
  <Text style={{fontSize:18,color:qj.themehui2}}>{item.title}</Text>
  {
      index==0?
      <Switch 
      // trackColor={qj.themeColor} 
      onTintColor={qj.themeColor}
      value={this.state.issw} onValueChange={(value)=>{
         this.setState({issw:value})
         this.refs.toast.show('Operation is successful')
      }} />
      :index==1?
      <Switch 
      // trackColor={'pink'}
      onTintColor={qj.themeColor}
      value={this.state.issw2} onValueChange={(value)=>{
         this.setState({issw2:value})
         this.refs.toast.show('Operation is successful')
      }} />
      :
      <Switch 
      // trackColor={qj.themeColor} 
      onTintColor={qj.themeColor}
      value={this.state.issw3} onValueChange={(value)=>{
         this.setState({issw3:value})
         this.refs.toast.show('Operation is successful')
      }} />

  }
 
 </View>

<View style={{
flexDirection:'row',
justifyContent:'space-between',
width:'80%',
marginTop:10,
alignItems:'center'
}}>

  <View style={{alignItems:'center'}}>
  <CheckBox checked={
      index==0?
      this.state.left1
      :index==1?
      this.state.left2
      :
      this.state.left3
      
      } onPress={()=>{
          index==0?
          this.setState({left1:!this.state.left1})
          :
          index==1?
          this.setState({left2:!this.state.left2})
          :
          this.setState({left3:!this.state.left3})

      }}/>
  {/* <Ionicons name={'ios-checkmark-circle-outline'} size={30}/> */}
  <Text>{item.maxnum} (Maximum)</Text>
  <TouchableOpacity onPress={()=>{
    this.setState({visible3:true,resetindex:index})
    this.reset2(index)
  }}>
  <View style={ys.cz}>
  <Text style={ys.cz_text}>reset</Text>
  </View>
  </TouchableOpacity>

  </View>
  {/* right */}
  <View style={{alignItems:'center'}}>
  {/* <Ionicons name={'ios-checkmark-circle-outline'} size={30}/> */}
  <CheckBox checked={
      index==0?
      this.state.right1
      :index==1?
      this.state.right2
      :
      this.state.right3
      } onPress={()=>{
        index==0?
        this.setState({right1:!this.state.right1})
        :
        index==1?
        this.setState({right2:!this.state.right2})
        :
        this.setState({right3:!this.state.right3})
      }}/>
  <Text style={{}}>{item.minnum} (minnum)</Text>
  <TouchableOpacity onPress={()=>{
     this.setState({visible2:true,resetindex:index})
     this.reset(index)
  }}>
  <View style={ys.cz}>
  <Text style={ys.cz_text}>reset</Text>
  </View>
  </TouchableOpacity>
  </View>

</View>
      </View>
      )
       })
   }
   {/* btm */}
   <View style={{width:qj.w*.95,alignItems:'center',justifyContent:'center',marginTop:15}}>
         <Text style={{color:qj.themehui,}}>{lan.btm}</Text>
       </View>
   </ScrollView>
       {/* reset tk */}
   <Overlay visible={this.state.visible2} onBackdropPress={()=>{
     this.setState({visible2:false})
   }} overlayStyle={{
    
    width:qj.w*.8,
    height:qj.h*.2,
    padding:20,
    shadowColor:qj.themeColor,
    shadowOpacity:.8,
     }}>
        <View style={{
          height:qj.h*.06,
        // padding:10,
        borderRadius:3,borderWidth:1,
          borderColor:qj.themeColor,
          // marginTop:10
          }}>
          <TextInput style={{
                height:qj.h*.05,
                padding:8
          }} onChangeText={(resetnum)=>{
               this.setState({resetnum})
          }} keyboardType={'numeric'}/>
        </View>
        <View style={{
          justifyContent:'space-between',
        flexDirection:'row',marginTop:qj.h*.03}}>
          <TouchableOpacity  onPress={()=>{
            this.setState({visible2:false})
          }} >
          <Text style={{fontSize:20,color:qj.themeColor}}>Cancle</Text>
          </TouchableOpacity>
          {/*  */}
          <TouchableOpacity onPress={()=>{
         
           if(this.state.resetnum==undefined){
             this.refs.toast.show('Please enter the content11',1000) 
           }else{
            this.setState({visible2:false})
            this.reset(this.state.resetindex)
           }
           
          }}>
          <Text style={{fontSize:20,color:qj.themeColor}}>OK</Text>
          </TouchableOpacity>
        </View>
   </Overlay>
   {/* tk222 */}
   <Overlay visible={this.state.visible3} onBackdropPress={()=>{
     this.setState({visible3:false})
   }} overlayStyle={{
     width:qj.w*.8,
   height:qj.h*.2,
   padding:20,
   shadowColor:qj.themeColor,
   shadowOpacity:.8,
   
   }}>
        <View style={{height:qj.h*.06,
          borderRadius:3,borderWidth:1,
          borderColor:qj.themeColor,
          // marginTop:10
          }}>
          <TextInput style={{
            // fontSize:18,
            height:qj.h*.05,
          // lineHeight:qj.h*.05
            padding:8
        }} 
           keyboardType={'numeric'}
          onChangeText={(resetnum2)=>{
               this.setState({resetnum2})
          }}/>
        </View>
        <View style={{justifyContent:'space-between',
        flexDirection:'row',
        marginTop:qj.h*.03,
        // backgroundColor:'red',
        }}>
          <TouchableOpacity  onPress={()=>{
            this.setState({visible3:false})
          }} >
          <Text style={{fontSize:20,color:qj.themeColor}}>Cancle</Text>
          </TouchableOpacity>
          {/*  */}
          <TouchableOpacity onPress={()=>{
         
           if(this.state.resetnum2==undefined){
             this.refs.toast.show('Please enter the content22',1000) 
           }else{
            this.setState({visible3:false})
            this.reset2(this.state.resetindex)
           }
           
          }}>
          <Text style={{fontSize:20,color:qj.themeColor}}>OK</Text>
          </TouchableOpacity>
        </View>
   </Overlay>
                 {/* tan kaung xz */}
         <Overlay visible={this.state.visible} onBackdropPress={()=>{
             this.setState({visible:false})
         }}>
          <ScrollView contentContainerStyle={{alignItems:'center'}}>
              {
                  lan.dizhi.map((item,index)=>{
                   return (
                       <TouchableOpacity onPress={()=>{
                          this.setState({
                              visible:false,
                              in:index,
                              isloading:true
                            })
                            this.onRefresh()
                            this.get()
                       }} style={ys.dizhi} key={index}>
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
         {/*  */}
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
        // height:qj.h*.05,
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


