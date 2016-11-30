/**
 * 根页面
 *    1. 初始化导航器（Navigator）
 *    2. 处理Android返回键事件处理
 * Created by iWgang on 16/05/15.
 * https://github.com/iwgang/GankCamp-React-Native
 */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    View,
} from 'react-native';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import GankRecommendPage from './pages/GankRecommendPage';
import GirlPage from './pages/GirlPage';
import CollectListPage from './pages/CollectListPage';
import {
    Router,
    Scene,
    Actions,
    TabBar,
    Reducer
} from 'react-native-router-flux';
import styles from './style/SplashStyle';

const mapStateToProps = state => ({
    router: state.routes,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        ...Actions,
    }, dispatch),
    dispatch,
});

const getSceneStyle = (/* NavigationSceneRendererProps */ props, computedProps) => {
    const style = {
        flex: 1,
        backgroundColor: '#fff',
        shadowColor: null,
        shadowOffset: null,
        shadowOpacity: null,
        shadowRadius: null,
    };
    if (computedProps.isActive) {
        style.marginTop = computedProps.hideNavBar ? 0 : 64;
        style.marginBottom = computedProps.hideTabBar ? 0 : 50;
    }
    return style;
};

const reducerCreate = params=>{
    const defaultReducer = Reducer(params);
    return (state, action)=>{
        console.log("ACTION:", action);
        return defaultReducer(state, action);
    }
};

class RootPage extends Component {
    render() {
        return (
            <Router createReducer={reducerCreate} getSceneStyle={this.getSceneStyle}>
                <Scene key="about" component={AboutPage} title="about" />
                <Scene key="tabBar" tabs={true} tabBarStyle={styles.tabBarStyle} initial={true}>
                    <Scene key="home" component={HomePage} icon={()=>{
                        return <TabIcon title="home" src={require('./images/tabicon/ic_home_tab_gank.png')} />}}/>
                    <Scene key="recommend" component={GankRecommendPage} icon={()=>{
                        return <TabIcon title="recommend" src={require('./images/tabicon/ic_home_tab_rec.png')} />}} />
                    <Scene key="girl" component={GirlPage} icon={()=>{
                        return <TabIcon title="girl" src={require('./images/tabicon/ic_home_tab_girl.png')} />}}/>
                    <Scene key="collect" component={CollectListPage} icon={()=>{
                        return <TabIcon title="collect" src={require('./images/tabicon/ic_home_tab_collect.png')} />}}/>
                </Scene>
            </Router>
        );
    }

}

class TabIcon extends Component {
    render(){
        console.log("tab-"+this.props.title, this);
        // console.log("tab-"+this.props.title, this.props.selected);
        return (
            <View style={{flex:1, alignItems:'center',}}>
                <Image source={this.props.src} width="80"/>
                <Text style={{flex:1, color:this.props.selected?'green':'black',}}>{this.props.title}</Text>
            </View>
        );
    }
}

export default RootPage;