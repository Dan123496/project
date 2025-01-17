import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { Component } from 'react'
import { FlatList, ActivityIndicator, Text, View, ToastAndroid, TouchableOpacity, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

class Locations extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      LocationListData: [],
      favLoc: []
    }
  }

  async getData () { // gets the location information by sending get requset to the find endpoint
    const theKey = await AsyncStorage.getItem('@session_token')
    return fetch('http://10.0.2.2:3333/api/1.0.0/find?limit=1000', {
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
          LocationListData: responseJson // saves the respons in state
        })
        ToastAndroid.show('sucsess', ToastAndroid.SHORT)
      })
      .then(async () => {
        this.getLocIds()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  async getLocIds () { // gets favourite locations from async storage
    const locId = await AsyncStorage.getItem('@locations')
    this.setState({ favLoc: JSON.parse(locId) })
    this.setState({ isLoading: false })
  }

  componentDidMount () { // runs the get data function  when the page is on top (in view)
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getData()
    })
  }

  componentWillUnmount () { // stop running listener when the page un mounts (not in view)
    this.unsubscribe()
  }

  testAddReview (location) { // makes sure location id is not null
    if ((location == null)) {
      ToastAndroid.show('error', ToastAndroid.SHORT)
    } else {
      const id = location
      this.addReview(id)
    }
  }

  async addReview (id) { // stores the location id in state and navigates the user to the add review page
    await AsyncStorage.setItem('@locationId', id.toString())
    this.props.navigation.navigate('AddReview')
  }

  testToReviews (location2) { // makes sure location id is not null
    if ((location2 == null)) {
      ToastAndroid.show('error', ToastAndroid.SHORT)
    } else {
      const id = location2
      this.toReviews(id)
    }
  }

  async toReviews (id) { // stores the location id in state and navigates the user to the reviews page
    await AsyncStorage.setItem('@locationId', id.toString())
    this.props.navigation.navigate('Reviews')
  }

  async favouriteLocation (location) { // sends post request to the favourite endpoint using the id of the location selected
    const theKey = await AsyncStorage.getItem('@session_token')
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + location + '/favourite', {
      method: 'post',
      headers: {
        'content-Type': 'application/json',
        'X-Authorization': theKey
      }
    })
      .then(async (response) => {
        if (response.status === 200) {
          ToastAndroid.show('Added to Favourites', ToastAndroid.SHORT)
          const joined = this.state.favLoc.concat(location)
          this.setState({ favLoc: joined })
          console.log(this.state.favLoc)
          await AsyncStorage.setItem('@locations', JSON.stringify(this.state.favLoc)) // adds the new location to the favourite array in async storage
          this.getData()
        } else if (response.status === 401) {
          throw 'No logged in '
        } else if (response.status === 404) {
          throw 'Bad link '
        } else if (response.status === 400) {
          throw 'Bad Request '
        } else {
          throw 'somthing went wrong', response.status
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  async unFavouriteLocation (location, index) { // sends delete request to the favourite endpoint using the id of the location selected to un favourite location
    const theKey = await AsyncStorage.getItem('@session_token')
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + location + '/favourite', {
      method: 'delete',
      headers: {
        'content-Type': 'application/json',
        'X-Authorization': theKey
      }
    })
      .then(async (response) => {
        if (response.status === 200) {
          ToastAndroid.show('Removed From Favourites', ToastAndroid.SHORT)
          let t = this.state.favLoc
          console.log(t)
          t.splice(index, 1)
          console.log(t)
          this.setState({ favLoc: t })
          console.log(this.state.favLoc)
          await AsyncStorage.setItem('@locations', JSON.stringify(this.state.favLoc)) // removes the location to the favourite array in async storage
          this.getData()
        } else if (response.status === 401) {
          throw 'No logged in '
        } else if (response.status === 404) {
          throw 'Bad link '
        } else if (response.status === 401) {
          throw 'Unathorised '
        } else if (response.status === 500) {
          throw 'Server error '
        } else {
          throw 'somthing went wrong', response.status
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  testFavourite (location) { // makes sure the location id is not null
    if ((location == null)) {
      ToastAndroid.show('error', ToastAndroid.SHORT)
    } else {
      const locid = location
      this.favouriteLocation(locid)
    }
  }

  testUnFavourite (location) { // makes sure the location id is not null
    if ((location == null)) {
      ToastAndroid.show('error', ToastAndroid.SHORT)
    } else {
      const locid = location
      this.unFavouriteLocation(locid)
    }
  }

  isFavourite (id) { // check if a location is in the users favourites
    const t = this.state.favLoc.includes(id)
    if (t === true) { // if the location is in the users favourites, renders the remove favourite button
      const index = this.state.favLoc.indexOf(id)
      console.log(index)
      return (
        <TouchableOpacity
          style={styles.button2}
          onPress={() => this.testUnFavourite(id, index)}
        >
          <Text style={styles.buttonText2}>Remove Favourite</Text>
        </TouchableOpacity>
      )
    } else { // if the location is not in the users favourites, renders the favourite location button
      return (
        <TouchableOpacity
          style={styles.button2}
          onPress={() => this.testFavourite(id)}
        >
          <Text style={styles.buttonText2}>Add to Favourites</Text>
        </TouchableOpacity>
      )
    }
  }

  addStar (id) { // renders a star if the location id is in the users favourites
    let t = this.state.favLoc.includes(id)
    if (t === true) {
      return (
        <Ionicons name='star' color='gold' size={30} />
      )
    }
  }

  render () {
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      )
    } else {
      return (
        <View style={styles.view}>
          <Text h2>Location</Text>
          <FlatList
            style={styles.view}
            data={this.state.LocationListData}
            renderItem={({ item }) => (
              <View>
                <Text>Location Name : {item.location_name}</Text>
                <Text>Location Name : {item.location_town}</Text>
                <Text>Average Overall Rating:  {item.avg_overall_rating}</Text>
                <Text>Average Price Rating:  {item.avg_price_rating}</Text>
                <Text>Average Quality Rating:  {item.avg_quality_rating}</Text>
                <Text>Average Clenliness Rating:  {item.avg_clenliness_rating}</Text>
                <Text>Latitude:  {item.latitude}</Text>
                <Text>Longitude:  {item.longitude}</Text>
                <View style={styles.star}>{this.addStar(item.location_id)}</View>
                <View style={styles.box}>
                  <TouchableOpacity
                    style={styles.button2}
                    onPress={() => this.testToReviews(item.location_id)}
                  >
                    <Text style={styles.buttonText2}>View Reviews</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button2}
                    onPress={() => this.testAddReview(item.location_id)}
                  >
                    <Text style={styles.buttonText2}>Add Review</Text>
                  </TouchableOpacity>
                  {this.isFavourite(item.location_id)}
                </View>
              </View>
            )}
            keyExtractor={(item, index) => item.location_id.toString()}
          />
          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.goBack()}
            >
              <Text style={styles.buttonText}>Go Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
  }
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    margin: 30,
    borderRadius: 10,
    alignItems: 'center',
    padding: 10
  },
  button2: {
    backgroundColor: 'blue',
    margin: 5,
    borderRadius: 10,
    alignItems: 'center',
    padding: 10
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  buttonText2: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white'
  },
  view: {
    flex: 1
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexWrap: 'wrap'
  },
  star: {
    flexDirection: 'row-reverse',
    marginLeft: 30
  }
})

export default Locations
