import React, { Component } from 'react';
import  { View, Text, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'



class test_hi extends Component{
    
    static navigationOptions = {
        header: null
    }
    
    render(){
        const navigation = this.props.navigation;
        return(
            <View style= {{marginTop: 50}}>
                <Text>hi</Text>
                <Button title='go back' onPress={() => this.props.navigation.goBack()}/>
                              
            </View>
        );
    }
}
export default test_hi;