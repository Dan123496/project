import 'react-native-gesture-handler'
import React, { } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StackActions } from '@react-navigation/native'

import Ionicons from 'react-native-vector-icons/Ionicons'

import Home from './Home'
import signOut from './signOut'
import signIn from './signIn'
import signUp from './signUp'
import Account from './Account'
import accountFav from './accountFav'
import accountLikes from './accountLikes'
import accountReviews from './accountReviews'
import addReview from './addReview'
import addReviewTab from './addReviewTab'
import Search from './Search'
import Locations from './Locations'
import editAccount from './editAccount'
import locationReviews from './locationReviews'
import editReview from './editReview'
import Camera from './Camera'
import Map from './Map'
// import all compants that can be navigated to in the app
const stack = createStackNavigator()

const LocationNavigator = () => { // creates a stack navigator for all screens to do with location, nested in the location screen of the  tab navigator
  return (
    <stack.Navigator screenOptions={{ headerShown: false }}>
      <stack.Screen name='Locations' component={Locations} />
      <stack.Screen name='Reviews' component={locationReviews} />
      <stack.Screen name='AddReview' component={addReview} />
    </stack.Navigator>
  )
}
const SearchNavigator = () => { // creates a stack navigator for all screens to do with the search page, nested in the search screen of the  tab navigator
  return (
    <stack.Navigator screenOptions={{ headerShown: false }}>
      <stack.Screen name='Search' component={Search} />
      <stack.Screen name='Reviews' component={locationReviews} />
      <stack.Screen name='AddReview' component={addReview} />
    </stack.Navigator>
  )
}
const AccountNavigator = () => { // creates a stack navigator for all screens to do with the Account page, nested in the search screen of the  drawer navigator
  return (
    <stack.Navigator screenOptions={{ headerShown: false }}>
      <stack.Screen name='Account' component={Account} />
      <stack.Screen name='Favourites' component={accountFav} />
      <stack.Screen name='Likes' component={accountLikes} />
      <stack.Screen name='Edit' component={editAccount} />
      <stack.Screen name='Review' component={accountReviews} />
      <stack.Screen name='EditReview' component={editReview} />
      <stack.Screen name='Camera' component={Camera} />
    </stack.Navigator>
  )
}
const SignNavigator = () => { // creates a stack navigator for all screens to do with the signin page, nested in the sign in screen of the  drawer navigator
  return (
    <stack.Navigator screenOptions={{ headerShown: false }}>
      <stack.Screen name='SignIn' component={signIn} />
      <stack.Screen name='SignUp' component={signUp} />
      <stack.Screen name='SignOut' component={signOut} />
    </stack.Navigator>
  )
}

const Tab = createBottomTabNavigator()

const TabNavigator = () => { // creates a Tab navigator for all main screens not to do with accounts an signin, nested in the home  screen of the  drawer navigator
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline'
          } else if (route.name === 'Locations') {
            iconName = focused ? 'location' : 'location-outline'
          } else if (route.name === 'Add Review') {
            iconName = focused ? 'add-circle' : 'add-circle-outline'
          } else if (route.name === 'Search') {
            iconName = focused ? 'search-circle' : 'search-circle-outline'
          } else if (route.name === 'Map') {
            iconName = focused ? 'map' : 'map-outline'
          }
          return <Ionicons name={iconName} size={size} color={color} />
        }
      })}
      tabBarOptions={{
        activeTintColor: 'deepskyblue',
        inactiveTintColor: 'gray'
      }}
    >
      <Tab.Screen name='Home' component={Home} />
      <Tab.Screen name='Locations' component={LocationNavigator} />
      <Tab.Screen name='Add Review' component={addReviewTab} />
      <Tab.Screen name='Search' component={SearchNavigator} />
      <Tab.Screen name='Map' component={Map} />
    </Tab.Navigator>
  )
}

const draw = createDrawerNavigator()

const DrawNavigation = () => { // creates a drawer navigator for all were all screens and navigators will be nested and will handle all navigation for app
  return (
    <draw.Navigator screenOptions={{ headerShown: true, gesturesEnabled: true }} initialRouteName='Coffida'>
      <draw.Screen
        name='Coffida' onPress={() => this.props.navigation.dispatch(StackActions.popToTop())} component={TabNavigator} options={
          {
            drawerIcon: ({ focused, size }) => {
              return <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={focused ? 'deepskyblue' : 'grey'} />
            }
          }
        }
      />
      <draw.Screen
        name='SignIn/Out' component={SignNavigator} options={
          {
            drawerIcon: ({ focused, size }) => {
              return <Ionicons name={focused ? 'log-in' : 'log-in-outline'} size={size} color={focused ? 'deepskyblue' : 'grey'} />
            }
          }
        }
      />
      <draw.Screen
        name='Account' component={AccountNavigator} options={
          {
            drawerIcon: ({ focused, size }) => {
              return <Ionicons name={focused ? 'person-circle' : 'person-circle-outline'} size={size} color={focused ? 'deepskyblue' : 'grey'} />
            }
          }
        }
      />
    </draw.Navigator>
  )
}
export default DrawNavigation
