import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { Component } from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-elements'

class Home extends Component {
  componentDidMount () { // runs the login checker when the page is on top (in view)
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.LoggedInCheck()
    })
  }

  componentWillUnmount () { // stop running listener when the page un mounts (not in view)
    this.unsubscribe()
  }

  async LoggedInCheck () {
    const value = await AsyncStorage.getItem('@session_token')
    if (value == null) {
      this.props.navigation.navigate('SignIn/Out', { screen: 'SignIn' })
    }
  }

  render () {
    return (
      <View style={{ marginTop: 50 }}>
        <Text h3>Welcome to Coffida</Text>
      </View>
    )
  }
}
export default Home
