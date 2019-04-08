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

class ManageHarmonic extends Component {
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

        const xAxisData = [];
        const data1 = [];
        const data2 = [];
        for (var i = 10; i < 100; i++) {
            xAxisData.push('current' + i);
            data1.push((Math.sin(i / 5) * (i / 5 -10) + i / 6) * 10);
            data2.push((Math.cos(i / 5) * (i / 5 -10) + i / 6) * 10);
        }
        this.option = {
            // title: {
            //     text: '柱状图动画延迟'
            // },
            legend: {
                data: ['voltage', 'current'],
                align: 'left'
            },
            toolbox: {
                // y: 'bottom',
                feature: {
                    magicType: {
                        type: ['stack', 'tiled']
                    },
                    dataView: {},
                    // saveAsImage: {
                    //     pixelRatio: 2
                    // }
                }
            },
            tooltip: {},
            xAxis: {
                data: xAxisData,
                silent: false,
                splitLine: {
                    show: false
                }
            },
            yAxis: {
            },
            series: [{
                name: 'voltage',
                type: 'bar',
                data: data1,
                animationDelay: function (idx) {
                    return idx * 10;
                }
            }, {
                name: 'current',
                type: 'bar',
                data: data2,
                animationDelay: function (idx) {
                    return idx * 10 + 100;
                }
            }],
            animationEasing: 'elasticOut',
            animationDelayUpdate: function (idx) {
                return idx * 5;
            }
        };

        const xAxisData2 = [];
        const data12 = [];
        const data22 = [];
        for (var j = 30; j < 100; j++) {
            xAxisData2.push('current' + j);
            data12.push((Math.sin(j / 5) * (j / 5 -10) + j / 6) * 10);
            data22.push((Math.cos(j / 5) * (j / 5 -10) + j / 6) * 10);
        }
        this.option2 = {
            // title: {
            //     text: '柱状图动画延迟'
            // },
            legend: {
                data: ['voltage', 'current'],
                align: 'left'
            },
            toolbox: {
                // y: 'bottom',
                feature: {
                    magicType: {
                        type: ['stack', 'tiled']
                    },
                    dataView: {},
                    // saveAsImage: {
                    //     pixelRatio: 2
                    // }
                }
            },
            tooltip: {},
            xAxis: {
                data: xAxisData2,
                silent: false,
                splitLine: {
                    show: false
                }
            },
            yAxis: {
            },
            series: [{
                name: 'voltage',
                type: 'bar',
                data: data12,
                animationDelay: function (idx) {
                    return idx * 10;
                }
            }, {
                name: 'current',
                type: 'bar',
                data: data22,
                animationDelay: function (idx) {
                    return idx * 10 + 100;
                }
            }],
            animationEasing: 'elasticOut',
            animationDelayUpdate: function (idx) {
                return idx * 6;
            }
        };
              
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
                      <TouchableOpacity style={ys.xzk} onPress={()=>{
                          this.setState({visible:true})
                      }}>
                       <Text style={{width:'85%',fontSize:18,color:qj.themeColor,}}>{
                           this.state.dizhi[this.state.in].name
                           }</Text>
                      <Ionicons name={'ios-arrow-down'} size={25} color={qj.themehui2}/>
                      </TouchableOpacity>
     </View>
     <ScrollView contentContainerStyle={{width:qj.w*.95}} showsVerticalScrollIndicator={false}>
     <Text style={ys.ec_title}>Harmonic distortion rate</Text>
    <View style={{marginTop:20}}>
<Echarts option={this.option} height={300}/>
</View>

<Text style={ys.ec_title}>Harmonic occupancy</Text>
    <View style={{marginTop:20}}>
<Echarts option={this.option2} height={300}/>
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
      ec_title:{
        textAlign:'center',marginTop:10,fontSize:16,fontWeight:'600'
    },
})
export default ManageHarmonic