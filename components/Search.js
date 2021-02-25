import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { SearchBar } from 'react-native-elements';
import { FlatList, Text,  View, TouchableOpacity, StyleSheet,  ToastAndroid } from 'react-native';
import RNPickerSelect from "react-native-picker-select";
import CheckBox from '@react-native-community/checkbox';




class Search extends Component
{
    constructor(props) {
        super(props);
        this.state = {
        search: null,
        SearchListData: [],
        
        AvgOverall: null,
        AvgPrice: null,
        AvgQuality: null,
        AvgClenliness: null,
        toggleFavBox: false,
        toggleYourBox: false,
      };
    }
    
    updateSearch = (search1) => {
        this.setState({search: search1 });
    };
    
    handleAvgOverall = (overallValue) => {
        this.setState({AvgOverall: overallValue})
    }
    handleAvgPrice = (priceValue) => {
        this.setState({AvgPrice: priceValue})
    }
    handleAvgQuality = (qualityValue) => {
        this.setState({AvgQuality: qualityValue})
    }
    handleAvgCleniness = (clenlinessValue) => {
        this.setState({AvgClenliness: clenlinessValue})
    }
    handleFavBox = (FavValue) => {
        this.setState({toggleFavBox: FavValue})
    }
    handleYourBox = (YourValue) => {
        this.setState({toggleYourBox: YourValue})
    }
    searchAll= async (searched, Overall, Price, Quality, Cleanliness, Fav, Your ) =>
    {
        const theKey = await AsyncStorage.getItem('@session_token');
        var searchParms = searched;
        if(!(searched == null)){
            if(!(Overall == null)){
                searchParms = searchParms+'&overall_rating='+Overall.toString()
            }
            if(!(Price == null)){
                searchParms = searchParms+'&price_rating='+Price.toString()
            }
            if(!(Quality == null)){
                searchParms = searchParms+'&quality_rating='+Quality.toString()

            }
            if(!(Cleanliness == null)){
                searchParms = searchParms+'&clenliness_rating='+Cleanliness.toString()
            }
            if(Fav == true){
                searchParms = searchParms+'&search_in=favourite';
            }
            if(Your == true){
                searchParms = searchParms+'&search_in=reviewed';
            }
            
            return fetch('http://10.0.2.2:3333/api/1.0.0/find?q='+searchParms,{
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
                
                SearchListData: responseJson,
                
                });
                ToastAndroid.show('sucsess' , ToastAndroid.SHORT);
            })
            .catch((error) =>{
                console.log(error);
            });
            
        }else{
            alert('Please  Add something to search',[
                {text: 'Ok'}
            ]);
        }
            
    }
    
    render() {
        
    
        return (
            <View>
                <SearchBar style={styles.search}
                    placeholder="Search "
                    onChangeText={this.updateSearch}
                    value={this.state.search}
                />
                <View style={styles.pickers1}>
                    <View style={styles.pickers}>
                        <Text style={styles.pickerText}>Overall Rating</Text>
                        
                        <RNPickerSelect style={pickerSelectStyles}
                            placeholder={{ label: "Sort Base on Average Overall Rating", value: null }}
                            onValueChange={this.handleAvgOverall} value={this.state.AvgOverall}
                            items={[
                                { label: "1", value: 1 },
                                { label: "2", value: 2 },
                                { label: "3", value: 3 },
                                { label: "4", value: 4 },
                                { label: "5", value: 5 },
                            ]}
                        />
                    </View>
                    <View style={styles.pickers}>
                        <Text>Price Rating</Text>
                        
                        <RNPickerSelect style={pickerSelectStyles}
                            placeholder={{ label: "Sort Base on Average Price Rating", value: null }}
                            onValueChange={this.handleAvgPrice} value={this.state.AvgPrice}
                            items={[
                                { label: "1", value: 1 },
                                { label: "2", value: 2 },
                                { label: "3", value: 3 },
                                { label: "4", value: 4 },
                                { label: "5", value: 5 },
                            ]}
                        />
                    </View>
                    <View style={styles.pickers}>
                        <Text>Quality Rating</Text>
                        
                        <RNPickerSelect style={pickerSelectStyles}
                            placeholder={{ label: "Sort Base on Average Quality Rating", value: null }}
                            onValueChange={this.handleAvgQuality} value={this.state.AvgQuality}
                            items={[
                                { label: "1", value: 1 },
                                { label: "2", value: 2 },
                                { label: "3", value: 3 },
                                { label: "4", value: 4 },
                                { label: "5", value: 5 },
                            ]}
                        />
                        
                    </View>
                    <View style={styles.pickers}>
                        <Text>Cleanliness{"\n"}Rating</Text>
                        
                        <RNPickerSelect style={pickerSelectStyles}
                            placeholder={{ label: "Sort Base on Average Clenliness Rating", value: null }}
                            onValueChange={this.handleAvgCleniness} value={this.state.AvgClenliness}
                            items={[
                                { label: "1", value: 1 },
                                { label: "2", value: 2 },
                                { label: "3", value: 3 },
                                { label: "4", value: 4 },
                                { label: "5", value: 5 },
                            ]}
                        />
                    </View>
                    <View style={styles.pickers}>
                        <Text>Search Favourites</Text>
                        <CheckBox
                            disabled={false}
                            value={this.state.toggleFavBox}
                            onValueChange={this.handleFavBox}
                        />
                        <Text>Search Your Reviews</Text>
                        <CheckBox
                            disabled={false}
                            value={this.state.toggleYourBox}
                            onValueChange={this.handleYourBox}
                        />
                    </View>
                </View>
                
                    
                                          
                <TouchableOpacity
                        style={styles.button}
                        onPress = {() => this.searchAll(this.state.search, this.state.AvgOverall, this.state.AvgPrice, this.state.AvgQuality, this.state.AvgClenliness,this.state.toggleFavBox, this.state.toggleYourBox)}>
                        <Text style={styles.buttonText}>Search</Text>
                </TouchableOpacity>

                
                        
                    <FlatList 
                        data={this.state.SearchListData}
                        renderItem={({item}) =>(
                        <View>
                            <Text>Location Name : {item.location_name}</Text>
                            <Text>Location Name : {item.location_town}</Text>
                            <Text>Average Overall Rating:  {item.avg_overall_rating}</Text>
                            <Text>Average Price Rating:  {item.avg_price_rating}</Text>
                            <Text>Average Quality Rating:  {item.avg_quality_rating}</Text>
                            <Text>Average Clenliness Rating:  {item.avg_clenliness_rating}</Text>
                                <Text>:  </Text>
                            <View  style={styles.box}>
                                        
                                <TouchableOpacity
                                    style={styles.button2}
                                    onPress = {() => this.testToReviews(item.location_id)}>
                                    <Text style={styles.buttonText2}>View Reviews</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.button2}
                                    onPress = {() => this.testAddReview(item.location_id)}>
                                    <Text style={styles.buttonText2}>Add Review</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.button2}
                                    onPress = {() => this.testFavourite(item.location_id)}>
                                    <Text style={styles.buttonText2}>Make a Favourite Location </Text>
                                </TouchableOpacity>
                            </View>    
                        </View>

                        )}
                    keyExtractor={(item, index) => item.location_id.toString()}
                    />
                        
                    

                


            </View>
        );
    }
}
const styles = StyleSheet.create({
    
    search: {
        margin: 1,
        color: 'white',
    },
    button: {
       
        backgroundColor: "blue",
        margin: 20,
        borderRadius:10,
        alignItems: "center",
        padding: 10,
     
    },
    button2: {
       
        backgroundColor: "blue",
        margin: 20,
        borderRadius:10,
        alignItems: "center",
        padding: 10,
        flexWrap: 'wrap',
        flex: 1,
     
    },
    pickers: {
        flexDirection: 'row',
        alignItems: "center",
        flexWrap: 'wrap',
        justifyContent: 'center',

    },
    pickers1: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-around',
        flexWrap: 'wrap',

    },
    pickerText:{
        
        flexWrap: 'wrap',

    },
    buttonText: {
        fontSize: 20,
        fontWeight: "bold",
        color: 'white',
        textAlign: 'center',
    },
    buttonText2: {
        fontSize: 14,
        fontWeight: "bold",
        color: 'white',
    },
    view: {
        flex: 1,
    },
    pickers: {
        flexDirection: 'row',
    },
    box: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: "center",
        flex: 1,
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
      margin: 5,
      borderColor: 'black',
      borderRadius: 8,
      color: 'black',
      backgroundColor: 'white',
      paddingRight: 80, // to ensure the text is never behind the icon
    },
  });
export default Search;
