import React, { Component } from 'react';
import  { StyleSheet, View, Text,  } from 'react-native';



class flexbox_test extends Component{
    render(){
        return(
            <View style= {styles.container}>
                <Text style={styles.boxOne}>One</Text>
                <Text style={styles.boxTwo}>Two</Text>
                <Text style={styles.boxThree}>Three</Text>
                <Text style={styles.boxFour}>Four</Text>
                <Text style={styles.boxFive}>Five</Text>
                <Text style={styles.boxSix}>Six</Text>
                <Text style={styles.boxSeven}>Seven</Text>
                <Text style={styles.boxEight}>Eight</Text>



            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      //flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: "#eaeaea"
    },
    boxOne: {
        backgroundColor: 'silver',
        padding: 10,
    },
    boxTwo: {
        backgroundColor: 'green',
        padding: 10,
    },
    boxThree: {
        backgroundColor: 'blue',
        padding: 10,
    },
    boxFour: {
        backgroundColor: 'red',
        padding: 10,
    },
    boxFive: {
        backgroundColor: 'gold',
        padding: 10,
    },
    boxSix: {
        backgroundColor: 'brown',
        padding: 10,
    },
    boxSeven: {
        backgroundColor: 'white',
        padding: 10,
    },
    boxEight: {
        backgroundColor: 'purple',
        padding: 10,
    },

    
    
})

export default flexbox_test;
