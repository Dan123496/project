import React, { Component } from 'react';
import { FlatList, ActivityIndicator, Text, View, Button, Alert} from 'react-native';


class networking extends Component{
    
    constructor(props){
        super(props);
        this.state ={ 
          isLoading: true,
          shoppingListData: []
        }
    }
    getData(){
        return fetch('http://10.0.2.2:3333/list')
          .then((response) => response.json())
          .then((responseJson) => {
    
            this.setState({
              isLoading: false,
              shoppingListData: responseJson,
            });
    
          })
          .catch((error) =>{
            console.log(error);
          });
      }
      componentDidMount(){
        this.getData();
      }
      confirm(id){
        Alert.alert(
          "Delete Item ?",
          "Are You sure you want to delete item ",
          [
            {
              text: "Delete",
              onPress:() => this.deleteItem(id),
            },
            {
              text: "Cancel",
              style: "cancel"
            },
            
          ],
          { cancelable: false }
        );
    
      }
      deleteItem(id){
        return fetch('http://10.0.2.2:3333/list/' + id, {
            method: 'delete'
          })
          .then((response) => {
              this.getData();
          })
          .then((response) => {
    
            Alert.alert("Item deleted")
    
          })
          .catch((error) =>{
            console.log(error);
          });
      }
    
      
    
    render(){
        

        if(this.state.isLoading){
            return(
              <View>
                <ActivityIndicator/>
              </View>
            )
        }
      
        
        return (
        
            
            <View>
                <View>
                    <FlatList
                    data={this.state.shoppingListData}
                    renderItem={({item, index}) =>
                        <View>
                            <Text>{item.item_name}</Text>
                            <Button 
                                onPress = {() => this.confirm(item.id)}
                                title="remove"
                                color="#841584"/>
                        </View>
                    }
                    keyExtractor={({id }) => id}
                    />
                </View>
                <View>
                    
                    <Button title='go back' onPress={() => this.props.navigation.goBack()}/>
                </View>
            </View>
            
            

        
        )
            
    }


}

export default networking;

