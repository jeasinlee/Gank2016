import React, { Component } from 'react';
import {ListView, StyleSheet, View, Text, Platform, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {COMMON_BACKGROUND_COLOR} from '../Constants';
import {FETCH_COLLECT_DATA_STATUS} from '../actions/types';
import CustomTitleBarComp from '../components/CustomTitleBarComp';
import CommonTouchableComp from '../components/CommonTouchableComp';
import LoadView from '../components/LoadView';
import {Actions} from 'react-native-router-flux';
import { fetchCollectListAction } from '../actions/collect';
import Svg,{ Line } from 'react-native-svg';

class CollectListPage extends Component {
    constructor(props) {
        super(props);

        this.isInitLoadData = false;
    }

    componentDidMount() {
        this._fetchData();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!this.isInitLoadData) {
            this.isInitLoadData = true;
            this._fetchData();
            return false;
        }

        return true;
    }

    render() {
        let width = Dimensions.get("window").width;
        let arr = [5,3];
        let contentView;
        if (this.props.status === FETCH_COLLECT_DATA_STATUS.INITIALIZE) {
            contentView = <LoadView loadState="ing" />;
        } else {
            if (this.props.isNotData) {
                contentView = (
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text>还没有收藏哦...</Text>
                    </View>
                );
            } else {
                contentView = (
                    <ListView
                        automaticallyAdjustContentInsets={false}
                        dataSource={this.props.dataSource}
                        renderRow={this._renderItem.bind(this)}
                        renderSeparator={(sectionID, rowID) => <Svg key={`${sectionID}-${rowID}`} height="3" width={width}>
                                                            <Line x1="0" x2={width} y1="0" y2="0" strokeWidth="2" stroke="#d5d5d5"
                                                            strokeDasharray={arr} />
                                                        </Svg>}
                    />
                );
            }
        }
        return (
            <View style={styles.container}>
                {contentView}
            </View>
        );
    }

    /**
     * 加载收藏列表数据
     */
    _fetchData() {
        this.props.dispatch(fetchCollectListAction());
    }

    _onItemViewPress(gankData) {
        Actions.detail({
            title: gankData.title,
            url: gankData.url,
        });
    }

    _renderItem(gankData) {
        return (
            <CommonTouchableComp onPress={this._onItemViewPress.bind(this, gankData)}>
                <View style={styles.itemViewContainer}>
                    <Text style={styles.title} numberOfLines={2}>{gankData.title}</Text>
                    <Text style={styles.time}>收藏于：{this._formatTime(gankData.time)}</Text>
                </View>
            </CommonTouchableComp>
        );
    }

    _formatTime(date) {
        return date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COMMON_BACKGROUND_COLOR,
    },
    itemViewContainer: {
        padding: 10,
    },
    title: {
        fontSize: 16,
        marginBottom: 8,
        color: '#000000',
    },
    time: {
        fontSize: 14,
        color: '#999999',
        alignSelf: 'flex-end',
    },
    separator: {
        height: 1,
        backgroundColor: '#cccccc',
    },
});

function select(store) {
    return {
        status: store.collectList.status,
        dataSource: store.collectList.dataSource,
        isNotData: store.collectList.isNotData,
    }
}

export default connect(select)(CollectListPage);