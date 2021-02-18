import React, { Component } from 'react';
import  { View, Text, Button } from 'react-native';




class Account extends Component{
    
    
    
    render(){
        const navigation = this.props.navigation;
        return(
            <View style= {{marginTop: 50}}>
                <Text>Account</Text>
                <Button title='go back' onPress={() => this.props.navigation.goBack()}/>
                              
            </View>
        );
    }
}
export default Account;