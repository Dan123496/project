import React, { useState, useEffect } from 'react';
import { Text  } from 'react-native';

const FC_Blink = (props) => {
    const [isShowingText, setIsShowingText] = useState(true)
 
    useEffect(() =>{
        const toggle = setInterval(() =>{
            setIsShowingText(!isShowingText);
        },1000);
         
        return () => clearInterval(toggle);
    });
    
    if (!isShowingText){
        return null;

    }else{
        return <Text>{props.text}</Text>;
    }

}
export default FC_Blink; 