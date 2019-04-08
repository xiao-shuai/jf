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
import ScrollableTabView, {ScrollableTabBar,} from 'react-native-scrollable-tab-view'
class ManageZhilu extends Component {
    constructor(props){
        super(props)
        this.state={
            show:true,
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
        this.six=[
            {
                title:'Today',
                num:'2345.66',
                dw:'kwh',
                zt:'Yesterday,'
            },
            {
                title:'Cumulative',
                num:'2345.66',
                dw:'kwh',
                zt:'Yesterday,'
            },
            {
                title:'Total year',
                num:'2345.66',
                dw:'kwh',
                zt:'Yesterday,'
            },
            {
                title:'Cost',
                num:'2345.66',
                dw:'Dollar',
                zt:'Yesterday,'
            },
        ] 
       this.option1={
        xAxis: {
            type: 'category',
            data: ['branch1', 'branch2', 'branch3', 'branch4', 'branch5']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [120, 200, 150, 80, 70],
            type: 'bar'
        }]
       }
       this.option12={
        legend:{
            data:['today','yesterday']
        },
        xAxis: {
            type: 'category',
            data: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
            name:'today',    
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true
        },
             {
            name:'yesterday',            
            data: [720, 632, 601, 734, 1890, 1930, 1820],
            type: 'line',
            smooth: true
        }
        ]
       }

const xAxisData = [];
const data1 = [];
const data2 = [];
for (var i = 0; i < 100; i++) {
    xAxisData.push('branch' + i);
    data1.push((Math.sin(i / 5) * (i / 5 -10) + i / 6) * 5);
    data2.push((Math.cos(i / 5) * (i / 5 -10) + i / 6) * 5);
}
 this.option2 = {
    // title: {
    //     text: '柱状图动画延迟'
    // },
    legend: {
        data: ['power', 'socket'],
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
        name: 'power',
        type: 'bar',
        data: data1,
        animationDelay: function (idx) {
            return idx * 10;
        }
    }, {
        name: 'socket',
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




const seriesLabel = {
    normal: {
        show: true,
        textBorderColor: '#333',
        textBorderWidth: 2
    }
}
this.option22={
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: ['power', 'socket', 'special'],
        top:15
    },
    grid: {
        left: qj.w*.18
    },
    
    xAxis: {
        type: 'value',
        // name: 'Days',
        axisLabel: {
            formatter: '{value}'
        }
    },
    yAxis: {
        type: 'category',
        inverse: true,
        data: ['power', 'socket', 'special'],
        axisLabel: {
            // formatter: function (value) {
            //     return '{' + value + '| }\n{value|' + value + '}';
            // },
            margin: 20,
            rich: {
                value: {
                    lineHeight: 30,
                    align: 'center'
                },
                Sunny: {
                    height: 40,
                    align: 'center',
                    // backgroundColor: {
                    //     image: weatherIcons.Sunny
                    // }
                },
                Cloudy: {
                    height: 40,
                    align: 'center',
                    // backgroundColor: {
                    //     image: weatherIcons.Cloudy
                    // }
                },
                Showers: {
                    height: 40,
                    align: 'center',
                    // backgroundColor: {
                    //     image: weatherIcons.Showers
                    // }
                }
            }
        }
    },
    series: [
        {
            name: 'power',
            type: 'bar',
            data: [165, 170, 30],
            label: seriesLabel,
            markPoint: {
                symbolSize: 1,
                symbolOffset: [0, '50%'],
                label: {
                   normal: {
                        // formatter: '{a|{a}\n}{b|{b} }{c|{c}}',
                        backgroundColor: 'rgb(242,242,242)',
                        borderColor: '#aaa',
                        borderWidth: 1,
                        borderRadius: 4,
                        padding: [4, 10],
                        lineHeight: 26,
                        // shadowBlur: 5,
                        // shadowColor: '#000',
                        // shadowOffsetX: 0,
                        // shadowOffsetY: 1,
                        position: 'right',
                        distance: 20,
                        rich: {
                            a: {
                                align: 'center',
                                color: '#fff',
                                fontSize: 18,
                                textShadowBlur: 2,
                                textShadowColor: '#000',
                                textShadowOffsetX: 0,
                                textShadowOffsetY: 1,
                                textBorderColor: '#333',
                                textBorderWidth: 2
                            },
                            b: {
                                 color: '#333'
                            },
                            c: {
                                color: '#ff8811',
                                textBorderColor: '#000',
                                textBorderWidth: 1,
                                fontSize: 22
                            }
                        }
                   }
                },
                data: [
                    {type: 'max', name: 'max days: '},
                    {type: 'min', name: 'min days: '}
                ]
            }
        },
        {
            name: 'socket',
            type: 'bar',
            label: seriesLabel,
            data: [150, 105, 110]
        },
        {
            name: 'special',
            type: 'bar',
            label: seriesLabel,
            data: [220, 82, 63]
        }
    ]
}

this.option3={
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data:['electricity','gas','water']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'electricity',
            type:'bar',
            data:[320, 332, 301, 334, 390, 330, 320]
        },
        {
            name:'gas',
            type:'bar',
            stack: '广告',
            data:[120, 132, 101, 134, 90, 230, 210]
        },
        {
            name:'water',
            type:'bar',
            stack: '广告',
            data:[220, 182, 191, 234, 290, 330, 310]
        },

    ]
}   

this.option32={
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data:['electricity','gas','water']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis:  {
        type: 'value'
    },
    yAxis: {
        type: 'category',
        data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    series: [
        {
            name: 'electricity',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'insideRight'
                }
            },
            data: [320, 302, 301, 334, 390, 330, 320]
        },
        {
            name: 'gas',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'insideRight'
                }
            },
            data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
            name: 'water',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'insideRight'
                }
            },
            data: [220, 182, 191, 234, 290, 330, 310]
        },
    ]  
}

this.option4={
    
    // title: {
    //     text: 'Step Line'
    // },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:['In this issue', 'At the same time'],
        top:15
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
            name:'In this issue',
            type:'line',
            step: 'start',
            data:[120, 132, 101, 134, 90, 230, 210]
        },
        {
            name:'At the same time',
            type:'line',
            step: 'middle',
            data:[220, 282, 201, 234, 290, 430, 410]
        },

    ]
}

this.option42={
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        x: 'left',
        data:['this issue','Same time',]
    },
    series: [
        {
            name:'ratio',
            type:'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[
                {value:335, name:'this issue'},
                {value:310, name:'Same time'},
                
            ]
        }
    ]
}
this.biaoge=[
    {
     title:'Month',
     yf:[
     {
       name:'Mon'
     },
     {
        name:'Tue'
      },
      {
        name:'Wed'
      },
      {
        name:'Thu'
      },
      {
        name:'Fri'
      },
      {
        name:'Sat'
      },
      {
        name:'Sun'
      },
    ], 
    },
    {
        title:'this issue(kwh)',
        yf:[
        {
          name:'1.00'
        },
        {
            name:'1.00'
         },
         {
            name:'1.00'
         },
         {
            name:'1.00'
         },
         {
            name:'1.00'
         },
         {
            name:'1.00'
         },
         {
            name:'1.00'
         },
       ], 
   },
      {
        title:'Same time',
        yf:[
        {
          name:'1.10'
        },
        {
            name:'1.20'
         },
         {
            name:'1.30'
         },
         {
            name:'1.40'
         },
         {
            name:'1.50'
         },
         {
            name:'1.60'
         },
         {
            name:'1.70'
         },
       ], 
       } ,
       {
        title:'Compared',
        yf:[
        {
          name:'10%'
        },
        {
            name:'20%'
         },
         {
            name:'30%'
         },
         {
            name:'40%'
         },
         {
            name:'1.50%'
         },
         {
            name:'1.60%'
         },
         {
            name:'1.70%'
         },
       ], 
       }         
]
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

            {/* tab */}
            <ScrollableTabView>
                <ScrollView tabLabel="General">
                    <View style={ys.tabtitle}>
                        <Text>Day load accumulation</Text>
                    </View>
         <View style={{flexDirection:'row',justifyContent:'space-between',flexWrap:'wrap'}}>
           {
               this.six.map((item,index)=>{
            return(
            <View style={{width:"49%",height:qj.h*.1,backgroundColor:qj.themehui,marginTop:10,alignItems:'center',justifyContent:'center'}}>
              <View style={{flexDirection:'row'}}>
                  <Ionicons name={'ios-globe'} size={26} color={qj.themeColor}/>
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
                 <Text style={ys.ec_title}>Statistical analysis of TOP5 energy consumption</Text>
                  <Echarts option={this.option1} height={300}/>
                  <Text style={ys.ec_title}>Energy consumption top5 daily load</Text>
                  <View style={{marginLeft:'2.5%'}}>

                 <Echarts option={this.option12} height={300} />
                 </View>
                </ScrollView>
                {/* end  */}
                <ScrollView tabLabel="Itemized">
                <View style={ys.tabtitle}>
                        <Text>Day load accumulation</Text>
                    </View>
     <View style={{flexDirection:'row',justifyContent:'space-between',flexWrap:'wrap'}}>
           {
               this.six.map((item,index)=>{
            return(
            <View style={{width:"49%",height:qj.h*.1,backgroundColor:qj.themehui,marginTop:10,alignItems:'center',justifyContent:'center'}}>
              <View style={{flexDirection:'row'}}>
                  <Ionicons name={'ios-globe'} size={26} color={qj.themeColor}/>
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
          <Text style={ys.ec_title}>Trends and proportions</Text>
            <Echarts option={this.option2} height={300}/>
         <Text style={ys.ec_title}>Top5 energy consumption analysis and statistics</Text>
            <Echarts option={this.option22} height={300}/>
                </ScrollView>
                {/* 2end */}
                <ScrollView tabLabel="Energy">
                <View style={ys.tabtitle}>
                        <Text>Day load accumulation</Text>
                    </View>
      <View style={{flexDirection:'row',justifyContent:'space-between',flexWrap:'wrap'}}>
           {
               this.six.map((item,index)=>{
            return(
            <View style={{width:"49%",height:qj.h*.1,backgroundColor:qj.themehui,marginTop:10,alignItems:'center',justifyContent:'center'}}>
              <View style={{flexDirection:'row'}}>
                  <Ionicons name={'ios-globe'} size={26} color={qj.themeColor}/>
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
          <Text style={ys.ec_title}>Classified stacking cost  (usd)</Text>
          <Echarts option={this.option3} height={300}/>
          <Text style={ys.ec_title}>Trends in costs  (usd)</Text>
          <Echarts option={this.option32} height={300}/>
                </ScrollView>
                {/* 3 end  */}
                <ScrollView tabLabel="Analysis">
                <View style={ys.tabtitle}>
                        <Text>Day load accumulation</Text>
                </View>

          <View style={{flexDirection:'row',justifyContent:'space-between',flexWrap:'wrap'}}>
           {
               this.six.map((item,index)=>{
            return(
            <View style={{width:"49%",height:qj.h*.1,backgroundColor:qj.themehui,marginTop:10,alignItems:'center',justifyContent:'center'}}>
              <View style={{flexDirection:'row'}}>
                  <Ionicons name={'ios-globe'} size={26} color={qj.themeColor}/>
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
          <Text style={ys.ec_title}>Trends and proportions</Text>
         <Echarts option={this.option4} height={300}/>
         <Text style={ys.ec_title}>The ratio of the current period to the same period</Text>
         <Echarts option={this.option42} height={300}/>
         {/* tubiao */}
         <View>
             {

             }
         </View>
                </ScrollView>
            </ScrollableTabView>
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
    ec_title:{
        textAlign:'center',marginTop:10,fontSize:16,fontWeight:'600'
    },
    tabtitle:{
        width:qj.w,alignItems:'center',padding:10,backgroundColor:qj.themehui,marginTop:5
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
      dizhi:{
        width:'90%',
        // height:100,
        padding:10,
        marginTop:10,
        backgroundColor:qj.themeColor
      },
})
export default ManageZhilu