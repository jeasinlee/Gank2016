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

import { showToast } from './components/Toast';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import GirlPage from './pages/GirlPage';
import CollectListPage from './pages/CollectListPage';

const mapStateToProps = state => ({
    router: state.router,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        ...routerActions,
    }, dispatch),
    dispatch,
});

const defaultSchema = {
    navBar: NavBar,
    navLeftColor: '#FFFFFF',
    navTint: '#224655',
    navTitleColor: '#FFFFFF',
    navTitleStyle: {
        fontFamily: 'Avenir Next',
        fontSize: 18,
    },
    statusStyle: 'light-content',
    tabBar: TabBar,
};

const assets = {
    'collect': require('./images/tabicon/ic_home_tab_collect.png'),
    'gank': require('./images/tabicon/ic_home_tab_gank.png'),
    'girl': require('./images/tabicon/ic_home_tab_girl.png'),
    'rec': require('./images/tabicon/ic_home_tab_rec.png'),
};

class RootPage extends Component {

    constructor(props) {
        super(props);

        this.backButtonListeners = ([]: Array<() => boolean>);
        this.onBack = this._onBack.bind(this);
    }

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', this.onBack);
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress', this.onBack);
    }

    render() {
        return (
            <Router {...this.props} assets={assets} initial="home">
                <Schema name="default" {...defaultSchema} />

                <Route name="home" component={HomePage} hideNavBar={true} />
                <Route name="about" component={AboutPage} />
                <TabRoute name="tabBar" barTint='#FFFFFF' tint="#32DEAF">
                    <Route name="tab1" component={CollectListPage} title="CollectList" tabItem={{icon: assets['collect'], title: 'Collect'}} />
                    <Route name="tab2" component={GirlPage} title="Girl" tabItem={{icon: assets['girl'], title: 'Girl'}} />
                </TabRoute>
            </Router>
        );
    }

    _onBack() {
        // 判断是否有子组件需要消耗返回键事件
        for (let i = this.backButtonListeners.length - 1; i >= 0; i--) {
            if (this.backButtonListeners[i]()) return true;
        }

        let navigator = this.navigator;

        if (navigator && navigator.getCurrentRoutes().length > 1) {
            navigator.pop();
            return true;
        }

        let curTimestamp = new Date().getTime();

        // 判断3秒内两次按返回键才真正退出APP
        if (this.extTimestamp !== undefined && curTimestamp - this.extTimestamp <= 3000) {
            // 真正退出
            return false;
        } else {
            showToast('再按一次退出APP');
            this.extTimestamp = curTimestamp;
            return true;
        }
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(RootPage);