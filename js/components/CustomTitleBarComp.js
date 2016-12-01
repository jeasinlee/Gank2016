import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, Text, Image, Platform } from 'react-native';
import CommonTouchableComp from './CommonTouchableComp';
import CustomTitleBarHeaderTabComp from './CustomTitleBarHeaderTabComp';
import { TITLE_BAR_HEIGHT, APP_MAIN_COLOR } from '../Constants';


class CustomTitleBarComp extends Component {

  static propTypes = {
    title: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.isMainPage = this.props.isMainPage;
    this.state = {
      opacity: typeof this.props.defBackgroundOpacity === 'undefined' ? 1 : this.props.defBackgroundOpacity,
    }
  }

  render() {
    let titleBarBackgoundRgba = `rgba(156, 151, 139, ${this.state.opacity})`;
    return (
      <View style={[{backgroundColor: titleBarBackgoundRgba}, styles.container, this.props.titleBarStyle]}>
        <View style={styles.titleBarContainer}></View>
        {this._renderHeaderTabContent()}
      </View>
    );
  }

  /**
   * 供其它地方调用来改动标题栏中的tab指示器位置
   */
  onPageScroll(offset) {
    this.refs.titleBarHeaderTab.onPageScroll(offset);
  }

  /**
   * 供其它地方调用来设置背景透明度
   */
  setBackgroundOpacity(opacity) {
    this.setState({opacity});
  }

  _renderHeaderTabContent() {
    if (typeof this.props.children === 'undefined') {
      return;
    }

    console.log('Customer',this);
    return (
      <CustomTitleBarHeaderTabComp ref="titleBarHeaderTab">
        {this.props.children}
      </CustomTitleBarHeaderTabComp>
    )
  }

}


const styles = StyleSheet.create({
  container: {
    paddingTop: (Platform.OS === 'android' && Platform.Version < 19) ? 0 : (Platform.OS === 'android' ? 24 : 20),
  },
  titleBarContainer: {
    flexDirection: 'row',
    height: TITLE_BAR_HEIGHT,
  },
  titleBarTitle: {
    flex: 1,
    alignSelf: 'center',
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: Platform.OS === 'android' ? 'left' : 'center',
  },
  bothBtnContainer: {
    width: TITLE_BAR_HEIGHT,
    height: TITLE_BAR_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleBarRightText: {
    alignSelf: 'center',
    color: '#FFFFFF',
    fontSize: 15,
  },
  placeholderView: {
    width: TITLE_BAR_HEIGHT,
  },
});

CustomTitleBarComp.HeaderTabItem = CustomTitleBarHeaderTabComp.HeaderTabItem;

export default CustomTitleBarComp;