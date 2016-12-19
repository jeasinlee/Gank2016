import React, { Component } from 'react';
import { StyleSheet, View, PickerIOS, TouchableHighlight } from 'react-native';

import CommonTouchableComp from './CommonTouchableComp';
import { COMMON_BACKGROUND_COLOR, TITLE_BAR_HEIGHT, APP_MAIN_COLOR } from '../Constants';
import OvalButtonComp from './OvalButtonComp';
import Modal from 'react-native-modalbox';


class HistoryDaySelectorComp extends Component {

    constructor(props) {
        super(props);

        this.hideMode = this._hideMode.bind(this);

        this.state = {
            visible: false,
            selDay: null,
            dataSource: null,
        };
    }

    render() {
        let contentView;
        if(null!= this.state.dataSource && this.state.dataSource.length>0){
            contentView = (
                <View style={styles.contentViewStyle}>
                    <PickerIOS style={{height: 230}}
                               selectedValue={this.state.selDay}
                               animationType="fade"
                               onValueChange={(itemValue, itemPosition) => this.setState({selDay: itemValue})}>
                        {this.state.dataSource.map((day, index) => {
                            return (<PickerIOS.Item key={index} label={'第' + day + '期'} value={day} />);
                        })}
                    </PickerIOS>
                    <View style={{flexDirection: 'row', marginTop: 20, marginBottom: 20}}>
                        <View style={{flex: 1, alignItems:'center'}}>
                            <OvalButtonComp onPress={this.hideMode}>取消</OvalButtonComp>
                        </View>
                        <View style={{flex: 1, alignItems:'center'}}>
                            <OvalButtonComp onPress={this._onSelected.bind(this)}>选择</OvalButtonComp>
                        </View>
                    </View>
                </View>
            );
        }

        return (
            <Modal
                transparent={true}
                style={{flex: 1}}
                isOpen={this.state.visible}
                onRequestClose={this.hideMode}>
                {contentView}
                <TouchableHighlight style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}} underlayColor="rgba(0,0,0,0)"
                onPress={this.hideMode}>
                    <View />
                </TouchableHighlight>
            </Modal>
        );
    }

    _hideMode(){
        this.setState({visible: false});
    }

    show(dataSource, selDay) {
        this.setState({
            visible: true,
            selDay: selDay,
            dataSource: dataSource,
        });
    }

    _onSelected(selDay){
        this.hideMode();
        this.props.onSelected && this.props.onSelected(this.state.selDay);
    }

}

const styles = StyleSheet.create({
    dayHistoryContainer: {
        height: 45,
        justifyContent: 'center',
        paddingLeft: 10,
    },
    dayHistoryText: {
        color: '#333333',
        fontSize: 16,
    },
    footerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 10,
    },
});

export default HistoryDaySelectorComp;