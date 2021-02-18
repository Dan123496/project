import React, { Component } from 'react';
import  { ScrollView, Text, TextInput, View, TouchableOpacity, StyleSheet, Alert, Button, ToastAndroid } from 'react-native';




class SignUp extends Component{

    constructor(props) {
        super(props);
        this.state = {
          first_name: '',
          last_name: '',
          email: '',
          password: '',
          
        };
    }

    signup = () => {
        if((this.state.first_name.trim().length <= 0 || this.state.last_name.trim().length <= 0 || this.state.email.trim().length <= 0 || this.state.password.trim().length <= 0 ))
        {
            alert('Please fill ever fild',[
                {text: 'Ok'}
            ]);
        }else{
            return fetch("http://10.0.2.2:3333/api/1.0.0/user",
            {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        
                        first_name: this.state.first_name,
                        last_name: this.state.last_name,
                        email: this.state.email,
                        password: this.state.password,
                           
        
                        
                    }
                )
            })
            .then((response)=> {
                if(response.status === 201){
                    return response.json()
                }else if(response.status === 400){
                    throw 'Failed validation';
                }else {
                    throw 'somthing went wrong'
                }
            })
            .then(async (responseJson) => {
                console.log("User create with ID", responseJson);
                ToastAndroid.show("Account Created", ToastAndroid.SHORT)
                this.props.navigation.navigate("SignIn");
            })
            .catch((error)=>{
                console.error(error);
                ToastAndroid.show(error, ToastAndroid.SHORT);
            });
        }
    }

    handleFirstNameInput = (first_nameValue) => {
        this.setState({first_name: first_nameValue})
    }
    handleLastNameInput = (last_nameValue) => {
        this.setState({last_name: last_nameValue})
    }
    handleEmailInput = (emailValue) => {
        this.setState({email: emailValue})
    }
    handlePasswordInput = (passwordValue) => {
        this.setState({password: passwordValue})
    }
    
    
    render(){
        const navigation = this.props.navigation;
        return(
            <ScrollView  style={styles.all}>
            <View >

                <TextInput style={styles.input}  placeholder="Enter your first name" onChangeText={this.handleFirstNameInput} value={this.state.first_name} />

                <TextInput style={styles.input}  placeholder="Enter your last Name" onChangeText={this.handleLastNameInput} value={this.state.last_name} />

                <TextInput style={styles.input} placeholder="Enter your Email" onChangeText={this.handleEmailInput} value={this.state.email} />
            
                <TextInput style={styles.input} secureTextEntry={true} placeholder="Enter a Password" onChangeText={this.handlePasswordInput} value={this.state.password} />
            </View>
            <View>
                <TouchableOpacity
                    style={styles.button}
                    onPress = {() => this.signup(this.state.first_name, this.state.last_name , this.state.email, this.state.password)}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
                
            </View>
            <View>
                <Button title='go back' onPress={() => this.props.navigation.goBack()}/>
            </View>
        </ScrollView >
            
            
            
            
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
    },
    text:{
        paddingLeft: 25,
        
    },
});
 

export default SignUp;

   


    
