import 'react-native-gesture-handler'
import React, { Component } from 'react'

import { NavigationContainer } from '@react-navigation/native'

import DrawNavigation from './components/DrawNavigation'

class HelloWorldApp extends Component { // main app class
  render () { // renders the drawer navigator for the application
    return (
      <NavigationContainer>
        <DrawNavigation />
      </NavigationContainer>
    )
  }
}
export default HelloWorldApp
