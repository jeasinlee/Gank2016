import { combineReducers } from 'redux';
import GankListReducer from './gankListReducer';
import GankRecommendReducer from './gankRecReducer';
import CollectReducer from './collectListReducer';
import HomePageReducer from './homePageReducer';
import GirlPageReducer from './girlListReducer';
// ... other reducers

export default combineReducers({
    gankList: GankListReducer,
    homePage: HomePageReducer,
    collectList: CollectReducer,
    gankRecList: GankRecommendReducer,
    girlList: GirlPageReducer,
    // ... other reducers
});