import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { FlatList,  ActivityIndicator, Text, View, TouchableOpacity, StyleSheet, ScrollView, Button,ToastAndroid } from 'react-native';





class Location_reviews extends Component{
    
    constructor(props){
        super(props);
        this.state ={ 
          isLoading: true,
          location: "",
          review: "",
          LocationListData: []
        }
    }
    getData = async () =>{
        const theKey = await AsyncStorage.getItem('@session_token');
        const locationId = await AsyncStorage.getItem('@locationId');
        this.setState({location: locationId})
        return fetch('http://10.0.2.2:3333/api/1.0.0/location/'+locationId,{
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
    likeReview= async (location, review) =>
    {
        const theKey = await AsyncStorage.getItem('@session_token');
        return fetch('http://10.0.2.2:3333/api/1.0.0/location/'+location+'/review/'+review+'/like',{
            method: 'post',
            headers: {
                'content-Type': 'application/json',
                'X-Authorization': theKey,
            },
        })
        .then((response)=> {
            if(response.status === 200){
            
                ToastAndroid.show("Like Added", ToastAndroid.SHORT)
                
            }else if(response.status === 401){
                throw 'No logged in ';
            }else if(response.status === 404){
                throw 'Bad link ';
            }else if(response.status === 400){
                throw 'Failed ';
            }else {
                throw 'somthing went wrong',response.status   
            }  
        })
        .catch((error) =>{
            console.log(error);
        });
    }
    testLike(location, review){
        if((location == null || review == null)){
            ToastAndroid.show('error' , ToastAndroid.SHORT);
        }else{
            var locid = location;
            var rewid = review
            this.likeReview(locid,rewid);
        }
    }
    
    render(){
        var locId = this.state.location
        console.log(locId);
        console.log(this.state.LocationListData.location_reviews);       
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
            
                <ScrollView>
                    <View>
                        <FlatList
                            data={this.state.LocationListData.location_reviews}
                                renderItem={({item, index}) =>(
                                    
                                    <View>
                                           
                                            <View>
                                                
                                                <Text>Review number:  {item.review_id}</Text>
                                                <Text>Overall Rating:  {item.overall_rating}</Text>
                                                <Text>Price Rating:  {item.price_rating}</Text>
                                                <Text>Quality Rating:  {item.quality_rating}</Text>
                                                <Text>Clenliness Rating:  {item.clenliness_rating}</Text>
                                                <Text>Comment:  {item.review_body}</Text>
                                                
                                                <TouchableOpacity
                                                    style={styles.button}
                                                    onPress = {() => this.testLike(this.state.location,item.review_id)}>
                                                    <Text style={styles.buttonText}>Like</Text>
                                                </TouchableOpacity>

                                                
                                            </View>
                                            
                                            
                                            
                                        
                                        
                                        
                                        
                                    </View>
                                )}
                            keyExtractor={(item, index) => item.review_id.toString()}
                        />
                    </View>
                    <View>
                        
                        <Button title='go back' onPress={() => this.props.navigation.goBack()}/>
                    </View>
                </ScrollView>
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
