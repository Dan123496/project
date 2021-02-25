import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {View} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
//import { createStackNavigator } from '@react-navigation/stack';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import {createDrawerNavigator } from '@react-navigation/drawer';


//import  Ionicons  from 'react-native-vector-icons/Ionicons';
//import AsyncStorage from '@react-native-async-storage/async-storage';
//import TabNavigator from './components/tabNavigator';
import DrawNavigation from './components/DrawNavigation';
//import TabNavigator from './components/TabNavigator';






class HelloWorldApp extends Component{
    
    render(){
        
        
        return (
          
              
            <NavigationContainer>
                <DrawNavigation/>
            </NavigationContainer>
              
              
              
          
        );
    }


}

export default HelloWorldApp;

    