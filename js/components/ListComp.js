import React, { Component } from 'react';
import {
    StyleSheet,
    ListView,
    RefreshControl,
    Text,
    View,
    ActivityIndicator as ProgressBar,
} from 'react-native';
import {connect} from 'react-redux';

import LoadView from './LoadView';
import { FETCH_GANK_DATA_STATUS, LOADING_STATE } from '../actions/types';
import { fetchGankList } from '../actions/gankApi';
import { showToast } from './Toast';
import { COMMON_BACKGROUND_COLOR } from '../Constants';
import CommonTouchableComp from './CommonTouchableComp';
import {Actions} from 'react-native-router-flux';

class ListComp extends Component{
    constructor(props) {
        super(props);

        this.category = this.props.category;
        this.tagName = this.props.tagName;
        this.curPageNo = 1;
        this.isLoadMoreing = false;
        this.onRetry = this._onRetry.bind(this);
    }

    componentDidMount(){
        this._fetchData(0);
    }

    shouldComponentUpdate(nextProps, nextState){
        if (this.tagName !== nextProps.ext) return false;

        if(nextProps.status === FETCH_GANK_DATA_STATUS.START){
            return false;
        }else if(nextProps.status === FETCH_GANK_DATA_STATUS.FAILURE){
            if(nextProps.opt === 1){
                //下拉刷新失败
                showToast('刷新数据失败了...');
                return false;
            }else if(nextProps.opt===2){
                //加载更多失败
                showToast('加载更多数据失败了...');
                this.curPageNo;
                this.isLoadMoreing = false;
                return false;
            }
        }

        return true;
    }

    componentDidUpdate(preProps, preState){
        if(preProps.opt ===2){
            this.isLoadMoreing = false;
        }
    }

    _onRetry(){
        this.props.dispatch({type: FETCH_GANK_DATA_STATUS.INITIALIZE, ext: this.tagName});
        // 延迟2秒再调用数据
        setTimeout(() => {
            this._fetchData(0);
        }, 2000);
    }

    render(){
        let contentView;
        if(this.props.status === FETCH_GANK_DATA_STATUS.INITIALIZE){
            contentView = <LoadView loadState={LOADING_STATE.LOAD_STATE_ING}/>;
        }else if(this.props.status === FETCH_GANK_DATA_STATUS.FAILURE){
            contentView = <LoadView loadState={LOADING_STATE.LOAD_STATE_ERROR}
                onRetry={this._onRetry.bind(this)} />;
        }else {
            contentView = (
                <ListView
                    dataSource={this.props.dataSource}
                    renderRow={this._renderItem.bind(this)}
                    automaticallyAdjustContentInsets={false}
                    onEndReachedThreshold={5}
                    onEndReached={this.props.isLoadMore?this._onLoadMore.bind(this):null}
                    renderSeparator={(sectionID, rowID)=><View key={`${sectionID}-${rowID}`} style={styles.separator} />}
                    renderFooter={this.props.isLoadMore?this._footerView: null}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.props.isRefreshing}
                            onRefresh={this._onRefresh.bind(this)}
                            tintColor='#aaaaaa'
                            title='下拉刷新'
                            progressBackgroundColor='#ffffff'
                        />
                    }
                />
            );
        }

        return (
            <View style={styles.container}>
                {contentView}
            </View>
        )
    }

    _renderItem(data){
        return (
            <CommonTouchableComp onPress={this._onItemViewPress.bind(this, data)}>
                <View style={styles.itemViewContainer}>
                    <Text style={styles.title} numberOfLines={2}>{data.desc}</Text>
                    <View style={styles.line2ItemViewContainer}>
                        <Text style={styles.author}>{typeof data.who !== 'undefined' && data.who !== null ? 'via: '+ data.who: ''}</Text>
                        <Text style={styles.time}>{this._formatTime(data.publishedAt)}</Text>
                    </View>
                </View>
            </CommonTouchableComp>
        );
    }

    _onItemViewPress(data) {
        Actions.detail({
            title: data.desc,
            url: data.url,
        });
    }

    _formatTime(time) {
        let date = new Date(time);
        return date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
    }

    /**
     * 加载干货列表数据
     */
    _fetchData(opt) {
        this.curPageNo = opt !== 2 ? 1 : (this.curPageNo + 1);
        this.props.dispatch(fetchGankList(opt, this.category, this.curPageNo, this.tagName));
    }

    _onLoadMore(){
        if(this.isLoadMoreing){
            return;
        }
        this.isLoadMoreing = true;
        setTimeout(()=>{
            this._fetchData(2);
        }, 1000);
    }

    /**
     * 下拉刷新
     */
    _onRefresh() {
        this._fetchData(1);
    }

    _footerView(){
        return (
            <View style={styles.footerContainer}>
                <ProgressBar styleAttr="Small" />
                <Text>正在加载中...</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COMMON_BACKGROUND_COLOR,
        marginBottom:90,
    },
    footerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 10,
    },
    itemViewContainer: {
        padding: 10,
    },
    line2ItemViewContainer: {
        flexDirection: 'row',
    },
    title: {
        fontSize: 16,
        marginBottom: 8,
        color: '#000000',
    },
    author: {
        flex: 1,
        fontSize: 14,
        color: '#999999',
    },
    time: {
        fontSize: 14,
        color: '#999999',
        textAlign: 'right',
    },
    separator: {
        height: 1,
        backgroundColor: '#cccccc',
    },
});

function select(store) {
    return {
        status: store.gankList.status,
        dataSource: store.gankList.dataSource,
        isRefreshing: store.gankList.isRefreshing,
        isLoadMore: store.gankList.isLoadMore,
        opt: store.gankList.opt,
        ext: store.gankList.ext,
    }
}

export default connect(select)(ListComp);

