import React, { Component, PropTypes } from 'react';
import { View, WebView, Platform } from 'react-native';
import { connect } from 'react-redux';

import HorizontalProgressComp from '../components/HorizontalProgressComp';
import { showToast } from '../components/Toast';
import LoadView from '../components/LoadView';
import { TITLE_BAR_HEIGHT } from '../Constants';
import CustomTitleBarComp from '../components/CustomTitleBarComp';
import {Actions} from 'react-native-router-flux';
import { collectStatusAction, addCollectAction, removeCollectAction } from '../actions/collect';

class WebViewPage extends Component{
    constructor(props) {
        super(props);

        this.state = {
            loadEnd: false,
        }
        console.log('dsds');
        this.addCollect = this._addCollect.bind(this);
    }

    componentDidMount(){
        this.props.dispatch(collectStatusAction(this.props.url));
    }

    _addCollect(){
        if(!this.props.isCollect) {
            this.props.dispatch(addCollectAction(this.props.title !== undefined ? this.props.title : this.props.url, this.props.url));
            showToast('收藏成功');
        }else{
            this.props.dispatch(removeCollectAction(this.props.url));
            showToast('成功取消收藏');
        }
    }

    render(){
        let titleBar;
        if (!this.props.hideTitleBar) {
            titleBar = (
                <CustomTitleBarComp
                    title={this.props.title}
                    onLeftBtnClick={() => Actions.pop()}
                    rightText={this.props.isCollect ? '取消收藏' : '收藏'}
                    onRightBtnClick={this.addCollect}
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

function select(store) {
    return {
        isCollect: store.collectList.isCollect,
    }
}

export default connect(select)(WebViewPage);