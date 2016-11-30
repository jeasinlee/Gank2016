import React, { Component } from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from '../style/SplashStyle';
import {Actions} from 'react-native-router-flux';

export default class AboutPage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={Actions.init}>
                    <Text>AboutPage</Text>
                </TouchableOpacity>
            </View>);
    }
}