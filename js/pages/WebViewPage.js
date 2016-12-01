import React, { Component, PropTypes } from 'react';
import { View, WebView, Platform } from 'react-native';
import { connect } from 'react-redux';

import HorizontalProgressComp from '../components/HorizontalProgressComp';
import { showToast } from '../components/Toast';
import LoadView from '../components/LoadView';

class WebViewPage extends Component{
    constructor(props) {
        super(props);

        this.state = {
            loadEnd: false,
        }
    }

    render(){
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