import React,{Component} from 'react'
import {View,Text,TouchableOpacity,Image
    ,ScrollView,StyleSheet,ActivityIndicator} from 'react-native'
import {inject,observer} from 'mobx-react'
import {observable} from 'mobx'
import { SafeAreaView } from 'react-navigation';
import { Divider,Overlay } from 'react-native-elements'
import { qj } from '../../config/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Echarts } from 'native-echarts/src/components';
import {Row, Rows, Table} from 'react-native-table-component';
import I18n from '../../data/i18n'
import Parse from 'parse/react-native'
class ManageMonitor extends Component {
    constructor(props){
        super(props)
        this.state={
            show:true,
            visible:false,
            in:0,
            dizhi:I18n.t('dizhi')
        }
    }
componentWillMount(){
    let monitor=Parse.Object.extend('monitor')
    let  data = new Parse.Query(monitor)
     data.find().then(res=>{
         console.log('res---!',res)
         this.setState({
             show:false,
             data:res[0].attributes.option
         })
     }).catch(err=>{

     })
    // fetch('https://easy-mock.com/mock/5ca5a80e9f527b3ab6e14b1d/jf/hometab3')
    // .then(res=>res.json())
    // .then(res=>{
    //    this.setState({show:false}) 
    // }

    // ).catch(err=>{
        
    // }) 
}

    render(){
        console.log('ssss',this.state.data)
         
        if(this.state.show){
            return(
               <View style={{width:qj.w,height:qj.h*.8,alignItems:'center',justifyContent:'center'}}>
               <ActivityIndicator  size={'large'} color={qj.themeColor}/>
               </View>
            )
           }
           const a=this.state.data
      const  option = {
            
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:['Real-time voltage data']
            },
            
            xAxis:  {
                type: 'category',
                boundaryGap: false,
                data: ['08:00','09:00','10:00','11:00','12:00','13:00','14:00']
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value} '
                }
            },
            series: [
                {
                    name:'Real-time voltage data',
                    type:'line',
                    data:[a.a1, a.a2, a.a3, a.a4, a.a5, a.a6],
                    markPoint: {
                        data: [
                            {type: 'max', name: 'max'},
                            {type: 'min', name: 'min'}
                        ]
                    },
                    markLine: {
                        data: [
                            {type: 'average', name: 'average'}
                        ]
                    }
                },
                
            ],
            color:['#00BFFF','#00CED1'],
        };
     const options = {
            tableHead: ['Time', 'PF', 'PFa', 'PFb', 'PFc'],
            tableData: [
                ['00:00:00',
                    125,
                    110,
                    15,
                    5,
                    // <Button type='primary' size='small' onPress={()=>Toast.info('You clicked on me ! !')}>查看</Button>
                ],
                [
                    '02:00:00',
                    525,
                    325,
                    200,
                    50,
                    // <Button type='primary' size='small' onPress={()=>Toast.info('You clicked on me ! !')}>查看</Button>
                ],
                [
                    '04:00:00',
                    800,
                    500,
                    300,
                    100,
                    // <Button type='primary' size='small' onPress={()=>Toast.info('You clicked on me ! !')}>查看</Button>
                ],
                [
                    'total',
                    1450,
                    835,
                    515,
                    155,
                    
                ]
            ]
        };
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
          
          <ScrollView style={{width:qj.w*.95,}}>
      <Echarts option={option} height={300}/>
      <View style={{width:'100%',alignItems:'center'}}>
              <Text style={{fontSize:18,fontWeight:'600'}}>Mobile room meter</Text>
        </View>
      
      <View style={{marginTop:15}}>
             <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff',}}>
                    <Row data={options.tableHead} style={ys.head} textStyle={ys.text}/>
                    <Rows data={options.tableData} textStyle={ys.text}/>
             </Table>
        </View>
        {/* btm */}
       <View style={{width:qj.w*.95,alignItems:'center',justifyContent:'center',marginTop:15}}>
         <Text style={{color:qj.themehui,}}>-------- This is the bottom --------</Text>
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
    head: {
        height: 40,
        backgroundColor: qj.themeColor,
    },
    text: {
        margin: 10,
        textAlign: 'center'
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
})
export default ManageMonitor