import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { Component } from 'react'
import { ActivityIndicator, Text, View, ScrollView, ToastAndroid, TouchableOpacity, StyleSheet } from 'react-native'

class Account extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      AcountListData: []
    }
  }

  componentDidMount () {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.LoggedInCheck()
      this.getData()
    })
  }

  componentWillUnmount () {
    this.unsubscribe()
  }

  async LoggedInCheck () {
    const value = await AsyncStorage.getItem('@session_token')
    if (value == null) {
      this.props.navigation.navigate('SignIn/Out', { screen: 'SignIn' })
    }
  }

  async getData () {
    const theKey = await AsyncStorage.getItem('@session_token')
    const id = await AsyncStorage.getItem('@user_id')
    return fetch('http://10.0.2.2:3333/api/1.0.0/user/' + id, {
      method: 'get',
      headers: {
        'content-Type': 'application/json',
        'X-Authorization': theKey
      }
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else if (response.status === 401) {
          throw 'not logged in'
        } else {
          throw 'something went wrong'
        }
      })
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          AcountListData: responseJson
        })
        ToastAndroid.show('sucsess', ToastAndroid.SHORT)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render () {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      )
    } else {
      console.log(this.state.AcountListData)
      console.log(this.state.AcountListData.favourite_locations)
      const navigation = this.props.navigation
      return (
        <ScrollView>
          <Text h2>Your Account</Text>
          <View>
            <Text>User ID:    {this.state.AcountListData.user_id}</Text>
            <Text>First Name: {this.state.AcountListData.first_name}</Text>
            <Text>Last Name:  {this.state.AcountListData.last_name}</Text>
            <Text>Email:      {this.state.AcountListData.email}</Text>
            <Text>:      </Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Edit')}
          >
            <Text style={styles.buttonText}>Edit Account Infomantion</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Favourites')}
          >
            <Text style={styles.buttonText}>Favourite Locations</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Likes')}
          >
            <Text style={styles.buttonText}>Liked Reviews</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Review')}
          >
            <Text style={styles.buttonText}>Your Reviews</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </ScrollView>
      )
    }
  }
}
const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    justifyContent: 'center'
  }
})
export default Account
