import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { FlatList, ActivityIndicator, Text, View,ScrollView, Button, ToastAndroid, TouchableOpacity, StyleSheet} from 'react-native';




class Account_Fav extends Component{
    constructor(props){
        super(props);
        this.state ={ 
          isLoading: true,
          
          AcountListData: []
        }
    }
    
    
    getData = async () =>{
        const theKey = await AsyncStorage.getItem('@session_token');
        const id = await AsyncStorage.getItem('@user_id');
        return fetch('http://10.0.2.2:3333/api/1.0.0/user/1',{
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
              AcountListData: responseJson,
              
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
        

        if(this.state.isLoading)
        {
            return(
              <View>
                <ActivityIndicator/>
              </View>
            )
        }else
        {
            console.log(this.state.AcountListData.favourite_locations);
        
            return (
                <View>
                    <Text>Favourite Locations</Text>

                    <View>
                        <FlatList
                        data={this.state.AcountListData.favourite_locations}
                        renderItem={({item}) =>(
                            <View>  
                                <Text>Location ID:    {item.location_id}</Text>
                                <Text>Location Name:  {item.location_name}</Text>
                                <Text>Location Town:  {item.location_town}</Text>
                                <Text>Latitude:       {item.latitude}</Text>
                                <Text>Longitude:      {item.longitude}</Text>
                                <Text>Photo:  {item.photo_path}</Text>
                                <Text>Average Overall Rating:  {item.avg_overall_rating}</Text>
                                <Text>Average Price Rating:  {item.avg_price_rating}</Text>
                                <Text>Average Quality Rating:  {item.avg_quality_rating}</Text>
                                <Text>Average Clenliness Rating:  {item.avg_clenliness_rating}</Text>
                                <Text>:  </Text>
                            </View> 
                        )}
                        keyExtractor={(item, index) => item.location_id.toString()}

                        />
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
export default Account_Fav;
