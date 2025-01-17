import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import { RNCamera } from 'react-native-camera'

class Camera extends Component {
  async takePicture () { // creates a camera and waites for a piture to be taken before add send a post request for the picture
    if (this.camera) {
      const options = { quality: 0.5, base64: true }
      const data = await this.camera.takePictureAsync(options)
      console.log(data.url)
      const theKey = await AsyncStorage.getItem('@session_token')
      const locId = await AsyncStorage.getItem('@locationId')
      const revId = await AsyncStorage.getItem('@reviewId') // gets the selected review's location id and review id from async storage
      return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + locId + '/review/' + revId + '/photo', // sends a post request to the photo endpoint to add photo
        {
          method: 'post',
          headers: {
            'content-Type': 'image/jpeg',
            'X-Authorization': theKey
          },
          body: data
        }
      )
        .then((response) => {
          Alert.alert('Picture Added!')
          this.props.navigation.goBack()
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }

  render () {
    return (
      <View style={{ flex: 1 }}>
        <Text h2>Camera</Text>
        <RNCamera
          ref={ref => {
            this.camera = ref
          }}
          style={styles.preview}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.takePicture()}
        >
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.goBack()}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({

  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
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
  }
})
export default Camera
