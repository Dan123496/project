import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { Component } from 'react'
import { FlatList, ActivityIndicator, Text, View, ToastAndroid, TouchableOpacity, StyleSheet, Image } from 'react-native'

class accountReviews extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      AcountListData: [],
      photos: [],
      isImage: true
    }
  }

  async getData () {
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

  componentDidMount () {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getData()
    })
  }

  componentWillUnmount () {
    this.unsubscribe()
  }

  testDelete (location, review) {
    if ((location == null || review == null)) {
      ToastAndroid.show('error', ToastAndroid.SHORT)
    } else {
      this.DeleteReview(location, review)
    }
  }

  async DeleteReview (location, review) {
    const theKey = await AsyncStorage.getItem('@session_token')
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + location + '/review/' + review, {
      method: 'delete',
      headers: {
        'content-Type': 'application/json',
        'X-Authorization': theKey
      }
    })
      .then((response) => {
        if (response.status === 200) {
          ToastAndroid.show('Deleted', ToastAndroid.SHORT)
          this.getData()
        } else if (response.status === 401) {
          throw 'No logged in '
        } else if (response.status === 404) {
          throw 'Bad link '
        } else if (response.status === 403) {
          throw 'Failed '
        } else if (response.status === 400) {
          throw 'Bad Request '
        } else if (response.status === 500) {
          throw 'Bad Request '
        } else {
          throw 'somthing went wrong', response.status
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  testEdit (location, review) {
    if ((location == null || review == null)) {
      ToastAndroid.show('error', ToastAndroid.SHORT)
    } else {
      this.editReview(location, review)
    }
  }

  async editReview (location, review) {
    await AsyncStorage.setItem('@locationId', location.toString())
    await AsyncStorage.setItem('@reviewId', review.toString())
    this.props.navigation.navigate('EditReview')
  }

  testPhoto (location, review) {
    if ((location == null || review == null)) {
      ToastAndroid.show('error', ToastAndroid.SHORT)
    } else {
      this.whichfunction(location, review)
    }
  }

  async AddPhoto (location, review) {
    await AsyncStorage.setItem('@locationId', location.toString())
    await AsyncStorage.setItem('@reviewId', review.toString())
    this.props.navigation.navigate('Camera')
  }

  async RemovePhoto (location, review) {
    const theKey = await AsyncStorage.getItem('@session_token')
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + location + '/review/' + review + '/photo', {
      method: 'delete',
      headers: {
        'X-Authorization': theKey
      }
    })
      .then((response) => {
        if (response.status === 200) {
          ToastAndroid.show('Photo Removed', ToastAndroid.SHORT)
          this.setState({})
        } else if (response.status === 401) {
          throw 'No logged in '
        } else if (response.status === 404) {
          throw 'Bad link '
        } else if (response.status === 403) {
          throw 'Failed '
        } else if (response.status === 400) {
          throw 'Bad Request '
        } else if (response.status === 500) {
          throw 'Bad Request '
        } else {
          throw 'somthing went wrong', response.status
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  async whichfunction (location, review) {
    fetch('http://10.0.2.2:3333/api/1.0.0/location/' + location + '/review/' + review + '/photo')
      .then(res => {
        if (res.status === 404) {
          this.AddPhoto(location, review)
        } else if (res.status === 200) {
          this.RemovePhoto(location, review)
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  render () {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      )
    } else {
      return (
        <View style={styles.view}>
          <Text h2>Your Reviews</Text>
          <FlatList
            style={styles.view}
            data={this.state.AcountListData.reviews}
            renderItem={({ item }) => (
              <View>
                <Text>Id:  {item.location.location_id}</Text>
                <Text>Name:  {item.location.location_name}</Text>
                <Text>Location:  {item.location.location_town}</Text>
                <Text>:</Text>
                <Text>Review number:  {item.review.review_id}</Text>
                <Text>Overall Rating:  {item.review.overall_rating}</Text>
                <Text>Price Rating:  {item.review.price_rating}</Text>
                <Text>Quality Rating:  {item.review.quality_rating}</Text>
                <Text>Clenliness Rating:  {item.review.clenliness_rating}</Text>
                <Text>Comment:  {item.review.review_body}</Text>
                <Text>Photo: </Text>
                <Image style={styles.photo} source={{ uri: 'http://10.0.2.2:3333/api/1.0.0/location/' + item.location.location_id + '/review/' + item.review.review_id + '/photo?time=' + new Date() }} />
                <View style={styles.box}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.testEdit(item.location.location_id, item.review.review_id)}
                  >
                    <Text style={styles.buttonText2}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.testDelete(item.location.location_id, item.review.review_id)}
                  >
                    <Text style={styles.buttonText2}>Delete</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.testPhoto(item.location.location_id, item.review.review_id)}
                  >
                    <Text style={styles.buttonText2}>Add/Remove Photo</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.review.review_id.toString()}
          />
          <View>
            <TouchableOpacity
              accessible={true}
              accessibilityLabel='Go back'
              accessibilityHint='Navigates to the previous screen'
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
    margin: 20,
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
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  photo: {
    width: 200,
    height: 200,
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center'
  }
})
export default accountReviews
