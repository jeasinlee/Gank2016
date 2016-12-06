import { combineReducers } from 'redux';
import GankListReducer from './gankListReducer';
import GankRecommendReducer from './gankRecReducer';
import CollectReducer from './collectListReducer';
import HomePageReducer from './homePageReducer';
// ... other reducers

export default combineReducers({
    gankList: GankListReducer,
    homePage: HomePageReducer,
    collectList: CollectReducer,
    gankRecList: GankRecommendReducer,
    // ... other reducers
});