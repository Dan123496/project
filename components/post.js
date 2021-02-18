import React, { Component } from 'react';
import { FlatList, ActivityIndicator, ScrollView, Text, TextInput, View, TouchableOpacity, StyleSheet, Alert  } from 'react-native';


class post extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
          id: '',
          item_name: '',
          description: '',
          unit_price: '',
          quantity: ''
        };
    }
    handleIdInput = (idValue) => {
        this.setState({id: idValue})
    }
    handleItemNameInput = (item_nameValue) => {
        this.setState({item_name: item_nameValue})
    }
    handleDescriptionInput = (descriptionValue) => {
        this.setState({description: descriptionValue})
    }
    handleUnitPriceInput = (unit_priceValue) => {
        this.setState({unit_price: unit_priceValue})
    }
    handleQuantityInput = (quantityValue) => {
        this.setState({quantity: quantityValue})
    }
    


    addItem(){
        if((this.state.id.trim().length <= 0 || this.state.item_name.trim().length <= 0 || this.state.description.trim().length <= 0 || this.state.unit_price.trim().length <= 0 || this.state.quantity.trim().length <= 0))
        {
            alert('Please fill ever fild',[
                {text: 'Ok'}
            ]);
        }else{
            return fetch("http://10.0.2.2:3333/list",
            {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify(
                {
                    id: parseInt(this.state.id),
                    item_name: this.state.item_name,
                    description: this.state.description,
                    unit_price: parseInt(this.state.unit_price),
                    quantity: parseInt(this.state.quantity)

                })
            })
            .then((response)=> {
                Alert.alert("Item.Added!");
            })
            .catch((error)=>{
                console.error(error);
            });
        }
    }
      
    

    

    render(){
        const navigation = this.props.navigation;

        
      
        
        return (
        
        <ScrollView  style={styles.all}>
            <View >
                <Text style={styles.text}>Item Id</Text>
                <TextInput style={styles.input} keyboardType = 'numeric' numeric value  placeholder="Enter ID" onChangeText={this.handleIdInput} value={this.state.id} />
            
                <Text style={styles.text}>Item Name</Text>
                <TextInput style={styles.input}  placeholder="Enter Item Name" onChangeText={this.handleItemNameInput} value={this.state.item_name} />

                <Text style={styles.text}>Description</Text>
                <TextInput style={styles.input} placeholder="Enter Description" onChangeText={this.handleDescriptionInput} value={this.state.description} />

                <Text style={styles.text}>Unit Price</Text>
                <TextInput style={styles.input} keyboardType = 'numeric' numeric value  placeholder="Enter Unit Price" onChangeText={this.handleUnitPriceInput} value={this.state.unit_price} />

                <Text style={styles.text}>Quantity</Text>
                <TextInput style={styles.input} keyboardType = 'numeric' numeric value   placeholder="Enter Quantity" onChangeText={this.handleQuantityInput} value={this.state.quantity} />

            </View>
            <View>
                <TouchableOpacity
                    style={styles.button}
                    onPress = {() => this.addItem(this.state.id, this.state.item_name, this.state.description, this.state.unit_price, this.state.quantity )}
                >
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
                
            </View>
        </ScrollView >
        )
    }
}
const styles = StyleSheet.create({
    all: {
        backgroundColor: 'silver',
        flex: 1,
        padding: 20,
    },
    
    theList: {
        flex: 1,
    },
    button: {
        alignItems: "center",
        backgroundColor: "blue",
        padding: 10,
        margin: 10,
        borderRadius:10,
        marginBottom: 50,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: "bold",
        color: 'white',
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        margin:20,
        borderRadius:10,
    },
    text:{
        paddingLeft: 25,
        
    },
});
    


    
export default post;