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
import WebViewPage from './pages/WebViewPage';
import {
    Router,
    Scene,
    Actions,
    TabBar,
    Reducer
} from 'react-native-router-flux';
import styles from './style/SplashStyle';
import {APP_TITLE} from './Constants';

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
        // console.log("ACTION:", action);
        return defaultReducer(state, action);
    }
};

class RootPage extends Component {
    render() {
        return (
            <Router>
                <Scene key="about" component={AboutPage} title="about" />
                <Scene key="detail" component={WebViewPage} hideNavBar="true" />
                <Scene key="tabBar" tabs={true} tabBarStyle={styles.tabBarStyle} initial={true}>
                    <Scene key="home" component={HomePage} hideNavBar="true" title={APP_TITLE.TITLE_HOME} icon={TabIcon} />
                    <Scene key="recommend" component={GankRecommendPage} title={APP_TITLE.TITLE_RECOMMEND} icon={TabIcon} />
                    <Scene key="girl" component={GirlPage} title={APP_TITLE.TITLE_GIRL} icon={TabIcon}/>
                    <Scene key="collect" component={CollectListPage} title={APP_TITLE.TITLE_COLLECT} icon={TabIcon}/>
                </Scene>
            </Router>
        );
    }

}

class TabIcon extends Component {
    render(){
        // console.log("tab-"+this.props.title, this.props);
        // console.log("tab-"+this.props.title, this.props.selected);
        let src;
        switch (this.props.title){
            case APP_TITLE.TITLE_HOME:
                src = require('./images/tabicon/ic_home_tab_gank.png');
                break;
            case APP_TITLE.TITLE_RECOMMEND:
                src = require('./images/tabicon/ic_home_tab_rec.png');
                break;
            case APP_TITLE.TITLE_GIRL:
                src = require('./images/tabicon/ic_home_tab_girl.png');
                break;
            case APP_TITLE.TITLE_COLLECT:
                src = require('./images/tabicon/ic_home_tab_collect.png');
                break;
        }
        return (
            <View style={{flex:1, alignItems:'center',}}>
                <Image source={src} width="80"/>
                <Text style={{flex:1, fontFamily:'微软雅黑', color:this.props.selected?'green':'black',fontSize:18,fontWeight:this.props.selected?'bold':'normal'}}>{this.props.title}</Text>
            </View>
        );
    }
}

// export default connect(mapStateToProps, mapDispatchToProps)(RootPage);
export default RootPage;