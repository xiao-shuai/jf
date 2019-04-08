import React,{Component} from 'react'
import {View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    StyleSheet,
    ActivityIndicator,
    RefreshControl,
} from 'react-native'
import {inject,observer} from 'mobx-react'
import {observable} from 'mobx'
import { SafeAreaView } from 'react-navigation';
import { Divider } from 'react-native-elements'
import Echarts from 'native-echarts';
import LinearGradient from 'react-native-linear-gradient';
import MapView , { AnimatedRegion, Marker,Callout }from 'react-native-maps';
import { qj } from '../../config/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {lan,setLanguage} from '../../data/i18n'
import Parse from 'parse/react-native'

@inject(["homeStore"])
@observer // 监听当前组件

class  Home extends Component{

    constructor(props){
        super(props)
        this.state={
        refresh:false,
        loading:true,
        threetab:[],
        fourtab:[]
        }
        this.log=[
            {
                latitude: 37.78825,
                longitude: -122.4324,
                title:'Building A',

                title2:'Daily',
                title3:'Month',
                title4:'Years',
                title5:'Total',

                title2_num:'1000kw',
                title3_num:'2100kw',
                title4_num:'7900kw',
                title5_num:'11333kw',
            },
            {
                latitude: 37.78825,
                longitude: -122.4,
                title:'Building B',

                title2:'Daily',
                title3:'Month',
                title4:'Years',
                title5:'Total',

                title2_num:'2200kw',
                title3_num:'2800kw',
                title4_num:'8600kw',
                title5_num:'11633kw',
            },
            {
                latitude: 37.78825,
                longitude: -122.42,
                title:'Building C',

                title2:'Daily',
                title3:'Month',
                title4:'Years',
                title5:'Total',

                title2_num:'1300kw',
                title3_num:'2100kw',
                title4_num:'8100kw',
                title5_num:'11433kw',
            }
        ]
    }
componentWillMount(){
  let userdata=Parse.Object.extend('home')
  let user = new Parse.Query(userdata)
    user.find().then(res=>{
        console.log('res---!',res)
    
        this.setState({
            threetab:res[0].attributes.hometab3,
            fourtab:res[0].attributes.hometab4,
            loading:false
        })
    }

    ).catch(err=>{
        console.log('err--!',err)
    })
}

onRefresh=()=>{
    this.setState({refresh:true})
    let userdata=Parse.Object.extend('home')
  let user = new Parse.Query(userdata)
    user.find().then(res=>{
        console.log('res---!',res)
    
        this.setState({
            threetab:res[0].attributes.hometab3,
            fourtab:res[0].attributes.hometab4,
            loading:false,
            refresh:false
        })
    }

    ).catch(err=>{
        console.log('err--!',err)
    })
}
    render(){
        if(this.state.loading){
            return (
                <View style={{width:qj.w,height:qj.h*.8,alignItems:'center',justifyContent:'center'}}>
              <ActivityIndicator  size={'large'} color={qj.themeColor}/>
                </View>
            )
        }
    const option = {
        title : {
            text: 'Energy',
            subtext: '(KWH)',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['air-condition','The-socket','power','special']
        },
        series : [
            {
                name: 'Total energy consumption',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'air-condition'},
                    {value:310, name:'The-socket'},
                    {value:234, name:'power'},
                    {value:135, name:'special'},
                   
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
      };
     const option2 = {
        title: {
            text: 'Electricity curve'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:['Today,','Yesterday,'],
            right:10
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
            boundaryGap: false,
            data: ['06:00','07:00','08:00','09:00','10:00','11:00','12:00']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name:'Today',
                type:'line',
                stack: '总量',
                data:[120, 132, 101, 134, 90, 230, 210]
            },
            {
                name:'Yesterday',
                type:'line',
                stack: '总量',
                data:[220, 182, 191, 234, 290, 330, 310]
            },
           
        ]
    };
    
        return(
            <SafeAreaView style={{flex:1}}>
            <ScrollView showsVerticalScrollIndicator={false} refreshControl={
            <RefreshControl refreshing={this.state.refresh} onRefresh={this.onRefresh}/>
            }>
           
              <MapView  
              style={styles.map}
              region={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
           }}  
        >
        {
            this.log.map((item,index)=>{
             return(
          
          <Marker coordinate={{
             latitude: item.latitude,
             longitude:item.longitude,
           }} 
           pinColor={qj.themeColor} key={index} >
       <Callout style={styles.callout} 
        tooltip={true}>
        <Text style={styles.call_tit}>{item.title}</Text>
        <View style={styles.call_v}>
            <Text style={{color:'white'}}>{item.title2}:</Text>
            <Text style={styles.call_num}>{item.title2_num}</Text>
        </View>
        <View style={styles.call_v}>
            <Text style={{color:'white'}}>{item.title3}:</Text>
            <Text style={styles.call_num}>{item.title3_num}</Text>
        </View>
        <View style={styles.call_v}>
            <Text style={{color:'white'}}>{item.title4}:</Text>
            <Text style={styles.call_num}>{item.title4_num}</Text>
        </View>
        <View style={styles.call_v}>
            <Text style={{color:'white'}}>{item.title5}:</Text>
            <Text style={styles.call_num}>{item.title5_num}</Text>
        </View>
         </Callout>
       </Marker>
                 
             )
            })
        }
                
        </MapView>
        {/* 3 个tab显示 */}
        <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:2}}>
        {
            this.state.threetab.map((item,index)=>{
               return(
                <LinearGradient colors={['#74ebd5', '#ACB6E5',]} style={styles.three} key={index}>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{color:'white',fontWeight:'500',fontSize:20}}>
                    {item.title}
                    </Text>
                    
                    </View>
                    <Text style={{color:'white'}}>
                      ({item.dw})
                    </Text>
                    <Text style={{color:qj.themebai,fontSize:20}}>
                       {item.num}
                    </Text>
        
                </LinearGradient> 
               )
            })
        }
       </View>

       {/* 4个tab  */}
       <View style={styles.fourbig}>
           {
               this.state.fourtab.map((item,index)=>{
            return(
            <View style={styles.four} key={index}>
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
       {/* echarts  */}
        <View style={{marginTop:10}}>
 
            <Echarts option={option} height={300}  />
      </View>
       {/* echart 2 */}
      
       <Echarts option={option2} height={300}/>
       {/* btm */}
       <View style={{width:qj.w*.95,alignItems:'center',justifyContent:'center',marginTop:15}}>
         <Text style={{color:qj.themehui,}}>-------- This is the bottom --------</Text>
       </View>
            </ScrollView>
            </SafeAreaView>
        )
    }

}

const styles=StyleSheet.create({
    four:{
        width:"49%",height:qj.h*.1,backgroundColor:qj.themehui,marginTop:10,alignItems:'center',justifyContent:'center'
    },
    fourbig:{
        flexDirection:'row',justifyContent:'space-between',flexWrap:'wrap'
    },
     three:{
        height: 80,
        width:qj.w*.33,
        justifyContent:'center',
        padding:5,
        alignItems:'center'
     },
    call_num:{
        color:qj.themeColor,fontSize:18,marginLeft:5,fontWeight:'600',marginLeft:5
    },
    call_v:{
        flexDirection:'row',marginTop:3,alignItems:'center'
    },
    call_tit:{
        fontSize:18,color:'white',fontWeight:'600'
    },
    callout:{
        width:qj.w*.5,
        backgroundColor:qj.themehui2,
        padding:6,
        opacity:.7
    },
      map: {
        width:qj.w,
        height:qj.h*.35
      },
      
})
export default Home


