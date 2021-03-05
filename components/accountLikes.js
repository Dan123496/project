import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { Component } from 'react'
import { FlatList, ActivityIndicator, Text, View, ToastAndroid, TouchableOpacity, StyleSheet, Image } from 'react-native'

class accountLikes extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      AcountListData: [],
      likedIds: []
    }
  }

  async getData () { // gets the users information by scenting a get request to the user information endpoint. uses the user id in async storage
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

  componentDidMount () { // runs the login checker when the page is on top (in view)
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getData()
    })
  }

  componentWillUnmount () { // stop running listener when the page un mounts (not in view)
    this.unsubscribe()
  }

  testUnlike (location, review) { // checks to make sure location id and review id are not null before attempting unlike
    if ((location == null || review == null)) {
      ToastAndroid.show('error', ToastAndroid.SHORT)
    } else {
      const locid = location
      const rewid = review
      this.UnlikeReview(locid, rewid)
    }
  }

  printPhotos (location, review) {
    const t = 'http://10.0.2.2:3333/api/1.0.0/location/' + location + '/review/' + review + '/photo'
    console.log(t)
    return (
      <Image style={styles.photo} source={{ uri: t }} />
    )
  }

  async UnlikeReview (location, review) { // Unlikes the review the users click on, using the location id and review id.
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
          ToastAndroid.show('Unliked', ToastAndroid.SHORT)
          const likeId = await AsyncStorage.getItem('@liked')
          let remid = JSON.parse(likeId)
          console.log(remid)
          const index = remid.indexOf(review)
          remid.splice(index, 1)
          console.log(remid)
          await AsyncStorage.setItem('@liked', JSON.stringify(remid)) // removes the unliked review id from the liked array in async storeage so the users likes are updated
          this.getData()
        } else if (response.status === 401) {
          throw 'No logged in '
        } else if (response.status === 404) {
          throw 'Bad link '
        } else if (response.status === 403) {
          throw 'Failed '
        } else {
          throw 'somthing went wrong', response.status
        }
      })
      .catch((error) => {
        console.log(error)
      })
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
        <View style={styles.View}>
          <Text h2>Liked Reviews</Text>
          <FlatList
            style={styles.View}
            data={this.state.AcountListData.liked_reviews}
            renderItem={({ item }) => (
              <View>
                <Text>Name:  {item.location.location_name}</Text>
                <Text>Location:  {item.location.location_name}</Text>
                <Text>:</Text>
                <Text>Review number:  {item.review.review_id}</Text>
                <Text>Overall Rating:  {item.review.overall_rating}</Text>
                <Text>Price Rating:  {item.review.price_rating}</Text>
                <Text>Quality Rating:  {item.review.quality_rating}</Text>
                <Text>Clenliness Rating:  {item.review.clenliness_rating}</Text>
                <Text>Comment:  {item.review.review_body}</Text>
                <Text>Likes:   {item.review.likes}</Text>
                <Text>Photo: </Text>
                {this.printPhotos(item.location.location_id, item.review.review_id)}
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.testUnlike(item.location.location_id, item.review.review_id)}
                >
                  <Text style={styles.buttonText}>Unlike</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => item.review.review_id.toString()}
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
  View: {
    flex: 1
  },
  photo: {
    width: 200,
    height: 200,
    flex: 1
  }
})
export default accountLikes
