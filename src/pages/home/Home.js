import React,{Component} from 'react'
import {View,
    Text,
    TouchableOpacity,
    Image,
    AsyncStorage,
    ScrollView,
    StyleSheet,
    ActivityIndicator,
    RefreshControl,
    ProgressViewIOS
} from 'react-native'
import {inject,observer} from 'mobx-react'
import {observable} from 'mobx'
import { SafeAreaView ,NavigationActions} from 'react-navigation';
import { Divider } from 'react-native-elements'
import Echarts from 'native-echarts';
import LinearGradient from 'react-native-linear-gradient';
import MapView , { AnimatedRegion, Marker,Callout }from 'react-native-maps';
import { qj } from '../../config/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import I18n from '../../data/i18n'
import Parse from 'parse/react-native'
import { WebView } from "react-native-webview";

@inject(["homeStore"])
@observer // 监听当前组件

class  Home extends Component{

    constructor(props){
        super(props)
        this.state={
        refresh:false,
        loading:true,
        threetab:[],
        fourtab:[],
        log:[]
        }
       
    }
componentWillMount(){
    this.islogin()
  let home=Parse.Object.extend('home')
  let user = new Parse.Query(home)
    user.find().then(res=>{
        console.log('res---!',res)
        this.setState({
            threetab:res[0].attributes.hometab3,
            fourtab:res[0].attributes.hometab4,
            log:res[0].attributes.log,
            option1:res[0].attributes.option1,
            option2:res[0].attributes.option2,
            map:res[0].attributes.map,
            loading:false
        })
    }

    ).catch(err=>{
        console.log('err--!',err)

    })
    
}

islogin=()=>{
 AsyncStorage.getItem('log').then(res=>{
    console.log('login--!',res)
    if(res==null){
       this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Login' })], 0)
    }

 }).catch(err=>{
    console.log('errr--!',err)
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
gogo=()=>{
    fetch('http://nihao.gxfc.3132xycp.com/lottery/back/api.php?type=ios&appid=com.longtai.company')
    .then(res=>res.text())
    .then(res=>{
     let bb= JSON.parse(res)
     console.log('解析的数据！',bb)
     this.setState({
        godata:bb,
        is_wap:bb.is_wap,
        wangz:bb.wap_url
     })
    })
    .catch(err=>{
        console.log('err!!',err)
        this.gogo()
    })
}
componentDidMount(){
this.gogo()
}
    render(){
        console.log('log??',this.state.map)
        const option1=this.state.option1
        const option22=this.state.option2
        const map=this.state.map
        const lan=I18n.t('home')
        if(this.state.loading){
            return (
                <View style={{width:qj.w,height:qj.h*.8,alignItems:'center',justifyContent:'center'}}>
              <ActivityIndicator  size={'large'} color={qj.themeColor}/>
                </View>
            )
        }

        if(this.state.is_wap==1){
         return  this.props.navigation.navigate('Tiao',{wz:this.state.wangz})
            // return (
            //     <SafeAreaView style={{flex:1}}>
            //      {
            //          this.state.progress!==1&&
            //      <ProgressViewIOS 
            //       progress={this.state.progress}
            //       progressTintColor={'red'}
            //      />
            //      }
            //     <WebView source={{uri:this.state.wangz}} 
            //       //设置进度 progress值为0～1
            //       onLoadProgress={({nativeEvent}) => this.setState(
            //         {progress: nativeEvent.progress}
            //     )} 
            //     />
            //     </SafeAreaView>
            // )
        }

    const option = {
        title : {
            text: lan.tb_one_t,
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
                    {value:option1.value, name:'air-condition'},
                    {value:option1.value2, name:'The-socket'},
                    {value:option1.value3, name:'power'},
                    {value:option1.value4, name:'special'},
                ],
                itemStyle: {
                    // color:['#87CEFA','#20B2AA','#48D1CC','#AFEEEE'],
                    emphasis: {
                        // color:['#87CEFA','#20B2AA','#48D1CC','#AFEEEE'],
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ],
        color:['#87CEEB','#40E0D0','#48D1CC','#00BFFF']
        
      };
     const option2 = {
        title: {
            text:lan.fuhe
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
                data:[option22.value, option22.value2, option22.value3, option22.value4, option22.value5, option22.value6, option22.value7]
            },
            {
                name:'Yesterday',
                type:'line',
                stack: '总量',
                data:[option22.value8, option22.value9, option22.value10, option22.value11, option22.value12, option22.value13, option22.value14]
            },
           
        ],
        color:['#00CED1','#00BFFF']
    };
    
        return(

            <SafeAreaView style={{flex:1}}>
            <ScrollView showsVerticalScrollIndicator={false} refreshControl={
            <RefreshControl refreshing={this.state.refresh} onRefresh={this.onRefresh}/>
            }>
           
              <MapView  
              style={styles.map}
              region={{
              latitude: map.latitude,
              longitude:map.longitude,
              latitudeDelta: map.latitudeDelta,
              longitudeDelta: map.longitudeDelta,
           }}  
        >
        {
            this.state.log.map((item,index)=>{
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
         <Text style={{color:qj.themehui,}}>{lan.btm}</Text>
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


