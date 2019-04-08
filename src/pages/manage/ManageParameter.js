import React,{Component} from 'react'
import {View,Text,TouchableOpacity,Image
    ,ScrollView,StyleSheet,ActivityIndicator} from 'react-native'
import {inject,observer} from 'mobx-react'
import {observable} from 'mobx'
import { SafeAreaView } from 'react-navigation';
import { Divider,Overlay } from 'react-native-elements'
import { qj } from '../../config/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Accordion from 'react-native-collapsible/Accordion';
import Echarts from 'native-echarts';
class ManageParameter extends Component {
    constructor(props){
        super(props)
        this.state={
            show:true,
            visible:false,
            in:0,
            dizhi:[
                {
                name:'AAAAAAA2',
    
                },
                {
                name:'BBBBBB',
                },
                {
                name:'CCCCCCC',
                }
            ],
        }
    }
  componentWillMount(){
    fetch('https://easy-mock.com/mock/5ca5a80e9f527b3ab6e14b1d/jf/hometab3')
    .then(res=>res.json())
    .then(res=>{
       this.setState({show:false}) 
    }

    ).catch(err=>{
        
    }) 
  }
    render(){
        if(this.state.show){
            return(
               <View style={{width:qj.w,height:qj.h*.8,alignItems:'center',justifyContent:'center'}}>
               <ActivityIndicator  size={'large'} color={qj.themeColor}/>
               </View>
            )
           }
        return(
            <SafeAreaView style={{flex:1,alignItems:'center'}}>
<View style={{width:'100%',alignItems:'center'}}>
                      <TouchableOpacity style={styles.xzk} onPress={()=>{
                          this.setState({visible:true})
                      }}>
                       <Text style={{width:'85%',fontSize:18,color:qj.themeColor,}}>{
                           this.state.dizhi[this.state.in].name
                           }</Text>
                      <Ionicons name={'ios-arrow-down'} size={25} color={qj.themehui2}/>
                      </TouchableOpacity>
     </View>
        <ScrollView style={{width:qj.w*.95}}>
          <View style={styles.title}>
              <Text style={{color:qj.themeColor,fontSize:18}}>Electric meter name</Text>
          </View>
          <View style={{padding:10}}>
              <Text style={styles.title_item}>Number: 001   Model:CL48-AI</Text>
              <Text style={styles.title_item}>Accurate level: 001</Text>
              <Divider style={styles.title_item}/>
              <Text style={styles.title_item}>Voltage (V): 001   Current (A) :</Text>
              <Text style={styles.title_item}>Frequency (Hz) : 001</Text>
              <Divider style={styles.title_item}/>
              <Text style={styles.title_item}>The Manufacturer: 001</Text>
              <Text style={styles.title_item}>The date of production: 001</Text>
            
          </View>
        </ScrollView>
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
                           }} style={styles.dizhi}>
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
const styles=StyleSheet.create({
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
    title_item:{
        marginTop:10,color:qj.themehui2,fontSize:16
    },
    title:{
        width:'100%',height:qj.h*.05,
        backgroundColor:qj.themehui,marginTop:10,
        borderRadius:6,alignItems:'center',
        justifyContent:'center'
    }
})
export default ManageParameter