import React, { Component } from 'react';
import  { View, Text, Button } from 'react-native';




class EditAccount extends Component{
    
    static navigationOptions = {
        header: null
    }
    
    render(){
        const navigation = this.props.navigation;
        return(
            <View style= {{marginTop: 50}}>
                <Text>edit Account</Text>
                <Button title='go back' onPress={() => this.props.navigation.goBack()}/>
                              
            </View>
        );
    }
}
export default EditAccount;