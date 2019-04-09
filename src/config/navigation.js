import React from 'react';
import { 
    createBottomTabNavigator,
     createAppContainer,
     createStackNavigator } from 'react-navigation';

import {Home,Mine,Remote,Manage,
  HomeDetail,ManagePic,ManageData,
  ManageFan,ManageNengHao,ManageAnalyze,
  ManageZhilu,ManagePower,ManageHarmonic,
  ManageParameter,ManageMonitor,About,FeedBack,
  Login

} from  '../pages/all';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {qj} from './style'

const BottomTab=createBottomTabNavigator(
    {
      home:Home,
      // login:Login,
      manage:Manage,
      remote:Remote,
      mine:Mine
    },
    {
     initialRouteName: 'home',
     defaultNavigationOptions:({ navigation })=>({
         tabBarIcon:({focused, horizontal, tintColor})=>{
            const { routeName } = navigation.state;
            let iconName;
            if (routeName === 'home') {
                iconName ='ios-home';
              } else if (routeName === 'manage') {
                iconName = 'ios-bookmarks';
              }else if(routeName==='remote'){
               iconName='ios-contacts'
              }else{
                  iconName='ios-person'
              }
              return <Ionicons name={iconName} size={horizontal ? 20 : 25} 
          color={focused?qj.themeColor:qj.themehui} />;
         }
     }),
     tabBarOptions: {
        activeTintColor:qj.themeColor,
        inactiveTintColor:qj.themehui,
      },
    }
)
const AllStack=createStackNavigator({
     Btm:{
        screen:BottomTab,
        navigationOptions:()=>({
            header:null,
            headerBackTitle:null,
        })
     },
     Home:{
      screen:Home,
      
   },
     HomeDetail:{
        screen:HomeDetail,
        navigationOptions:()=>({
            title:'Detail'
        })
     },
     ManagePic:{
      screen:ManagePic,
      navigationOptions:()=>({
          title:'Equipment diagram'
      })
   },
   ManageData:{
    screen:ManageData,
    navigationOptions:()=>({
        title:'Equipment data'
    })
 },
 ManageFan:{
  screen:ManageFan,
  navigationOptions:()=>({
      title:'Fan data '
  })
},
ManageNengHao:{
  screen:ManageNengHao,
  navigationOptions:()=>({
      title:'The energy consumption'
  })
},
ManageAnalyze:{
  screen:ManageAnalyze,
  navigationOptions:()=>({
      title:'ManageAnalyze'
  })
},
ManageZhilu:{
  screen:ManageZhilu,
  navigationOptions:()=>({
      title:'Branch'
  })
},
ManagePower:{
  screen:ManagePower,
  navigationOptions:()=>({
      title:'ManagePower'
  })
},
ManageHarmonic:{
  screen:ManageHarmonic,
  navigationOptions:()=>({
      title:'Harmonic'
  })
},
ManageParameter:{
  screen:ManageParameter,
  navigationOptions:()=>({
      title:'Equipment parameter'
  })
},

ManageMonitor:{
  screen:ManageMonitor,
  navigationOptions:()=>({
      title:'Equipment monitoring'
  })
},
About:{
  screen:About,
  navigationOptions:()=>({
      title:'About'
  })
},
FeedBack:{
  screen:FeedBack,
  navigationOptions:()=>({
      title:'FeedBack'
  })
},
Login:{
  screen:Login,
  navigationOptions:()=>({
    // title:'FeedBack'
    header:null

})
},

})

export default createAppContainer(AllStack)
