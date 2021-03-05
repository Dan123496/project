import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { Component } from 'react'
import { FlatList, ActivityIndicator, Text, View, TouchableOpacity, StyleSheet, Image, ToastAndroid } from 'react-native'

class locationReviews extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      location: '',
      review: '',
      LocationListData: [],
      likedIds: []
    }
  }

  async getData () { // gets the reviews of location the user selected on the location page
    const theKey = await AsyncStorage.getItem('@session_token')
    const locationId = await AsyncStorage.getItem('@locationId') // the location id of the users chosen location that was stored in @locationId on the location page is retrieved
    this.setState({ location: locationId })
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + locationId, { // fetch the location information of the location id stored i aysnc storage
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
          const errorMessage = { code: 401, message: 'not logged in' }
          throw errorMessage
        } else {
          const errorMessage = { message: 'somthig when wrong' }
          throw errorMessage
        }
      })
      .then((responseJson) => {
        this.setState({
          LocationListData: responseJson // saves the respons json in state
        })
        ToastAndroid.show('sucsess', ToastAndroid.SHORT)
        this.getLocIds()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  async getLocIds () {
    const likeId = await AsyncStorage.getItem('@liked') // retrevse the users likes from async storage and stores in state
    this.setState({ likedIds: JSON.parse(likeId) })
    this.setState({ isLoading: false })
  }

  componentDidMount () { // runs the getData again  when the page is on top (in view) so new info is displayed
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getData()
    })
  }

  componentWillUnmount () { // stop running listener when the page un mounts (not in view)
    this.unsubscribe()
  }

  async likeReview (location, review) { // likes the review the users click on, using the location id and review id.
    const theKey = await AsyncStorage.getItem('@session_token')
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + location + '/review/' + review + '/like', {
      method: 'post',
      headers: {
        'content-Type': 'application/json',
        'X-Authorization': theKey
      }
    })
      .then(async (response) => {
        if (response.status === 200) {
          ToastAndroid.show('Like Added', ToastAndroid.SHORT)
          const joined = this.state.likedIds.concat(review)
          this.setState({ likedIds: joined })
          console.log(this.state.likedIds)
          await AsyncStorage.setItem('@liked', JSON.stringify(this.state.likedIds)) // updates the liked array in async storage so the new like review is added 
          this.getData()
        } else if (response.status === 401) {
          const errorMessage = { code: 401, message: 'Unauthorised' }
          throw errorMessage
        } else if (response.status === 404) {
          const errorMessage = { code: 404, message: 'Not Found' }
          throw errorMessage
        } else if (response.status === 400) {
          const errorMessage = { code: 400, message: 'Bad Request' }
          throw errorMessage
        } else {
          const errorMessage = { message: 'somthig when wrong' + response.status }
          throw errorMessage
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  async UnLikeReview (location, review, index) { // Unlikes the review the users click on, using the location id and review id.
    const theKey = await AsyncStorage.getItem('@session_token')
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + location + '/review/' + review + '/like', {
      method: 'delete',
      headers: {
        'content-Type': 'application/json',
        'X-Authorization': theKey
      }
    })
      .then(async (response) => {
        if (response.status === 200) {
          ToastAndroid.show('Like removed', ToastAndroid.SHORT)
          const t = this.state.likedIds
          console.log(t)
          t.splice(index, 1)
          console.log(t)
          this.setState({ likedIds: t })
          console.log(this.state.likedIds)
          await AsyncStorage.setItem('@liked', JSON.stringify(this.state.likedIds)) // updates the liked array in async storage so the unlike review is removed
          this.getData()
        } else if (response.status === 401) {
          const errorMessage = { code: 401, message: 'Unauthorised' }
          throw errorMessage
        } else if (response.status === 404) {
          const errorMessage = { code: 404, message: 'Not Found' }
          throw errorMessage
        } else if (response.status === 400) {
          const errorMessage = { code: 400, message: 'Bad Request' }
          throw errorMessage
        } else {
          const errorMessage = { message: 'somthig when wrong' + response.status }
          throw errorMessage
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  testLike (location, review) { // tests location id and review id are not null
    if ((location == null || review == null)) {
      ToastAndroid.show('error', ToastAndroid.SHORT)
    } else {
      const locid = location
      const rewid = review
      this.likeReview(locid, rewid)
    }
  }

  testUnLike (location, review, index) { // tests location id and review id are not null
    if ((location == null || review == null)) {
      ToastAndroid.show('error', ToastAndroid.SHORT)
    } else {
      const locid = location
      const rewid = review
      this.UnLikeReview(locid, rewid, index)
    }
  }

  isLiked (locId, revId) { // check the liked array in async storage to see if user has liked the review
    const t = this.state.likedIds.includes(revId)
    if (t === true) { // if the user has liked the review, unlike button is rendered
      const index = this.state.likedIds.indexOf(revId)
      console.log(index)
      return (
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.testUnLike(locId, revId, index)}
        >
          <Text style={styles.buttonText}>Unlike</Text>
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity
          style={styles.button} // if the user has not liked the review, like button is rendered
          onPress={() => this.testLike(locId, revId)}
        >
          <Text style={styles.buttonText}>Like</Text>
        </TouchableOpacity>
      )
    }
  }

  printPhotos (location, review) { // prints the reviews photo to screen, if it has one, by linking to the get photo endpoint
    const t = 'http://10.0.2.2:3333/api/1.0.0/location/' + location + '/review/' + review + '/photo'
    console.log(t)
    return (
      <Image style={styles.photo} source={{ uri: t }} />
    )
  }

  render () {
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      )
    } else { // displays the locations reviews, navigation buttons, and like button
      return (
        <View style={styles.view}>
          <Text h2>Reviews :</Text>
          <FlatList
            style={styles.view}
            data={this.state.LocationListData.location_reviews}
            renderItem={({ item, index }) => (
              <View>
                <View>
                  <Text>Review number:  {item.review_id}</Text>
                  <Text>Overall Rating:  {item.overall_rating}</Text>
                  <Text>Price Rating:  {item.price_rating}</Text>
                  <Text>Quality Rating:  {item.quality_rating}</Text>
                  <Text>Clenliness Rating:  {item.clenliness_rating}</Text>
                  <Text>Comment:  {item.review_body}</Text>
                  <Text>Likes:   {item.likes}</Text>
                  <Text>Photo: </Text>
                  {this.printPhotos(this.state.location, item.review_id)}
                  {this.isLiked(this.state.location, item.review_id)}
                </View>
              </View>
            )}
            keyExtractor={(item, index) => item.review_id.toString()}
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
  view: {
    flex: 1
  },
  photo: {
    width: 200,
    height: 200,
    flex: 1
  }
})
export default locationReviews
