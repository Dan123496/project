import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'

class signOut extends Component {
  componentDidMount () {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.LoggedInCheck()
    })
  }

  componentWillUnmount () {
    this.unsubscribe()
  }

  async LoggedInCheck () {
    const value = await AsyncStorage.getItem('@session_token')
    if (value == null) {
      this.props.navigation.navigate('SignIn')
    }
  }

  async userLogout () {
    try {
      await AsyncStorage.removeItem('@session_token')
      await AsyncStorage.removeItem('@user_id')
      Alert.alert('Logout Success!')
      this.props.navigation.navigate('Coffida', { screen: 'Home' })
      this.props.navigation.navigate('Account', { screen: 'Account' })
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message)
    }
  }

  render () {
    return (
      <View style={{ marginTop: 50 }}>
        <Text h2>Are you sure you want to Sign Out!</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.userLogout()}
        >
          <Text style={styles.buttonText}>yes Sign out</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button2}
          onPress={() => this.props.navigation.goBack()}
        >
          <Text style={styles.buttonText}>go Back</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: 'blue',
    padding: 10,
    margin: 20,
    borderRadius: 10
  },
  button2: {
    alignItems: 'center',
    backgroundColor: 'blue',
    padding: 10,
    margin: 20,
    borderRadius: 10,
    marginBottom: 40
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
  },
  text2: {
    paddingLeft: 25,
    fontSize: 16
  }
})

export default signOut
