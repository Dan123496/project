import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

const TextBox = () => {
  const [enteredtext, setText] = useState('');
  return (
    <View style={{padding: 10}}>
      <Text>Enter Text!:</Text>
      
       
       
       <Button
        onPress={buttonClickListtener}
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"/>
        
        
        <text>TextBox.{enteredtext}</text>
      
    
    </View>
    
  );
  
}



export default TextBox;

<TextInput border
                style ={{height: 40},{borderBottomColor: 'black'}}
                placeholder="Type Text Here!"
                onChangeText={TextInputValue => this.setState({TextInputValue})}
                defaultValue={""}/>