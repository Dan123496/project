import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { FlatList,  ActivityIndicator, Text, View, TouchableOpacity, StyleSheet, ScrollView, Image,ToastAndroid } from 'react-native';





class Location_reviews extends Component{
    
    constructor(props){
        super(props);
        this.state ={ 
          isLoading: true,
          location: "",
          review: "",
          LocationListData: [],
          likedIds: [],

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
              
              LocationListData: responseJson,
              
            });
            ToastAndroid.show('sucsess' , ToastAndroid.SHORT);
            this.getLocIds();
          })
          .catch((error) =>{
            console.log(error);
        });
    }
    getLocIds = async() =>{
        const likeId = await AsyncStorage.getItem('@liked');
        
        this.setState({likedIds: JSON.parse(likeId)})
        
        this.setState({isLoading: false})
        
    }
    componentDidMount(){
        this.unsubscribe = this.props.navigation.addListener('focus',() =>{
            this.getData();
            
        });
    }
    componentWillUnmount(){
        this.unsubscribe();
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
        .then(async (response)=> {
            if(response.status === 200){
            
                ToastAndroid.show("Like Added", ToastAndroid.SHORT)
                var joined = this.state.likedIds.concat(review);
                this.setState({ likedIds: joined })
                console.log(this.state.likedIds);
                await AsyncStorage.setItem('@liked', JSON.stringify(this.state.likedIds));
                this.getData();

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
    UnLikeReview= async (location, review, index) =>
    {
        const theKey = await AsyncStorage.getItem('@session_token');
        return fetch('http://10.0.2.2:3333/api/1.0.0/location/'+location+'/review/'+review+'/like',{
            method: 'delete',
            headers: {
                'content-Type': 'application/json',
                'X-Authorization': theKey,
            },
        })
        .then(async (response)=> {
            if(response.status === 200){
            
                ToastAndroid.show("Like removed", ToastAndroid.SHORT)
                var t = this.state.likedIds
                console.log(t);
                t.splice(index,1);
                console.log(t);
                this.setState({likedIds: t })
                console.log(this.state.likedIds);
                await AsyncStorage.setItem('@liked', JSON.stringify(this.state.likedIds));
                this.getData();


            }else if(response.status === 401){
                throw 'No logged in ';
            }else if(response.status === 404){
                throw 'Bad link ';
            }else if(response.status === 401){
                throw 'Unathorised ';
            }else if(response.status === 500){
                throw 'Server error ';
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
    testUnLike(location, review, index){
        if((location == null || review == null)){
            ToastAndroid.show('error' , ToastAndroid.SHORT);
        }else{
            var locid = location;
            var rewid = review
            this.UnLikeReview(locid,rewid, index);
        }
    }
    isLiked(locId, revId){
        var t = this.state.likedIds.includes(revId)
        
        

        if(t == true){
            var index = this.state.likedIds.indexOf(revId);
            
            console.log(index);
            return(
                
                <TouchableOpacity
                    style={styles.button}
                    onPress = {() => this.testUnLike(locId, revId, index)}>
                    <Text style={styles.buttonText}>Unlike</Text>
                </TouchableOpacity>
            )
        }else{
            return(
                <TouchableOpacity
                    style={styles.button}
                    onPress = {() => this.testLike(locId, revId)}>
                    <Text style={styles.buttonText}>Like</Text>
                </TouchableOpacity>
                )
        }
    }
    printPhotos(location, review){
        var t ='http://10.0.2.2:3333/api/1.0.0/location/'+location+'/review/'+review+'/photo';
        console.log(t);
          return(
            <Image style={styles.photo} source={{uri: t}} />
          );
        
                                        
                                        
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
            
               
                    <View style={styles.view}>
                        <FlatList style={styles.view}
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
                                                <Text>Photo: </Text>
                                                {this.printPhotos(this.state.location, item.review_id)}

                                                {this.isLiked(this.state.location, item.review_id)}

                                                
                                            </View>
                                            
                                            
                                            
                                        
                                        
                                        
                                        
                                    </View>
                                )}
                            keyExtractor={(item, index) => item.review_id.toString()}
                        />
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
    view: {
        flex: 1,
    },
    
    photo: {
        width: 200,
        height: 200,
        flex: 1,
      },
});

export default Location_reviews;
