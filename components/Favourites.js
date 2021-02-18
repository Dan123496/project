import React, { Component } from 'react';
import  { View, Text, Button } from 'react-native';





class Favourites extends Component{
    static navigationOptions = {
        title: 'Favourites',
    };


    
    
    render(){
        const navigation = this.props.navigation;
        return(
            <View style= {{marginTop: 50}}>
                <Text>Favourites</Text>
                <Button title='go back' onPress={() => this.props.navigation.goBack()}/>
                              
            </View>
        );
    }
}
export default Favourites;