import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
BackAndroid,
} from 'react-native';
// import Button from 'react-native-button';
import {Actions} from 'react-native-router-flux';
import styles from '../style/SplashStyle';
import {showToast} from '../components/Toast';

export default class HomePage extends Component {
    constructor(props){
        super(props);
        // this.onBack = this.onBack.bind(this);
    }
    // onBack(){
    //     let curTimestamp = new Date().getTime();
    //
    //     // 判断3秒内两次按返回键才真正退出APP
    //     if (this.extTimestamp !== undefined && curTimestamp - this.extTimestamp <= 3000) {
    //         // 真正退出
    //         BackAndroid.exitApp(0);
    //         return false;
    //     } else {
    //         showToast('再按一次退出APP');
    //         this.extTimestamp = curTimestamp;
    //         return true;
    //     }
    // }

    // componentDidMount(){
    //     BackAndroid.addEventListener('hardwareBackPress', this.onBack);
    // }
    //
    // componentWillUnmount(){
    //     BackAndroid.removeEventListener('hardwareBackPress', this.onBack);
    // }
    render(){
        console.log("HomePage", this.props)
        return (
            <View style={styles.container}>
                <Text style={{fontSize:30}}>Home</Text>

            </View>
        );
    }
}