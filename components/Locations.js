import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { FlatList, ActivityIndicator, Text, View, Button, ToastAndroid} from 'react-native';


class Locations extends Component{
    
    constructor(props){
        super(props);
        this.state ={ 
          isLoading: true,
          LocationListData: []
        }
    }
    getData = async () =>{
        const theKey = await AsyncStorage.getItem('@session_token');
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
    testAddReview(location){
            if((location == null)){
                ToastAndroid.show('error' , ToastAndroid.SHORT);
            }else{
                var id = location;
                
                this.addReview(id);
            }
    }
    addReview = async (id) =>{
        await AsyncStorage.setItem('@locationId', id.toString());
        this.props.navigation.navigate('AddReview')
    }
    testToReviews(location2){
            if((location2 == null)){
                ToastAndroid.show('error' , ToastAndroid.SHORT);
            }else{
                var id = location2;
                
                this.toReviews(id);
            }
    }
    toReviews = async (id) =>{
        await AsyncStorage.setItem('@locationId', id.toString());
        this.props.navigation.navigate('Reviews')
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
        
        
            return (
            
                <View>
                    <View>
                        <FlatList
                        data={this.state.LocationListData}
                        renderItem={({item}) =>(
                            <View>
                                <Text>Location Name : {item.location_name}</Text>
                                <Text>Location Name : {item.location_town}</Text>
                                <Button 
                                    onPress = {() => this.testToReviews(item.location_id)}
                                    title="View Reviews"
                                    color="#841584"/>
                                <Button 
                                    onPress = {() => this.testAddReview(item.location_id)}
                                    title="Add Review"
                                    color="#841584"/>
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

export default Locations;







 


