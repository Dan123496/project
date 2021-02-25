import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import  { View, Text,  StyleSheet, TouchableOpacity, TextInput, ScrollView, ToastAndroid } from 'react-native';



class SignIn extends Component{
    

    constructor(props)
    {
        super(props);
        this.state = {
            email: "",
            password: "",
            ListData: [],
            ListData2: null,
            favouritesArray: [],
            likedArray: [],
            
        };
    }

    componentDidMount(){
        this.unsubscribe = this.props.navigation.addListener('focus',() =>{
            this.LoggedInCheck();
        });
    }
    componentWillUnmount(){
        this.unsubscribe();
    }
        
        
    LoggedInCheck = async ()  =>{
      const value = await AsyncStorage.getItem('@session_token');
      if (!(value == null)){
        this.props.navigation.navigate('SignOut');

          
      }
    }
    
    getFav = async () =>{
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
              
              ListData: responseJson,
              
              
              
            })
            
            
        })
                .then(async () => {
                    this.inFav(); 
        })
        .catch((error) =>{
            console.log(error);
        });
    }
    inFav= async() => {
        var joined= [];
        this.state.ListData.favourite_locations.map((v) => (
            joined = joined.concat(v.location_id)
                   

        ));
        this.setState({favouritesArray: joined});
        console.log(this.state.favouritesArray)
        await AsyncStorage.setItem('@locations', JSON.stringify(this.state.favouritesArray));
        this.likes();


        /*await AsyncStorage.setItem('@favLoc', this.state.favouritesArray);
        const fac = await AsyncStorage.getItem('@favLoc');
        console.log(fac);*/
        
    }
    likes= async() =>{
        var liked= [];
        this.state.ListData.liked_reviews.map((v) => (
            liked = liked.concat(v.review.review_id)
                   

        ));
        this.setState({likedArray: liked});
        console.log(this.state.likedArray)
        await AsyncStorage.setItem('@liked', JSON.stringify(this.state.likedArray));
        this.props.navigation.navigate('Home');
    }

    theSignIn = async () => {

        return fetch ("http://10.0.2.2:3333/api/1.0.0/user/login", {
            method: 'post',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            })
        })
        .then((response) => {
            if(response.status === 200){
                return response.json()
            }else if(response.status === 400){
                throw 'Invalid email or password';
            }else{
                throw 'something went wrong';
            }
        })
        .then(async (responseJson) => {
            console.log(responseJson);
            await AsyncStorage.setItem('@session_token', responseJson.token);
            await AsyncStorage.setItem('@user_id', responseJson.id.toString());
            this.setState({email: ""});
            this.setState({password: ""});
            this.getFav();            
            
            

            
            
            
        
        })
        .catch((error ) => {
           console.log(error); 
            ToastAndroid.show(error, ToastAndroid.SHORT);
        })
    }

    

    handleEmailInput = (emailValue) => {
        this.setState({email: emailValue})
    }
    handlePasswordInput = (passwordValue) => {
        this.setState({password: passwordValue})
    }
    checkSignIn = (email, password) => {
        if(!(email.trim().length > 0 || password.trim().length > 0 )){
            alert('Please enter your email and password',[
                {text: 'Ok'}
            ]);
        }else if(!(email.trim().length > 0 )){
            alert('Please enter your email',[
                {text: 'Ok'}
            ]);
        }else if(!(password.trim().length > 0 )){
            alert('Please enter your password',[
                {text: 'Ok'}
            ]);
            
        }else if(email.trim().length > 0 && password.trim().length > 0 ){
            this.theSignIn();
            
        }
    }
    
    
    render(){
        
        return(
            <ScrollView style= {styles.all}>
                <View >
                    <Text style={styles.text}>Email</Text>
                    <TextInput style={styles.input} placeholder="Enter yor email" onChangeText={this.handleEmailInput} value={this.state.email} />
                
                    <Text style={styles.text}>Password</Text>
                    <TextInput style={styles.input} secureTextEntry={true} placeholder="Enter your password" onChangeText={this.handlePasswordInput} value={this.state.password} />
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress = {() => this.checkSignIn(this.state.email, this.state.password )}
                >
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
                
                <Text style={styles.text2}>Don't have an account?  </Text>
                <TouchableOpacity
                    style={styles.button2}
                    onPress = {() => this.props.navigation.navigate('SignUp')}
                >
                    <Text style={styles.buttonText}>Sign Up</Text>
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
export default SignIn;
