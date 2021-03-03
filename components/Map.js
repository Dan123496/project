import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import  { View, Text, Button, Alert, StyleSheet, TouchableOpacity, PermissionsAndroid,ToastAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'
import { getDistance } from 'geolib';

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
            coordinate: 0,
            latitude: 0,
            longitude: 0,
            locationPermission: false,
            LocationListData: [],

        };
               }
    componentDidMount(){
        this.unsubscribe = this.props.navigation.addListener('focus',() =>{
            this.getLocations();
            this.findCoordinates();
            
        });
    }
    componentWillUnmount(){
        this.unsubscribe();
    }
    getLocations = async () =>{
        const theKey = await AsyncStorage.getItem('@session_token');
        return fetch('http://10.0.2.2:3333/api/1.0.0/find?limit=1000',{
            method: 'get',
            headers: {
                'content-Type': 'application/json',
                'X-Authorization': theKey,
            },
        })
        .then((response) => {
            if(response.status === 200){
                return response.json()
                
            }else if(response.status === 401){
                throw 'not logged in';
            }else{
                throw 'something went wrong';
            }
        })
          .then((responseJson) => {
    
            this.setState({
              
              LocationListData: responseJson,
              
            });
            ToastAndroid.show('sucsess' , ToastAndroid.SHORT);
          })
          .then(async () =>{
                this.getLocIds();
          })
          .catch((error) =>{
            console.log(error);
        });
    }
        
        
    
    findCoordinates =() =>{
        if(!this.state.locationPermission){
            this.setState({locationPermission:  requestLocationPermission()});
        }
        
        
            Geolocation.getCurrentPosition(
                (position) => {
                    const location1 = JSON.stringify(position);
                    this.setState({location: location1});
                    this.setState({latitude: position.coords.latitude});
                    this.setState({longitude: position.coords.longitude});
                    this.setState({coordinate: position});
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
    distance(lat1,long1,lat2,long2){
        return(getDistance(
            { latitude: lat1, longitude:  long1},
            { latitude: lat2, longitude:  long2}
        ))
    }
    
    
    
    
    render(){
        
        return(
            <View style= {styles.view}>
                
                
                <MapView 
                    provider = {PROVIDER_GOOGLE}
                    style={styles.preview}
                    region={{
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                        latitudeDelta: 100,
                        longitudeDelta: 100,
                    }}
                    >
                        <Marker
                        
                       
                        coordinate={{latitude: this.state.latitude, longitude: this.state.longitude }}
                        title={'My Location'}
                        
                        />
                    {console.log(this.state.LocationListData)}
                    {this.state.LocationListData.map((marker, index) => (
                        <Marker
                        key={index}
                       
                        coordinate={{latitude: marker.latitude, longitude: marker.longitude }}
                        title={marker.location_name}
                        description={'distance is:  '+ this.distance(this.state.latitude,this.state.longitude,marker.latitude,marker.longitude)+' Meters away'}
                        
                        />
                        
                    ))}

                </MapView>

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
    preview: {
        flex:1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    
    

})
    
export default Map;