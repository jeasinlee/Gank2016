import React, { Component } from 'react';
import {
    StyleSheet,
    RefreshControl,
    Text,
    Image,
    View,
    TouchableOpacity,
    ActivityIndicator as ProgressBar,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import { connect } from 'react-redux';
import GridViewComp from '../components/GridViewComp';
import LoadView from '../components/LoadView';
import ImageView from '../components/ImageView';
import { FETCH_GIRL_DATA_STATUS, LOADING_STATE } from '../actions/types';
import { fetchGirlList } from '../actions/gankApi';
import { showToast } from '../components/Toast';
import {COMMON_BACKGROUND_COLOR} from '../Constants';

class GirlPage extends Component {
    constructor(props){
        super(props);
        // console.log("Girl", this);
        this.isInitLoadData = false;
        this.curPageNo = 1;
        this.isLoadMoreing = false;
        this.onRetry = this._onRetry.bind(this);
    }

    componentDidMount(){
        this._fetchData(0);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!this.isInitLoadData) {
            this.isInitLoadData = true;
            this._fetchData(0);
            return false;
        }

        if (nextProps.status === FETCH_GIRL_DATA_STATUS.START) {
            return false;
        } else if (nextProps.status === FETCH_GIRL_DATA_STATUS.FAILURE) {
            if (nextProps.opt === 1) {
                // 下拉刷新失败
                showToast('刷新数据失败了...');
                return false;
            } else if (nextProps.opt === 2) {
                // 加载更多失败
                showToast('加载更多数据失败了...');
                this.curPageNo --;
                this.isLoadMoreing = false;
                return false;
            }
        }

        return true;
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.opt === 2)
            this.isLoadMoreing = false;
    }

    render(){
        let contentView;
        if(this.props.status === FETCH_GIRL_DATA_STATUS.INITIALIZE){
            contentView = <LoadView loadState={LOADING_STATE.LOAD_STATE_ING}/>
        }else if(this.props.status === FETCH_GIRL_DATA_STATUS.FAILURE){
            contentView = <LoadView loadState={LOADING_STATE.LOAD_STATE_ERROR}/>
        }else{
            contentView = (<GridViewComp
                items={this.props.dataArray}
                itemsPerRow={3}
                renderItem={this._renderItem.bind(this)}
                onEndReachedThreshold={5}
                onEndReached={this.props.isLoadMore ? this._onLoadMore.bind(this) : null}
                renderFooter={this.props.isLoadMore ? this._footerView : null}
                refreshControl={
                  <RefreshControl
                      refreshing={this.props.isRefreshing}
                      onRefresh={this._onRefresh.bind(this)}
                      tintColor="#AAAAAA"
                      title="下拉下载"
                      progressBackgroundColor="#FFFFFF"/>}
            />);
        }

        return (
            <View style={styles.container}>
                {contentView}
            </View>
        );
    }

    _fetchData(opt){
        this.curPageNo = opt === 2? (this.curPageNo + 1) : 1;
        this.props.dispatch(fetchGirlList(opt, this.curPageNo));
    }

    _onRetry(){
        this.props.dispatch({type: FETCH_GIRL_DATA_STATUS.INITIALIZE});
        setTimeout(()=>{
            this._fetchData(0);
        }, 3000);
    }

    _onRefresh(){
        this._fetchData(1);
    }

    _onLoadMore(){
        if(this.isLoadMoreing){
            return;
        }
        this.isLoadMoreing = true;
        // 延迟1秒再调用数据
        setTimeout(() => {
            this._fetchData(2);
        }, 1000)
    }

    _footerView() {
        return (
            <View style={styles.footerContainer}>
                <ProgressBar styleAttr="Small" />
                <Text>
                    正在加载中...
                </Text>
            </View>
        );
    }

    _renderItem(item, sectionID, rowID) {
        return (
            <TouchableOpacity
                key={`${sectionID}-${rowID}`}
                style={{flex: 1}}
                activeOpacity={0.8}
                onPress={this._onItemViewPress.bind(this, item.url)}>
                <ImageView
                    source={{uri: item.url}}
                    defaultSource={require('../images/img_def.png')}
                    resizeMode={Image.resizeMode.cover}
                    style={styles.image} >
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>via：{item.who}</Text>
                    </View>
                </ImageView>
            </TouchableOpacity>
        );
    }

    _onItemViewPress(picUrl) {
        Actions.image({
            picUrl: picUrl,
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: COMMON_BACKGROUND_COLOR,
    },
    footerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 10,
    },
    image: {
        flex: 1,
        height: 350,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        margin: 10,
    },
    titleContainer: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        height: 30,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 10,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 13,
    },
});

function select(store) {
    return {
        status: store.girlList.status,
        dataArray: store.girlList.dataArray,
        isRefreshing: store.girlList.isRefreshing,
        isLoadMore: store.girlList.isLoadMore,
        opt: store.girlList.opt,
    }
}

export default connect(select)(GirlPage);