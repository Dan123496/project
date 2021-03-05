import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { Component } from 'react'
import { ToastAndroid, ScrollView, Text, TextInput, View, TouchableOpacity, StyleSheet, Alert } from 'react-native'

class editAccount extends Component {
  constructor (props) {
    super(props)
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      com_password: ''
    }
  }

  async update () {
    if ((this.state.first_name.trim().length <= 0 || this.state.last_name.trim().length <= 0 || this.state.email.trim().length <= 0 || this.state.password.trim().length <= 0)) {
      Alert.alert('Please fill ever fild', [
        { text: 'Ok' }
      ])
    } else if (!(this.state.password === this.state.com_password)) {
      Alert.alert('Password and confirm Password must be the same', [
        { text: 'Ok' }
      ])
    } else {
      const theKey = await AsyncStorage.getItem('@session_token')
      const Id = await AsyncStorage.getItem('@user_id')
      return fetch('http://10.0.2.2:3333/api/1.0.0/user/' + Id,
        {
          method: 'patch',
          headers: {
            'content-Type': 'application/json',
            'X-Authorization': theKey
          },
          body: JSON.stringify({
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password
          })
        })
        .then((response) => {
          if (response.status === 200) {
            return response
          } else if (response.status === 400) {
            throw 'Failed validation'
          } else if (response.status === 401) {
            throw 'not logged in'
          } else if (response.status === 404) {
            throw 'bad link'
          } else {
            throw 'somthing went wrong'
          }
        })
        .then(async (responseJson) => {
          console.log(responseJson)
          ToastAndroid.show('Account updated', ToastAndroid.SHORT)
          await AsyncStorage.removeItem('@session_token')
          await AsyncStorage.removeItem('@user_id')
          this.props.navigation.navigate('Coffida', { screen: 'Home' })
          this.props.navigation.navigate('Account', { screen: 'Account' })
        })
        .catch((error) => {
          console.error(error)
          ToastAndroid.show(error, ToastAndroid.SHORT)
        })
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
    handleComPasswordInput = (comPasswordValue) => {
        this.setState({com_password: comPasswordValue})
    }


  render () {
    const navigation = this.props.navigation
    return (
      <ScrollView style={styles.all}>
        <View>
          <Text h2>Edit Account</Text>
          <TextInput style={styles.input} placeholder='Enter your first name' onChangeText={this.handleFirstNameInput} value={this.state.first_name} />
          <TextInput style={styles.input} placeholder='Enter your last Name' onChangeText={this.handleLastNameInput} value={this.state.last_name} />
          <TextInput style={styles.input} placeholder='Enter your Email' onChangeText={this.handleEmailInput} value={this.state.email} />
          <TextInput style={styles.input} secureTextEntry={true} placeholder='Enter a Password' onChangeText={this.handlePasswordInput} value={this.state.password} />
          <TextInput style={styles.input} secureTextEntry={true} placeholder='Confirm Password' onChangeText={this.handleComPasswordInput} value={this.state.com_password} />
        </View>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.update()}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  all: {
    backgroundColor: 'silver',
    flex: 1,
    padding: 20
  },
  theList: {
    flex: 1
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'blue',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    marginBottom: 50
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    margin: 20,
    borderRadius: 10
  },
  text: {
    paddingLeft: 25
  }
})
export default editAccount
