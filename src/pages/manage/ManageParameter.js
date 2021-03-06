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
import I18n from '../../data/i18n'
import Parse from 'parse/react-native'
class ManageParameter extends Component {
    constructor(props){
        super(props)
        this.state={
            show:true,
            visible:false,
            in:0,
            dizhi:I18n.t('dizhi'),
        }
        
    }
   get=()=>{
    let parameter=Parse.Object.extend('parameter')
    let  data = new Parse.Query(parameter)
     data.find().then(res=>{
         console.log('res---!',res)
         this.setState({
             show:false,
             data:res[0].attributes.option,
         })
     }).catch(err=>{

     })
   }
    
  componentWillMount(){
    this.get()
  }
    render(){
        const lan=I18n.t('parameter')
        const btm=I18n.t('btm')
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
        <ScrollView style={{width:qj.w*.95}} showsVerticalScrollIndicator={false}>
        {
            lan.map((item,index)=>{
         return(
           <View>
       <View style={styles.title}>
              <Text style={{color:qj.themeColor,fontSize:18}}>{item.title}</Text>
          </View>
          <View style={{padding:10}}>
              <Text style={styles.title_item}>Number: {item.bianhao}   Model:{item.xh}</Text>
              <Text style={styles.title_item}>Accurate level: {item.dengji}</Text>
              <Divider style={styles.title_item}/>
              <Text style={styles.title_item}>Voltage (V): {item.dianliu}   Current (A) :{item.dianya}</Text>
              <Text style={styles.title_item}>Frequency (Hz) : {item.hz}</Text>
              <Divider style={styles.title_item}/>
              <Text style={styles.title_item}>The Manufacturer: {item.factory}</Text>
              <Text style={styles.title_item}>The date of production: {item.date}</Text>
            
          </View>
           </View>
         )
            })
        }
          {/* btm */}
       <View style={{width:qj.w*.95,alignItems:'center',justifyContent:'center',marginTop:15}}>
         <Text style={{color:qj.themehui,}}>{btm}</Text>
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
                                  in:index,
                                  show:true
                                })
                               this.get()
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
        // height:qj.h*.05,
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