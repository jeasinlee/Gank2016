import React, { Component, PropTypes } from 'react';
import { View, WebView, Platform } from 'react-native';
import { connect } from 'react-redux';

import HorizontalProgressComp from '../components/HorizontalProgressComp';
import { showToast } from '../components/Toast';
import LoadView from '../components/LoadView';
import { TITLE_BAR_HEIGHT } from '../Constants';
import CustomTitleBarComp from '../components/CustomTitleBarComp';
import {Actions} from 'react-native-router-flux';

class WebViewPage extends Component{
    constructor(props) {
        super(props);

        this.state = {
            loadEnd: false,
        }
    }

    render(){
        let titleBar;
        if (!this.props.hideTitleBar) {
            titleBar = (
                <CustomTitleBarComp
                    title={this.props.title}
                    onLeftBtnClick={() => Actions.pop()}
                    rightText="收藏"
                />
            );
        }

        let horizontalProgress;
        if(!this.state.loadEnd){
            horizontalProgress = (
              <HorizontalProgressComp
                color={'#ff5000'}
                progress={60}
                style={{position: 'absolute',
                    left: 0,
                    right: 0,
                    top: TITLE_BAR_HEIGHT + (Platform.OS === 'android' ? 18 : 20)}}
              />
            );
        }

        return (
            <View style={{flex:1}}>
                {titleBar}
                <WebView
                    ref="webView"
                    source={{uri: this.props.url}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    decelerationRate='normal'
                    onLoadEnd={()=>{
                        this.setState({loadEnd:true})
                    }}
                    renderError={() => <LoadView loadState="error" onRetry={() => this.refs.webView.reload()} />}
                    />
                {horizontalProgress}
            </View>
        )
    }
}

export default connect()(WebViewPage);