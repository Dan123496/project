import React, { Component } from 'react';
import { View } from 'react-native';

import Blink from './Blink';

class Blinky extends Component{
    render(){
        return(
            <View style= {{marginTop: 50}}>
                <Blink text='I love to blink'/>
                <Blink text='Yes blinking is so great'/>
                <Blink text='Why did they ever take this out of HTML'/>
                <Blink text='Look at me, look at me, look at me'/>
                <Blink text='Blink!   Blink!   Blink!   Blink!   Blink!'/>
            </View>
        );
    }
}
export default Blinky;