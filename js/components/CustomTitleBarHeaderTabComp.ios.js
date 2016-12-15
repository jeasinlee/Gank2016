import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Animated } from 'react-native';
import { TITLE_BAR_HEIGHT } from '../Constants';

const TAB_WIDTH = 100;
const TAB_HEIGHT = 30;

class CustomTitleBarHeaderTabComp extends Component {

  render() {
    return (
      <View style={styles.container}>
        {this.props.children}
      </View>
    );
  }

}

class HeaderTabItem extends Component {

  render() {
    return (
      <TouchableHighlight underlayColor={'rgba(0,0,0,0)'} onPress={this.props.onTabClick}>
        <View style={[styles.headerTabsTextContainer, this.props.selected && styles.headerTabsTextContainerSel]}>
          <Text style={[styles.headerTabsText, {color: this.props.selected?'white':'black'}]}>{this.props.tabText}</Text>
        </View>
      </TouchableHighlight>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginRight: 5,
    alignSelf: 'flex-start',
    marginLeft:TITLE_BAR_HEIGHT,
  },
  headerTabsText: {
    fontSize: 18,
    textAlign: 'center',
  },
  headerTabsTextContainer: {
    width: TAB_WIDTH,
    height:TAB_HEIGHT,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  headerTabsTextContainerSel: {
      borderColor: '#fff',
      borderStyle: 'solid',
      borderWidth: 1,
      borderRadius: 15,
      marginBottom: 10,
  },
});

CustomTitleBarHeaderTabComp.HeaderTabItem = HeaderTabItem;

export default CustomTitleBarHeaderTabComp;