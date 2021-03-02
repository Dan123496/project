import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { FlatList, ActivityIndicator, Text, View,ScrollView, Button, ToastAndroid, TouchableOpacity, StyleSheet} from 'react-native';




class Account_Fav extends Component{
    constructor(props){
        super(props);
        this.state ={ 
          isLoading: true,
          favLoc: [],
          AcountListData: []
        }
    }
    
    
    getData = async () =>{
        const theKey = await AsyncStorage.getItem('@session_token');
        const id = await AsyncStorage.getItem('@user_id');
        return fetch('http://10.0.2.2:3333/api/1.0.0/user/'+id,{
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
    testUnFavourite(location){
        if((location == null )){
            ToastAndroid.show('error' , ToastAndroid.SHORT);
        }else{
            var locid = location;
            this.unFavouriteLocation(locid);
        }
    }
    unFavouriteLocation= async (location) =>
    {
        const theKey = await AsyncStorage.getItem('@session_token');
        return fetch('http://10.0.2.2:3333/api/1.0.0/location/'+location+'/favourite',{
            method: 'delete',
            headers: {
                'content-Type': 'application/json',
                'X-Authorization': theKey,
            },
        })
        .then(async (response)=> {
            if(response.status === 200){
            
                ToastAndroid.show("Removed to Favourites", ToastAndroid.SHORT)
                const favId = await AsyncStorage.getItem('@locations');
                this.setState({favLoc: JSON.parse(favId)})
                var index = this.state.favLoc.indexOf(location);
                var remid = this.state.favLoc
                remid.splice(index,1);
                this.setState({favLoc: remid});
                await AsyncStorage.setItem('@locations', JSON.stringify(this.state.favLoc));
                this.getData();
            }else if(response.status === 401){
                throw 'No logged in ';
            }else if(response.status === 404){
                throw 'Bad link ';
            }else if(response.status === 500){
                throw 'Sever Error ';
            }else {
                throw 'somthing went wrong',response.status   
            }  
        })
        .catch((error) =>{
            console.log(error);
        });
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
                <View style={styles.View}>
                    <Text>Favourite Locations</Text>

                    <View>
                        <FlatList style={styles.view}
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
                            
                                <TouchableOpacity
                                        style={styles.button}
                                        onPress = {() => this.testUnFavourite(item.location_id)}>
                                        <Text style={styles.buttonText}>Remove Favourite Location</Text>
                                </TouchableOpacity>
                            
                            </View> 
                            
                        )}
                        keyExtractor={(item, index) => item.location_id.toString()}
                        
                        />
                        
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress = {() => this.props.navigation.goBack()}
                    >
                        <Text style={styles.buttonText}>Go Back</Text>
                    </TouchableOpacity>




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
    View: {
        flex: 1,
    },
});
export default Account_Fav;
