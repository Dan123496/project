import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { Component } from 'react'
import { ScrollView, Text, TextInput, View, TouchableOpacity, StyleSheet, Alert, ToastAndroid } from 'react-native';
import RNPickerSelect from 'react-native-picker-select'
import Filter from 'bad-words'

class addReviewTab extends Component {
  constructor (props) {
    super(props)
    this.state = {
      overall_rating: '',
      price_rating: '',
      quality_rating: '',
      clenliness_rating: '',
      review_body: '',
      LocationListData: [],
      LocId: ''
    }
  }

  async getData () { // gets the location data from the find end point, to be used as selectible options in the locations picker 
    const theKey = await AsyncStorage.getItem('@session_token')
    return fetch('http://10.0.2.2:3333/api/1.0.0/find', {
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
          LocationListData: responseJson
        })
        ToastAndroid.show('sucsess', ToastAndroid.SHORT)
      })
      .catch((error) => {
        console.log(error);
      })
  }

  componentDidMount () {
    this.getData()
  }
  handleOverallInput = (overallValue) => { // hadlers to change state when the value of the input pickers and inputs are changed 
    this.setState({overall_rating: overallValue})
  }
  handlePriceInput = (priceValue) => {
    this.setState({price_rating: priceValue})
  }
  handleQualityInput = (qualityValue) => {
    this.setState({quality_rating: qualityValue})
  }
  handleClenlinessInput = (clenlinessValue) => {
    this.setState({clenliness_rating: clenlinessValue})
  }
  handleBodyInput = (bodyValue) => {
    this.setState({review_body: bodyValue})
  }
  handleLocationId =(locIdValue) =>{
    this.setState({LocId: locIdValue})
  }
    
  async AddReview (overallRating, priceRating, qualityRating, clenlinessRating, reviewBody) {
    if ((overallRating == null || priceRating == null || qualityRating == null || clenlinessRating == null || reviewBody.trim().length <= 0)) {
      Alert.alert('Please fill ever fild',[ // if any of the fields are empty, ask user to fill in all fields
        { text: 'Ok' }
      ])
    } else {
      const filter = new Filter()
      filter.addWords('tea', 'teas', 'cake', 'cakes', 'pastry', 'pastries')
      console.log(reviewBody)
      reviewBody = reviewBody ? filter.clean(reviewBody) : '' //runs a filter to fillter out mentions of cakes tea or pastry form the review body
      console.log(reviewBody)
      const id = this.state.LocId
      console.log(id, overallRating, priceRating, qualityRating, clenlinessRating, reviewBody)
      const theKey = await AsyncStorage.getItem('@session_token')
      return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + id + '/review', { // sends post request  using the location  retrieved from async storage
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Authorization': theKey },
        body: JSON.stringify(
          {
            overall_rating: parseInt(overallRating),
            price_rating: parseInt(priceRating),
            quality_rating: parseInt(qualityRating),
            clenliness_rating: parseInt(clenlinessRating),
            review_body: reviewBody
          })
      })
        .then((response) => {
          if (response.status === 201) {
            AsyncStorage.removeItem('@locationId')
            Alert.alert('Review.Added!')
            this.props.navigation.navigate('Locations')
          } else if (response.status === 400) {
            throw 'Failed validation'
          } else {
            throw 'somthing went wrong', response.status
          }
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }

  render () {
    return (
      <ScrollView style={styles.all}>
        <View>
          <RNPickerSelect
            style={pickerSelectStyles}
            placeholder={{ label: 'Select a Location....', value: null }}
            onValueChange={this.handleLocationId} value={this.state.LocId}
            items={this.state.LocationListData.map(item => ({
              key: item.location_id,
              label: ' ' + item.location_name + ':     ' + item.location_town,
              value: item.location_id,
              color: 'black'
            }))}
          />
        </View>
        <Text style={styles.text}>Overall Rating</Text>
        <RNPickerSelect
          style={pickerSelectStyles}
          placeholder={{ label: 'Select a Rating', value: null }}
          onValueChange={this.handleOverallInput} value={this.state.overall_rating}
          items={[
            { label: '      1', value: 1 },
            { label: '      2', value: 2 },
            { label: '      3', value: 3 },
            { label: '      4', value: 4 },
            { label: '      5', value: 5 }
          ]}
        />
        <Text style={styles.text}>Price Rating</Text>
        <RNPickerSelect
          style={pickerSelectStyles}
          placeholder={{ label: 'Select a Rating', value: null }}
          onValueChange={this.handlePriceInput} value={this.state.price_rating}
          items={[
            { label: '      1', value: 1 },
            { label: '      2', value: 2 },
            { label: '      3', value: 3 },
            { label: '      4', value: 4 },
            { label: '      5', value: 5 }
          ]}
        />
        <Text style={styles.text}>Quality Rating</Text>
        <RNPickerSelect
          style={pickerSelectStyles}
          placeholder={{ label: 'Select a Rating', value: null }}
          onValueChange={this.handleQualityInput} value={this.state.quality_rating}
          items={[
            { label: '      1', value: 1 },
            { label: '      2', value: 2 },
            { label: '      3', value: 3 },
            { label: '      4', value: 4 },
            { label: '      5', value: 5 }
          ]}
        />
        <Text style={styles.text}>Clenliness Rating</Text>
        <RNPickerSelect
          style={pickerSelectStyles}
          placeholder={{ label: 'Select a Rating', value: null }}
          onValueChange={this.handleClenlinessInput} value={this.state.clenliness_rating}
          items={[
            { label: '      1', value: 1 },
            { label: '      2', value: 2 },
            { label: '      3', value: 3 },
            { label: '      4', value: 4 },
            { label: '      5', value: 5 }
          ]}
        />
        <Text style={styles.text1}>Add a Comment</Text>
        <TextInput
          style={styles.input}
          placeholder='Add your comment here...'
          onChangeText={this.handleBodyInput} value={this.state.review_body}
          multiline={true} numberOfLines={5}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.AddReview(this.state.overall_rating, this.state.price_rating, this.state.quality_rating, this.state.clenliness_rating, this.state.review_body)}
        >
          <Text style={styles.buttonText}>Add Review</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.goBack()}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
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
    borderRadius: 10,
    color: 'black'
  },
  text: {
    fontSize: 16,
    paddingLeft: 15,
    marginTop: 20
  },
  text1: {
    fontSize: 16,
    paddingLeft: 15,
    marginTop: 30
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
    margin: 10,
    borderColor: 'black',
    borderRadius: 8,
    color: 'black',
    backgroundColor: 'white',
    paddingRight: 30
  }
})
export default addReviewTab
