import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { Component } from 'react'
import { ScrollView, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import Filter from 'bad-words'

class editReview extends Component {
  constructor (props) {
    super(props)
    this.state = {
      overall_rating: '',
      price_rating: '',
      quality_rating: '',
      clenliness_rating: '',
      review_body: ''
    }
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

  async EditReview (overallRating, priceRating, qualityRating, clenlinessRating, reviewBody) {
    if ((overallRating == null || priceRating == null || qualityRating == null || clenlinessRating == null || reviewBody.trim().length <= 0)) {
      Alert.alert('Please fill ever field', [ // if any of the fields are empty, ask user to fill in all fields
        { text: 'Ok' }
      ])
    } else {
      const filter = new Filter()
      filter.addWords('tea', 'teas', 'cake', 'cakes', 'pastry', 'pastries')
      console.log(reviewBody)
      reviewBody = reviewBody ? filter.clean(reviewBody) : '' //runs a filter to fillter out mentions of cakes tea or pastry form the review body
      console.log(reviewBody)
      const locId = await AsyncStorage.getItem('@locationId')
      const revId = await AsyncStorage.getItem('@reviewId') // gets the location id and review id of the review from async storage
      console.log(overallRating, priceRating, qualityRating, clenlinessRating, reviewBody)
      const theKey = await AsyncStorage.getItem('@session_token')
      return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + locId + '/review/' + revId, { // sends patch request to to edit the review, using the location and review retrieved from async storage 
        method: 'PATCH',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Authorization': theKey },
        body: JSON.stringify({
          overall_rating: parseInt(overallRating),
          price_rating: parseInt(priceRating),
          quality_rating: parseInt(qualityRating),
          clenliness_rating: parseInt(clenlinessRating),
          review_body: reviewBody
        })
      })
        .then((response) => {
          if (response.status === 200) {
            AsyncStorage.removeItem('@locationId')
            AsyncStorage.removeItem('@reviewId')
            Alert.alert('Review Edited!')
            this.props.navigation.navigate('Review') // removes the ids from async and navigate the user back to reviews 
          } else if (response.status === 400) {
            throw 'Bad Request'
          } else if (response.status === 401) {
            throw 'Unauthorised'
          } else if (response.status === 403) {
            throw 'Forbidden'
          } else if (response.status === 404) {
            throw 'Not Found'
          } else if (response.status === 500) {
            throw 'Server Error'
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
        <Text style={styles.text}>Overall Rating</Text>
        <RNPickerSelect
          style={pickerSelectStyles}
          placeholder={{ label: 'Select a Rating', value: null }}
          onValueChange={this.handleOverallInput} value={this.state.overall_rating}
          items={[
            { label: '1', value: 1 },
            { label: '2', value: 2 },
            { label: '3', value: 3 },
            { label: '4', value: 4 },
            { label: '5', value: 5 }
          ]}
        />
        <Text style={styles.text}>Price Rating</Text>
        <RNPickerSelect
          style={pickerSelectStyles}
          placeholder={{ label: 'Select a Rating', value: null }}
          onValueChange={this.handlePriceInput} value={this.state.price_rating}
          items={[
            { label: '1', value: 1 },
            { label: '2', value: 2 },
            { label: '3', value: 3 },
            { label: '4', value: 4 },
            { label: '5', value: 5 }
          ]}
        />
        <Text style={styles.text}>Quality Rating</Text>
        <RNPickerSelect
          style={pickerSelectStyles}
          placeholder={{ label: 'Select a Rating', value: null }}
          onValueChange={this.handleQualityInput} value={this.state.quality_rating}
          items={[
            { label: '1', value: 1 },
            { label: '2', value: 2 },
            { label: '3', value: 3 },
            { label: '4', value: 4 },
            { label: '5', value: 5 }
          ]}
        />
        <Text style={styles.text}>Clenliness Rating</Text>
        <RNPickerSelect
          style={pickerSelectStyles}
          placeholder={{ label: 'Select a Rating', value: null }}
          onValueChange={this.handleClenlinessInput} value={this.state.clenliness_rating}
          items={[
            { label: '1', value: 1 },
            { label: '2', value: 2 },
            { label: '3', value: 3 },
            { label: '4', value: 4 },
            { label: '5', value: 5 }
          ]}
        />
        <Text style={styles.text1}>Add a Comment</Text>
        <TextInput
          style={styles.input} placeholder='Add your comment here...'
          onChangeText={this.handleBodyInput}
          value={this.state.review_body}
          multiline={true}
          numberOfLines={5}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.EditReview(this.state.overall_rating, this.state.price_rating, this.state.quality_rating, this.state.clenliness_rating, this.state.review_body)}
        >
          <Text style={styles.buttonText}>Add Review</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button2}
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
    margin: 15,
    borderRadius: 10
  },
  button2: {
    alignItems: 'center',
    backgroundColor: 'blue',
    padding: 10,
    margin: 15,
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
    color: 'grey'
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
    fontSize: 16,
    margin: 10,
    borderColor: 'black',
    borderRadius: 8,
    color: 'black',
    backgroundColor: 'white',
    paddingRight: 30
  }
})
export default editReview
