import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import  { View, Text, Button, Alert, StyleSheet, TouchableOpacity, PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

async function requestLocationPermission(){
    try{
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'Location Permission',
                message:
                    'This app requires access to your location.',
                    buttonPositive: 'OK',
                    buttonNegative: 'NO',
                    buttonNeutral: 'Ask Later',
                    
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED ){
            console.log('You can access location');
            return true 
                


        }else {
            console.log('Location permission denied');
            return false;
        }

    }catch (err){
        console.warn(err);
    }
};

class Map extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            location: null,
            locationPermission: false,

        };
               }
    componentDidMount(){
        this.unsubscribe = this.props.navigation.addListener('focus',() =>{
            this.findCoordinates();
            
        });
    }
    componentWillUnmount(){
        this.unsubscribe();
    }
        
        
    
    findCoordinates =() =>{
        if(!this.state.locationPermission){
            this.setState({locationPermission:  requestLocationPermission()});
        }
        
        
            Geolocation.getCurrentPosition(
                (position) => {
                    const location1 = JSON.stringify(position);
                    this.setState({location: location1})
                },
                (error) => {
                    Alert.alert(error.message)
                },
                {
                    enableHighAccuracy: true,
                    timeout: 20000,
                    maximumAge: 1000
                }

            );
    };
    
    
    
    
    render(){
        
        return(
            <View style= {{marginTop: 50}}>
                <Text>Home</Text>
                
                <Text>Location: {this.state.location}</Text>
                              
            </View>
        );
    }
}
const styles = StyleSheet.create({
    
    button: {
       
        backgroundColor: "blue",
        margin: 30,
        borderRadius:10,
        alignItems: "center",
        padding: 10,
     
    },
    buttonText: {
        fontSize: 20,
        fontWeight: "bold",
        color: 'white',
    },
    buttonText2: {
        fontSize: 14,
        fontWeight: "bold",
        color: 'white',
    },
    view: {
        flex: 1,
    },
})
    
export default Map;