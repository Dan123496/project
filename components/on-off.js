import { NavigationHelpersContext } from '@react-navigation/native';
import React, { Component, } from 'react';
import  { StyleSheet, View, Text, Button, FlatList, TextInput, Alert, TouchableWithoutFeedback, Keyboard, ScrollView} from 'react-native';

class on_off extends Component{
    constructor(props){
        super(props);
        this.state = {
            switch1: "on",
        };
    }
    switcher = (sw) =>{
        if(sw == "on"){
            this.setState({switch1: "off"})
        }
        else{
            this.setState({switch1: "on"})
        }
            

    }
    render() {
        return(
            <View>
                <Button  onPress = {() => this.switcher(this.state.switch1)}
                    title={this.state.switch1}
                    color="#841584"/>
            </View>
        );
    }
}
export default on_off;




    
