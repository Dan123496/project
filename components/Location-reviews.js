import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { FlatList,  ActivityIndicator, Text, View, TouchableOpacity, StyleSheet, Alert, Button,ToastAndroid } from 'react-native';





class Location_reviews extends Component{
    
    constructor(props){
        super(props);
        this.state ={ 
          isLoading: true,
          location: "",
          LocationListData: []
        }
    }
    getData = async () =>{
        const theKey = await AsyncStorage.getItem('@session_token');
        const locationId = await AsyncStorage.getItem('@locationId');
        this.setState({location: locationId})
        return fetch('http://10.0.2.2:3333/api/1.0.0/find',{
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
              isLoading: false,
              LocationListData: responseJson,
              
            });
            ToastAndroid.show('sucsess' , ToastAndroid.SHORT);
          })
          .catch((error) =>{
            console.log(error);
        });
    }
    componentDidMount(){
        this.getData();
    }
    
    render(){
        var locId = this.state.location
        console.log(locId);
        if(this.state.isLoading)
        {
            return(
              <View>
                <ActivityIndicator/>
              </View>
            )
        }else  
        {
            return (
            
                <View>
                    <View>
                        <FlatList
                            data={this.state.LocationListData.filter((d) => d.location_id == locId)}
                                renderItem={({item, index}) =>(
                                    
                                    <View>
                                        {item.location_reviews.map((v, i) => (
                                           
                                            <View>
                                                
                                                <Text>Review number:  {v.review_id}</Text>
                                                <Text>Overall Rating:  {v.review_overallrating}</Text>
                                                <Text>Price Rating:  {v.review_pricerating}</Text>
                                                <Text>Quality Rating:  {v.review_qualityrating}</Text>
                                                <Text>Clenliness Rating:  {v.review_Clenlinessrating}</Text>
                                                <Text>Comment:  {v.review_body}</Text>
                                                <TouchableOpacity
                                                    style={styles.button}>
                                                    <Text style={styles.buttonText}>Like</Text>
                                                </TouchableOpacity>

                                                
                                            </View>
                                            
                                            
                                            
                                        ))}
                                        
                                        
                                        
                                    </View>
                                )}
                            keyExtractor={(item, index) => item.location_id.toString()}
                        />
                    </View>
                    <View>
                        
                        <Button title='go back' onPress={() => this.props.navigation.goBack()}/>
                    </View>
                </View>
                )
        }
    
    
    
    }
        
}
const styles = StyleSheet.create({
    
    button: {
        alignItems: "center",
        backgroundColor: "blue",
        padding: 10,
        margin: 10,
        borderRadius:10,
        marginBottom: 50,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: "bold",
        color: 'white',
    },
});

export default Location_reviews;
