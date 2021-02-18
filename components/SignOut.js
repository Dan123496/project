import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import  { View, Text, TouchableOpacity, StyleSheet  } from 'react-native';




class Locations extends Component{
    
    
    userLogout = async () => {
        try {
          await AsyncStorage.removeItem('@session_token');
          alert("Logout Success!")
          this.props.navigation.navigate("Home");
        } catch (error) {
          console.log('AsyncStorage error: ' + error.message);
        }
      }
      
    
    render(){
        
        return(
            <View style= {{marginTop: 50}}>
                <Text>Are you sure you want to Sign Out!</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress = {() => this.userLogout()}
                >
                    <Text style={styles.buttonText}>yes Sign out</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button2}
                    onPress = {() => this.props.navigation.goBack()}
                >
                    <Text style={styles.buttonText}>go Back</Text>
                </TouchableOpacity>
                              
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        backgroundColor: "blue",
        padding: 10,
        margin: 20,
        borderRadius:10,
        
    },
    button2: {
        alignItems: "center",
        backgroundColor: "blue",
        padding: 10,
        margin: 20,
        borderRadius:10,
        marginBottom: 40,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: "bold",
        color: 'white',
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        margin:20,
        borderRadius:10,
    },
    text:{
        paddingLeft: 25,
        
    },
    text2:{
        paddingLeft: 25,
        fontSize: 16,
        //color: 'white',

    },
});


export default Locations;