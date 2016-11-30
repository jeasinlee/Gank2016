import { combineReducers } from 'redux';
import routes from './routes';
import switchTab from './switchTab';
// ... other reducers

export default combineReducers({
    routes,
    switchTab,
    // ... other reducers
});