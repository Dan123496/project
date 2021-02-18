import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import  { View, Text, Button } from 'react-native';
//import { NavigationContainer } from '@react-navigation/native';
//import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';




class Home extends Component{
    
  

    componentDidMount(){
        this.unsubscribe = this.props.navigation.addListener('focus',() =>{
            this.LoggedInCheck();
        });
    }
    componentWillUnmount(){
        this.unsubscribe();
    }
        
        
    LoggedInCheck = async ()  =>{
      const value = await AsyncStorage.getItem('@session_token');
      if (value == null){
          this.props.navigation.navigate('SignIn');
      }
    }
    render(){
        
        return(
            <View style= {{marginTop: 50}}>
                <Text>Home</Text>
                
                              
            </View>
        );
    }
}
export default Home;