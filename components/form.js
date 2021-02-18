import React, { Component } from 'react';
import { Text, TextInput, View, Button, StyleSheet, TouchableOpacity } from 'react-native';

class form extends Component {
  constructor(props){
    super(props);
    this.state = {
        email: "",
        password: "",
    };
  }
  handleEmailInput = (emailValue) => {
    this.setState({email: emailValue})
  }
  handlePasswordInput = (passwordValue) => {
    this.setState({password: passwordValue})
  }
  login = (email, password) => {
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

        alert('email is: '+ email + ' password is: '+ password,[
            {text: 'Ok'}
        ]);
    }
        
    
    
    
    
  }

  render() {
    return (
    
        <View style={styles.all}>
            <View>
                <TextInput style={styles.input} placeholder="Enter Email" onChangeText={this.handleEmailInput} value={this.state.email} />
            
                <TextInput style={styles.input} secureTextEntry={true} placeholder="Enter Password" onChangeText={this.handlePasswordInput} value={this.state.password} />
            </View>
            <View>
                <TouchableOpacity
                    style={styles.button}
                    onPress = {() => this.login(this.state.email, this.state.password )}
                >
                    <Text style={styles.buttonText}>sign In</Text>
                </TouchableOpacity>
                
            </View>
        </View>
        
    );
  }

}

const styles = StyleSheet.create({
    all: {
        backgroundColor: 'silver',
        flex: 1,
        
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        margin:20,
        borderRadius:10,
        
        
    },
    button: {
        alignItems: "center",
        backgroundColor: "blue",
        padding: 10,
        margin: 10,
        borderRadius:10,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: "bold",
        color: 'white',
    }
    
    
});

export default form;
