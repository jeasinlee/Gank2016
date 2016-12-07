import React, {Component} from 'react';
import {Provider} from 'react-redux';

import {store} from './store';
import SplashScreen from './SplashScreen';
import {DEBUG, RDEBUG} from './Constants';
import RootPage from './RootPage';

global.LOG = (msg) => {
    if(DEBUG) console.log(msg);
}

global.RLOG = (msg) => {
    if(DEBUG && RDEBUG) console.log(msg);
}

class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            isShowSplash: true,
        }
    }

    render(){
        if(this.state.isShowSplash){
            return <SplashScreen onAnimEnd={() => this.setState({isShowSplash:false})}/>
        }else {
            return (
                <Provider store={store}>
                    <RootPage />
                </Provider>
            )
        }
    }
}

export default App;