import React, { Component, PropTypes  } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    BackAndroid,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styles from '../style/SplashStyle';

export default class GirlPage extends Component {
    constructor(props){
        super(props);
        console.log("Girl", this);
    }

    render(){
        return (
            <View style={styles.container}>
                <Text>{this.props.title}</Text>
                <TouchableOpacity onPress={Actions.about}>
                    <Text style={{fontSize:30}}>Click</Text>
                </TouchableOpacity>
            </View>
        );
    }
}