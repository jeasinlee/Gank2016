import { combineReducers } from 'redux';
import GankListReducer from './gankListReducer';
import GankRecommendReducer from './gankRecReducer';
import HomePageReducer from './homePageReducer';
// ... other reducers

export default combineReducers({
    gankList: GankListReducer,
    homePage: HomePageReducer,
    // gankRecommendReducer: GankRecommendReducer,
    // ... other reducers
});