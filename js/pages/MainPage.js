'use strict';
import React, { Component } from 'react';
import { View, DrawerLayoutAndroid, Navigator } from 'react-native';
import { connect } from 'react-redux';

import HomePage from './HomePage'
import GankRecommendPage from './GankRecommendPage'
import GirlPage from './GirlPage'
import AboutPage from './AboutPage'
import CollectListPage from './CollectListPage'
import DrawerMenuComp from '../components/DrawerMenuComp';
import { HOME_TABS } from '../actions/types';
import { switchTab } from '../actions/navigator';

class MainPage extends Component {

    static contextTypes = {
        addBackButtonListener: React.PropTypes.func,
        removeBackButtonListener: React.PropTypes.func,
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            curSelTag: HOME_TABS.HOME,
        };

    }

    render() {
        console.log(this);

    }

}

function select(store) {
    return {
        tab: store,
    }
}

export default connect(select)(MainPage);