import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { FlatList,  ActivityIndicator, ScrollView, Text, TextInput, View, TouchableOpacity, StyleSheet, Alert, ToastAndroid } from 'react-native';
import RNPickerSelect from "react-native-picker-select";
import Filter from 'bad-words';




class AddReview_Tab extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            overall_rating: '',
            price_rating: '',
            quality_rating: '',
            clenliness_rating: '',
            review_body: "",
            LocationListData: [],
            LocId: '',
            
        };
    }
    getData = async () =>{
        const theKey = await AsyncStorage.getItem('@session_token');
        const id = await AsyncStorage.getItem('@user_id');
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




    handleOverallInput = (overallValue) => {
        this.setState({overall_rating: overallValue})
    }
    handlePriceInput = (priceValue) => {
        this.setState({price_rating: priceValue})
    }
    handleQualityInput = (qualityValue) => {
        this.setState({quality_rating: qualityValue})
    }
    handleClenlinessInput = (clenlinessValue) => {
        this.setState({clenliness_rating: clenlinessValue})
    }
    handleBodyInput = (bodyValue) => {
        this.setState({review_body: bodyValue})
    }
    handleLocationId =(locIdValue) =>{
        this.setState({LocId: locIdValue})
        

    }


    AddReview = async (overall_rating,price_rating,quality_rating,clenliness_rating,review_body) =>{
        
        if((overall_rating== null || price_rating== null || quality_rating== null || clenliness_rating==null || review_body.trim().length <= 0))
        {
            alert('Please fill ever fild',[
                {text: 'Ok'}
            ]);
        }else{
            const filter = new Filter(); 
            filter.addWords('tea','teas', 'cake', 'cakes','pastry', 'pastries');
            console.log(review_body);
            review_body = review_body ? filter.clean(review_body) : '';
            console.log(review_body);
            const id = this.state.LocId;
            console.log(id,overall_rating,price_rating,quality_rating,clenliness_rating,review_body);
            const theKey = await AsyncStorage.getItem('@session_token');
            return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+id+"/review",{
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' , 'X-Authorization': theKey, },
                body: JSON.stringify(
                {
                    overall_rating: parseInt(overall_rating),
                    price_rating: parseInt(price_rating),
                    quality_rating: parseInt(quality_rating),
                    clenliness_rating: parseInt(clenliness_rating),
                    review_body: review_body,

                })
            })
            .then((response)=> {
                if(response.status === 201){
                
                    AsyncStorage.removeItem('@locationId');
                    Alert.alert("Review.Added!");
                    this.props.navigation.navigate("Locations");
                    
                    
                }else if(response.status === 400){
                    throw 'Failed validation';
                }else {
                    throw 'somthing went wrong',response.status
                    
                }
                
            })
            .catch((error)=>{
                console.error(error);
            });
        }
    }
    
    
    
    render(){
        
        
                
            
        return(
            <ScrollView style={styles.all}>
                <View>
                    <RNPickerSelect style={pickerSelectStyles}
                        placeholder={{ label: "Select a Location....", value: null }}
                        onValueChange={this.handleLocationId} value={this.state.LocId}
                        items={this.state.LocationListData.map(item => (
                            {
                               key: item.location_id,
                               label: "  "+item.location_name+":     "+item.location_town,
                               value: item.location_id,
                               color: "black",
                            }))}
                    />
                        
                </View>  
                    
                <Text style={styles.text}>Overall Rating</Text>
                <RNPickerSelect style={pickerSelectStyles}
                    placeholder={{ label: "Select a Rating", value: null }}
                    onValueChange={this.handleOverallInput} value={this.state.overall_rating}
                    items={[
                        { label: "      1", value: 1 },
                        { label: "      2", value: 2 },
                        { label: "      3", value: 3 },
                        { label: "      4", value: 4 },
                        { label: "      5", value: 5 },
                    ]}
                />
                <Text style={styles.text}>Price Rating</Text>
                <RNPickerSelect style={pickerSelectStyles}
                    placeholder={{ label: "Select a Rating", value: null }}               
                    onValueChange={this.handlePriceInput} value={this.state.price_rating}
                    items={[
                        { label: "      1", value: 1 },
                        { label: "      2", value: 2 },
                        { label: "      3", value: 3 },
                        { label: "      4", value: 4 },
                        { label: "      5", value: 5 },
                    ]}
                />
                <Text style={styles.text}>Quality Rating</Text>
                <RNPickerSelect style={pickerSelectStyles}
                    placeholder={{ label: "Select a Rating", value: null }}               
                    onValueChange={this.handleQualityInput} value={this.state.quality_rating}
                    items={[
                        { label: "      1", value: 1 },
                        { label: "      2", value: 2 },
                        { label: "      3", value: 3 },
                        { label: "      4", value: 4 },
                        { label: "      5", value: 5 },
                    ]}
                />
                <Text style={styles.text}>Clenliness Rating</Text>
                <RNPickerSelect style={pickerSelectStyles}
                    placeholder={{ label: "Select a Rating", value: null,  }}
                    onValueChange={this.handleClenlinessInput} value={this.state.clenliness_rating}
                    items={[
                        { label: "      1", value: 1 },
                        { label: "      2", value: 2 },
                        { label: "      3", value: 3 },
                        { label: "      4", value: 4 },
                        { label: "      5", value: 5 },
                    ]}
                />
                <Text style={styles.text1}>Add a Comment</Text>
                <TextInput style={styles.input} placeholder="Add your comment here..." onChangeText={this.handleBodyInput} value={this.state.review_body} multiline = {true}
                numberOfLines = {5} />
                
                <TouchableOpacity
                    style={styles.button}
                    onPress = {() => this.AddReview(this.state.overall_rating,this.state.price_rating,this.state.quality_rating,this.state.clenliness_rating,this.state.review_body)}
                >
                    <Text style={styles.buttonText}>Add Review</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress = {() => this.props.navigation.goBack()}
                >
                    <Text style={styles.buttonText}>Go Back</Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    all: {
        backgroundColor: 'silver',
        flex: 1,
        padding: 20,
    },
    
    theList: {
        flex: 1,
    },
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
    input: {
        backgroundColor: 'white',
        padding: 10,
        margin:20,
        borderRadius:10,
        color: 'black'
    },
    text:{
        fontSize:16,
        paddingLeft: 15,
        marginTop:20,
    },
    text1:{
        fontSize:16,
        paddingLeft: 15,
        marginTop:30,
    },
    
});
const pickerSelectStyles = StyleSheet.create({
    placeholder:{
        color: 'grey',
        fontSize: 20,

    },
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 20,
      margin: 10,
      borderColor: 'black',
      borderRadius: 8,
      color: 'black',
      backgroundColor: 'white',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
  });
    


export default AddReview_Tab;

