import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { FlatList, ActivityIndicator, Text, View,ScrollView, Button, ToastAndroid, TouchableOpacity, StyleSheet} from 'react-native';




class Account_Likes extends Component{
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
        console.log(this.state.AcountListData.liked_reviews);

            return (
                
                <View>
                    <View>
                        <FlatList
                        data={this.state.AcountListData}
                        renderItem={({item}) =>(
                            <View>   
                                <Text>Liked Reviews</Text>
                                <View>
                                        {item.reviews.map((t) => (
                                        <View>    
                                            {t.review.map((p) => (
                                            <Text>{p.review_id}</Text>
                                            
                                            
                                            ))}
                                        </View>    
                                        ))}
                                </View>
                            </View>   

                            
                        )}
                        />
                    </View>
                <View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress = {() => this.props.navigation.goBack()}>
                        <Text style={styles.buttonText}>Go Back</Text>
                    </TouchableOpacity>
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
export default Account_Likes;
