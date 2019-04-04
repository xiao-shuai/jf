import React,{Component} from 'react'
import {View,Text,TouchableOpacity,Image
    ,ScrollView,StyleSheet,ActivityIndicator} from 'react-native'
import {inject,observer} from 'mobx-react'
import {observable} from 'mobx'
import { SafeAreaView } from 'react-navigation';
import { Divider,Overlay } from 'react-native-elements'
import { qj } from '../../config/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Echarts from 'native-echarts';
class ManageAnalyze extends Component {
    constructor(props){
        super(props)
        this.state={
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

        this.option={
            title : {
                text: 'On average',
                subtext: 'Power consumption',
               
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['Standard values','The actual value'],
               right:10,
            },
           
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {   
                    name:'Standard values',
                    type:'bar',
                    data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                    markPoint : {
                        data : [
                            {type : 'max', name: 'The maximum'},
                            {type : 'min', name: 'The minimum value'}
                        ]
                    },
                    markLine : {
                        data : [
                            {type : 'average', name: 'average'}
                        ]
                    }
                },
                {
                    name:'The actual value',
                    type:'bar',
                    data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                    markPoint : {
                        data : [
                            {name : 'In the highest', value : 182.2, xAxis: 7, yAxis: 183},
                            {name : 'The minimum', value : 2.3, xAxis: 11, yAxis: 3}
                        ]
                    },
                    markLine : {
                        data : [
                            {type : 'average', name : 'average'}
                        ]
                    }
                }
            ]
        }
        this.option2 = {
            title: {
                // text: '堆叠区域图'
            },
            tooltip : {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                data:['Building A','Building B','Building C','Building D','Building E']
            },
            // toolbox: {
            //     feature: {
            //         saveAsImage: {}
            //     }
            // },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : ['Mon','Tues','Wednes','Thurs','Fri','Satur','Sun']
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'Building A',
                    type:'line',
                    stack: 'Total',
                    areaStyle: {},
                    data:[120, 132, 101, 134, 90, ]
                },
                {
                    name:'Building B',
                    type:'line',
                    stack: 'Total',
                    areaStyle: {},
                    data:[220, 182, 191, 234, 290, ]
                },
                {
                    name:'Building C',
                    type:'line',
                    stack: 'Total',
                    areaStyle: {},
                    data:[150, 232, 201, 154, 190, ]
                },
                {
                    name:'Building D',
                    type:'line',
                    stack: 'Total',
                    areaStyle: {normal: {}},
                    data:[320, 332, 301, 334, 390,]
                },
                {
                    name:'Building E',
                    type:'line',
                    stack: 'Total',
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    areaStyle: {normal: {}},
                    data:[820, 932, 901, 934, 1290,]
                }
            ]
        };
    }

    render(){
        return(
            <SafeAreaView style={{flex:1}}>
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
          {/* title */}
          <View style={{padding:qj.w*.025}}>
              <Text style={{fontSize:18,fontWeight:'600'}}>Average annual electricity consumption per unit floor area</Text>
          </View>
          <View style={{marginTop:10}}>
          <Echarts height={300} option={this.option}/>
        </View>
        {/* title */}
        <View style={{width:'100%',alignItems:'center'}}>
              <Text style={{fontSize:18,fontWeight:'600'}}>Annual standard deviation statistics</Text>
        </View>
        <View style={{marginTop:10}}>
          <Echarts height={300} option={this.option2}/>
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
export default ManageAnalyze