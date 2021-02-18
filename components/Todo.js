import { NavigationHelpersContext } from '@react-navigation/native';
import React, { Component, } from 'react';
import  { StyleSheet, View, Text, Button, FlatList, TextInput, Keyboard} from 'react-native';

class TodoApp extends Component{
    
    constructor(props){
        super(props);
        this.state = {
        text: '',
        list_items: [],
        };
        this.add = this.add.bind(this);
        this.remove = this.remove.bind(this);
        
    }
    

    handleInput = (textValue) => {
        this.setState({text: textValue})
    }
    add = (text) => {
        if(text.trim().length > 0){
            this.setState(

                prevState => {
                    
                    let { list_items } = prevState;
                    

                    return({
                        list_items: list_items.concat(text),
                        text: ""
                        
                    });
                }
            );
        }else 
        {
            alert('please enter text',[
                {text: 'Ok'}
            ]);
        }
    }
    

    remove = (i) => {
        this.setState(
          prevState => {
            
            let list_items = prevState.list_items.slice();
           
            list_items.splice(i, 1);
            
            return { list_items };
          }
        );
    }
    
    
    
    
    
    
    
    
    render() {

        
        const navigation = this.props.navigation;
        

        return(
            
                
                    <View style={styles.all}>
                        
                        

                        <TextInput placeholder="Change Name" onChangeText={this.handleInput} value={this.state.text} />
                
                        
                        
                        <Button  onPress = {() => this.add(this.state.text)}
                            title="add"
                            color="#841584"
                        />
                        
                        <FlatList style={styles.theList}
                            data={this.state.list_items}
                            renderItem={({item, index}) =>
                                <View>
                                    <Text>{item}</Text>
                                    <Button 
                                    onPress = {() => this.remove(index)}
                                    title="remove"
                                    color="#841584"/>
                                        
                                </View>
                            }
                        />
                        <View style= {styles.button}>
                            <Button onPress={() => this.props.navigation.navigate('Test')} title = "test"/>
                            <Button  onPress={() => this.props.navigation.navigate('flexbox')} title = "flexbox"/>
                            <Button  onPress={() => this.props.navigation.navigate('onoff')} title = "onoff"/>
                            <Button  onPress={() => this.props.navigation.navigate('form')} title = "form"/>
                        </View>
                        
                        
                        
                        
                    </View>
                    
                
                  
            
                    
            
                

           
        );
    }
}
const styles = StyleSheet.create({
    all: {
        backgroundColor: 'yellow',
        flex: 1,
        padding: 20,
    },
    
    theList: {
        flex: 1,
        backgroundColor: 'gold',
    },
    button: {
        paddingBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
    }

    

   
    
})

export default TodoApp;