import React,{Component} from 'react'
import {View,Text,TouchableOpacity,Image
    ,ScrollView,StyleSheet,ActivityIndicator} from 'react-native'
import {inject,observer} from 'mobx-react'
import {observable} from 'mobx'
import { SafeAreaView } from 'react-navigation';
import { Divider,Overlay } from 'react-native-elements'
import { qj } from '../../config/style';
import Ionicons from 'react-native-vector-icons/Ionicons';

class ManagePic extends Component {
    constructor(props){
        super(props)
        this.state={
            visible:false,
            in:0,
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
        }
    }

    render(){
        return(
            <SafeAreaView style={{flex:1,alignItems:'center'}}>

        <View style={{width:'100%',alignItems:'center'}}>
                  <TouchableOpacity style={ys.xzk} onPress={()=>{
                      this.setState({visible:true})
                  }}>
                   <Text style={{width:'85%',fontSize:18,color:qj.themeColor,}}>{
                       this.state.dizhi[this.state.in].name
                       }</Text>
                  <Ionicons name={'ios-arrow-down'} size={25} color={qj.themehui2}/>
                  </TouchableOpacity>
              </View>

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
      dizhi:{
        width:'90%',
        // height:100,
        padding:10,
        marginTop:10,
        backgroundColor:qj.themeColor
      },
})

export default ManagePic