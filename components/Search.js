import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { Component } from 'react'
import { SearchBar } from 'react-native-elements'
import { FlatList, Text, View, TouchableOpacity, StyleSheet, ToastAndroid, PermissionsAndroid, Alert } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import RNPickerSelect from 'react-native-picker-select'
import CheckBox from '@react-native-community/checkbox'
import Geolocation from 'react-native-geolocation-service'
import { getDistance } from 'geolib'

async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'This app requires access to your location.',
        buttonPositive: 'OK',
        buttonNegative: 'NO',
        buttonNeutral: 'Ask Later'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can access location')
      return true
    } else {
      console.log('Location permission denied')
      return false
    }
  } catch (err) {
    console.warn(err)
  }
}
class Search extends Component {
  constructor (props) {
    super(props)
    this.state = {
      search: null,
      SearchListData: [],
      AvgOverall: null,
      AvgPrice: null,
      AvgQuality: null,
      AvgClenliness: null,
      toggleFavBox: false,
      toggleYourBox: false,
      toggleNearBox: false,
      favLoc: [],
      longitude1: null,
      latitude1: null
    }
  }

  componentDidMount () {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.findCoordinates()
    })
  }

  componentWillUnmount () {
    this.unsubscribe()
  }
    
  handleSearch = (search1) => {
    this.setState({ search: search1 })
  }
  handleAvgOverall = (overallValue) => {
    this.setState({ AvgOverall: overallValue })
  }
  handleAvgPrice = (priceValue) => {
    this.setState({ AvgPrice: priceValue })
  }
  handleAvgQuality = (qualityValue) => {
    this.setState({ AvgQuality: qualityValue })
  }
  handleAvgCleniness = (clenlinessValue) => {
    this.setState({ AvgClenliness: clenlinessValue })
  }
  handleFavBox = (FavValue) => {
    this.setState({ toggleFavBox: FavValue })
  }
  handleYourBox = (YourValue) => {
    this.setState({ toggleYourBox: YourValue })
  }
  handleNearBox = (nearValue) => {
    this.setState({ toggleNearBox: nearValue })
  }
    

  async searchAll (searched, Overall, Price, Quality, Cleanliness, Fav, Your) {
    const theKey = await AsyncStorage.getItem('@session_token')
    let searchParms = searched
    if (!(searched == null)) {
      if (!(Overall == null)) {
        searchParms = searchParms + '&overall_rating=' + Overall.toString()
      }
      if (!(Price == null)) {
        searchParms = searchParms + '&price_rating=' + Price.toString()
      }
      if (!(Quality == null)) {
        searchParms = searchParms + '&quality_rating=' + Quality.toString()
      }
      if (!(Cleanliness == null)) {
        searchParms = searchParms + '&clenliness_rating=' + Cleanliness.toString()
      }
      if (Fav === true) {
        searchParms = searchParms + '&search_in=favourite'
      }
      if (Your === true) {
        searchParms = searchParms + '&search_in=reviewed'
      }
      return fetch('http://10.0.2.2:3333/api/1.0.0/find?q=' + searchParms, {
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
            SearchListData: responseJson
          })
          ToastAndroid.show('sucsess' , ToastAndroid.SHORT);
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      Alert.alert('Please  Add something to search', [
        { text: 'Ok' }
      ])
    }
  }
    
    findCoordinates = () =>{
      if(!this.state.locationPermission){
        this.setState({locationPermission:  requestLocationPermission() })
      }
      Geolocation.getCurrentPosition(
        (position) => {
          this.setState({ latitude1: position.coords.latitude })
          this.setState({ longitude1: position.coords.longitude })
        },
        (error) => {
          Alert.alert(error.message)
        },
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000
        }
      )
    }
    

  testAddReview (location) { 
    if ((location == null)) {
      ToastAndroid.show('error', ToastAndroid.SHORT)
    } else {
      const id = location
      this.addReview(id)
    }
  }

  async addReview (id) {
    await AsyncStorage.setItem('@locationId', id.toString())
    this.props.navigation.navigate('AddReview')
  }

  testToReviews (location2) {
    if ((location2 == null)) {
      ToastAndroid.show('error', ToastAndroid.SHORT)
    } else {
      const id = location2
      this.toReviews(id)
    }
  }

  async toReviews (id) {
    await AsyncStorage.setItem('@locationId', id.toString())
    this.props.navigation.navigate('Reviews')
  }

  testFavourite (location) {
    if ((location == null)) {
      ToastAndroid.show('error', ToastAndroid.SHORT)
    } else {
      const locid = location
      this.favouriteLocation(locid)
    }
  }

  testUnFavourite (location) {
    if ((location == null)) {
      ToastAndroid.show('error', ToastAndroid.SHORT)
    } else {
      const locid = location
      this.unFavouriteLocation(locid)
    }
  }

  async favouriteLocation (location) {
    const theKey = await AsyncStorage.getItem('@session_token')
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + location + '/favourite', {
      method: 'post',
      headers: {
        'content-Type': 'application/json',
        'X-Authorization': theKey
      }
    })
      .then(async (response)=> {
        if (response.status === 200) {
          ToastAndroid.show('Added to Favourites', ToastAndroid.SHORT)
          const joined = this.state.favLoc.concat(location)
          this.setState({ favLoc: joined })
          console.log(this.state.favLoc)
          await AsyncStorage.setItem('@locations', JSON.stringify(this.state.favLoc))
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

  async unFavouriteLocation (location, index) {
    const theKey = await AsyncStorage.getItem('@session_token')
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + location + '/favourite', {
      method: 'delete',
      headers: {
        'content-Type': 'application/json',
        'X-Authorization': theKey
      }
    })
      .then(async (response)=> {
        if (response.status === 200) {
          ToastAndroid.show('Removed From Favourites', ToastAndroid.SHORT)
          let t = this.state.favLoc
          console.log(t)
          t.splice(index, 1)
          console.log(t)
          this.setState({ favLoc: t })
          console.log(this.state.favLoc)
          await AsyncStorage.setItem('@locations', JSON.stringify(this.state.favLoc))
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

  isFavourite (id) {
    const t = this.state.favLoc.includes(id)
    if (t === true) {
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
    } else {
      return (
        <TouchableOpacity
          style={styles.button2}
          onPress={() => this.testFavourite(id)}
        >
          <Text style={styles.buttonText2}>Make a Favourite Location </Text>
        </TouchableOpacity>
      )
    }
  }

  addStar (id) {
    const t = this.state.favLoc.includes(id)
    if (t === true) {
      return (
        <Ionicons name='star' color='gold' size={30} />
      )
    }
  }

  distance (lat1, long1, lat2, long2) {
    return (
      getDistance(
        { latitude: lat1, longitude: long1 },
        { latitude: lat2, longitude: long2 }
      )
    )
  }

  nearOrNot () {
    if (this.state.toggleNearBox === true) {
      return (
        <FlatList
          style={styles.view}
          data={this.state.SearchListData}
          renderItem={({ item, index }) => {
            console.log(this.distance(this.state.latitude1, this.state.longitude1, item.latitude, item.longitude))
            if ((this.distance(this.state.latitude1, this.state.longitude1, item.latitude, item.longitude)) <= 10000) {
              return (
                <View>
                  <Text>Location Name : {item.location_name}</Text>
                  <Text>Location Town : {item.location_town}</Text>
                  <Text>Average Overall Rating:  {item.avg_overall_rating}</Text>
                  <Text>Average Price Rating:  {item.avg_price_rating}</Text>
                  <Text>Average Quality Rating:  {item.avg_quality_rating}</Text>
                  <Text>Average Clenliness Rating:  {item.avg_clenliness_rating}</Text>
                  <Text>Distance:  {this.distance(this.state.latitude1, this.state.longitude1, item.latitude, item.longitude)}m</Text>
                  <Text>:  </Text>
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
              )
            }
          }}
          keyExtractor={(item, index) => item.location_id.toString()}
        />
      )
    } else if (this.state.toggleNearBox === false) {
      return (
        <FlatList
          style={styles.view}
          data={this.state.SearchListData}
          renderItem={({ item }) => (
            <View>
              <Text>Location Name : {item.location_name}</Text>
              <Text>Location Town : {item.location_town}</Text>
              <Text>Average Overall Rating:  {item.avg_overall_rating}</Text>
              <Text>Average Price Rating:  {item.avg_price_rating}</Text>
              <Text>Average Quality Rating:  {item.avg_quality_rating}</Text>
              <Text>Average Clenliness Rating:  {item.avg_clenliness_rating}</Text>
              <Text>:  </Text>
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
          keyExtractor={(item, index) => item.location_id ? item.location_id.toString() : ''}
        />
      )
    }
  }

  render () {
    return (
      <View style={styles.view}>
        <SearchBar
          style={styles.search}
          placeholder='Search'
          onChangeText={this.handleSearch}
          value={this.state.search}
        />
        <View style={styles.pickers1}>
          <View style={styles.pickers}>
            <Text style={styles.pickerText}>Overall Rating</Text>
            <RNPickerSelect
              style={pickerSelectStyles}
              placeholder={{ label: 'Sort Base on Average Overall Rating', value: null }}
              onValueChange={this.handleAvgOverall} value={this.state.AvgOverall}
              items={[
                { label: '1', value: 1 },
                { label: '2', value: 2 },
                { label: '3', value: 3 },
                { label: '4', value: 4 },
                { label: '5', value: 5 }
              ]}
            />
          </View>
          <View style={styles.pickers}>
            <Text>Price Rating</Text>
            <RNPickerSelect
              style={pickerSelectStyles}
              placeholder={{ label: 'Sort Base on Average Price Rating', value: null }}
              onValueChange={this.handleAvgPrice} value={this.state.AvgPrice}
              items={[
                { label: '1', value: 1 },
                { label: '2', value: 2 },
                { label: '3', value: 3 },
                { label: '4', value: 4 },
                { label: '5', value: 5 }
              ]}
            />
          </View>
          <View style={styles.pickers}>
            <Text>Quality Rating</Text>
            <RNPickerSelect
              style={pickerSelectStyles}
              placeholder={{ label: 'Sort Base on Average Quality Rating', value: null }}
              onValueChange={this.handleAvgQuality} value={this.state.AvgQuality}
              items={[
                { label: '1', value: 1 },
                { label: '2', value: 2 },
                { label: '3', value: 3 },
                { label: '4', value: 4 },
                { label: '5', value: 5 }
              ]}
            />
          </View>
          <View style={styles.pickers}>
            <Text>Cleanliness{'\n'}Rating</Text>
            <RNPickerSelect
              style={pickerSelectStyles}
              placeholder={{ label: 'Sort Base on Average Clenliness Rating', value: null }}
              onValueChange={this.handleAvgCleniness} value={this.state.AvgClenliness}
              items={[
                { label: '1', value: 1 },
                { label: '2', value: 2 },
                { label: '3', value: 3 },
                { label: '4', value: 4 },
                { label: '5', value: 5 }
              ]}
            />
          </View>
          <View style={styles.pickers2}>
            <Text>Search Favourites</Text>
            <CheckBox
              disabled={false}
              value={this.state.toggleFavBox}
              onValueChange={this.handleFavBox}
            />
            <Text>Search Your Reviews</Text>
            <CheckBox
              disabled={false}
              value={this.state.toggleYourBox}
              onValueChange={this.handleYourBox}
            />
            <Text>Search Near You (within 10km)</Text>
            <CheckBox
              disabled={false}
              value={this.state.toggleNearBox}
              onValueChange={this.handleNearBox}
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.searchAll(this.state.search, this.state.AvgOverall, this.state.AvgPrice, this.state.AvgQuality, this.state.AvgClenliness, this.state.toggleFavBox, this.state.toggleYourBox)}
        >
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
        <View style={styles.view}>
          {this.nearOrNot()}
          <View>
            <TouchableOpacity
              style={styles.button3}
              onPress={() => this.props.navigation.goBack()}
            >
              <Text style={styles.buttonText}>Go Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  search: {
    margin: 1,
    color: 'white'
  },
  button: {
    backgroundColor: 'blue',
    margin: 20,
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
  button3: {
    backgroundColor: 'blue',
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
    marginBottom: 30
  },
  pickers: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  pickers1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexWrap: 'wrap'
  },
  pickers2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  pickerText: {
    flexWrap: 'wrap'
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center'
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
const pickerSelectStyles = StyleSheet.create({
  placeholder: {
    color: 'grey',
    fontSize: 20
  },
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30
  },
  inputAndroid: {
    fontSize: 20,
    margin: 5,
    borderColor: 'black',
    borderRadius: 8,
    color: 'black',
    backgroundColor: 'white',
    paddingRight: 80
  }
})
export default Search
