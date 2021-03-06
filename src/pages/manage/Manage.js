import React,{Component} from 'react'
import {View,Text,TouchableOpacity,Image
    ,ScrollView,StyleSheet,ActivityIndicator,RefreshControl} from 'react-native'
import {inject,observer} from 'mobx-react'
import {observable} from 'mobx'
import { SafeAreaView } from 'react-navigation';
import { Divider,Overlay } from 'react-native-elements'
import { qj } from '../../config/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import I18n from '../../data/i18n'
import Parse from 'parse/react-native'
class  Manage extends Component{

    constructor(props){
        super(props)
        this.state={
            show:true,
            onRefresh:false,
            visible:false,
            in:0,
            dizhi:I18n.t('dizhi'),
            data:I18n.t('manage').data 
        }
        
    }
  get=()=>{
    let manage=Parse.Object.extend('manage')
       let  data = new Parse.Query(manage)
        data.find().then(res=>{
            console.log('res---!',res)
            this.setState({
                show:false,
                top4:res[0].attributes.top4,
            })
        }).catch(err=>{
            console.log('err--!',err)
        }) 
  }
  componentWillMount(){
     this.get()
  }
  onRefresh=()=>{
      console.log('6666')
      this.setState({onRefresh:true})
      let manage=Parse.Object.extend('manage')
       let  data = new Parse.Query(manage)
        data.find().then(res=>{
            console.log('res---!',res)
            this.setState({
                onRefresh:false,
                top4:res[0].attributes.top4,
            })
        }).catch(err=>{

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
        const lan=I18n.t('manage')
        const dizhi=I18n.t('dizhi')
        return(
            <SafeAreaView style={[qj.w*.95,{alignItems:'center',flex:1}]}>
              {/* title */}
              <View style={{width:qj.w,}}>
              <Text style={{fontSize:20,fontWeight:'500',textAlign:'center'}}>{lan.title}</Text>
              <Divider style={{backgroundColor:qj.themehui,height:5,marginTop:5}}/>
             </View>
           
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

{/* list ----! */}
         <ScrollView  showsVerticalScrollIndicator={false} refreshControl={
         <RefreshControl onRefresh={this.onRefresh} refreshing={this.state.onRefresh}/>
         }
         >
          {
              lan.list.map((item,index)=>{         
               return(
                <View style={{
                    width:qj.w*.95,
                    marginTop:10,
                    }} key={index}>
                 <View style={ys.list_title}>
                    <View style={ys.title_left}></View>
                    <Text style={{fontSize:18,color:qj.themeColor,marginLeft:8}}>{item.title}</Text>
                 </View>

                 {
                     item.listxq.map((item,index)=>{
                      return(

                        <TouchableOpacity style={[ys.listxq,{borderBottomColor:qj.themehui,borderBottomWidth:1}]} onPress={()=>{
                            this.props.navigation.navigate(item.tiao)
                        }} key={index}>
                        <Text style={{fontSize:18,color:qj.themehui2}}>{item.xq}</Text>
                        <Ionicons name={'ios-arrow-forward'} size={20} color={qj.themehui}/>
                        </TouchableOpacity>
                      )
                     })

                 }

              
               </View>
               )
              })
          }
{/* btm */}
       <View style={{width:qj.w*.95,alignItems:'center',justifyContent:'center',marginTop:15}}>
         <Text style={{color:qj.themehui,}}>{lan.btm}</Text>
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
                       <TouchableOpacity key={index} onPress={()=>{

                          this.setState({
                              visible:false,
                              in:index,
                              show:true
                            })
                        this.onRefresh()
                        this.get()
                       }} style={ys.dizhi}>
                       <Text style={{fontSize:20,color:qj.themebai}} >{item.name}</Text>
                       </TouchableOpacity>
                   )
                  })
              }
          </ScrollView>
<TouchableOpacity style={{width:'100%',alignItems:'center',}} onPress={()=>{
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
    listxq:{
        flexDirection:'row',
        justifyContent:'space-between',
        // padding:20
        paddingTop:20,
        paddingBottom:20,
        paddingLeft:25
    },
   title_left:{
    backgroundColor:qj.themeColor,
    width:qj.w*.02,
    height:qj.w*.06
   }, 
  dizhi:{
    width:'90%',
    // height:100,
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
    backgroundColor:qj.themehui,
    flexDirection:'row',
    padding:10,
    borderRadius:8
  },
})
export default Manage


