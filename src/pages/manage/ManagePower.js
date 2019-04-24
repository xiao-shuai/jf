import React,{Component} from 'react'
import {View,Text,TouchableOpacity,Image,Button
    ,ScrollView,StyleSheet,ActivityIndicator} from 'react-native'
import {inject,observer} from 'mobx-react'
import {observable} from 'mobx'
import { SafeAreaView } from 'react-navigation';
import { Divider,Overlay } from 'react-native-elements'
import { qj } from '../../config/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Echarts from 'native-echarts';
import {Row, Rows, Table} from 'react-native-table-component';
import I18n from '../../data/i18n'
import Parse from 'parse/react-native'
class ManagePower extends Component {
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
    let power=Parse.Object.extend('power')
       let  data = new Parse.Query(power)
        data.find().then(res=>{
            console.log('res---!',res)
            this.setState({
                show:false,
                option:res[0].attributes.option,
            })
        }).catch(err=>{

        })
}
    render(){
        console.log('option22',this.state.option)
        const btm=I18n.t('btm')
        if(this.state.show){
            return(
               <View style={{width:qj.w,height:qj.h*.8,alignItems:'center',justifyContent:'center'}}>
               <ActivityIndicator  size={'large'} color={qj.themeColor}/>
               </View>
            )
           }
      const one=this.state.option
      this.option={

        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:['A machine', 'B machine', 'C machine']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        // toolbox: {
        //     feature: {
        //         saveAsImage: {}
        //     }
        // },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name:'A machine',
                type:'line',
                step: 'start',
                data:[one.one.one1, one.one.one2, one.one.one3, one.one.one4, one.one.one5, one.one.one6, one.one.one7]
            },
            {
                name:'B machine',
                type:'line',
                step: 'middle',
                data:[one.two.two1, one.two.two2, one.two.two3, one.two.two4, one.two.two5, one.two.two6, one.two.two7]
            },
            {
                name:'C machine',
                type:'line',
                step: 'end',
                data:[one.three.th1, one.three.th2, one.three.th3, one.three.th4, one.three.th5, one.three.th6, one.three.th7]
            }
        ],
        color:['#40E0D0','#00FA9A','#00BFFF']
          }  
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

             <ScrollView style={{flex:1}}>
             <View style={{marginTop:10,width:qj.w*.95}}>
            
             <Echarts option={this.option} height={300}/>
             </View>
          <View style={{marginTop:15}}>
             <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff',}}>
                    <Row data={options.tableHead} style={ys.head} textStyle={ys.text}/>
                    <Rows data={options.tableData} textStyle={ys.text}/>
             </Table>
        </View>

          {/* btm */}
          <View style={{width:qj.w*.95,alignItems:'center',justifyContent:'center',marginTop:15}}>
         <Text style={{color:qj.themehui,}}>{btm}</Text>
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
      }
})
export default ManagePower