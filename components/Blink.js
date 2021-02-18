import React, { Component } from 'react';
import { Text , View } from 'react-native';

class Blink extends Component{
    
    constructor(props){
        super(props);

        this.state = {
            isShowingText: true
        }
    }

    componentDidMount(){
        const toggle = setInterval(() =>{
            this.setState({isShowingText: !this.state.isShowingText})
        }, 500);
    }  
    
    render(){
        if(!this.state.isShowingText){
            return null;
        }else{
            return <Text>{this.props.text}</Text>
        }
    }

}
export default Blink; 