import React,{Component} from 'react'
import {View,Text,TouchableOpacity,Image,ImageBackground
    ,ScrollView,StyleSheet,ActivityIndicator} from 'react-native'
import {inject,observer} from 'mobx-react'
import {observable} from 'mobx'
import { SafeAreaView } from 'react-navigation';
import { Divider,Overlay } from 'react-native-elements'
import { qj } from '../../config/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Echarts from 'native-echarts';
import I18n from '../../data/i18n'
import Parse from 'parse/react-native'
class ManageNengHao extends Component {
    constructor(props){
        super(props)
        this.state={
            show:true,
            visible:false,
            in:0,
            dizhi:I18n.t('dizhi')
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

        })
        

    }

    componentWillMount(){
    this.get()
    }

    render(){
        console.log('show',this.state.top4)
       const lan=I18n.t('manage')
        if(this.state.show){
            return(
               <View style={{width:qj.w,height:qj.h*.8,alignItems:'center',justifyContent:'center'}}>
               <ActivityIndicator  size={'large'} color={qj.themeColor}/>
               </View>
            )
           }
const colors = ['#00FFFF', '#00CED1', '#87CEFA'];

     const   option = {
            backgroundColor: '#2c343c',    
            title: {
                text: 'breakdown',
                left: 'center',
                top: 20,
                textStyle: {
                    color: '#ccc'
                }
            },
        
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
        
            visualMap: {
                show: false,
                min: 80,
                max: 600,
                inRange: {
                    colorLightness: [0, 1]
                }
            },
            series : [
                {
                    name:'energy',
                    type:'pie',
                    radius : '55%',
                    center: ['50%', '50%'],
                    data:[
                        {value:335, name:'Air'},
                        {value:310, name:'Socket'},
                        {value:274, name:'Power'},
                       
                    ].sort(function (a, b) { return a.value - b.value; }),
                    roseType: 'radius',
                    label: {
                        normal: {
                            textStyle: {
                                color: 'rgba(255, 255, 255, 0.3)'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            lineStyle: {
                                color: 'rgba(255, 255, 255, 0.3)'
                            },
                            smooth: 0.2,
                            length: 10,
                            length2: 20
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#87CEFA',
                            shadowBlur: 200,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
        
                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) {
                        return Math.random() * 200;
                    }
                }
            ]
        };
        const option2 = {
            color: colors,

            tooltip: {
                trigger: 'none',
                axisPointer: {
                    type: 'cross'
                }
            },
            legend: {
                data:['Electricity', 'Water']
            },
            grid: {
                top: 70,
                bottom: 50
            },
            xAxis: [
                {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLine: {
                        onZero: false,
                        lineStyle: {
                            color: colors[1]
                        }
                    },
                    axisPointer: {
                        label: {
                            formatter: function (params) {
                                return 'water ' + params.value
                                    + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                            }
                        }
                    },
                    data: ["2018-1", "2018-2", "2018-3", "2018-4", "2018-5", "2018-6", "2018-7", "2018-8", "2018-9", "2018-10", "2018-11", "2018-12"]
                },
                {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLine: {
                        onZero: false,
                        lineStyle: {
                            color: colors[0]
                        }
                    },
                    axisPointer: {
                        label: {
                            formatter: function (params) {
                                return '降水量' + params.value
                                    + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                            }
                        }
                    },
                    data: ["2019-1", "2019-2", "2019-3", "2019-4", "2019-5", "2019-6", "2019-7", "2019-8", "2019-9", "2019-10", "2019-11", "2019-12"]
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name:'Electricity',
                    type:'line',
                    xAxisIndex: 1,
                    smooth: true,
                    data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
                },
                {
                    name:'Water',
                    type:'line',
                    smooth: true,
                    data: [3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7]
                }
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

                  <ScrollView>
                      <ImageBackground source={require('../../img/nhbj.png')} style={{width:qj.w,height:qj.h*.3,marginTop:10}}>
                         <Text style={{fontSize:25,color:'white',marginLeft:'6%',marginTop:10}}>{this.state.dizhi[this.state.in].name}</Text>
                         <Text style={{fontSize:18,color:'white',marginLeft:'6%',marginTop:10}}>Total floor area:2000㎡</Text>
                         <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:qj.h*.09,padding:10}}>
                             <View style={{alignItems:'center',}}>
                                 <Ionicons  name={'ios-business'} size={30} color={qj.themeColor}/>
                                 <Text style={{color:'white',fontSize:18}}>{this.state.top4.tit4}</Text>
                                 <Text style={{color:'white',fontSize:18}}>{this.state.top4.xia4}</Text>
                             </View>
                             <View style={{alignItems:'center'}}>
                                 <Ionicons name={'ios-settings'} size={30} color={qj.themeColor}/>
                                 <Text style={{color:'white',fontSize:18}}>{this.state.top4.tit}</Text>
                                 <Text style={{color:'white',fontSize:18}}>{this.state.top4.xia}</Text>
                             </View>
                             <View style={{alignItems:'center'}}>
                                 <Ionicons name={'ios-bulb'} size={30} color={qj.themeColor}/>
                                 <Text style={{color:'white',fontSize:18}}>{this.state.top4.tit2}</Text>
                                 <Text style={{color:'white',fontSize:18}}>{this.state.top4.xia2}</Text>
                             </View>
                             <View style={{alignItems:'center'}}>
                                 <Ionicons name={'ios-flower'} size={30} color={qj.themeColor}/>
                                 <Text style={{color:'white',fontSize:18}}>{this.state.top4.tit3}</Text>
                                 <Text style={{color:'white',fontSize:18}}>{this.state.top4.xia3}</Text>
                             </View>
                         </View>
                      </ImageBackground>
                      {/* 当年能耗 */}
                      <View style={{flexDirection:'row',backgroundColor:qj.themehui,marginTop:8,alignItems:'center',padding:10}}>
                          <Ionicons name={'ios-information-circle-outline'} size={30} color={qj.themeColor}/>
                          <Text style={{fontSize:20,marginLeft:10,fontWeight:'600',color:qj.themeColor}}>{lan.nyxh}</Text>
                      </View>
                      {/* 4 tab */}
               <View style={{flexDirection:'row',justifyContent:'space-between',flexWrap:'wrap'}}>
                     {
                  lan.ftab.map((item,index)=>{
            return(
            <View style={{width:"49%",height:qj.h*.1,backgroundColor:qj.themehui,marginTop:10,alignItems:'center',justifyContent:'center'}}>
              <View style={{flexDirection:'row'}}>
                  <Text style={{fontSize:22,marginLeft:5,color:qj.themeColor}}>{item.title}</Text>
              </View>

              <View style={{flexDirection:'row',alignItems:'center',marginTop:5}}>
              <Text style={{fontSize:20,color:qj.themehui2}}>{item.num}</Text>
              <Text style={{marginLeft:5,color:qj.themehui2}}>{item.dw}</Text>
              </View>
             
             </View>
            )
                   })
                     }
                
                </View>
       {/*  tubiao*/}
       <View style={{marginTop:10}}>
       <Echarts option={option} height={300}/>
       </View>
      <View style={{marginTop:18}}>
       <Echarts option={option2} height={300} />
       </View>
                {/* btm */}
                <View style={{width:qj.w*.95,alignItems:'center',justifyContent:'center',marginTop:15}}>
         <Text style={{color:qj.themehui,}}>-------- This is the bottom --------</Text>
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
                                  in:index,
                                  show:true
                                })
                                this.get()
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
export default ManageNengHao