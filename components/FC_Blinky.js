import React, { Component } from 'react';
import { View } from 'react-native';

import FC_Blink from './FC_Blink';

class FC_Blinky extends Component{
    render(){
        return(
            <View style= {{marginTop: 50}}>
                <FC_Blink text='I love to blink'/>
                <FC_Blink text='Yes blinking is so great'/>
                <FC_Blink text='Why did they ever take this out of HTML'/>
                <FC_Blink text='Look at me, look at me, look at me'/>
                
            </View>
        );
    }
}
export default FC_Blinky;