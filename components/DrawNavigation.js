import 'react-native-gesture-handler';
import React, { Component, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { NavigationContainer } from '@react-navigation/native';
import {createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { StackActions } from '@react-navigation/native';



    
import  Ionicons  from 'react-native-vector-icons/Ionicons';

import Home from './Home';
import SignOut from './SignOut';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Account from './Account';
import Account_Fav from './Account_Fav';
import Account_Likes from './Account_Likes';
import Account_Reviews from './Account_Reviews';
import AddReview from './AddReview';
import AddReview_Tab from './AddReview_Tab';
import Search from './Search';
import Locations from './Locations';
import EditAccount from './EditAccount';
import Location_reviews from './Location-reviews';
import EditReview from './EditReview';



const stack = createStackNavigator();

const LocationNavigator = () => {

    return (
            
        <stack.Navigator  screenOptions={{headerShown: false}}>
            <stack.Screen name="Locations" component={Locations} />
            <stack.Screen name="Reviews" component={Location_reviews} />
            <stack.Screen name="AddReview" component={AddReview} />
        </stack.Navigator>
    );

}
const AccountNavigator = () => {

    return (
            
        <stack.Navigator  screenOptions={{headerShown: false}}>
            <stack.Screen name="Account" component={Account} />
            <stack.Screen name="Favourites" component={Account_Fav} />
            <stack.Screen name="Likes" component={Account_Likes} />
            <stack.Screen name="Edit" component={EditAccount} />
            <stack.Screen name="Review" component={Account_Reviews} />
            <stack.Screen name="EditReview" component={EditReview} />
            
        </stack.Navigator>
    );

}
const SignNavigator = () => {

    return (
            
        <stack.Navigator  screenOptions={{headerShown: false}}>
            <stack.Screen name="SignIn" component={SignIn} />
            <stack.Screen name="SignUp" component={SignUp} />
            <stack.Screen name="SignOut" component={SignOut} />

        </stack.Navigator>
    );
}


const Tab = createBottomTabNavigator()

const TabNavigator = () => {
    return (
            
              <Tab.Navigator
                screenOptions={({ route }) => ({
                  tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                      iconName = focused ? 'home' : 'home-outline';
                    }else if (route.name === 'Locations') {
                      iconName = focused ? 'location' : 'location-outline';
                    } else if (route.name === 'Add Review') {
                      iconName = focused ? 'add-circle' : 'add-circle-outline';
                    }else if (route.name === 'Search'){
                      iconName = focused ? 'search-circle' : 'search-circle-outline';
                    }
        
                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color}/>;
                  },
                })} 
                tabBarOptions={{
                  activeTintColor: 'deepskyblue',
                  inactiveTintColor: 'gray',
                }}
            >
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Locations" component={LocationNavigator} />
                <Tab.Screen name="Add Review" component={AddReview_Tab} />
                <Tab.Screen name="Search" component={Search} />
              </Tab.Navigator>
            
    );
}


const draw = createDrawerNavigator();

const DrawNavigation =  () => {
  
  /*const [SignInOut, signInOut] = useState(null);
  useEffect(() => {
    LoggedIn();
  })
  LoggedIn = async ()  =>{
  
    var value = null;
    value = await AsyncStorage.getItem('@session_token');
      
        signInOut(value);
        LoggedIn();

  }
    
  if(SignInOut === null){
    return (
      
        <draw.Navigator screenOptions={{headerShown: true, gesturesEnabled: true}} initialRouteName="Coffida">
          <draw.Screen  name="Coffida"  onPress = {() => this.props.navigation.dispatch(StackActions.popToTop())} component={TabNavigator} options={{drawerIcon: ({focused, size}) => {
              return <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={focused ? 'deepskyblue' : 'grey'}/>;
          }}} />
        <draw.Screen name="SignIn" component={SignNavigator} options={{drawerIcon: ({focused, size}) => {
                return <Ionicons name={focused ? 'log-in' : 'log-in-outline'} size={size} color={focused ? 'deepskyblue' : 'grey'}/>;
          }}} />
            
        </draw.Navigator>
        

      
      
    );
  }
  else{
    return (
      
    
        <draw.Navigator screenOptions={{headerShown: true, gesturesEnabled: true}} initialRouteName="Coffida">
          <draw.Screen  name="Coffida"  onPress = {() => navigation.dispatch(StackActions.popToTop())} component={TabNavigator} options={{drawerIcon: ({focused, size}) => {
              return <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={focused ? 'deepskyblue' : 'grey'}/>;
          }}} />
          <draw.Screen name="Account" component={AccountNavigator} options={{drawerIcon: ({focused, size}) => {
                return <Ionicons name={focused ? 'person-circle' : 'person-circle-outline'} size={size} color={focused ? 'deepskyblue' : 'grey'}/>;
          }}}  />
          <draw.Screen name="SignOut" component={SignOut} options={{drawerIcon: ({focused, size}) => {
                return <Ionicons name={focused ? 'log-out' : 'log-out-outline'} size={size} color={focused ? 'deepskyblue' : 'grey'}/>
                
          }}}  />
          
        </draw.Navigator>
        
    );}*/
    return (
      
        <draw.Navigator screenOptions={{headerShown: true, gesturesEnabled: true}} initialRouteName="Coffida">
        <draw.Screen  name="Coffida"  onPress = {() => this.props.navigation.dispatch(StackActions.popToTop())} component={TabNavigator} options={{drawerIcon: ({focused, size}) => {
            return <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={focused ? 'deepskyblue' : 'grey'}/>;
        }}} />
      <draw.Screen name="SignIn/Out" component={SignNavigator} options={{drawerIcon: ({focused, size}) => {
              return <Ionicons name={focused ? 'log-in' : 'log-in-outline'} size={size} color={focused ? 'deepskyblue' : 'grey'}/>;
        }}} />
        <draw.Screen name="Account" component={AccountNavigator} options={{drawerIcon: ({focused, size}) => {
                return <Ionicons name={focused ? 'person-circle' : 'person-circle-outline'} size={size} color={focused ? 'deepskyblue' : 'grey'}/>;
          }}}  />
          
        </draw.Navigator>
      );
    
    
}
  
export default  DrawNavigation;









