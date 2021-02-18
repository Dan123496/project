/*import 'react-native-gesture-handler';
import React, { Component } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import  Ionicons  from 'react-native-vector-icons/Ionicons';

import Home from './Home';
import Locations from './Locations';
import LocationNavigator from './locationstack';
import AddReview from './AddReview';
import Favourites from './Favourites';



const Tab = createBottomTabNavigator()

const TabNavigator = () => {
        return (
            
              <Tab.Navigator
                screenOptions={({ route }) => ({
                  tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                      iconName = focused ? 'home' : 'home-outline';
                    }else if (route.name === 'Locations') {
                      iconName = focused ? 'location' : 'location-outline';
                    } else if (route.name === 'Add Review') {
                      iconName = focused ? 'add-circle' : 'add-circle-outline';
                    }else if (route.name === 'Favourites'){
                      iconName = focused ? 'star' : 'star-outline';
                    }
        
                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color}/>;
                  },
                })} 
                tabBarOptions={{
                  activeTintColor: 'deepskyblue',
                  inactiveTintColor: 'gray',
                }}
            >
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Locations" component={LocationNavigator} />
                <Tab.Screen name="Add Review" component={AddReview} />
                <Tab.Screen name="Favourites" component={Favourites} />
              </Tab.Navigator>
            
        );
    }







    
export default TabNavigator;
*/