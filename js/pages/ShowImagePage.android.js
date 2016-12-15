import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, WebView, Dimensions, Platform } from 'react-native';
import CustomTitleBarComp from '../components/CustomTitleBarComp';
import RNTouchImageView from '../components/TouchImageComp';
import {Actions} from 'react-native-router-flux';

class ShowImagePage extends Component {

    constructor(props) {
        super(props);
        this.onBack = this._onBack.bind(this);
    }

    static propTypes = {
        picUrl: PropTypes.string.isRequired,
    };

    static contextTypes = {
        addBackButtonListener: React.PropTypes.func,
        removeBackButtonListener: React.PropTypes.func,
    };

    _onBack(){
        Actions.pop();
        return true;
    }

    componentDidMount(){
        this.context.addBackButtonListener(this.onBack);
    }

    componentWillUnmount(){
        this.context.removeBackButtonListener(this.onBack);
    }

    render() {
        let contentView;
        contentView = (
            <RNTouchImageView
                src={this.props.picUrl}
                style={{height: Dimensions.get('window').height}}
                onClick={this.onBack}
            />
        );

        return (
            <View style={{flex: 1, backgroundColor: '#000000'}}>
                {contentView}
                <CustomTitleBarComp
                    titleBarStyle={styles.titleBarStyle}
                    onLeftBtnClick={this.onBack}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    titleBarStyle: {
        top: 0,
        left: 0,
        right: 0,
        position: 'absolute',
    },
});

export default ShowImagePage;